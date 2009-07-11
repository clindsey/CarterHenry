var CarterHenry = function(node_id, map, tile_data, perspective, canvas){
	var bind_node = document.getElementById(node_id);
	if(bind_node && bind_node.getContext){
		var context = bind_node.getContext('2d');
	};
	this.map = map;
	this.perspective = perspective;
	this.canvas = canvas;
	var render_queue = new RenderQueue();
	var init_tiles = function(){
		var tile_x, tile_y;
		var tile_width = tile_data.size;
		var tile_height = tile_data.size;
		var depth;
		for(var y = 0; y < map.data.length; y++){
			for(var x = 0; x < map.data[y].length; x++){
				tile_x = (x - y) * (tile_width / 2);
				tile_y = (x + y) * (tile_height / 4);
				depth = (tile_y + perspective.top) * 300 + (tile_x + perspective.left) + 1;
				render_queue.enqueue(new tile_data.lookup[map.data[y][x]](context, depth, tile_x + perspective.left, tile_y + perspective.top));
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
		var itr = new RenderQueueIterator(render_queue);
		while(itr.has_next()){
			itr.next().render();
		};
	};
};
var Map = function(data){
	this.data = data;
};
var TileData = function(size, lookup){
	this.size = size;
	this.lookup = lookup || [];
};