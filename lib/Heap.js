function Heap(size, compare) {
	this.prototype = new Collection();
	
	this._heap = [];
	this._size = size + 1;
	this._count = 0;
	
	if(compare == null || compare == undefined) {
		this._compare = function(a, b) {
			return a - b;
		
		};
	
	} else {
		this._compare = compare;
	
	};
	
	this.enqueue = function(obj) {
		if(this._count + 1 < this._size) {
			this._heap[Number(++this._count)] = obj;
			this.walkUp(this._count);
			return true;
		
		};
		
		return false;
	
	};
	
	this.dequeue = function() {
		if(this._count >= 1) {
			var o = this._heap[1];
			
			this._heap[1] = this._heap[this._count];
			delete this._heap[this._count];
			
			this.walkDown(1);
			this._count--;
			
			return o;
		
		};
		
		return null;
	
	};
	
	this.contains = function(obj) {
		for(var i = 1; i <= this._count; i++) {
			if(this._heap[i] === obj) {
				return true;
			
			};
		
		};
		
		return false;
	
	};
	
	this.clear = function() {
		this._heap = [];
		this._count = 0;
	
	};
	
	this.getIterator = function() {
		return new HeapIterator(this);
	
	};
	
	this.isEmpty = function() {
		return false;
	
	};
	
	this.toArray = function() {
		return this._heap.slice(1, this._count + 1);
	
	};
	
	this.dump = function() {
		var s = "Heap\n{\n";
		var k = this._count + 1;
		
		for(var i = 1; i < k; i++) {
			s += "\t" + this._heap[i] + "\n";
		
		};
		
		s += "\n}";
		
		return s;
	
	};
	
	this.walkUp = function(index) {
		var parent = index >> 1;
		var tmp = this._heap[index];
		
		while(parent > 0) {
			if(this._compare(tmp, this._heap[parent]) > 0) {
				this._heap[index] = this._heap[parent];
				
				index = parent;
				parent >>= 1;
			
			} else {
				break;
			
			};
			
			this._heap[index] = tmp;
		
		};
	
	};
	
	this.walkDown = function(index) {
		var child = index << 1;
		var tmp = this._heap[index];
		
		while(child < this._count) {
			if(child < this._count - 1) {
				if(this._compare(this._heap[child], this._heap[Number(child + 1)]) < 0) {
					child++;
				
				};
			};
			
			if(this._compare(tmp, this._heap[child]) < 0) {
				this._heap[index] = this._heap[child];				
				index = child;
				child <<= 1;
				
			} else {
				break;
			
			};
		
		};
		
		this._heap[index] = tmp;
	
	};
	
	this.getFront = function() {
		return this._heap[1];
	
	};
	
	this.getSize = function() {
		return this._count;
	
	};
	
	this.getMaxSize = function() {
		return this._size;
	
	};

};
