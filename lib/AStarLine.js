function AStarLine() {
	this.compareHeuristic = function(left, right) {
		if(left.heuristic < right.heuristic) return 1;
		if(left.heuristic > right.heuristic) return -1;
		
		return 0;
	
	};
	
	this.getPath = function(startNode, goalNode) {
		var path = [];
		
		var wp = goalNode.data;
		
		while(wp) {
			path.push(wp);
			wp = wp.prev;
		
		};
		
		return path;
	
	};
	
	this.unmarkWaypoints = function(map) {
		var nodes = map.nodes;
		
		for(var i = 0; i < map.getMaxSize(); i++) {
			var gn = nodes[i];
			
			if(gn) {
				var wp = gn.data;
				wp.init();
			
			};
		
		};
		
		return true;
	
	};
	
	this.find = function(map, startNode, goalNode) {
		this.unmarkWaypoints(map);
		
		var queue = new Heap(1024, this.compareHeuristic);
		
		queue.enqueue(new GraphNodePointer(startNode, 0));
		
		var currNode;
		
		while(queue.getSize() != 0) {
			var c = queue.getFront();
			queue.dequeue();
			
			currNode = c.node;
			
			var curr_wp = currNode.data;
			
			if(!curr_wp.marked) {
				curr_wp.marked = true;
				
				if(currNode == goalNode) {
					return true;
				
				};
				
				for(var i = 0; i < currNode.getNumArcs(); i++) {
					var arc = currNode.arcs[i];
					var next_gn = arc.node;
					var next_wp = next_gn.data;
					
					if(!next_wp.marked) {
						var distance = curr_wp.distance + curr_wp.distanceTo(next_wp) * arc.weight;
						
						if(next_wp.prev != null) {
							if(distance < next_wp.distance) {
								next_wp.prev = curr_wp;
								next_wp.distance = distance;
							
							} else {
								continue;
							
							};
						
						} else {
							next_wp.prev = curr_wp;
							next_wp.distance = distance;
					
						};
						
						var heuristics = next_wp.distanceTo(goalNode.data) + distance;
						
						queue.enqueue(new GraphNodePointer(next_gn, heuristics));
					
					};
				
				};
			
			};
		
		};
		
		return false;
	
	};

};
