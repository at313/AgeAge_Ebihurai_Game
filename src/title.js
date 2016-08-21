//start.js
var gamestart = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        cc.audioEngine.playMusic(res.bgm_title, true);

        // 背景レイヤーをその場で作る
        var backgroundLayer = cc.Sprite.create(res.background_png);
        backgroundLayer.setPosition(size.width,size.height /2 );
        this.addChild(backgroundLayer);

        var label01 = cc.Sprite.create(res.title_png);　
        label01.setPosition(size.width / 2, size.height * 0.6);　
        this.addChild(label01);

        var label02 = cc.Sprite.create(res.start_png);　
        label02.setPosition(size.width / 2, size.height * 0.2);　
        this.addChild(label02);

        // タップイベントリスナーを登録する
                cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: this.onTouchBegan,
                    onTouchMoved: this.onTouchMoved,
                    onTouchEnded: this.onTouchEnded
                }, this);

        return true;
    },
      onTouchBegan: function(touch, event) {
        return true;
      },
      onTouchMoved: function(touch, event) {},
      onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        cc.audioEngine.stopMusic();
        cc.director.runScene(new gameScene());
      },
});

var GameStartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        var layer1 = new gamestart();
        this.addChild(layer1);
    }
});
