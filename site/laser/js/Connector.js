function Connector() {
	var _this = this;
	
	_this.Event_connected = null;
	_this.Event_disconnected = null;
	_this.Event_data_mes = null;
	_this.Event_data_users_list = null;
	
	_this.socket = null;
	
	_this.init = function () {
		try {
			_this.socket = io();
		}
		catch (err) {
		}
		
		if (_this.socket) {
			_this.socket.on('connect', _this.onSocketConnect);
			_this.socket.on('chat message', _this.onSocketDataMes);
			_this.socket.on('change_users_list', _this.onSocketChangeUsersList);
			_this.socket.on('disconnect', _this.onSocketDisconnect);
		}
	}
	
	_this.onSocketConnect = function (event) {
		if (_this.Event_connected) {
			_this.Event_connected();
		}
	}
	
	_this.onSocketDisconnect = function (event) {
		if (_this.Event_disconnected) {
			_this.Event_disconnected();
		}
	}
	
	_this.onSocketChangeUsersList = function (data) {
		if (_this.Event_data_users_list) {
			_this.Event_data_users_list(data);
		}
	}
	
	_this.onSocketDataMes = function (data) {
		if (_this.Event_data_mes) {
			_this.Event_data_mes(data);
		}
	}
	
	_this.sendMessage = function (str, data) {
		if (_this.socket) {
			_this.socket.emit(str, data);
		}
	}
	
	_this.destructor = function () {
		if (_this.socket) {
			_this.socket.disconnect();
		}
	}
}