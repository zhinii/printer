
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});

var menuClick = document.getElementById('menu');
var objloader = new THREE.OBJLoader();
var stlloader = new THREE.STLLoader();

//console.log(menuClick);

//zbelt

objloader.load('models/zbelt.obj', function(object){
    scene.add(object);
    stuff.push(object);

    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }
            /*
             if (event.target.id === 'zbelt'){
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object

             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected

             }
             });
             }
             */
        });
    }
});



//zmotor

objloader.load('models/zmotor.obj', function(object){
    scene.add(object);
    stuff.push(object);
    motorZ.push(object);

    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }
            /*
             if (event.target.id === 'zmotor'){
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object

             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected

             }
             });
             }
             */
        });
    }
});



//zscrew

objloader.load('models/zscrew.obj', function(object){      //change location
    scene.add(object);
    stuff.push(object);

    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }
            /*
             if (event.target.id === 'zscrews'){                                     //change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object

             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected

             }
             });
             }
             */
        });
    }
});




//xmotor

objloader.load('models/xmotor.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);

    motorX.push(object);

    if (menuClick) {
        menuClick.addEventListener('click', function(){
            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }
            /*
             if (event.target.id === 'xmotor'){                                      //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//xbelt

objloader.load('models/xbelt.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'xbelt'){				  //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});

//xrail

objloader.load('models/xrail.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'xrails'){				 //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//ymotor

objloader.load('models/ymotor.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'ymotor'){				   //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//yrails

objloader.load('models/yrail.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);

    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }
            /*
             if (event.target.id === 'yrails'){				//********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//ybelt

objloader.load('models/ybelt.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'ybelt'){				//********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});



//rulers

objloader.load('models/rulers.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'bedrulers'){ 				   //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//platform

objloader.load('models/platform.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'platform'){				  //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//honeycomb

objloader.load('models/honeycomb.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'bedhoneycomb'){ 			//********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//mirror

objloader.load('models/mirror.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);

    mirrorLeft.push(object);
    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'xmirror'){				  //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//lens

objloader.load('models/lensmirror.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    mirrorLens.push(object);


    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'lens'){				 //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//carriage

objloader.load('models/carriage.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }

            /*
             if (event.target.id === 'carriage'){				  //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


//controlpad

objloader.load('models/controlpad.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);

    if (menuClick) {
        menuClick.addEventListener('click', function(){

            if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
                ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
                return;
            }
            else if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
                ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
                ConnectModel.setEvent(event, ConnectModel.EVENT_MOUSE_CLICK, ConnectModel.EVENT_to_ID_ELEMENT, event.target.id, null);
            }
            /*
             if (event.target.id === 'controlpad'){					 //********change id of clicked object
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xff0000);   //change color of selected object
             child.material.opacity = 1;
             child.material.transparent = true;
             }
             });
             }
             else{
             object.traverse(function(child) {
             if (child.material) {
             child.material.color.setHex(0xffffff);  //change color if not selected
             child.material.opacity = .7;
             child.material.transparent = true;
             }
             });
             }
             */
        });
    }
});


var baseColor = 0xff0000;
var intersectColor = 0x00D66B;
var sceneWidth = window.innerWidth-10;
var sceneHeight = window.innerHeight-10;

var motorZ = [];
var motorX = [];
var mirrorLens = [];
var mirrorLeft = [];
var stuff = [];
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersected;

//below is raycaster for mouse move intersections, second raycaster function is needed for click events
function onDocumentMouseMove(event) { // This is a function to run when we click; we get information about the event through the `event` parameter
    if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN) && (ConnectModel.badEvent(event))) ||
        ((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1) && (ConnectModel.badEvent(event)))) {
        return;
    }

    // Set the x and y coordinates of our mouse vector to our pointer position, scaling for the width and height of our renderer (400 and 300, respectively)
    var offsetX = renderer.domElement.offsetLeft*(2/sceneWidth);
    var offsetY = renderer.domElement.offsetTop*(2/sceneHeight);
    mouse.x = (event.clientX / sceneWidth) * 2 - 1 - offsetX;
    mouse.y = -(event.clientY / sceneHeight) * 2 + 1 +offsetY;

    // Tell our raycaster to cast from our mouse
    raycaster.setFromCamera(mouse, camera);

    var dd = {action: 'green_select', sub: 1, raycaster: raycaster};
    if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
        ((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
        ConnectModel.setEvent(dd, ConnectModel.EVENT_DYNAMIC, ConnectModel.EVENT_to_DOCUMENT, null, null);
    }

    doSelect3DElement(dd);
};

