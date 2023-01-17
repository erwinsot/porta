import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

//import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";



export default class Room2 {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room2 = this.resources.items.room2;
        //this.room2 = this.resources.items.person;
        //console.log(this.room)
        this.actualRoom2 = this.room2.scene;
        //this.actualRoom2 = this.room2.scene;
        this.roomChildren2 = {};
        console.log(this.actualRoom2);

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
        this.actualRoom2.scale.set(3,3,3)
        //this.actualRoom2.scale.set(1.1,1.1,1.1)
        this.actualRoom2.position.y=0
        this.actualRoom2.position.x=-20
        this.actualRoom2.position.z=3
        /* this.actualRoom2.position.y=-1
        this.actualRoom2.position.z=3
        this.actualRoom2.position.x=10 */

        
        this.actualRoom2.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            //console.log(child)

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
            
            //child.scale.set(0, 0, 0);
            this.roomChildren2[child.name.toLowerCase()] = child;
            
        });
       
        this.scene.add(this.actualRoom2)
        
        
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
        console.log(this.room2)
    }

    

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target, 
            this.lerp.ease
        );

        

        this.actualRoom2.rotation.y = this.lerp.current;
        
        
    }
}
