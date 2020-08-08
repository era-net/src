function xhr() {

	this.xhr = new XMLHttpRequest();

	this.run = function(method, url) {
		this.xhr.open(method.toUpperCase(), url);
		this.xhr.send();
	}

	this.get = function(method, url, func) {
		this.xhr.onload = function() {
			if (this.status === 200 && this.readyState === 4) {
				var re = this.responseText;
				func(re);
			}
		}

		this.xhr.open(method.toUpperCase(), url);
		this.xhr.send();
	}

	this.getJson = function(method, url, func) {
		this.xhr.onload = function() {
			if (this.status === 200 && this.readyState === 4) {
				var rsp = this.responseText;
				let re;
				try {
					re = JSON.parse(rsp);
				} catch(err) {
					console.error("xhr: invalid json data...");
					return false;
				}
				func(re);
			}
		}

		this.xhr.open(method.toUpperCase(), url, func);
		this.xhr.send();
	}

	this.post = function(method, url, func, obj) {

		let data = "";
		let i = 0;

		for (const [key, value] of Object.entries(obj)) {
			if (i != (Object.keys(obj).length) - 1) {
				data += key + "=" + encodeURIComponent(value) + "&";
			} else {
				data += key + "=" + encodeURIComponent(value);
			}
			i++;
		}

		if (method.toUpperCase() === "GET") {

			this.xhr.onload = function() {
				if (this.status === 200 && this.readyState === 4) {
					var re = this.responseText;
					func(re);
				}
			}

			this.xhr.open(method.toUpperCase(), url + "?" + data);
			this.xhr.send();
		}
		if (method.toUpperCase() === "POST") {

			this.xhr.onload = function() {
				if (this.status === 200 && this.readyState === 4) {
					var re = this.responseText;
					func(re);
				}
			}

			this.xhr.open(method.toUpperCase(), url);
			this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			this.xhr.send(data);
		}
	}

	this.sendFiles = function(obj = {}) {
		let set = {};
		set["url"] = obj.url;
		set["callback"] = obj.callback;
		set["progress"] = obj.progress;
		set["data"] = obj.data;

		this.xhr.upload.addEventListener("progress", function(evt) {
			let percent = evt.lengthComputable ? (evt.loaded / evt.total * 100) : undefined;
			obj.progress({
				e: evt,
				loaded: evt.loaded,
				total: evt.total,
				percent: percent
			});
		}, false);

		this.xhr.onload = function() {
			if (this.status === 200 && this.readyState === 4) {
				var re = this.responseText;
				obj.callback(re);
			}
		}

		this.xhr.open("POST", set["url"]);
		this.xhr.send(set["data"]);
	}

	this.abort = function() {
		this.xhr.abort();
	}

	this.info = function() {
		console.info('run(str(method),str(url));');
		console.info('get(str(method), str(url), callback());');
		console.info('post(str(method), str(url), callback(), obj(data));');
		console.info('sendFiles({\n'
		+ '  url: str(),\n'
		+ '  data: obj(FormData),\n'
		+ '  progress: function({e, loaded, total, percent}),\n'
		+ '  callback: function(rsp)\n' 
		+ '});');
		console.info('Form Data explanation: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects');
		console.log('abort();');
	}
}