var ListenersList = new Object();

ListenersList.target = null;
ListenersList.text = null;
ListenersList.free = null;
ListenersList.text2 = null;
ListenersList.items = [];

ListenersList.firstServerEvent = true;
ListenersList.Event_set_control = null;
ListenersList.Event_minus = null;
ListenersList.Event_plus = null;

ListenersList.init = function() {
	if (document) {
		ListenersList.target = document.getElementById("listenersListId");
        ListenersList.text = document.getElementById("listenersTxt");
        ListenersList.free = document.getElementById("freeListId");
        ListenersList.text2 = document.getElementById("freeTxt");
	}
	if (ListenersList.target && ListenersList.text) {
        ListenersList.target.style.display = "block";
	}
    if (ListenersList.free && ListenersList.text2) {
        ListenersList.free.style.display = "block";
    }
    ListenersList.updateText();
}

ListenersList.updateText = function() {
    var an = ListenersList.analysItems();
    if (ListenersList.text) {
        if (ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) {
            if (an.listeners > 0) {
                if (ConnectModel.current_admin == -1) {
                    ListenersList.text.innerHTML = "List of listeners" + '<br>' + "you can transfer control to users:" + '\r\n';
                }
                else {
                    ListenersList.text.innerHTML = "List of listeners" + '<br>' + "click again to return control:" + '\r\n';
                }
            }
            else {
                ListenersList.text.innerHTML = "You are a broadcaster";
            }
        }
        else if (ConnectModel.myType == ConnectModel.TYPE_LISTENER) {
            if (ConnectModel.TMP_ADMIN) {
                ListenersList.text.innerHTML = "You are a broadcaster";
            }
            else {
                ListenersList.text.innerHTML = "You are a listener";
            }
        }
        else if (ConnectModel.myType == ConnectModel.TYPE_FREE) {
            ListenersList.text.innerHTML = "You are free user";
        }
    }
    if (ListenersList.text2) {
        if (ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) {
            if (an.free > 0) {
                ListenersList.text2.innerHTML = "List of free users:";
            }
            else {
                ListenersList.text2.innerHTML = "";
            }
        }
    }
}

ListenersList.analysItems = function() {
	var obj = new Object();
    obj.listeners = 0;
    obj.free = 0;
    for (var i = 0; i < ListenersList.items.length; i ++) {
        var currentItem = ListenersList.items[i];
        if (currentItem) {
        	if (currentItem.minus) {
                obj.listeners ++;
			}
			if (currentItem.plus) {
                obj.free ++;
			}
		}
    }
    return obj;
}

ListenersList.updateItems = function(data) {
	if (ConnectModel.myType == ConnectModel.TYPE_BROADCASTER) {
		if ((data != null) && (data != undefined)) {

			var newIDsObj = [];
			var badIDs = [];
			
			for (var i = 0; i < ListenersList.items.length; i ++) {
				var currentItem = ListenersList.items[i];
				currentItem.isPresent = false;
			}
			for (var m = 0; m < data.length; m ++) {
				if (data[m].id != ConnectModel.myID) {
					var found = false;
					for (var k = 0; k < ListenersList.items.length; k ++) {
						var currentIK = ListenersList.items[k];
						if ((currentIK.id == data[m].id) && (currentIK.type == data[m].type)) {
							currentIK.isPresent = true;
							found = true;
						}
					}
					if (!found) {
						newIDsObj.push(data[m]);
					}
				}
			}
			for (var p = 0; p < ListenersList.items.length; p ++) {
				var currentIP = ListenersList.items[p];
				if (!currentIP.isPresent) {
					var delObj = new Object();
                    delObj.id = currentIP.id;
                    delObj.type = currentIP.type;
					badIDs.push(delObj);
				}
			}
			
			ListenersList.removeItems(badIDs);
			ListenersList.createItems(newIDsObj);
			ListenersList.updateText();
			
			if (ListenersList.firstServerEvent) {
				ListenersList.firstServerEvent = false;
				ListenersList.resetAdmin();
			}
		}
	}
}

ListenersList.createItems = function(data) {
	if ((data != null) && (data != undefined) && (data.length > 0)) {
		for (var i = 0; i < data.length; i ++) {
			var currentObj = data[i];

            var obj = new Object();

            var btn = document.createElement("button");
            var t = document.createTextNode(currentObj.name);
            var div = document.createElement("div");
            div.style.display = "block";
            btn.appendChild(t);
            div.appendChild(btn);


			if (currentObj.type == ConnectModel.TYPE_LISTENER) {
                var minus = document.createElement("button");
                var t2 = document.createTextNode('-');
                minus.appendChild(t2);
                div.appendChild(minus);
                ListenersList.target.appendChild(div);
                minus.myId = currentObj.id;
                obj.minus = minus;
                minus.addEventListener('click', ListenersList.onMinusClick);
			}
			else if (currentObj.type == ConnectModel.TYPE_FREE) {
                var plus = document.createElement("button");
                var t3 = document.createTextNode('+');
                plus.appendChild(t3);
                div.appendChild(plus);
                ListenersList.free.appendChild(div);
                plus.myId = currentObj.id;
                obj.plus = plus;
                plus.addEventListener('click', ListenersList.onPlusClick);
			}

            obj.btn = btn;
            obj.div = div;
            obj.id = currentObj.id;
            obj.type = currentObj.type;
            obj.name = currentObj.name;
            ListenersList.items.push(obj);
            btn.myId = currentObj.id;
            btn.addEventListener('click', ListenersList.onBtnClick);

            if (ConnectModel.current_admin != -1) {
                btn.disabled = true;
            }
		}
	}
}

