
var gui = require('nw.gui');
var win = gui.Window.get();

var postItWidth;
var postItHeight;


$( document ).ready(function() {
	
	adaptUi();
	
	$( window ).resize(function() {	adaptUi(); });
	
	$( "#closePostIt" ).click(function() { closePostIt(); });
	
	$( "#gitLink" ).click(function() { gui.Shell.openExternal("https://github.com/MakeMake00/easyNotes"); });
});

function getSizes(){
	postItWidth  = $( window ).width();
	postItHeight = $( window ).height();
}

function adaptUi(){
	getSizes();
	
	
	$( '.dragArea' ).css('width', postItWidth-10-30*3);
	
}

function closePostIt(){
	win.close();
}
