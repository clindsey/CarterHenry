var CarterHenry = function(node_id, map, tile_data, perspective, canvas){
	var bind_node = document.getElementById(node_id);
	if(bind_node && bind_node.getContext){
		var context = bind_node.getContext('2d');
	};
	this.map = map;
	this.perspective = perspective;
	this.canvas = canvas;
	this.timer;
	var render_queue = new RenderQueue();
	var cursor_log = {};
	var tiles = [];
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
	this.render = function(){
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