var Cell = function (y, x, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.html = document.createElement('img');
    this.html.src = image;
    this.html.style.position = 'absolute';
    this.html.style.width = scale+'px';
    document.body.appendChild(this.html);
    this.update = function () {
        this.html.style.left = this.x * scale+'px';
        this.html.style.top = this.y * scale+'px';
    };
    this.checkCollision = function (cell) {
        if(!cell) {
            return false;
        }
        if (cell.x === this.x && cell.y === this.y && this != cell) {
            return true;
        } else {
            return false;
        }
    };
    this.die = function () {
        // détruit l'objet et le remove de la map
    };
    this.update();
};

var Mario = function (y, x, image) {
    var mario = this;
    Cell.call(this, y , x, image);
    this.falling = false;
    this.input = new Input(['ArrowLeft', 'ArrowRight', 'Space']);
    this.jump = {
        power: 0,
        interval: null 
    };
    this.fall = {
        power : 0,
        interval: null
    }
    this.makeJump = function () {
        mario.y--;
        mario.jump.power--;
        if (mario.jump.power === 0) {
            clearInterval(mario.jump.interval);
            mario.jump.interval = null;
            mario.falling = true;
        }
        if (map.checkCollision(mario) !== undefined) {
            mario.y++;
        }
        // si mario saute dans un koopa, il meurt
    };
    this.fall = function () {
       if (mario.jump.power === 0) {
           mario.y++;
           if(map.checkCollision(this) instanceof Koopa){
            map.checkCollision(this).die();
        }
        if (map.checkCollision(mario) !== undefined) {
           mario.y--;
           mario.falling = false;
       }

   }
        // si mario tombe sur un koopa, il meurt
    };
    this.die = function () {
        // clearInterval(this.interval);
        // map.delete(this);
        // mario met fin à  son intervalle d'animations
        // mario est retire de la map
    };
    this.move = function () {
        if (mario.input.keys.ArrowLeft.isPressed || mario.input.keys.ArrowLeft.pressed) {
            mario.x--;
            mario.input.keys.ArrowLeft.pressed = false;
            if (map.checkCollision(mario) != undefined) {
                mario.x++;
            }
        }
        if (mario.input.keys.ArrowRight.isPressed || mario.input.keys.ArrowRight.pressed) {
            mario.x++;
            mario.input.keys.ArrowRight.pressed = false;
            if (map.checkCollision(mario) !== undefined) {
                mario.x--;
            }
        }
        if(mario.input.keys.Space.pressed || mario.input.keys.Space.isPressed ){ 
            if (mario.falling == false) {
                mario.jump.power = 3;
                mario.falling = true;
                mario.jump.interval = setInterval(mario.makeJump, 100);
            }
            mario.input.keys.Space.pressed = false;    
        }
        // si mario rencontre un koopa après son déplacement, il meurt
    };
    this.interval = setInterval(function () {
        mario.fall();
        mario.move();
        mario.update();
    }, 100);
};

var Koopa = function (y, x, image) {
    Cell.call(this,y , x, image);
    var koopa = this;
    this.direction = 'left';
    this.die = function() {
        nbr_koopa++;
        clearInterval(this.interval);
        map.delete(this);
    };
    this.move = function () {
        if (this.direction == 'left') {
            this.x--;
            if(map.checkCollision(this) instanceof Mario){
                map.checkCollision(this).die();
            }
            if (map.checkCollision(koopa) != undefined) {
                this.direction = 'right';
                this.x++;
                return false;
            }
        } 
        else {
            this.x++;
            if(map.checkCollision(this) instanceof Mario){
                map.checkCollision(this).die();
            }
            if (map.checkCollision(koopa) != undefined) {
                this.direction = 'left';
                this.x--;
                return false;
            }
        }
        // si koopa recontre mario, mario meurt
    };
    this.fall = function () {
        koopa.y++;
        if (map.checkCollision(koopa) != undefined) {   
            koopa.y--;
        }
    };
    this.interval = setInterval(function () {
        koopa.fall();
        koopa.move();
        koopa.update();
    }, 200);
}

var Input = function (keys) {
    this.keys = {};
    for (var i = 0; i < keys.length; i++) {
        this.keys[keys[i]] = {};
        this.keys[keys[i]].isPressed = false;
        this.keys[keys[i]].pressed = false;
    }
    var input = this;
    window.addEventListener('keydown', function(e){
        e = e || window.event;
        if (typeof input.keys[e.code] !== 'undefined'){
            input.keys[e.code].isPressed = true;
            input.keys[e.code].pressed = true;
        }
    });
    window.addEventListener('keyup', function(e){
        e = e || window.event;
        if (typeof input.keys[e.code] !== 'undefined'){
            input.keys[e.code].isPressed = false;
        }
    });
}

var Map = function (model) {
    this.map = [];
    this.generateMap = function () {
        for (var y = 0; y < model.length; y++) {
            for (var x = 0; x < model[y].length; x++) {
                var leet = model[y][x];
                if (leet === "w") {
                    this.map.push(new Cell(y, x, 'assets/wall.jpg'));
                }
                if (leet === "k") {
                    this.map.push(new Koopa(y, x, 'assets/shell.png'));
                }
                if (leet === "m") {
                    this.map.push(new Mario(y, x, 'assets/Mario.png'));
                }
            }
        }

    };
    this.checkCollision = function (cell) {
        for (var i = 0; i < this.map.length; i++) {
            if(cell.checkCollision(this.map[i])) {
                return this.map[i];
            }
        }
    };
    this.delete = function (cell) {
        this.map.splice(this.map.indexOf(cell),1);
        document.body.removeChild(cell.html);
        delete cell;
        // retire la cell de map
        // retire la cell du dom
        // delete la cell
    };
};

var schema = [
'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
'w                                      w',
'w                                k     w',
'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww    w',
'w                                      w',
'w                                      w',
'w                                      w',
'w                                      w',
'w                                      w',
'w          k    w                      w',
'wwwwwwwwwwwwwwwww                      w',
'w                   w           k      w',
'w            wwwww  wwwwwwwwwwwwwwwwwwww',
'w            w                         w',
'w           ww                         w',
'w          www                         w',
'w         wwww                         w',
'w    m  wwwww k     w      k          w',
'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
];
var nbr_koopa = 0;
var scale = 30;
var map = new Map(schema);
map.generateMap();