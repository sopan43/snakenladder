const _ = require('underscore');
let players = new Array();

module.exports = class Player {
    constructor(id) {
        this.id = id;
        this.position = 0;
        this.previousPosition = 0;
        this.initialCount = 0;
        this.diceRoll = 0;
        this.special = 0;
    }
    save() {
        players.push(this);
    }
    static fetchAll() {
        return players;
    }

    static findById(id) {
    	return players[id];
    }
    static sortByinitialCount() {
    	players = _.sortBy(players, 'initialCount');
    	return players;
    }

    static getindex(id) {
    	return _.indexOf(_.pluck(players, 'id'), id);
    }

    static reset() {
    	players = new Array();
    }
};