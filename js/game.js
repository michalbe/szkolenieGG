GAME.network.connect();
GAME.elements.board.append(document.body);

GAME.network.onmessage(function(event) {
    switch (event.type) {
		case 'gimmePlayers':
			GAME.network.send({
						type: 'takePlayers',
						id: GAME.players.id,
						allPlayers: GAME.players.all
			});
			break;
		case 'takePlayers':
			if (event.allPlayers.length > GAME.players.all.length)
				GAME.players.all = event.allPlayers;
				
			GAME.network.send({
						type: 'hello',
						id: GAME.players.id,
					});
					
			break;
		case 'hello':
			if (!GAME.config.IS_CONNECTED) {
				
				
				if (GAME.players.all.length < 3) {
					
					GAME.players.isPlayer = true;
					var playersLenght = GAME.players.all.push(GAME.players.id);
					
					if (playersLenght === 1) {
					
						GAME.players.allowMove = true;
						GAME.players.orientation = -1;
                        GAME.elements.checkers.placeAll();
                        
					} else if (playersLenght === 2) {
						GAME.players.orientation = 1;
                        GAME.elements.checkers.placeAll();
                        
						GAME.network.send({
                            type: 'ready',
                            id: GAME.players.id
                        });
                        GAME.config.loaderOff();
					}

					//GAME.elements.checkers.placeAll();
					GAME.config.IS_CONNECTED = true;
				}
				
			}
			break;
		case 'movement':
			GAME.elements.board.moveChecker(event);
			GAME.players.allowMove = true;
            
             if (event.captured) {
                    GAME.elements.checkers.all[event.captured].img.parentNode.removeChild(GAME.elements.checkers.all[event.captured].img);   
            }
                
			break;
        case 'ready':
			GAME.config.loaderOff();
			break;
    
    }
});