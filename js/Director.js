import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    static  getInstantce(){
        if (!Director.instantce){
            Director.instantce = new Director();
        }
        return Director.instantce;
    }
    constructor(){
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    createPencil(){
        const minTop = window.innerHeight/8;
        const maxTop = window.innerHeight/2;
        const top = minTop + Math.random()*(maxTop-minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }
    //导演控制不断重新绘制游戏
    run(){
        if (!this.isGameOver) {
            //游戏背景精灵绘制
            this.dataStore.get('background').draw();
            //铅笔精灵绘制
            const pencils  = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width<=0 && pencils.length===4){
                pencils.shift();
                pencils.shift();
            }
            if (pencils[0].x <= (window.innerWidth-pencils[0].width)/2 && pencils.length===2){
                this.createPencil();
            }
            this.dataStore.get('pencils').forEach(function (value,index,array) {
                value.draw();
            })
            //地板精灵绘制
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            //重新绘制
            let  timer = requestAnimationFrame(()=>this.run());
            this.dataStore.put('timer',timer);
        }
        else {
            //不再绘制
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }

    }
}