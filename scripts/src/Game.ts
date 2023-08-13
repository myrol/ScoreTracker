class Game {
    id: number;
    player1: Player;
    player2: Player;
    score: Map<Player, number>;
    ongoing: boolean;

    constructor(id: number, player1: Player, player2: Player) {
        this.id = id;
        this.player1 = player1;
        this.player2 = player2;
        this.score = new Map<Player, number>([
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

    end(score1: number, score2: number) {
        this.score = new Map<Player, number>([
            [this.player1, score1],
            [this.player2, score2]
        ]);
        this.ongoing = false;
    }

    get_score(): Map<Player, number> {
        return this.score;
    }
}