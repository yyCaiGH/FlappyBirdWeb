import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class  Land extends Sprite{
    constructor(){
        const  image = Sprite.getImage('land');
        super(image,0,0,
            image.width,image.height,
            0,window.innerHeight-image.height,
            image.width,image.height
            );
        this.landx = 0;
        this.landSpeed = Director.getInstantce().moveSpeed;
    }

    draw(){
        this.landx = this.landx + this.landSpeed;
        if (this.landx>(this.img.width-window.innerWidth)){
            this.landx = 0;
        }
        super.draw(
            this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            -this.landx,
            this.y,
            this.width,
            this.height
        );
    }
}