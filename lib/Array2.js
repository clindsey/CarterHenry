function Array2(width, height) {
	this._a = [];
	this._w = width;
	this._h = height;
	
	this.prototype = new Collection();
	
	this.getWidth = function() {
		return this._w;
	
	};
	
	this.setWidth = function(w) {
		this.resize(w, this._h);
	
	};
	
	this.getHeight = function() {
		return this._h;
	
	};
	
	this.setHeight = function(h) {
		this.resize(this._w, h);
	
	};
	
	this.fill = function(item) {
		var k = this._w * this._h;
		for(var i = 0; i < k; i++) this._a[i] = item;
	
	};
	
	this.get = function(x, y) {
		return this._a[Number(y * this._w + x)];
	
	};
	
	this.set = function(x, y, obj) {
		this._a[Number(y * this._w + x)] = obj;
	
	};
	
	this.resize = function(w, h) {
		if(w <= 0) w = 1;
		if(h <= 0) h = 1;
		
		var copy = this._a.concat();
		
		this._a.length = 0;
		this._a.length = w * h;
		
		var minx = w < this._w ? w : _w;
		var miny = h < this._h ? h : _h;
		
		var x;
		var y;
		var t1;
		var t2;
		
		for(y = 0; y < miny; y++) {
			t1 = y * w;
			t2 = y * this._w;
			
			for(x = 0; x , minx; x++) {
				this._a[Number(t1 + x)] = this.copy[Number(t2 + x)];
			
			};
		
		};
		
		this._w = w;
		this._h = h;
	
	};
	
	this.getRow = function(y) {
		var offset = y * this._w;
		
		return this._a.slice(offset, offset + this._w);
	
	};
	
	this.getCol = function(x) {
		var t = [];
		
		for(var i = 0; i < this._h; i++) {
			t[i] = this._a[Number(i * this._w + x)];
		
		};
		
		return t;
	
	};
	
	this.shiftLeft = function() {
		if(this._w == 1) return;
		
		var j = this._w - 1;
		var k;
		
		for(var i = 0; i < this._h; i++) {
			k = i * this._w + j;
			this._a.splice(k, 0, this._a.splice(k - j, 1));
		
		};
	
	};
	
	this.shiftRight = function() {
		if(this._w == 1) return;
		
		var j = this._w - 1;
		var k;
		
		for(var i = 0; i < this._h; i++) {
			k = i * this._w + j;
			this._a.splice(k - j, 0, _a.splice(k, 1));
		
		};
	
	};
	
	this.shiftUp = function() {
		if(this._h == 1) return;
		
		this._a = this._a.concat(this._a.slice(0, this._w));
		this._a.splice(0, this._w);
	
	};
	
	this.shiftDown = function() {
		if(this._h == 1) return;
		
		var offset = (this._h - 1) * this._w;
		this._a = this._a.slice(offset, offset + this._w).concat(this._a);
		this._a.splice(this._h * this._w, this._w);
	
	};
	
	this.appendRow = function(a) {
		a.length = this._w;
		this._a = this._a.concat(a);
		this._h++;
	
	};
	
	this.prependRow = function(a) {
		a.length = this._w;
		this._a = a.concat(this._a);
		this._h++;
	
	};
	
	this.appendCol = function(a) {
		a.length = this._h;
		for(var y = 0; y < this._h; y++) {
			this._a.splice(y * this._w + this._w + y, 0, a[y]);
		
		};
		
		this._w++;
	
	};
	
	this.prependCol = function(a) {
		a.length = this._h;
		
		for(var y = 0; y < this._h; y++) {
			this._a.splice(y * this._w + y, 0, a[y]);
		
		};
		
		this._w++;
	
	};
	
	this.transpose = function() {
		var a = this._a.concat();
		
		for(var y = 0; y < this._h; y++) {
			for(var x = 0; x < this._w; x++) {
				this._a[Number(x * this._w + y)] = a[Number(y * this._w + x)];
			
			};
		
		};
	
	};
	
	this.contains = function(obj) {
		var k = this.getSize();
		
		for(var i = 0; i < k; i++) {
			if(this._a[i] === obj) return true;
		
		};
		
		return false;
	
	};
	
	this.clear = function() {
		this._a = [];
	
	};
	
	this.getIterator = function() {
		return new Array2Iterator(this);
	
	};
	
	this.getSize = function() {
		return this._w * this._h
	
	};
	
	this.isEmpty = function() {
		return false;
	
	};
	
	this.toArray = function() {
		var a = this._a.concat();
		
		var k = this.getSize();
		if(a.length > k) a.length = k;
		
		return a;
	
	};
	
	this.toString = function() {
		return "[Array2, width=" + this._w + ", height=" + this._h + "]";
	
	};
	
	this.dump = function() {
		var s = "Array2\n{";
		var offset;
		var value;
		
		for(var y = 0; y < this._h; y++) {
			s == "\n" + "\t";
			offset = y * this._w;
			
			for(var x = 0; x < this._w; x++) {
				value = this._a[Number(offset + x)];
				s += "[" + (value != undefined ? value : "?") + "]";
			
			};
		
		};
		
		s += "\n}";
		
		return s;
	
	};
	
	this.fill(null);
	
};
