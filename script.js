(function() {
    var grid = document.getElementById('grid');
    var msg = document.getElementById('msg');
    var xCnt = document.getElementById('xCnt');
    var oCnt = document.getElementById('oCnt');
    var xCard = document.getElementById('xCard');
    var oCard = document.getElementById('oCard');
    var winModal = document.getElementById('winModal');
    var winTxt = document.getElementById('winTxt');
    var helpModal = document.getElementById('helpModal');

    var board = Array(9).fill(null);
    var turn = 'X';
    var playing = true;
    var xMoves = [];
    var oMoves = [];

    var winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    function setup() {
        grid.innerHTML = '';
        for (var i = 0; i < 9; i++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.idx = i;
            cell.onclick = handleClick;
            grid.appendChild(cell);
        }
        updateTurn();
        msg.className = '';
        msg.textContent = '';
        winModal.className = 'overlay hide';
        highlightOldest();
        xCnt.textContent = xMoves.length;
        oCnt.textContent = oMoves.length;
    }

    function updateTurn() {
        xCard.className = turn === 'X' ? 'active' : '';
        oCard.className = turn === 'O' ? 'active' : '';
    }

    function highlightOldest() {
        var dimmed = grid.querySelector('.dim');
        if (dimmed) dimmed.classList.remove('dim');

        var moves = turn === 'X' ? xMoves : oMoves;
        if (moves.length === 3) {
            grid.children[moves[0]].classList.add('dim');
        }
    }

    function handleClick(e) {
        var cell = e.target;
        if (!cell.classList.contains('cell')) return;

        var idx = parseInt(cell.dataset.idx);
        if (board[idx] || !playing) return;

        var moves = turn === 'X' ? xMoves : oMoves;

        // rule of 3
        if (moves.length === 3) {
            var oldest = moves[0];

            if (idx === oldest) {
                msg.textContent = "nope, pick another spot";
                msg.className = 'show';
                cell.classList.add('nope');
                setTimeout(function() { cell.classList.remove('nope'); }, 400);
                return;
            }

            board[oldest] = null;
            moves.shift();
            var oldCell = grid.children[oldest];
            oldCell.classList.remove('dim');
            oldCell.classList.add('bye');
            setTimeout(function() {
                oldCell.textContent = '';
                oldCell.className = 'cell';
            }, 250);
        }

        // place piece
        board[idx] = turn;
        moves.push(idx);
        cell.textContent = turn;
        cell.classList.add(turn, 'new');
        msg.className = '';

        // check win
        if (checkWin()) {
            playing = false;
            setTimeout(function() {
                winTxt.textContent = turn + ' Wins!';
                winTxt.className = turn === 'X' ? 'xwin' : 'owin';
                winModal.className = 'overlay';
            }, 200);
            var d = grid.querySelector('.dim');
            if (d) d.classList.remove('dim');
        } else {
            turn = turn === 'X' ? 'O' : 'X';
            updateTurn();
            highlightOldest();
        }

        xCnt.textContent = xMoves.length;
        oCnt.textContent = oMoves.length;
    }

    function checkWin() {
        for (var i = 0; i < winCombos.length; i++) {
            var c = winCombos[i];
            if (board[c[0]] && board[c[0]] === board[c[1]] && board[c[1]] === board[c[2]]) {
                return true;
            }
        }
        return false;
    }

    function reset() {
        board = Array(9).fill(null);
        turn = 'X';
        playing = true;
        xMoves = [];
        oMoves = [];
        setup();
    }

    // events
    document.getElementById('resetBtn').onclick = reset;
    document.getElementById('againBtn').onclick = reset;
    document.getElementById('helpBtn').onclick = function() { helpModal.className = 'overlay'; };
    document.getElementById('rulesBtn').onclick = function() { helpModal.className = 'overlay'; };
    document.getElementById('closeBtn').onclick = function() { helpModal.className = 'overlay hide'; };
    document.getElementById('gotitBtn').onclick = function() { helpModal.className = 'overlay hide'; };

    helpModal.onclick = function(e) { if (e.target === helpModal) helpModal.className = 'overlay hide'; };
    winModal.onclick = function(e) { if (e.target === winModal) winModal.className = 'overlay hide'; };

    document.onkeydown = function(e) {
        if (e.key === 'Escape') {
            helpModal.className = 'overlay hide';
            winModal.className = 'overlay hide';
        }
    };

    setup();

    // first time help
    if (!localStorage.ttt3) {
        setTimeout(function() { helpModal.className = 'overlay'; }, 500);
        localStorage.ttt3 = 1;
    }
})();
