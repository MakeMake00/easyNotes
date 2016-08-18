
var gui = require('nw.gui');
var win = gui.Window.get();

var postItWidth;
var postItHeight;

var editMode = false;

$( document ).ready(function() {

	adaptUi();
	loadPostIt();
	
	$( window ).resize(function() {	adaptUi(); });
	$( ".postItContent" ).dblclick(function() { editModeToggle(); });
	
	$( "#closePostIt" ).click(function() { closePostIt(); });
	
	$( "#settingsPostIt" ).click(function() { $( ".postItSettings" ).slideToggle(); });
	
	$( "#infoPostIt" ).click(function() { openInfoWindow(); });
	
	
	$( ".arrow" ).click(function() {
		
		if( $( this ).hasClass('leftTop') ){ win.moveTo(5, 5); }
		if( $( this ).hasClass('rightTop') ){ win.moveTo(window.screen.availWidth-postItWidth-5, 5); }
		if( $( this ).hasClass('leftBottom') ){ win.moveTo(5, window.screen.availHeight-postItHeight-5); }
		if( $( this ).hasClass('rightBottom') ){ win.moveTo(window.screen.availWidth-postItWidth-5, window.screen.availHeight-postItHeight-5); }
		if( $( this ).hasClass('center') ){ win.moveTo(Math.round(window.screen.availWidth/2-postItWidth/2), Math.round(window.screen.availHeight/2-postItHeight/2)); }
		
	});
	
	win.on('focus', function() { $( ".actionButtons" ).show(); });
	win.on('blur', function() { $( ".actionButtons" ).hide(); });
});

	
function getSizes(){
	postItWidth  = $( window ).width();
	postItHeight = $( window ).height();
}

function adaptUi(){
	getSizes();
	
	
	$( '.dragArea' ).css('width', postItWidth-10-30*3);
	$( '.postItContent' ).css('height', postItHeight-50);
	$( '.postItSettings' ).css('height', postItHeight-30);
	
}

function editModeToggle(){
	
	if(editMode)
	{
		var memo = $( '.postItContent' ).find( 'textarea' ).val();
		$( '.postItContent' ).find( 'div' ).html(memo.replaceAll("\n", "<br />"));
		
		$( '.postItContent' ).find( 'div' ).show();
		$( '.postItContent' ).find( 'textarea' ).hide();
		
		savePostIt();
		
		editMode = false;
	}
	else
	{
		$( '.postItContent' ).find( 'div' ).hide();
		$( '.postItContent' ).find( 'textarea' ).show();
		editMode = true;
	}
}

function closePostIt(){
	localStorage.postItX = win.x;
	localStorage.postItY = win.y;
	
	
	localStorage.postItW = postItWidth;
	localStorage.postItH = postItHeight;
	
	win.close();
    gui.App.quit();
}

function savePostIt(){
	
	localStorage.postItText = $( '.postItContent' ).find( 'textarea' ).val().replaceAll("\n", "<br />");
}

function loadPostIt(){
	
	if(localStorage.postItText === undefined)
		localStorage.postItText = '';
	
	if( !(localStorage.postItX === undefined) || !(localStorage.postItY === undefined) )
	{
		win.moveTo(parseInt(localStorage.postItX), parseInt(localStorage.postItY));
		win.show();
	}
	
	if( !(localStorage.postItW === undefined) || !(localStorage.postItH === undefined) )
	{
		win.resizeTo(parseInt(localStorage.postItW), parseInt(localStorage.postItH));
		win.show();
	}
	
	$( '.postItContent' ).find( 'div' ).html( localStorage.postItText );
	$( '.postItContent' ).find( 'textarea' ).val( localStorage.postItText.replaceAll("<br />","\n") );
	
}

function openInfoWindow()
{
	var infoWindow = gui.Window.open ('app/info.html', {
		position: 'center',
		width: 330,
		height: 450,
		resizable:false,
		icon: "assets/pin.png",
		frame: false,
		focus: true
	});
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};