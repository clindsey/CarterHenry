function Array2Iterator(a2) {
	this._a2 = a2;
	this._xCursor = 0;
	this._yCursor = 0;
	
	this.prototype = new Iterator();
	
	this.getData = function() {
		return this._a2.get(this._xCursor, this._yCursor);
	
	};
	
	this.setData = function(obj) {
		this._a2.set(this._xCursor, this._yCursor, obj);
	
	};
	
	this.start = function() {
		this._xCursor = this._yCursor = 0;
	
	};
	
	this.hasNext = function() {
		return (this._yCursor * this._a2.getWidth() + this._xCursor < this._a2.getSize());
	
	};
	
	this.next = function() {
		var item = this.getData();
		
		if(++this._xCursor == this._a2.getWidth()) {
			this._yCursor++;
			this._xCursor = 0;
		
		};
		
		return item;
	
	};

};
