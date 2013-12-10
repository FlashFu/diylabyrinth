// drag and drop variables
var _startX = 0, // private var startX:Number
    _startY = 0,
    _offsetX = 0,
    _offsetY = 0,
    _dragElement,
    _oldZIndex = 0;

var mouseDownHandler = function(e){
	
	if(e.target.className == "drag"){
		_startX = e.clientX;
		_startY = e.clientY;

		_offsetX = extractNumber(e.target.style.left);
		_offsetY = extractNumber(e.target.style.top);

		_oldZIndex = e.target.style.zIndex;
		e.target.style.zIndex = 1000;

		_dragElement = e.target;

		document.addEventListener("mousemove", mouseMoveHandler, false);

		document.body.focus();
		e.preventDefault();
	}
};

var mouseMoveHandler = function(e){
	_dragElement.style.left = (_offsetX + e.clientX - _startX) + "px";
	_dragElement.style.top = (_offsetY + e.clientY - _startY) + "px";

	var evt = new Event("move");
	evt.left = _dragElement.style.left;
	evt.top = _dragElement.style.top;
	_dragElement.dispatchEvent(evt);
};


var mouseUpHandler = function(e){
	console.log(e);
	document.removeEventListener("mousemove", mouseMoveHandler);
};


var initDragDrop = function(){

	document.addEventListener("mousedown", mouseDownHandler, false);
	document.addEventListener("mouseup", mouseUpHandler, false);
};

function extractNumber(value){
	var n = parseInt(value);
	return n == null || isNaN(n) ? 0 : n;
};

initDragDrop();