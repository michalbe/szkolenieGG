(function(){
    GAME.namespace('GAME.elements.checkers'); 

    var checkersFactory = function(){
            var that = this,
                draw = function(color1, color2) {
                    var c = document.createElement('canvas'),
                        ctx = c.getContext('2d');
                    
                    c.width = 40;
                    c.height = 40;
                    
                    ctx.beginPath();
                    ctx.fillStyle = color1;
                    ctx.arc(20, 20, 20, Math.PI*2, 0, 0);		
                    ctx.closePath();
                    ctx.fill();
                
                    
                    ctx.beginPath();
                    ctx.fillStyle = color2;
                    ctx.arc(20, 20, 17, Math.PI*2, 0, 0);		
                    ctx.closePath();
                    ctx.fill();
                    
                    return c.toDataURL();
                };
            
                that.create = function(color) {
                    return {
                        img: (function(color){ 
                                var img = new Image();
                                img.src = draw('#000', color);
                                return img;
                            })(color),
                        isQueen: false,
                        type: null,
                        position: {
                            x: null,
                            y: null
                        }
                    }
                }
            
        }

    GAME.elements.checkers.all = [];
    GAME.elements.checkers.actual = null;

    var checkers = GAME.elements.checkers.all, 
        id, type, i, j,
        checkersF = new checkersFactory(),
        cells = GAME.elements.board.cells;
            
    GAME.elements.checkers.placeAll = function() {
        for (i = 0; i < GAME.config.CELLS_VERTICAL; i++) {
            for (j = 0; j < GAME.config.CELLS_HORIZONTAL; j++) {
                type = (i+j) % 2 + 1;
                if (type == 1 && (i<GAME.config.CELLS_VERTICAL/2-1 || i>GAME.config.CELLS_VERTICAL/2 )) {
                
                    if (i > GAME.config.CELLS_VERTICAL / 2) {
                        id = checkers.push(checkersF.create('#f00'))-1;  
                        checkers[id].img.orientation = -1;
                    } else {
                        id = checkers.push(checkersF.create('#00f'))-1; 
                        checkers[id].img.orientation = 1;
                    }
                    
                    checkers[id].position.i = i;
                    checkers[id].position.j = j;
                    checkers[id].img.width = GAME.config.CELL_SIZE-2;
                    checkers[id].img.id = id;
                    cells[i][j].appendChild(checkers[id].img);
					
					if (checkers[id].img.orientation === GAME.players.orientation) {
						checkers[id].img.onclick = function(q){
							return function(){
								if (GAME.players.allowMove) {
								   var actualChecker = GAME.elements.checkers.all[q], 
									   position = actualChecker.position,
									   iModifier = actualChecker.img.orientation,
									   jModifier = -1,
									   capturing = false;
									
									GAME.elements.board.clearPossible();                            
									if (position.j > 0 && 
										(cells[position.i + iModifier][position.j+jModifier].childNodes.length === 0 ? true : 
										(position.j > 1 && 
										cells[position.i + iModifier][position.j+jModifier].childNodes[0].orientation !== actualChecker.img.orientation)
										?
										(capturing = cells[position.i + iModifier][position.j+jModifier].childNodes[0].id, iModifier*=2, jModifier*=2,
										cells[position.i + iModifier][position.j+jModifier].childNodes.length === 0) ? true : false :false
										)) {                               
										GAME.elements.board.markAsPossible(
											position.i + iModifier,
											position.j + jModifier,
											capturing
										);
									}
									
									iModifier = actualChecker.img.orientation;
									jModifier = +1;
									capturing = false;   

									if (position.j+1 < GAME.config.CELLS_HORIZONTAL && 
										(cells[position.i + iModifier][position.j+jModifier].childNodes.length === 0 ? true : 
										(position.j+2 < GAME.config.CELLS_HORIZONTAL && 
										cells[position.i + iModifier][position.j+jModifier].childNodes[0].orientation !== actualChecker.img.orientation)
										?
										(capturing = cells[position.i + iModifier][position.j+jModifier].childNodes[0].id, iModifier*=2, jModifier*=2,
										cells[position.i + iModifier][position.j+jModifier].childNodes.length === 0) ? true : false :false
										)) {     
										GAME.elements.board.markAsPossible(
											position.i+iModifier,
											position.j+jModifier,
											capturing
										);
									}
									
									GAME.elements.checkers.actual = q;
								}
							}
						}(id);
					}
                    
                }
                
            }
        }
    };

})();
