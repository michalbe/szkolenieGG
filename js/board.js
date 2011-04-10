(function(){
GAME.namespace('GAME.elements.board'); 

GAME.elements.board.cells = [];

var table = document.createElement('table'),
	tbody = document.createElement('tbody'),
	tr, td, mapOfCheckers = [],
    i, j, topPos, leftPos, type,
	cells = GAME.elements.board.cells;

for (i=0; i<GAME.config.CELLS_VERTICAL;i++){
	cells[i] = [];
	tr = document.createElement('tr');
	for (j = 0; j < GAME.config.CELLS_HORIZONTAL; j++) {
        type = (i+j) % 2 + 1;
		cells[i][j] = document.createElement('td');
		cells[i][j].className = 'field' + type;
		cells[i][j].setAttribute('style', 'width:' + GAME.config.CELL_SIZE + 'px;height:' + GAME.config.CELL_SIZE + 'px');
        cells[i][j].i = i;
        cells[i][j].j = j;
		tr.appendChild(cells[i][j]);
	}
	tbody.appendChild(tr);
}
table.appendChild(tbody);
table.style.margin="auto";

GAME.elements.board.append = function(elem){
    elem.appendChild(table);
}

var possibleFields = [],
    activeFieldClick = function(i, j, capturing){
            if (GAME.elements.checkers.actual) {
                GAME.network.send({
					'type': 'movement',
					'id': GAME.players.id,
                    'actual': GAME.elements.checkers.actual,
                    'iCell': i,
                    'jCell': j,
                    'captured': capturing
                    });
                    
                if (capturing) {
                    GAME.elements.checkers.all[capturing].img.parentNode.removeChild(GAME.elements.checkers.all[capturing].img);   
                }  
                
                cells[i][j].appendChild(GAME.elements.checkers.all[GAME.elements.checkers.actual].img);               
				GAME.elements.board.clearPossible();
                GAME.elements.checkers.all[GAME.elements.checkers.actual].position.i = i;
                GAME.elements.checkers.all[GAME.elements.checkers.actual].position.j = j;
                GAME.elements.checkers.actual = null;
				GAME.players.allowMove = false;
            }
    };

GAME.elements.board.markAsPossible = function(i, j, capturing){
    cells[i][j].className = 'activeField';
    
    possibleFields.push({i:i, j:j});
    
    cells[i][j].onclick=function(){activeFieldClick(i, j, capturing);}
}

GAME.elements.board.clearPossible = function() {
	var i, j;
	possibleFields.forEach(function(element){
		i = element.i;
		j = element.j;
		
		cells[i][j].className = 'field1';
		//cells[i][j].removeEventListener('click', activeFieldClick, false);
        cells[i][j].onclick = function(){};
	});
    
    possibleFields = [];
}

GAME.elements.board.moveChecker = function(data) {
    cells[data.iCell][data.jCell].appendChild(GAME.elements.checkers.all[data.actual].img);
}
 })();