ListenersList.removeItems = function(data) {
	if ((data != null) && (data != undefined) && (data.length > 0)) {
		for (var i = 0; i < data.length; i ++) {
			var currentId = data[i].id;
            var currentType = data[i].type;
            var num = -1;
            for (var k = 0; k < ListenersList.items.length; k ++) {
                var currentIK = ListenersList.items[k];
                if ((currentIK.id == currentId) && (currentIK.type == currentType)) {
                    num = k;

                    if (ConnectModel.current_admin == currentId) {
                        ListenersList.resetAdmin();
                    }
                }
            }
            if (num >= 0) {
                if (ListenersList.items[num] && ListenersList.items[num].div) {
                	var isListener = false;
                    var isFree = false;
                    if (ListenersList.items[num].btn) {
                        ListenersList.items[num].btn.myId = null;
                        ListenersList.items[num].btn.removeEventListener('click', ListenersList.onBtnClick);
                        ListenersList.items[num].div.removeChild(ListenersList.items[num].btn);
                        delete ListenersList.items[num].btn;
                    }
                    if (ListenersList.items[num].minus) {
                        ListenersList.items[num].minus.myId = null;
                        ListenersList.items[num].minus.removeEventListener('click', ListenersList.onMinusClick);
                        ListenersList.items[num].div.removeChild(ListenersList.items[num].minus);
                        delete ListenersList.items[num].minus;
                        isListener = true;
                    }
                    if (ListenersList.items[num].plus) {
                        ListenersList.items[num].plus.myId = null;
                        ListenersList.items[num].plus.removeEventListener('click', ListenersList.onPlusClick);
                        ListenersList.items[num].div.removeChild(ListenersList.items[num].plus);
                        delete ListenersList.items[num].plus;
                        isFree = true;
                    }
                    if (isListener) {
                        ListenersList.target.removeChild(ListenersList.items[num].div);
                    }
                    if (isFree) {
                        ListenersList.free.removeChild(ListenersList.items[num].div);
                    }
                    delete ListenersList.items[num].div;
                }
                ListenersList.items[num] = null;
                ListenersList.items.splice(num, 1);
            }
		}
	}
}

ListenersList.disableBtns = function(id) {
	for (var k = 0; k < ListenersList.items.length; k ++) {
		var currentIK = ListenersList.items[k];
		if (currentIK.id != id) {
			var btn = currentIK.btn;
			if (btn) {
				btn.disabled = true;
			}
            var minus2 = currentIK.minus;
            if (minus2) {
                minus2.disabled = true;
            }
            var plus2 = currentIK.plus;
            if (plus2) {
                plus2.disabled = true;
            }
		}
		else {
            var minus = currentIK.minus;
            if (minus) {
                minus.style.display = "none";
            }
            var plus = currentIK.plus;
            if (plus) {
                plus.style.display = "none";
            }
		}
	}
}

ListenersList.enableBtns = function() {
	for (var k = 0; k < ListenersList.items.length; k ++) {
		var currentIK = ListenersList.items[k];
		var btn = currentIK.btn;
        var minus = currentIK.minus;
        var plus = currentIK.plus;
		if (btn) {
			btn.disabled = false;
		}
        if (minus) {
            minus.disabled = false;
            minus.style.display = "inline";
        }
        if (plus) {
            plus.disabled = false;
            plus.style.display = "inline";
        }
	}
}

ListenersList.onBtnClick = function(event) {
	if (event && event.target) {
		var btn = event.target;
		if (ListenersList.Event_set_control && btn.myId) {
			if (ConnectModel.current_admin == -1) {
				ListenersList.setAdmin(btn.myId);
			}
			else if (ConnectModel.current_admin == btn.myId) {
				ListenersList.resetAdmin();
			}
		}
	}
}

ListenersList.onMinusClick = function(event) {
    if (event && event.target) {
        var minus = event.target;
        if (ListenersList.Event_minus && minus.myId) {
            ListenersList.toFree(minus.myId);
        }
    }
}

ListenersList.onPlusClick = function(event) {
    if (event && event.target) {
        var plus = event.target;
        if (ListenersList.Event_plus && plus.myId) {
            ListenersList.fromFree(plus.myId);
        }
    }
}

ListenersList.setAdmin = function(id) {
	ConnectModel.current_admin = id;
	ListenersList.Event_set_control(id);
	ListenersList.disableBtns(id);
	ListenersList.updateText();
}

ListenersList.resetAdmin = function() {
	ConnectModel.current_admin = -1;
	ListenersList.Event_set_control(-1);
	ListenersList.enableBtns();
	ListenersList.updateText();
}

ListenersList.toFree = function(id) {
    ListenersList.Event_minus(id);
    ListenersList.updateText();
}

ListenersList.fromFree = function(id) {
    ListenersList.Event_plus(id);
    ListenersList.updateText();
}