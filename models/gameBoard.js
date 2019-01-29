const _ = require('underscore');
const snakenladder = [{
    start: 37,
    end: 17
}, {
    start: 31,
    end: 14
}, {
    start: 73,
    end: 53
}, {
    start: 92,
    end: 46
}, {
    start: 99,
    end: 7
}, {
    start: 78,
    end: 39
}, {
    start: 5,
    end: 25
}, {
    start: 10,
    end: 29
}, {
    start: 22,
    end: 41
}, {
    start: 28,
    end: 55
}, {
    start: 44,
    end: 95
}, {
    start: 70,
    end: 89
}, {
    start: 79,
    end: 81
}];

module.exports = class SnakeNLadder {
    constructor(start,end) {
        this.start = start;
        this.end = end;
    }
    save() {
        snakenladder.push(this);
    }
    static fetchAll(){
        return snakenladder;
    }

    static findByStart(start){
        return _.indexOf(_.pluck(snakenladder, 'start'), start);
    }
    static getEnd(index){
       return snakenladder[index].end;
    }
};
