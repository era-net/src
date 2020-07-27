function xhr() {

	this.xhr = new XMLHttpRequest();

	this.no_query = function(method, url) {
		this.xhr.open(method, url);
		this.xhr.send();
	}

	this.query = function(method, url, func) {
		this.xhr.onload = function() {
			if (this.status === 200 && this.readyState === 4) {
				var re = this.responseText;
				func(re);
			}
		}

		this.xhr.open(method, url);
		this.xhr.send();
	}

	this.send = function(method, url, func, data) {
		if (method === "GET") {

			this.xhr.onload = function() {
				if (this.status === 200 && this.readyState === 4) {
					var re = this.responseText;
					func(re);
				}
			}

			this.xhr.open(method, url + "?" + data);
			this.xhr.send();
		}
		if (method === "POST") {

			this.xhr.onload = function() {
				if (this.status === 200 && this.readyState === 4) {
					var re = this.responseText;
					func(re);
				}
			}

			this.xhr.open(method, url);
			this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			this.xhr.send(data);
		}

		this.abort = function() {
			this.xhr.abort();
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
		console.info('no_query(str(method),str(url));');
		console.info('query(str(method), str(url), callback());');
		console.info('send(str(method), str(url), callback(), str(data));');
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