//gameover.js
var gameover = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        // 背景レイヤーをその場で作る
        var backgroundLayer = cc.Sprite.create(res.background_png);
        backgroundLayer.setPosition(size.width,size.height /2 );
        this.addChild(backgroundLayer);

        var label01 = cc.Sprite.create(res.gameover_png);　
        label01.setPosition(size.width / 2, size.height * 0.5);　
        this.addChild(label01);

        var label02 = cc.Sprite.create(res.replay_button_png);　
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
        cc.director.runScene(new gamestart());
      },
});

var GameOverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        var layer1 = new gameover();
        this.addChild(layer1);
    }
});
