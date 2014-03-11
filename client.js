/**
* @author: Jun
* @date: 2014/3/11
**/

(function(window, document) {
	var client_data = {
		engine: {
			name: null,
			version: null
		},
		browser: {
			name: null,
			version: null
		},
		system: null,
		equipment: null,
		hasFlash: false,
		language: function() {
			if(navigator.systemLanguage) {
				return navigator.systemLanguage;
			}
			return navigator.language;
		}()
	};

	var ua = navigator.userAgent;
	if(window.opera) {
		client_data.engine.version = client_data.browser.version = window.opera.version();
		client_data.engine.name = client_data.browser.name = "opera";
	}
	else if(/AppleWebKit\/(\S+)/.test(ua)) {
		client_data.engine.version = parseFloat(RegExp["$1"]);
		client_data.engine.name = "webkit";

		if(/Chrome\/(\S+)/.test(ua)) {
			client_data.browser.version = parseFloat(RegExp["$1"]);
			client_data.browser.name = "chrome";
		}
		else if(/Version\/(\S+)/.test(ua)) {
			client_data.browser.version = parseFloat(RegExp["$1"]);
			client_data.browser.name = "safari";
		}
		else {
			var safariVersion = 1;
			if(client_data.engine.version < 100) {
				safariVersion = 1;
			}
			else if (client_data.engine.version < 312) {
				safariVersion = 1.2;
			}
			else if (client_data.engine.version < 312) {
				safariVersion = 1.3;
			}
			else {
				safariVersion = 2;
			}
			client_data.browser.name = "safari";
			client_data.browser.version = safariVersion;
		}
	}
	else if(/KHTML\/(S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
		client_data.engine.version = parseFloat(RegExp["$1"]);
		client_data.engine.name = "khtml";
	}
	else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
		client_data.engine.version = parseFloat(RegExp["$1"]);
		client_data.engine.name = "gecko";

		if(/Firefox\/(\S+)/.test(ua)) {
			client_data.browser.version = parseFloat(RegExp["$1"]);
			client_data.browser.name = "firefox";
		}
	}
	else if(/MSIE ([^;]+)/.test(ua)) {
		client_data.engine.version = client_data.browser.version = parseFloat(RegExp["$1"]);
		client_data.engine.name = client_data.browser.name = "ie";
	}


	var p = navigator.platform;
	if(p.indexOf("Win") > -1) {
		client_data.system = "windows";
	}
	else if(p.indexOf("Mac") > -1) {
		client_data.system = "mac";
	}
	else if(p == "X11" || p.indexOf("Linux") > -1) {
		client_data.system = "linux";
	}


	if(client_data.system == "windows") {
		if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
			if(RegExp["$1"] == "NT") {
				switch(RegExp["$2"]) {
					case "5.0" :
						client_data.system = "windows 2000";
						break;
					case "5.1" :
						client_data.system = "windows xp";
						break;
					case "6.0" :
						client_data.system = "windows vista";
						break;
					case "6.1" :
						client_data.system = "windows 7";
						break;
					default: 
						client_data.system = "NT";
				}
			}
			else if(RegExp["$1"] == "9x") {
				client_data.system = "windows me";
			}
			else {
				client_data.system = RegExp["$1"];
			}
		}
	}


	if(ua.indexOf("iPhone") > -1) {
		client_data.equipment = "iphone";
	}
	else if(ua.indexOf("iPad") > -1) {
		client_data.equipment = "ipad";
	}
	else if(ua.indexOf("iPod") > -1) {
		client_data.equipment = "ipod";
	}
	else if(ua.indexOf("nokiaN") > -1) {
		client_data.equipment = "nokia";
	}


	if(client_data.system == "CE") {
		client_data.equipment = "phone"
		client_data.system = "win mobile";
	}
	else if(client_data.system == "Ph") {
		if(/Windows Phone OS (\d+.\d+)/.test(ua)) {
			client_data.equipment = "phone";
			client_data.system =  "win mobile" + parseFloat(RegExp["$1"]);
		}
	}


	if(client_data.system == "mac" && ua.indexOf("Mobile") > -1) {
		client_data.system = "ios";
		if(/CPU (?:iPhone)?OS (\d+_\d+)/.test(ua)) {
			client_data.system = "ios" + parseFloat(RegExp.$1.replace("_", "."));
		}
	}
	else if(/Android (\d+\.\d+)/.test(ua)) {
		client_data.system = "android" + parseFloat(RegExp.$1);
	}
	else if(ua.indexOf("Wii") > -1) {
		client_data.equipment = client_data.system = "wii";
	}
	else if(/playstation/i.test(ua)) {
		client_data.equipment = client_data.system = "ps";
	}


	if(client_data.browser.name == "ie") {
		try {
			new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			client_data.hasFlash = true;
		}
		catch (ex) {
			client_data.hasFlash = false;
		}
	}
	else {
		client_data.hasFlash = false;
		for(var i = 0; i < navigator.plugins.length; i++) {
			if(navigator.plugins[i].name.toLowerCase().indexOf("flash") > -1) {
				client_data.hasFlash = true;
				break;
			}
		}
	}

	window.$client = client_data;
})(window, document);