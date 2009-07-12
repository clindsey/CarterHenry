function HeapIterator(heap) {
	this._values = heap.toArray();
	this._length = this._values.length;
	this._cursor = 0;
	
	this.prototype = new Iterator();
	
	this.start = function() {
		this._cursor = 0;
	
	};
	
	this.hasNext = function() {
		return this._cursor < this._length;
	
	};
	
	this.next = function() {
		return this._values[this._cursor++];
	
	};
	
	this.getData = function() {
		return this._values[this._cursor];
	
	};
	
	this.setData = function(obj) {
		this._values[this._cursor] = obj;
	
	};

};
