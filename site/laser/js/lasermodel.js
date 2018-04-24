var clickToHide = document.getElementsByClassName('accordion');
var elementsInShow = true;

for(var i = 0; i <clickToHide.length; i++){
    clickToHide[i].addEventListener('click', function(){
        /*if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
            ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
            return;
        }
        var dd = {action: 'show_hide_case', sub: 1};
        if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
            ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
            ConnectModel.setEvent(dd, ConnectModel.EVENT_DYNAMIC, ConnectModel.EVENT_to_DOCUMENT, null, null);
        }
        console.log('for 2');
        showHideCase(dd);*/
        if (elementsInShow) {
            clickToHide[0].firstChild.data = 'Show Laser Case';
            elementsInShow = false;
        }
        else {
            clickToHide[0].firstChild.data = 'Hide Laser Case';
            elementsInShow = true;
        }
    });
}

/*
function onShowHideCase(event) {
    if (event) {
        console.log('onShowHideCase 1');
        showHideCase(event.data);
    }
}

function showHideCase(data) {
    console.log('showHideCase 0000');
    if (data && data.action && (data.action == 'show_hide_case')) {
        if (data.sub == 1) {
            if (clickToHide[0]) {
                if (elementsInShow) {
                    clickToHide[0].firstChild.data = 'Show Laser Case';
                    elementsInShow = false;
                }
                else {
                    clickToHide[0].firstChild.data = 'Hide Laser Case';
                    elementsInShow = true;
                }
            }
        }
    }
}
*/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
var renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setClearColor( 0xCCCCCC );
camera.position.z = 20;
camera.position.y = 70;
camera.position.x = 0;
renderer.setSize(window.innerWidth-10, window.innerHeight-10);
document.body.appendChild(renderer.domElement);
renderer.domElement.id = "context"
scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));
var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(1, 1, 1);
scene.add(light);

var lasermodelClear = new THREE.MTLLoader();

lasermodelClear.load('models/plsClear.mtl', function(material){
    material.preload();
    var loader = new THREE.OBJLoader();
    loader.setMaterials(material);
    loader.load('models/plsClear.obj', function(object){
        scene.add(object);
        for (var i = 0; i <clickToHide.length; i++){
            clickToHide[i].insideNum = i;
            clickToHide[i].addEventListener('click', function(){
                if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                    ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                    return;
                }
                else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                    ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                    event.random = Math.random();
                    ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_CLASS_NAME_ELEMENT, "accordion", event.target.insideNum);
                }
                if (object.visible) {
                    object.visible = false;
                }
                else {
                    object.visible = true;
                }
            });
        }
    });
});

var lasermodelWire = new THREE.MTLLoader();

lasermodelWire.load('models/wireframe.mtl', function(material){
    material.preload();
    var loader = new THREE.OBJLoader();
    loader.setMaterials(material);
    loader.load('models/wireframe.obj', function(object){
        scene.add(object);
        object.visible = false;
        for( var i = 0; i <clickToHide.length; i++){
            clickToHide[i].insideNum = i;
            clickToHide[i].addEventListener('click', function(){
                if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                    ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                    return;
                }
                else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                    ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                    event.random = Math.random();
                    ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_CLASS_NAME_ELEMENT, "accordion", event.target.insideNum);
                }
                if (object.visible) {
                    object.visible = false;
                }
                else {
                    object.visible = true;
                }
            });
        }
    });
});

var lasermodelSolid = new THREE.MTLLoader();

lasermodelSolid.load('models/plsSolid.mtl', function(material){
    material.preload();
    var loader = new THREE.OBJLoader();
    loader.setMaterials(material);
    loader.load('models/plsSolid.obj', function(object){
        scene.add(object);
    });
});

var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
        ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
        controls.update();
    }
};

///scene controls for mouse
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set( 0,30,0 );

var _connectController = new ConnectController();
_connectController.init();

if (_connectController) {
    _connectController.setCamera(camera); // init camera is first
    _connectController.setControls(controls); // init controls is second
    controls.addEventListener( 'change', _connectController.onCameraPositionChange); // on change camera position

    if (ConnectModel.myType == ConnectModel.TYPE_LISTENER) {
        controls.dispose(); // destruct cantrols
        controls.update();
    }
}

render();
//end of controls



///below is 2d canvas
//assign canvas to var
var canvas = document.getElementById('artboard');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//create drawing elements in canvas i.e. line color, width
canvas.style.display = 'none';
var ctx = canvas.getContext('2d');
ctx.strokeStyle = '#ff6600';
ctx.lineWidth = 2;
// var for mouse down or up
var isMousedown = false;
//empty var for point location
var lastPoint = {
    x: null,
    y: null
};
//create eventlistener for mousdown and tracks the coordinates of this event
canvas.addEventListener('mousedown', function(event) {
    isMousedown = true;
    lastPoint.x = event.x;
    lastPoint.y = event.y;
});
//event listener for mouse up
canvas.addEventListener('mouseup', function() {
    isMousedown = false;
});
//event listener for mouse move and drawing on the move
canvas.addEventListener('mousemove', function(event) {
    //if mousdown is true
    if (isMousedown) {
        if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
            ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
            return;
        }
        var dd = {
        	action: 'paint',
			sub: 1,
			x: event.x,
			y: event.y,
			lastPointX:
			lastPoint.x,
			lastPointY: lastPoint.y,
			originalW: canvas.width,
            originalH: canvas.height};
        if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
            ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
            ConnectModel.setEvent(dd, ConnectModel.EVENT_DYNAMIC, ConnectModel.EVENT_to_DOCUMENT, null, null);
        }
        myPaint(dd);
        lastPoint.x = event.x;
        lastPoint.y = event.y;
    }
});

var draw = document.getElementById('draw2d');
var nav = document.getElementById('view3d');

draw.addEventListener('click', function(){

    if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
        ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
        return;
    }
    var dd = {action: 'paint', sub: 2};
    if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
        ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
        ConnectModel.setEvent(dd, ConnectModel.EVENT_DYNAMIC, ConnectModel.EVENT_to_DOCUMENT, null, null);
    }
    myPaint(dd);
});

nav.addEventListener('click', function(){
    if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
        ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
        return;
    }
    var dd = {action: 'paint', sub: 3};
    if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
        ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
        ConnectModel.setEvent(dd, ConnectModel.EVENT_DYNAMIC, ConnectModel.EVENT_to_DOCUMENT, null, null);
    }
    myPaint(dd);
});

function onTryPaint(event) {
    if (event) {
        myPaint(event.data);
    }
}

function myPaint(data) {
    if (data && data.action && (data.action == 'paint')) {
        if (data.sub == 1) {
            //console.log(data.x, data.y);
            //use those coordinate to draw a line

			var offsetX = (canvas.width - data.originalW)/2;
            var offsetY = (canvas.height - data.originalH)/2;

            canvas.style.display = 'block';
            ctx.beginPath();
            ctx.moveTo(data.lastPointX + offsetX, data.lastPointY + offsetY);
            ctx.lineTo(data.x  + offsetX, data.y  + offsetY);
            ctx.closePath();
            ctx.stroke();
            //create and place coordinate of each 'stroke'
        }
        else if (data.sub == 2) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            render();
            canvas.style.display = 'block';
        }
        else if (data.sub == 3) {
            canvas.style.display = 'none';
            //console.log('hide');
        }
    }
}

document.addEventListener(ConnectModel.EVENT_DYNAMIC, onTryPaint);
//document.addEventListener(ConnectModel.EVENT_DYNAMIC, onShowHideCase);