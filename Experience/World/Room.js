import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

//import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";



export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        //this.room2 = this.resources.items.person;
        //console.log(this.room)
        this.actualRoom = this.room.scene;
        //this.actualRoom2 = this.room2.scene;
        this.roomChildren = {};
        console.log(this.actualRoom);

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
       
            this.setAnimation();

        
        
        this.onMouseMove();

        
    }
    

    setModel(){
        
        //this.actualRoom2.scale.set(4.517,4.517,4.517)
        this.actualRoom.scale.set(1.1,1.1,1.1)
        this.actualRoom.position.y=-1
        this.actualRoom.position.z=3
        /* this.actualRoom2.position.y=-1
        this.actualRoom2.position.z=3
        this.actualRoom2.position.x=10 */

        
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            //console.log(child)

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
            
            child.scale.set(0, 0, 0);

            if (child.name === "pc1") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen2,
                });
            }
            if (child.name === "pc2") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }


            if (child.name === "pared") {
                
                child.scale.set(-9.4444,-9.4444, -9.4444);
                //child.position.set(0, -1, 0);
                //child.rotation.y = Math.PI / 4;
            }
            /* if(child.name==="mouse"){
                child.position.set(9.15156, 2.53052, -1.5053);
            } */
            if(child.name==="Armature"){
               // child.position.set(8.82258, 6, 1);
                console.log("el hijo es ", child.children[8])
                
                child.children[0].children[0].frustumCulled=false
                child.children[0].children[1].frustumCulled=false
                child.children[0].children[2].frustumCulled=false
                child.children[1].frustumCulled=false
                child.children[2].frustumCulled=false
                child.children[3].frustumCulled=false
                child.children[4].frustumCulled=false
                child.children[5].frustumCulled=false
                child.children[6].frustumCulled=false
                child.children[7].frustumCulled=false
                child.children[8].frustumCulled=false
                child.children[9].frustumCulled=false
                child.children[10].frustumCulled=false
                child.children[11].frustumCulled=false
            }

            
            this.roomChildren[child.name.toLowerCase()] = child;
            
        });
       
        this.scene.add(this.actualRoom)
        
        
    }
   

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            //console.log(e)
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
           
            
        });
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        //this.mixer2 = new THREE.AnimationMixer(this.actualRoom);
        //this.mixer2 = new THREE.AnimationMixer(this.actualRoom2);
        console.log(this.room)
        //console.log(this.room2)

        this.dron = this.mixer.clipAction(this.room.animations[15]);
        this.dron.play();
        this.elices = this.mixer.clipAction(this.room.animations[14]);
        this.elices.play();
        this.elices1 = this.mixer.clipAction(this.room.animations[16]);
        this.elices1.play();
        this.elices2 = this.mixer.clipAction(this.room.animations[17]);
        this.elices2.play();
        this.elices3 = this.mixer.clipAction(this.room.animations[18]);
        this.elices3.play();
        //this.elices30 = this.mixer2.clipAction(this.room.animations[31]);
        //this.elices31 = this.mixer2.clipAction(this.room.animations[30]);
        //this.elices30.setLoop(THREE.LoopOnce)
        //this.elices30.play();
        
        
        
        
        console.log(typeof( this.room.animations[32].duration))
        
    }

    

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target, 
            this.lerp.ease
        );

        

        this.actualRoom.rotation.y = this.lerp.current;
        //this.actualRoom2.rotation.y = this.lerp.current;
        this.mixer.update(this.time.delta* 0.0005)
        //console.log(this.elices30.time) 
        //console.log(this.room.animations[32].duration)
       // this.mixer2.update(this.time.delta* 0.0008)
        /* if(this.elices30.time=== this.room.animations[32].duration){
            console.log("holaaa")
            this.elices30.stop()
        } */
        //this.mixer2.update(this.time.delta* 0.0005)

        
       
        
    }
}
