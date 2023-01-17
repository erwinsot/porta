import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";


export default class Controls {
    constructor() {
        
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room2 = this.experience.resources.items.room;
        this.renderer= this.experience.renderer
        this.actualRoom = this.room2.scene;
        GSAP.registerPlugin(ScrollTrigger);
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        this.darkMaterial = new THREE.MeshBasicMaterial( { color: 'black' } );
        
        //document.querySelector(".page").style.overflow = "visible";
        this.setAnim2()
        
        
    }

    setAnim2(){
        
        this.onMoveMouse=this.onPointerDown.bind(this) 
        window.addEventListener( 'pointerdown', this.onMoveMouse);
        this.mixer2 = new THREE.AnimationMixer(this.actualRoom);
        this.trabajar = this.mixer2.clipAction(this.room2.animations[31]);
        this.caer = this.mixer2.clipAction(this.room2.animations[30]);
        this.silla = this.mixer2.clipAction(this.room2.animations[26]);
        this.base_silla = this.mixer2.clipAction(this.room2.animations[27]);
        this.mouse = this.mixer2.clipAction(this.room2.animations[43]);
        this.caer.setLoop(THREE.LoopOnce)
        this.silla.setLoop(THREE.LoopOnce)
        this.base_silla.setLoop(THREE.LoopOnce)
        this.caer.play();
        this.silla.play();
        this.base_silla.play();
        console.log(this.caer.time)
        console.log(this.room2.animations[31].duration)
    }
  

    
    onPointerDown( event ) {

        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        console.log(this.mouse.x)
        this.raycaster.setFromCamera( this.mouse, this.camera.perspectiveCamera );
        this.intersects = this.raycaster.intersectObjects(this.scene.children, true );
        console.log(this.intersects)
        if ( this.intersects.length > 0 ) {


            this.object =this.intersects[ 0 ].object;
            console.log(this.object)
            this.object.layers.toggle(1);
          
            /* this.object.traverseAncestors((a)=>{
                if(a.name.length>0)console.log("dsadad")
            }) */
            if(this.object.name==="Plane002_2"){
                console.log("este es")
                GSAP.fromTo(this.room.position,{ x: 0, y: -1, z: 3 },
                    {
                        x: () => {
                            return this.sizes.width * 0.5;
                        },
                        duration: 10,
                        ease: "power2.inOut"
                    },  )
            }
            
        }

        
       
        

        //this.renderer.render(this.scene,this.camera.perspectiveCamera)



    }

   
         

    resize() {}

    update() {

        
        

        this.mixer2.update(this.time.delta* 0.0008)
        //console.log(this.caer.time)
        if(this.caer.time=== this.room2.animations[30].duration){
            //console.log("holaaa")
            //this.caer.stop();
            this.trabajar.play();
            this.mouse.play()
        }

        

        
    }
}
