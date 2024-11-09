// Copyright (c) 2024 by Edward Han in 2024 by the CC BY SA License
// constants:
Game = {};
Game.fps = 30;
Game.num = 0;
Game.perclick = 1;
Game.persec = 0;
Game.time = new Date();
Game.buildings = {
    b1: {
        num: 0,
        price: function(){
            return 15*1.15**Game.buildings.b1.num;
        },
        amount: 0.1
    },
    b2: {
        num: 0,
        price: function(){
            return 100*1.15**Game.buildings.b2.num;
        },
        amount: 0.5
    },
    b3: {
        num: 0,
        price: function(){
            return 800*1.15**Game.buildings.b3.num;
        },
        amount: 2.5
    }
};
// main code:
Game.calcrealpersec = function(){
    function num(item){
        return Game.buildings[item].num
    }
    Game.persec = num("b1")*0.1+num("b2")*1+num("b3")*8;
}
Game.click = function(){
    Game.num += Game.perclick;
};
Game.earn = function(price = new Number(0), action = function(){}){
    Game.num -= price;
    action();
};
Game.buy = function(item){
    if (Game.num >= Game.buildings[item].price()){
        Game.earn(Game.buildings[item].price(), function(){});
        Game.buildings[item].num++;
        Game.calcrealpersec();
        $("span#"+item+"num").html(Game.buildings[item].num);
        $("span#"+item+"cos").html(Math.ceil(Game.buildings[item].price()));
    }
};
Game.update = function(){
    $("button#button").html(Math.floor(Game.num));
    Game.num += Game.persec * (new Date() - Game.time) / 1000;
    Game.time = new Date();
};
// start game 
mainloop = setInterval(Game.update, Math.floor(1000/Game.fps));
