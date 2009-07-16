var CarterHenry = function(node_id, map, tile_data, perspective, canvas, network_diagonally){
	var bind_node = document.getElementById(node_id);
	if(bind_node && bind_node.getContext){
		var context = bind_node.getContext('2d');
	};
	this.map = map;
	this.perspective = perspective;
	this.canvas = canvas;
	this.timer;
	this.network_diagonals = network_diagonally || false;
	this.on_enter_frame;
	var render_queue = new RenderQueue();
	var cursor_log = {};
	var tiles = [];
	var graph, nav;
	var init_tiles = function(){
		var tile_x, tile_y;
		var tile_width = tile_data.size;
		var tile_height = tile_data.size;
		var depth;
		var tile;
		for(var y = 0; y < map.data.length; y++){
			tiles[y] = [];
			for(var x = 0; x < map.data[y].length; x++){
				tile_x = (x - y) * (tile_width / 2);
				tile_y = (x + y) * (tile_height / 4);
				depth = (tile_y + perspective.top) * 300 + (tile_x + perspective.left) + 1;
				tile = new tile_data.lookup[map.data[y][x]](context, depth, tile_x + perspective.left, tile_y + perspective.top);
				tiles[y][x] = tile;
				render_queue.enqueue(tile);
			};
		};
	};
	init_tiles();
	var init_canvas = function(){
		context.fillStyle = canvas.background_color;
		context.fillRect(0, 0, canvas.width, canvas.height);
	};
	init_canvas();
	this.move_sprite = function(sprite, map_x, map_y){
		tile_x = (map_x - map_y) * (tile_data.size / 2) + perspective.left;
		tile_y = (map_x + map_y) * (tile_data.size / 4) + perspective.top;
		depth = (tile_y) * 300 + (tile_x);
		if(sprite.layer) depth += sprite.layer;
		sprite.x = tile_x;
		sprite.y = tile_y;
		sprite.map_x = map_x;
		sprite.map_y = map_y;
		render_queue.swap_depth(sprite, depth);
	};
	var to_index = function(x, y){
		return x + y * tiles[0].length;
	};
	var from_index = function(index){
		var y = Math.floor(index / tiles[0].length);
		return {y:y, x:index - y * tiles[0].length};
	};
	var network_graph = function(){
		var index;
		for(var y = 0; y < tiles.length; y++){
			for(var x = 0; x < tiles[y].length; x++){
				index = to_index(x, y);
				if(y - 1 > -1 && tiles[y - 1][x].walkable) graph.addArc(index, to_index(x, y - 1));
				if(y + 1 < map.data.length && tiles[y + 1][x].walkable) graph.addArc(index, to_index(x, y + 1));
				if(x - 1 > -1 && tiles[y][x - 1].walkable) graph.addArc(index, to_index(x - 1, y));
				if(x + 1 < map.data[y].length && tiles[y][x + 1].walkable) graph.addArc(index, to_index(x + 1, y));
				if(network_diagonally){
					if(x - 1 > -1 && y - 1 > -1 && tiles[y - 1][x - 1].walkable) graph.addArc(index, to_index(x - 1, y - 1));
					if(x + 1 < map.data[y].length && y - 1 > -1 && tiles[y - 1][x + 1].walkable) graph.addArc(index, to_index(x + 1, y - 1));
					if(x + 1 < map.data[y].length && y + 1 < map.data.length && tiles[y + 1][x + 1].walkable) graph.addArc(index, to_index(x + 1, y + 1));
					if(x - 1 > -1 && y + 1 < map.data.length && tiles[y + 1][x - 1].walkable) graph.addArc(index, to_index(x - 1, y + 1));
				};
			};
		};
	};
	var init_graph = function(){
		graph = new Graph(tiles.length * tiles[0].length);
		nav = new AStarLine();
		var waypoint;
		for(var y = 0; y < tiles.length; y++){
			for(var x = 0; x < tiles[y].length; x++){
				waypoint = new Waypoint(to_index(x, y));
				waypoint.setPos(x, y);
				graph.addNode(waypoint, to_index(x, y))
			};
		};
		network_graph();
	};
	init_graph();
	this.can_travel_sprite = function(sprite, map_x, map_y){
		return nav.find(graph, graph.nodes[to_index(sprite.map_x, sprite.map_y)], graph.nodes[to_index(map_x, map_y)]);
	};
	this.travel_sprite = function(sprite, map_x, map_y){
		if(sprite.travel_timer) clearInterval(sprite.travel_timer);
		sprite.move_queue = nav.getPath(graph.nodes[to_index(hero.map_x, hero.map_y)], graph.nodes[to_index(map_x, map_y)]);
		if(sprite.move_queue.length > 1) sprite.travel_timer = setInterval(sprite_path, 200, this, sprite);
	};
	var sprite_path = function(instance, sprite){
		if(sprite.move_queue.length < 1) return clearInterval(sprite.move_timer);
		var waypoint = sprite.move_queue[sprite.move_queue.length - 1];
		var new_coords = {x:from_index(waypoint.graphNodeIndex).x, y:from_index(waypoint.graphNodeIndex).y};
		instance.move_sprite(sprite, new_coords.x, new_coords.y);
		sprite.move_queue.pop();
	};
	this.render = function(scope){
		if(scope.on_enter_frame) scope.on_enter_frame();
		init_canvas();
		var itr = new RenderQueueIterator(render_queue);
		var tile;
		while(itr.has_next()){
			tile = itr.next();
			if(tile.render) tile.render();
		};
	};
	this.add_sprite = function(type, map_x, map_y){
		tile_x = (map_x - map_y) * (tile_data.size / 2) + perspective.left;
		tile_y = (map_x + map_y) * (tile_data.size / 4) + perspective.top;
		var depth = (tile_y) * 300 + (tile_x);
		var sprite = new tile_data.lookup[type](context, depth, tile_x, tile_y);
		sprite.map_x = map_x;
		sprite.map_y = map_y;
		if(sprite.layer) sprite.depth += sprite.layer;
		render_queue.enqueue(sprite);
		return sprite;
	};
	this.start = function(on_enter_frame){
		this.on_enter_frame = on_enter_frame;
		this.timer = setInterval(this.render, 70, this);
	};
	this.stop = function(){
		clearInterval(this.timer);
	};
	var current_moused;
	jQuery("#" + node_id).mousemove(function(e){
		var mouse_data = parse_coord(e.clientX, e.clientY);
		var tile_y = mouse_data.y;
		var tile_x = mouse_data.x;
		if((cursor_log.x != tile_x || cursor_log.y != tile_y) && tiles[tile_y] && tiles[tile_y][tile_x] != undefined){
			var tile = tiles[tile_y][tile_x];
			if(current_moused && current_moused.mouse_out) current_moused.mouse_out(tile_x, tile_y);
			current_moused = tile;
			if(tile.mouse_over) tile.mouse_over(tile_x, tile_y);
			cursor_log = mouse_data;
		};
	}).mousedown(function(e){
		var mouse_data = parse_coord(e.clientX, e.clientY);
		var tile_y = mouse_data.y;
		var tile_x = mouse_data.x;
		if(tiles[tile_y] && tiles[tile_y][tile_x] != undefined){
			var tile = tiles[tile_y][tile_x];
			if(tile.mouse_down) tile.mouse_down(tile_x, tile_y);
		};
	}).mouseup(function(e){
		var mouse_data = parse_coord(e.clientX, e.clientY);
		var tile_y = mouse_data.y;
		var tile_x = mouse_data.x;
		if(tiles[tile_y] && tiles[tile_y][tile_x] != undefined){
			var tile = tiles[tile_y][tile_x];
			if(tile.mouse_up) tile.mouse_up(tile_x, tile_y);
		};
	});
	this.key_down = function(func){
		jQuery().keypress(func);
	};
	var parse_coord = function(x, y){
		node = jQuery("#" + node_id);
		var mouse_x = x - jQuery(node).offset().left - perspective.left;
		var mouse_y = y - jQuery(node).offset().top - perspective.top;
		var y_mouse = ((2 * mouse_y - mouse_x) / 2);
		var x_mouse = (mouse_x + y_mouse);
		var tile_y = Math.round(y_mouse / (tile_data.size / 2));
		var tile_x = Math.round(x_mouse / (tile_data.size / 2)) - 1;
		return {x:tile_x, y:tile_y};
	};
};
var Map = function(data){
	this.data = data;
};
var TileData = function(size, lookup){
	this.size = size;
	this.lookup = lookup || [];
};