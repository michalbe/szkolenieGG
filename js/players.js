(function(){
	var players = GAME.namespace('GAME.players'); 

	players.id = ~~(Math.random()*1000000);
	players.all = [];
	players.allowMove = false;
	players.orientation = null;

})();