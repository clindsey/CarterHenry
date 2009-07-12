function GraphNode(obj) {
	this.data = obj;
	this.arcs = [];
	this.marked = false;
	this._arcCount = 0;
	
	this.addArc = function(target, weight) {
		this.arcs[Number(this._arcCount++)] = new GraphArc(target, weight);
	
	};
	
	this.removeArc = function(target) {
		for(var i = 0; i < this._arcCount; i++) {
			if(this.arcs[i].node == target) {
				this.arcs.splice(i, 1);
				
				this._arcCount--;
				
				return true;
			
			};
		
		};
		
		return false;
	
	};
	
	this.getArc = function(target) {
		for(var i = 0; i < this._arcCount; i++) {
			var arc = this.arcs[i];
			if(arc.node == target) return arc;
		
		};
		
		return null;
	
	};
	
	this.getNumArcs = function() {
		return this._arcCount;
	
	};

};
