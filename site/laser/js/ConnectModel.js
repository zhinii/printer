var ConnectModel = new Object();

//--------------------------------------

ConnectModel.connected = false;
ConnectModel.myID = -1;
ConnectModel.myType = "";
ConnectModel.TMP_ADMIN = false;
ConnectModel.current_admin = -1;
ConnectModel.myName = "";
ConnectModel.connectController = null;

ConnectModel.TYPE_BROADCASTER = "TYPE_BROADCASTER";
ConnectModel.TYPE_LISTENER = "TYPE_LISTENER";
ConnectModel.TYPE_FREE = "TYPE_FREE";

//--------------------------------------

ConnectModel.EVENT_MOUSE_CLICK = "click";
ConnectModel.EVENT_DYNAMIC = "event_dynamic";

ConnectModel.EVENT_to_ID_ELEMENT = "EVENT_to_ID_ELEMENT";
ConnectModel.EVENT_to_CLASS_NAME_ELEMENT = "EVENT_to_CLASS_NAME_ELEMENT";
ConnectModel.EVENT_to_DOCUMENT = "EVENT_to_DOCUMENT";

ConnectModel.setEvent = function(originalEvent, eventType, targetType, targetName, targetInsideId) {
	if (ConnectModel.connected && ConnectModel.connectController) {
		ConnectModel.connectController.setEvent(originalEvent, eventType, targetType, targetName, targetInsideId);
	}
}

ConnectModel.badEvent = function(event) {
	if (event && event.fromServer) {
		return false;
	}
	return true;
}

//--------------------------------------