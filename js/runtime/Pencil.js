import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Pencil extends Sprite{
    //top作为铅笔精灵笔尖的y坐标
    constructor(image,top){
        super(image,
            0,0,
            image.width,image.height,
            window.innerWidth,0,
            image.width,image.height
            )
        this.top = top;
    }
    draw(){
        this.x = this.x - Director.getInstantce().moveSpeed;
        super.draw(this.img,
            0,0,
            this.width,this.height,
            this.x,this.y,
            this.width,this.height
            )
    }
}