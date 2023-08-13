class Game {
    constructor(id, player1, player2) {
        this.id = id;
        this.player1 = player1;
        this.player2 = player2;
        this.score = new Map([
            [this.player1, 0],
            [this.player2, 0]
        ]);
        this.ongoing = true;
    }
    start() {
        this.player1.ingame_flag = true;
        this.player2.ingame_flag = true;
        this.ongoing = true;
    }
    end(score1, score2) {
        this.score = new Map([
            [this.player1, score1],
            [this.player2, score2]
        ]);
        this.ongoing = false;
    }
    get_score() {
        return this.score;
    }
}
