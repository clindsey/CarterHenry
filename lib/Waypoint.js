function Waypoint(index) {
	this.marked = false;
	this.distance = 0;
	this.prev = null;
	this.x = 0;
	this.y = 0;
	this.graphNodeIndex = index;
	
	this.init = function() {
		this.marked = false;
		this.distance = 0;
		this.prev = null;
	
	};
	
	this.setPos = function(x, y) {
		this.x = x;
		this.y = y;
	
	};
	
	this.distanceTo = function(wp) {
		var dx = wp.x - this.x;
		var dy = wp.y - this.y;
		
		return Math.sqrt((dx * dx) + (dy * dy));
	
	};
	
	this.init();
	
};
