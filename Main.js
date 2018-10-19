import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor(){
        console.log("游戏开始")
        this.canvas = document.getElementById('game_canvas');//游戏画布标签
        this.ctx = this.canvas.getContext('2d');//游戏画布对象作为整个游戏环境变量
        this.dataStore = DataStore.getInstance();//游戏得全局存储变量，控制资源
        this.director = Director.getInstantce();//游戏导演类创建，统筹游戏
        const loader = ResourceLoader.create();//游戏资源加载，只加载一次
        loader.onLoaded(map=>this.onResourceFirstLoaded(map));
    }
    onResourceFirstLoaded(map){
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        //资源加载完才开始游戏
        this.init();
    }
    init(){
        this.director.isGameOver = false;
        //游戏精灵创建
        this.dataStore
            .put('pencils',[])
            .put('background',BackGround)
            .put('land',Land)
            .put('birds',Birds)
            .put('score',Score)
            .put('startButton', StartButton);
        ;
        this.registerEvent();
        this.director.createPencil();
        //导演开始执行游戏
        this.director.run();
    }
    registerEvent(){
        this.canvas.addEventListener('touchstart',e=>{
            //屏蔽掉js的事件冒泡
           e.preventDefault();
           if (this.director.isGameOver){
               console.log('游戏开始');
               this.init();
           }
           else {
                this.director.birdsEvent();
           }
        });
    }
}