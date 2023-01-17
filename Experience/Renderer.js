import Experience from "./Experience";
import * as THREE from "three"
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';


const params = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0,
    bloomRadius: 0
};
export default class Renderer{
   
    constructor(){
        this.entire_scene = 0, 
        this.bloom_scene = 1;        
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas =this.experience.canvas;
        this.camera= this.experience.camera;
        this.bloomLayer = new THREE.Layers();
        this.materials = {};
        this.darkMaterial = new THREE.MeshBasicMaterial( { color: 'black' } );
        //console.log(this.sizes, this.scene, this,this.canvas) 
        
        
       
        this.setRenderer();

       
    }

     setRenderer(){
        this.renderer =  new THREE.WebGL1Renderer({
            canvas: this.canvas,
            antialias: true
        })
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        
        this.bloomLayer.set( this.bloom_scene );
        
        this.renderScene = new RenderPass( this.scene, this.camera.perspectiveCamera );
        
        this.bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
		this.bloomPass.threshold = params.bloomThreshold;
		this.bloomPass.strength = params.bloomStrength;
		this.bloomPass.radius = params.bloomRadius;

		this.composer = new EffectComposer( this.renderer );
        this.composer.renderToScreen = false;
		this.composer.addPass( this.renderScene );
		this.composer.addPass( this.bloomPass );
     }

        
    
    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);

    }

    

    update(){
        this.renderer.render(this.scene, this.camera.perspectiveCamera)
       this.composer.render();
    }



    
}