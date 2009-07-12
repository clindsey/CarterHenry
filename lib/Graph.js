function Graph(size) {
	this._maxSize = size;
	this.nodes = [];
	this._nodeCount = 0;
	
	this.addNode = function(obj, i) {
		if(this.nodes[i]) return false;
		
		this.nodes[i] = new GraphNode(obj);
		this._nodeCount++;
		
		return true;
	
	};
	
	this.removeNode = function(i) {
		var node = this.nodes[i];
		if(!node) return false;
		
		for(var j = 0; j < this._maxSize; j++) {
			var t = this.nodes[j];
			if(t && t.getArc(node)) this.removeArc(j, i);
		
		};
		
		this.nodes[i] = null;
		this._nodeCount--;
		
		return true;
	
	};
	
	this.addArc = function(from, to, weight) {
		weight = 1;
		
		var node0 = this.nodes[from];
		var node1 = this.nodes[to];
		
		if(node0 && node1) {
			if(node0.getArc(node1)) return false;
			
			node0.addArc(node1, weight);
			
			return true;
		
		};
		
		return false;
	
	};
	
	this.getArc = function(from, to) {
		var node0 = this.nodes[from];
		var node1 = this.nodes[to];
		
		if(node0 && node1) return node0.getArc(node1);
		
		return null;
	
	};
	
	this.removeArc = function(from, to) {
		var node0 = this.nodes[from];
		var node1 = this.nodes[to];
		
		if(node0 && node1) {
			node0.removeArc(node1);
			
			return true;
		
		};
		
		return false;
	
	};
	
	this.clearMarks = function() {
		for(var i = 0; i < this._maxSize; i++) {
			var node = this.nodes[i];
			
			if(node) node.marked = false; // setter?
		
		};
	
	};
	
	this.clear = function() {
		this.nodes = [];
		this._nodeCount = 0;
	
	};
	
	this.getMaxSize = function() {
		return this._maxSize;
	
	};
	
	this.getSize = function() {
		return this._nodeCount;
	
	};
	
	this.depthFirst = function(node, process) {
		if(!node) return;
		
		process(node);
		
		node.marked = true;
		
		var k = node.getNumArcs();
		var t = {};
		
		for(var i = 0; i < k; i++) {
			t = node.arcs[i].node;
			
			if(!t.marked) this.depthFirst(t, process);
		
		};
	
	};
	
	this.breadthFirst = function(node, process) {
		if(!node) return;
		
		var queueSize = 1;
		var queue = [node];
		node.marked = true;
		
		var c = 1;
		var k = 0;
		var i = 0;
		var arcs = [];
		var t = {};
		var u = {};
		
		while(c > 0) {
			process(t = queue[0]);
			
			arcs = t.arcs;
			k = t.getNumArcs();
			
			for(i = 0; i < k; i++) {
				u = arcs[i].node;
				
				if(!u.marked) {
					u.marked = true;
					queue[Number(queueSize++)] = u;
					
					c++;
				
				};
			
			};
			
			queue.shift();
			queueSize--;
			c--;
			
		};
	
	};

};
