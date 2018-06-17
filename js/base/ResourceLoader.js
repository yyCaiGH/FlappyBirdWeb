import {Resources} from "./Resouces.js";

export class ResourceLoader {
    constructor(){
        this.map = new Map(Resources);
        for (let[key,value] of this.map){
            const image = new Image();
            image.src = value;
            this.map.set(key,image);
        }
    }

    onLoaded(callback){
        let loadedCount = 0;
        for (let value of this.map.values()){
            value.onload = () =>{//箭头语法让里面的this指向外部
                loadedCount ++;
                if (loadedCount>=this.map.size){
                    callback(this.map)
                }
            }
        }
    }
    static create(){
        return new ResourceLoader();
    }
}