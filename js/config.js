(function(){
    GAME.namespace('GAME.config'); 

    GAME.config = {
            CELL_SIZE           :   60,
            CELLS_HORIZONTAL    :   8,
            CELLS_VERTICAL      :   8,
            IS_CONNECTED        : false,
            loaderOff: function(){
                document.getElementById('loader').style.display = 'none';
            }
    };
  
})();