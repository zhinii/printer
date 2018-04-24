function ConnectController() {
	var _this = this;
	
	_this.camera = null;
	_this.controls = null;
	_this.lookAtVector3 = null;
	_this.lastEventMessage = null;
	
	_this.connector = null;
	_this.lastMessages = [null, null, null, null, null, null, null, null, null, null];
	
	_this.init = function () {
		_this.destructor();
		
		ConnectModel.myID = Math.random();
		_this.getMyType();
		_this.getMyName();
		ConnectModel.connectController = _this;

        _this.newConnect();
		
		ListenersList.Event_set_control = _this.setNewAdmin;
        ListenersList.Event_minus = _this.removeUserToFree;
        ListenersList.Event_plus = _this.addFreeUser;
		ListenersList.init();
	}
	
	//--------------------------------------------------------------
	// init camera and controls
	
	_this.setCamera = function (camera) {
		if (camera) {
			_this.camera = camera;
		}
	}
	
	_this.setControls = function (controls) {
		if (controls) {
			_this.controls = controls;
		}
	}
	
	//--------------------------------------------------------------
	// events for new listeners from broadcaster (current menu status and camera position)
	
	_this.updateLastMessages = function (mes) {
		var clone = JSON.parse(JSON.stringify(mes));
		if (clone.event == "lookAt") {
			_this.lastMessages[0] = null;
			_this.arrayMove(_this.lastMessages, 1, 0);
			_this.lastMessages[1] = clone;
		}
		else if (clone.event == "simpleEvent") {
			_this.lastMessages[2] = null;
			_this.arrayMove(_this.lastMessages, 3, 2);
			_this.arrayMove(_this.lastMessages, 4, 3);
			_this.arrayMove(_this.lastMessages, 5, 4);
			_this.arrayMove(_this.lastMessages, 6, 5);
			_this.arrayMove(_this.lastMessages, 7, 6);
			_this.arrayMove(_this.lastMessages, 8, 7);
			_this.arrayMove(_this.lastMessages, 9, 8);
			_this.lastMessages[9] = clone;
		}
	}
	
	_this.arrayMove = function (arr, fromIndex, toIndex) {
		var element = arr[fromIndex];
		arr.splice(fromIndex, 1);
		arr.splice(toIndex, 0, element);
	}
	
	_this.sendOldDatasToNewListener = function (toId) {
		if (_this.lastMessages) {
			for (var i = 0; i < _this.lastMessages.length; i++) {
				var mes = _this.lastMessages[i];
				if (mes) {
					mes.forId = toId;
					_this.sendNewMessage(mes);
				}
			}
		}
	}
	
	//--------------------------------------------------------------
	// set event - new admin to listener (from original broadcaster)
	
	_this.setNewAdmin = function (id) {
		if (ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) {
			if ((id != null) && (id != undefined)) {
				if (_this.controls) {
					if (id == -1) {
						_this.controls.addControl();
					}
					else {
						_this.controls.dispose();
					}
				}
				
				var obj = new Object();
				obj.myID = ConnectModel.myID;
				obj.myType = ConnectModel.myType;
				obj.newAdminId = id;
				
				obj.event = "changeAdmin";
				
				_this.sendNewMessage(obj);
			}
		}
	}

    //--------------------------------------------------------------
    // set event - user from listener to free (from original broadcaster)

    _this.removeUserToFree = function (id) {
        if (ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) {
            if ((id != null) && (id != undefined)) {
                var obj = new Object();
                obj.myID = ConnectModel.myID;
                obj.myType = ConnectModel.myType;
                obj.forId = id;

                obj.event = "toFree";

                _this.sendNewMessage(obj);
            }
        }
    }

    //--------------------------------------------------------------
    // set event - new user to listener from free (from original broadcaster)

    _this.addFreeUser = function (id) {
        if (ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) {
            if ((id != null) && (id != undefined)) {
                var obj = new Object();
                obj.myID = ConnectModel.myID;
                obj.myType = ConnectModel.myType;
                obj.forId = id;

                obj.event = "fromFree";

                _this.sendNewMessage(obj);
            }
        }
    }
	
	//--------------------------------------------------------------
	// set munu events (mouse clicks)
	
	_this.setEvent = function (originalEvent, eventType, targetType, targetName, targetInsideId) {
		if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
			((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {
				 
			var obj = new Object();
            obj = JSON.parse(JSON.stringify(originalEvent));
			obj.eventType = eventType;
			obj.targetType = targetType;
			obj.targetName = targetName;
			obj.targetInsideId = targetInsideId;

			if (originalEvent && originalEvent.target) {
				obj.targetId = originalEvent.target.id;
			}
			
			obj.event = "simpleEvent";
			
			if (_this.lastEventMessage) {
				if (JSON.stringify(_this.lastEventMessage) == JSON.stringify(obj)) {
				}
				else {
					_this.lastEventMessage = obj;
					_this.sendNewMessage(_this.lastEventMessage);
					_this.updateLastMessages(obj);
				}
			}
			else {
				_this.lastEventMessage = obj;
				_this.sendNewMessage(_this.lastEventMessage);
				_this.updateLastMessages(obj);
			}
		}
	}
	
	//--------------------------------------------------------------
	// set new camera position
	
	_this.onCameraPositionChange = function (event) {
		if (_this.camera && _this.controls && _this.controls.target) {
			if (((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin == -1)) ||
				((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (ConnectModel.TMP_ADMIN))) {	
				
				var obj = new Object();
				obj.x = _this.camera.position.x;
				obj.y = _this.camera.position.y;
				obj.z = _this.camera.position.z;
				
				obj.controlsX = _this.controls.target.x;
				obj.controlsY = _this.controls.target.y;
				obj.controlsZ = _this.controls.target.z;
				
				obj.event = "lookAt";
				
				if (_this.lookAtVector3) {
					if (JSON.stringify(_this.lookAtVector3) == JSON.stringify(obj)) {
					}
					else {
						_this.lookAtVector3 = obj;
						_this.sendNewMessage(_this.lookAtVector3);
						_this.updateLastMessages(obj);
					}
				}
				else {
					_this.lookAtVector3 = obj;
					_this.sendNewMessage(_this.lookAtVector3);
					_this.updateLastMessages(obj);
				}
			}
		}
	}
	
	//--------------------------------------------------------------
	// set event after connect
	
	_this.setNewUser = function () {
		var obj = new Object();
		obj.myID = ConnectModel.myID;
		obj.myType = ConnectModel.myType;
		
		obj.event = "newUser";
		
		_this.sendNewMessage(obj);
		_this.sendNewUserMessage();
	}
	
	//--------------------------------------------------------------
	// set event to remove new broadcaster from origanal broadcaster
	
	_this.deleteNewBroadcaster = function () {
		var obj = new Object();
		obj.myID = ConnectModel.myID;
		obj.myType = ConnectModel.myType;
		
		obj.event = "deleteNewBroadcaster";
		
		_this.sendNewMessage(obj);
	}
	
	//--------------------------------------------------------------
	// read datas from URL
	
	_this.getMyType = function () {
		var type = _this.getParameterByName("type");
		if (type) {
			if (type.toLowerCase() == "broadcaster") {
				ConnectModel.myType = ConnectModel.TYPE_BROADCASTER;
			}
			else if (type.toLowerCase() == "listener") {
				ConnectModel.myType = ConnectModel.TYPE_LISTENER;
			}
            else {
                ConnectModel.myType = ConnectModel.TYPE_FREE;
            }
		}
        else {
            ConnectModel.myType = ConnectModel.TYPE_FREE;
        }
	}
	
	_this.getMyName = function () {
		var myName = _this.getParameterByName("name");
		if (!myName) {
			myName = ConnectModel.myID.toString();
		}
		ConnectModel.myName = myName;
	}
	
	_this.getParameterByName = function getParameterByName(name, url) {
		if ((!url) && window && window.location) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) {
			return null;
		}
		if (!results[2]) {
			return '';
		}
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	
	//--------------------------------------------------------------
	// destructor
	
	_this.destructor = function () {
		if (_this.connector) {
			_this.connector.destructor();
			_this.connector = null;
		}
		
		_this.lastMessages = [null, null, null, null, null, null, null, null, null, null];
		
		ConnectModel.connectController = null;
		ConnectModel.connected = false;
		ConnectModel.myID = -1;
		ConnectModel.myType = "";
		
		ListenersList.Event_set_control = null;
        ListenersList.Event_minus = null;
        ListenersList.Event_plus = null;
	
		_this.camera = null;
		_this.controls = null;
		_this.lookAtVector3 = null;
		_this.lastEventMessage = null;
	}

    _this.newConnect = function () {
        _this.connector = new Connector();
        _this.connector.Event_connected = _this.onConnect;
        _this.connector.Event_disconnected = _this.onDisconnect;
        _this.connector.Event_data_mes = _this.onConnectorDataMes;
        _this.connector.Event_data_users_list = _this.onConnectorDataUsersList;
        _this.connector.init();
    }
	
	//--------------------------------------------------------------
	// on connect
	
	_this.onConnect = function () {
		ConnectModel.connected = true;
		_this.setNewUser();
	}
	
	//--------------------------------------------------------------
	// on disconnect
	
	_this.onDisconnect = function () {
		_this.destructor();
		var str = "socket.io closed. \nRestore socket.io and reload the page.";
		alert(str);
	}
	
	//--------------------------------------------------------------
	// new data from connector
	
	_this.onConnectorDataUsersList = function (data) {
		var obj = null;
		try {
			obj = JSON.parse(data);
		}
		catch (err) {
		}
		
		if (obj) {
			ListenersList.updateItems(obj);
		}
	}
	
	_this.onConnectorDataMes = function (data) {
		var obj = null;
		try {
			obj = JSON.parse(data);
		}
		catch (err) {
		}
		
		if (obj) {
			_this.parseConnectorData(obj);
		}
	}
	
	_this.parseConnectorData = function (obj) {
		if (obj.event == "newUser") {
			if (obj.myID != ConnectModel.myID) {
				if (ConnectModel.myType == ConnectModel.TYPE_LISTENER) {
					if (obj.myType == ConnectModel.TYPE_LISTENER) {
						// else one listener
						if (ConnectModel.TMP_ADMIN) {
							// listener for me, send last status to new listener
							_this.sendOldDatasToNewListener(obj.myID);
						}
					}
					else if (obj.myType == ConnectModel.TYPE_BROADCASTER) {
						// broadcaster coming
					}
				}
				else if (ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) {
					if (obj.myType == ConnectModel.TYPE_LISTENER) {
						if (ConnectModel.current_admin == -1) {
							// listener for me, send last status to new listener
							_this.sendOldDatasToNewListener(obj.myID);
						}
					}
					else if (obj.myType == ConnectModel.TYPE_BROADCASTER) {
						// else one  broadcaster - delete it
						_this.deleteNewBroadcaster();
					}
				}
			}
		}
		else if ((obj.id != ConnectModel.myID) && (ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (obj.event == "deleteNewBroadcaster")) {
			_this.destructor();
			var str = "Other broadcaster in the network. \nPlease turn off the other broadcasters and reload the page. \nNow you will be disconnected.";
			alert(str);
		}
		else if ((obj.id != ConnectModel.myID)) {
			if (((ConnectModel.myType == ConnectModel.TYPE_LISTENER) && (!ConnectModel.TMP_ADMIN)) ||
				((ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) && (ConnectModel.current_admin != -1))) {
			
				if ((obj.forId != undefined) && (obj.forId != null)) {
					if (obj.forId != ConnectModel.myID) {
						return;
					}
				}
				if ((obj.event == "lookAt") && _this.camera) {
					var vec = new THREE.Vector3(obj.controlsX, obj.controlsY, obj.controlsZ);
					_this.camera.position.set(obj.x, obj.y, obj.z);
					_this.camera.lookAt(vec);
					
					if (_this.controls) {
						_this.controls.target = vec;
						_this.controls.update();
					}
				}
				else if (obj.event == "simpleEvent") {
					_this.createNewEvent(obj);
				}
			}
			if (ConnectModel.myType == ConnectModel.TYPE_LISTENER) {
				if ((obj.forId != undefined) && (obj.forId != null)) {
					if (obj.forId != ConnectModel.myID) {
						return;
					}
				}
				
				if (obj.event == "changeAdmin") {
					if (_this.controls) {
						if (ConnectModel.TMP_ADMIN && (obj.newAdminId == -1)) {
							ConnectModel.TMP_ADMIN = false;
							_this.controls.dispose();
						}
						else if (obj.newAdminId == ConnectModel.myID) {
							ConnectModel.TMP_ADMIN = true;
							_this.controls.addControl();
						}
						ListenersList.updateText();
					}
				}

                if (obj.event == "toFree") {
                    if (_this.controls) {
                        _this.controls.addControl();
                    }
                    ConnectModel.myType = ConnectModel.TYPE_FREE;
                    ListenersList.updateText();
                    _this.userUpdateType();
                }
			}
            if (ConnectModel.myType == ConnectModel.TYPE_FREE) {
                if ((obj.forId != undefined) && (obj.forId != null)) {
                    if (obj.forId != ConnectModel.myID) {
                        return;
                    }
                }

                if (obj.event == "fromFree") {
                    if (_this.controls) {
                        _this.controls.dispose();
                    }
                    ConnectModel.myType = ConnectModel.TYPE_LISTENER;
                    ListenersList.updateText();
                    _this.userUpdateType();
                }
            }
		}
	}
	
	//--------------------------------------------------------------
	// create new event for menu (simulate mouse click)
	
	_this.createNewEvent = function (obj) {
		if (document && obj && obj.targetType && obj.eventType) {
			var element = null;
			if (obj.targetName && (obj.targetType == ConnectModel.EVENT_to_ID_ELEMENT)) {
				element = document.getElementById(obj.targetName);
			}
			else if (obj.targetName && (obj.targetType == ConnectModel.EVENT_to_CLASS_NAME_ELEMENT)) {
				element = document.getElementsByClassName(obj.targetName);
			}
            else if (obj.targetType == ConnectModel.EVENT_to_DOCUMENT) {
            }

			if (element && (obj.targetInsideId != undefined) && (obj.targetInsideId != null)) {
				if (element[obj.targetInsideId]) {
					element = element[obj.targetInsideId];
				}
			}
			//_this.eventFire(obj, element, ConnectModel.EVENT_MOUSE_CLICK, obj.targetId);

            _this.eventFire(obj, element, obj.eventType, obj.targetId);
		}
	}
	
	_this.eventFire = function (obj, el, etype, targetId) {
		if (el && document) {
			if (el.fireEvent) {
				el.fireEvent('on' + etype);
			}
			else {
				var evObj = document.createEvent('Events');
				evObj.fromServer = true;
				evObj.initEvent(etype, true, false);
				evObj.targetId = targetId;
				el.dispatchEvent(evObj);
			}
		}
		else if (document && obj && (obj.eventType == ConnectModel.EVENT_DYNAMIC)) {
            var ev = new Event(ConnectModel.EVENT_DYNAMIC);
            ev.data = obj;
            document.dispatchEvent(ev);
		}
	}
	
	//--------------------------------------------------------------
	// send data to connector
	
	_this.sendNewMessage = function (data) {
		if (data && _this.connector) {
			if (typeof data === 'object') {
				var clone = JSON.parse(JSON.stringify(data));
				clone.id = ConnectModel.myID;
				clone.type = ConnectModel.myType;
				
				_this.connector.sendMessage('chat message', JSON.stringify(clone));
			}
		}
	}
	
	_this.sendNewUserMessage = function () {
		var obj = new Object();
		obj.id = ConnectModel.myID;
		obj.type = ConnectModel.myType;
		obj.name = ConnectModel.myName;
		_this.connector.sendMessage('new_player', JSON.stringify(obj));
	}

    _this.userUpdateType = function () {
        var obj = new Object();
        obj.id = ConnectModel.myID;
        obj.type = ConnectModel.myType;
        obj.name = ConnectModel.myName;
        _this.connector.sendMessage('user_change_type', JSON.stringify(obj));

        var obj2 = new Object();
        obj2.myID = ConnectModel.myID;
        obj2.myType = ConnectModel.myType;
        obj2.event = "newUser";
        _this.sendNewMessage(obj2);
    }
}	