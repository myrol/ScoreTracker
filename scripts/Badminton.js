const player_add_btn = document.getElementById("player_add_btn");
const player_list = document.getElementById("player_list");
const game_add_btn = document.getElementById("game_add_btn");
const game_table_base = document.getElementById("game_table").innerHTML;
let players = [];
let games = [];
player_add_btn.addEventListener("click", function () {
    const player_txt = document.getElementById("player_add_txt");
    const player = new Player(player_txt.value);
    players.push(player);
    updatePlayerList();
});
game_add_btn.addEventListener("click", function () {
    const player1_txt = document.getElementById("player1_add_txt");
    const player2_txt = document.getElementById("player2_add_txt");
    const player1 = getPlayer(player1_txt.value);
    const player2 = getPlayer(player2_txt.value);
    const game = new Game(games.length, player1, player2);
    games.push(game);
    updateIngame(player1);
    updateIngame(player2);
    updateGameTable();
    updatePlayerList();
});
function updateGameTable() {
    const table = document.getElementById("game_table");
    table.innerHTML = game_table_base;
    for (const game of games) {
        const row = table.insertRow(-1);
        const cellP1 = row.insertCell(0);
        const cellP2 = row.insertCell(1);
        const cellTerminated = row.insertCell(2);
        const cellScore = row.insertCell(3);
        cellP1.appendChild(document.createTextNode(game.player1.name));
        cellP2.appendChild(document.createTextNode(game.player2.name));
        if (game.ongoing) {
            cellTerminated.appendChild(document.createTextNode(""));
            const terminateScore1 = document.createElement("input");
            const terminateScore2 = document.createElement("input");
            const terminateBtn = document.createElement("input");
            terminateScore1.setAttribute("type", "number");
            terminateScore1.setAttribute("id", `termScore1_${game.id}`);
            terminateScore2.setAttribute("type", "number");
            terminateScore2.setAttribute("id", `termScore2_${game.id}`);
            terminateBtn.setAttribute("type", "button");
            terminateBtn.setAttribute("value", "Terminate");
            terminateBtn.addEventListener("click", () => {
                const s1 = document.getElementById(`termScore1_${game.id}`);
                const s2 = document.getElementById(`termScore2_${game.id}`);
                game.end(Number.parseInt(s1.value), Number.parseInt(s2.value));
                updateIngame(game.player1);
                updateIngame(game.player2);
                updateGameTable();
                updatePlayerList();
            });
            cellScore.appendChild(terminateScore1);
            cellScore.appendChild(terminateScore2);
            cellScore.appendChild(terminateBtn);
        }
        else {
            const terminated_symbol = "X";
            cellTerminated.appendChild(document.createTextNode(terminated_symbol));
            cellScore.appendChild(document.createTextNode(game.score.get(game.player1).toString() +
                " - " +
                game.score.get(game.player2).toString()));
        }
    }
}
function updatePlayerList() {
    player_list.innerHTML = "";
    for (const player of players) {
        const li = document.createElement("li");
        const li_ingame = (player.ingame_flag) ? ", ingame" : "";
        li.appendChild(document.createTextNode(`${player.name}${li_ingame}`));
        player_list.appendChild(li);
    }
}
function getPlayer(name) {
    for (const p of players) {
        if (p.name === name) {
            return p;
        }
    }
    const player = new Player(name);
    players.push(player);
    return player;
}
function updateIngame(_player) {
    for (const game of games) {
        if (_player === game.player1 || _player === game.player2) {
            if (game.ongoing) {
                _player.ingame_flag = true;
                return;
            }
        }
    }
    _player.ingame_flag = false;
    return;
}
console.log("Loaded Badminton.js");