function onTrySelect3DElement(event) {
    if (event) {
        doSelect3DElement(event.data);
    }
}

function doSelect3DElement(data) {
    if (data && data.action && (data.action == 'green_select')) {
        if (data.sub == 1) {
            if (data.raycaster && data.raycaster.ray) {
                var origin = new THREE.Vector3(data.raycaster.ray.origin.x, data.raycaster.ray.origin.y, data.raycaster.ray.origin.z);
                var direction = new THREE.Vector3(data.raycaster.ray.direction.x, data.raycaster.ray.direction.y, data.raycaster.ray.direction.z);
                var near = data.raycaster.near;
                var far = data.raycaster.far;
                raycaster = new THREE.Raycaster(origin, direction, near, far);

                // Tell our raycaster to detect the intersection with that array of objects
                var intersections = raycaster.intersectObjects(stuff, true);
                if (intersections.length > 0) {
                    // If we find any intersections
                    // Do stuff
                    if (intersected != intersections[0].object) {
                        if (intersected) {
                            intersected.material.color.setHex(intersected.currentHex);
                        }
                        intersected = intersections[0].object;
                        intersected.currentHex = intersected.material.color.getHex();
                        intersected.material.color.setHex(intersectColor);
                    }
                    document.body.style.cursor = 'pointer';
                }
                else if (intersected) {
                    intersected.material.color.setHex(intersected.currentHex);
                    intersected = null;
                    document.body.style.cursor = 'auto';
                }
            }
        }
    }
}


//attaches event listender to the renderer, which is a dom element. so when a mouse moves it is listening and executing our function for raycasting
document.addEventListener(ConnectModel.EVENT_DYNAMIC, onTrySelect3DElement, false);
renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);


// //raycasting function for click events
//     function onDocumentClick(event) {
//                 var offsetX = renderer.domElement.offsetLeft * (2 / sceneWidth);
//                 var offsetY = renderer.domElement.offsetTop * (2 / sceneHeight);
//                 mouse.x = (event.clientX / sceneWidth) * 2 - 1 - offsetX;
//                 mouse.y = -(event.clientY / sceneHeight) * 2 + 1 + offsetY;

//                 // Tell our raycaster to cast from our mouse
//                 raycaster.setFromCamera(mouse, camera);

//                 var intersections = raycaster.intersectObjects(motorZ, true);//change out STUFF with array of object
//                 if (intersections.length > 0){
//                   document.getElementById('motorZ').style.visibility = 'visible';
//                 }
//                 else{
//                      document.getElementById('motorZ').style.visibility = 'hidden';
//                 }

//                  var intersections1 = raycaster.intersectObjects(motorX, true);//change out STUFF with array of object
//                 if (intersections1.length > 0){
//                   document.getElementById('motorX').style.visibility = 'visible';
//                 }
//                 else{
//                      document.getElementById('motorX').style.visibility = 'hidden';
//                 }

//                    var intersections2 = raycaster.intersectObjects(mirrorLeft, true);//change out STUFF with array of object
//                 if (intersections2.length > 0){
//                   document.getElementById('mirrorLeft').style.visibility = 'visible';
//                 }
//                 else{
//                      document.getElementById('mirrorLeft').style.visibility = 'hidden';
//                 }

//                    var intersections3 = raycaster.intersectObjects(mirrorLens, true);//change out STUFF with array of object
//                 if (intersections3.length > 0){
//                   document.getElementById('mirrorLens').style.visibility = 'visible';
//                 }
//                 else{
//                      document.getElementById('mirrorLens').style.visibility = 'hidden';
//                 }


//              };

//              // And then actually attach our onDocumentClick function as an event handler to when the canvas hears a `click`
//              renderer.domElement.addEventListener('click', onDocumentClick, false);

