// https://developer.mozilla.org/fr/docs/Web/JavaScript/Introduction_%C3%A0_JavaScript_orient%C3%A9_objet
var Cell = function (y, x, image) {
    this.x = x;
    this.y =  y;
    this.image = image;
    // crÃ©e un Ã©lÃ©ment img et l'insÃ¨re dans le DOM aux coordonnÃ©es x et y
    this.update = function () {
        // met Ã  jour la position de la cellule dans le DOM
    };
    this.checkCollision = function (cell) {
        // retourne true si la cellule est aux mÃªme coordonnÃ©es que cell
    };
    this.die = function () {
        // dÃ©truit l'objet et le remove de la map
    };
};

var Mario = function (y, x, image) {
    // Mario hÃ©rite de Cell
    this.falling = false;
    this.input = new Input(['ArrowLeft', 'ArrowRight', 'Space']);
    this.jump = {
        power: 0, // hauteur du saut en nombre de cellules
        interval: null // identifiant de l'intervalle de temps entre chaque animations du saut
    };
    this.makeJump = function () {
        // mario monte d'une case s'il le peut et s'il lui reste du power
        // s'il ne le peut pas, il met fin Ã  l'intervalle de temps entre chaque animation du saut
        // mario met Ã  jour le dom Ã  chaque animation de saut
        // si mario saute dans un koopa, il meurt
    };
    this.fall = function () {
        // mario se dÃ©place d'une cellule vers le bas s'il le peut et met falling Ã  true
        // si mario tombe sur un koopa, il meurt
    };
    this.die = function () {
        // mario met fin Ã  son intervalle d'animations
        // mario est retirÃ© de la map
    };
    this.move = function () {
        // si l'Input est flÃ¨che de gauche, mario se dÃ©place Ã  gauche s'il le peut
        // si l'Input est flÃ¨che de droite, mario se dÃ©place Ã  droite s'il le peut
        // si l'Input est espace, mario commence un saut
        // si mario rencontre un koopa aprÃ¨s son dÃ©placement, il meurt
    };
    this.interval = setInterval(function () {
        mario.fall();
        mario.move();
        mario.update();
    }, 100);
};

var Koopa = function (y, x, image) {
    // Koopa hÃ©rite de Cell
    this.direction = 'left';
    this.die = function() {
        // koopa met fin Ã  son intervalle d'animations
        // koopa est retirÃ© de la map
    };
    this.move = function () {
        // koopa se dÃ©place en direction de direction s'il le peut
        // sinon il change de direction
        // si koopa recontre mario, mario meurt
    };
    this.fall = function () {
        // koopa se dÃ©place d'une cellule vers le bas s'il le peut
    };
    this.interval = setInterval(function () {
        koopa.fall();
        koopa.move();
        koopa.update();
    }, 200);
}

var Input = function (keys) {
    this.keys = {};
    // Input rÃ©cupÃ¨re les touches actives du clavier
}

var Map = function (model) {
    this.map = [];
    this.generateMap = function () {
        // instancie les classes correspondants au schema
        // avec :
        //      w => Cell
        //      k => Koopa
        //      m => Mario
    };
    this.checkCollision = function (cell) {
        // parcourt la map et renvoie la cellule aux mÃªmes coordonnÃ©es que cell
    };
    this.delete = function (cell) {
        // retire la cell de map
        // retire la cell du dom
        // delete la cell
    };
};

var schema = [
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'w                                      w',
    'w                                 k    w',
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
    'wm       wwwww k     w      k          w',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
];
var map = new Map(schema);
map.generateMap();