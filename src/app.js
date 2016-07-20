//app.js

var size;
var mylabel;
//背景スクロールで追加した部分
var gameLayer;
var background;
var scrollSpeed = 1;
var shrimp;
var gameGravity = -0.05;
var gameThrust = 0.1;


var gameScene = cc.Scene.extend({
    onEnter:function () {
      //  var gradient = cc.LayerGradient.create(cc.color(0, 0, 0, 255), cc.color(0x46, 0x82, 0xB4, 255));
      //  this.addChild(gradient);
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);
    }
});

var game = cc.Layer.extend({
    init:function () {
        this._super();
        size = cc.director.getWinSize();
        // mylabel = cc.LabelTTF.create("GO!", "Arial", "32");
        // mylabel.setPosition(size.width / 2, size.height / 2);
        // this.addChild(mylabel);

        //エビちゃんを操作
   cc.eventManager.addListener({
           event: cc.EventListener.MOUSE,
           onMouseDown: function(event){
               shrimp.engineOn = true;
           },
           onMouseUp: function(event){
               shrimp.engineOn = false;
           }
       },this)

        //スクロールする背景スプライトをインスタンス　スクロール速度:scrollSpeed
        background = new ScrollingBG();
        this.addChild(background);

        shrimp = new Shrimp();
        this.addChild(shrimp);

        //scheduleUpdate関数は、描画の都度、update関数を呼び出す
        this.scheduleUpdate();

    },
    update:function(dt){
      //backgroundのscrollメソッドを呼び出す
        background.scroll();
        shrimp.updateY();

    },

});
//スクロール移動する背景クラス
var ScrollingBG = cc.Sprite.extend({
    //ctorはコンストラクタ　クラスがインスタンスされたときに必ず実行される
    ctor:function() {
        this._super();
        this.initWithFile(res.background_png);
    },
    //onEnterメソッドはスプライト描画の際に必ず呼ばれる
    onEnter:function() {
      //背景画像の描画開始位置 横960の画像の中心が、画面の端に設置される
      this.setPosition(size.width,size.height /2 );
      //  this.setPosition(480,160);
    },
    scroll:function(){
      //座標を更新する
        this.setPosition(this.getPosition().x-scrollSpeed,this.getPosition().y);
        //画面の端に到達したら反対側の座標にする
        if(this.getPosition().x<0){
            this.setPosition(this.getPosition().x+480,this.getPosition().y);
        }
    }
});

//重力（仮）で落下する　エビちゃん　
var Shrimp = cc.Sprite.extend({
  ctor: function() {
    this._super();
    this.initWithFile(res.shrimp0_png);
    this.ySpeed = 0; //エビちゃんの垂直速度

    this.engineOn = false; //カスタム属性追加　エビちゃんのジャンプON OFF
  },
  onEnter: function() {
    this.setPosition(60, 160);
  },
  updateY: function() {

if(this.engineOn){
    this.ySpeed += gameThrust;
}

    this.setPosition(this.getPosition().x, this.getPosition().y + this.ySpeed);
    this.ySpeed += gameGravity;
  }
});
