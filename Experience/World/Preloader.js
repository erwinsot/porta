import EventEmitter from "events";
import GSAP from "gsap";
import Experience from "../Experience";
import convert from "../Utils/covertDivsToSpans";

export default class Preloader extends EventEmitter{
    constructor() {
        super()
        this.experience = new Experience;
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.enableAnim=false;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
            console.log(device)
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
            this.playSecondIntro();
            
        });
       
        
    }

    setAssets() {
        
        //convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-title2"));
        convert(document.querySelector(".hero-main-description"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        this.room2 = this.experience.world.room2.actualRoom2;
        this.roomChildren2 = this.experience.world.room2.roomChildren2;
        console.log("los onjetos son",this.roomChildren);
        console.log("los onjetos ROOM2 SON ",this.roomChildren2);
        
        //this.roomChildren = this.experience.world.room.roomChildren;
        //console.log(this.roomChildren);
    }
    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });
            
            this.timeline
                .to(".intro-text .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "same"
                );
        });
    }
    secondIntro(){
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();
            this.secondTimeline
                /* .to(
                    ".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                ) */
                
                .to(
                    ".hero-main-title .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.15,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".hero-main-title2 .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.15,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".hero-main-description .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                /* .to(
                    ".first-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".second-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                ) */
                .to(
                    this.roomChildren.escritorio.scale,
                    {
                        x: 1,
                        y: 0.19,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                ).to(
                    this.roomChildren.tapete.scale,
                    {
                        x: 1.789,
                        y: 1.614,
                        z: 1.614,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                ).to(
                    this.roomChildren.cat.scale,
                    {
                        x: 0.199,
                        y: 0.199,
                        z: 0.199,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                    
                )
                .to(
                    this.roomChildren.pc2.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                )
                .to(
                    this.roomChildren.pc1.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                    
                )
                .to(
                    this.roomChildren.teclado.scale,
                    {
                        x: 1.473,
                        y: 1.273,
                        z: 1.473,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                    
                )
                .to(
                    this.roomChildren.mouse.scale,
                    {
                        x: 1.024,
                        y: 1.8,
                        z: 1.2,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                    
                )
                .to(
                    this.roomChildren.altavoz.scale,
                    {
                        x: 0.581,
                        y: 0.581,
                        z: 0.581,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                    
                ).to(
                    this.roomChildren.bocina.scale,
                    {
                        x: 0.172,
                        y: 0.172,
                        z: 0.172,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                    
                )

                .to(
                    this.roomChildren.lapicera.scale,
                    {
                        x: 0.5777,
                        y: 0.312,
                        z: 0.5777,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                )
                .to(
                    this.roomChildren.cadctus.scale,
                    {
                        x: 0.111,
                        y: 0.111,
                        z: 0.111,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                )
                .to(
                    this.roomChildren.jueguete.scale,
                    {
                        x: 11.357,
                        y: 11.357,
                        z: 11.357,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                ).to(
                    this.roomChildren.telescop.scale,
                    {
                        x: 0.075,
                        y: 0.075,
                        z: 0.075,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                )
                .to(
                    this.roomChildren.libros.scale,
                    {
                        x: 0.137,
                        y: 0.692,
                        z: 0.509,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                )
                .to(
                    this.roomChildren.tareas.scale,
                    {
                        x: 2.111,
                        y: 2.111,
                        z: 2.111,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                ).to(
                    this.roomChildren.cuadro.scale,
                    {
                        x: 1.51,
                        y: 1.51,
                        z: 1.51,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                ).to(
                    this.roomChildren.droncuerpo.scale,
                    {
                        x: 0.279,
                        y: 0.132,
                        z: 0.653,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                )
                .to(
                    this.roomChildren.matera2.scale,
                    {
                        x: 1.517,
                        y: 1.517,
                        z: 1.517,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                )
                .to(
                    this.roomChildren.armature.scale,
                    {
                        x: 3.5,
                        y:3.5,
                        z: 3.5,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.5"
                    
                )
                .to(
                    this.roomChildren.notas1.scale,
                    {
                        x: 0.248,
                        y: 0.248,
                        z: 0.248,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.2"
                    
                ).to(
                    this.roomChildren.notas2.scale,
                    {
                        x: 0.248,
                        y: 0.248,
                        z: 0.248,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    ">-0.1"
                    
                ).to(
                    this.roomChildren.base_silla.scale,
                    {
                        x: 0.83,
                        y: 0.83,
                        z:0.83,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.silla.scale,
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2.2)",
                        duration: 0.5,
                    },
                    "chair"
                )
                .to(
                    this.roomChildren.silla.rotation,
                    {
                        y: 4 * Math.PI ,
                        ease: "power2.out",
                        duration: 1,
                    },
                    "chair"
                )                
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: resolve,
                });
               
                })
        
    }


    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        
    }

    async playSecondIntro() {
        //this.moveFlag = false;
        await this.secondIntro()       
       //this.scaleFlag = false;
        
        this.emit("enablecontrols");
    }
     

    scale() {
        if (this.device === "desktop") {
            
            this.room.scale.set(1.1, 1.1, 1.1);
        } else {
            this.room.scale.set(0.58, 0.58, 0.58);
            
        }
    }

    update() {
        

        if (this.scaleFlag) {
            
            this.scale();
        }
      
    }
}