var tile_data = new TileData(40);

tile_data.lookup[0] = function(context, depth, x, y){
	this.walkable = true;
	width = tile_data.size;
	height = tile_data.size;
	this.render = function(){
		context.beginPath();
		context.fillStyle = "#CACF43";
		context.strokeStyle = "#99AA00";
		context.lineWidth = 1;
		context.moveTo(x, y + (height >> 2));
		context.lineTo(x + (width >> 1), y);
		context.lineTo(x + width, y + (height >> 2));
		context.lineTo(x + (width >> 1), y + (height >> 1));
		context.lineTo(x, y + (height >> 2))
		context.fill();
		context.stroke();
		context.closePath();
	};
};
tile_data.lookup[1] = function(context, depth, x, y){
	this.walkable = false;
	width = tile_data.size;
	height = tile_data.size;
	this.render = function(){
		context.beginPath();
		context.fillStyle = "#555555";
		context.strokeStyle = '#99AA00';
		context.lineWidth = 1;
		context.moveTo(x, y + (height / 4));
		context.lineTo(x, y - (height / 16));
		context.lineTo(x + (width / 2), y - ((height / 16) + height / 4));
		context.lineTo(x + width, y - (height / 16));
		context.lineTo(x + width, y + (height / 4));
		context.lineTo(x + (width / 2), y + (height / 2));
		context.lineTo(x, y + (height / 4));
		context.fill();
		context.stroke();
		context.closePath();
		
		context.beginPath();
		context.fillStyle = "#333333";
		context.strokeStyle = "#99AA00";
		context.lineWidth = 1;
		context.moveTo(x, y - (height / 16));
		context.lineTo(x + (width / 2), y + ((height / 4) - (height / 16)));
		context.lineTo(x + width, y - (height / 16));
		context.lineTo(x + (width / 2), y - ((height / 16) + height / 4));
		context.lineTo(x, y - (height / 16));
		context.fill();
		context.stroke();
		context.closePath();
		
		context.beginPath();
		context.fillStyle = "#000000";
		context.strokeStyle = "#99AA00";
		context.lineWidth = 1;
		context.moveTo(x + (width / 2), y + ((height / 4) - (height / 16)));
		context.lineTo(x + (width / 2), y + (height / 2));
		context.lineTo(x + width, y + (height / 4));
		context.lineTo(x + width, y - (height / 16));
		context.fill();
		context.stroke();
		context.closePath();
	};
};
function CursorTile(context, width, height, depth, color, x, y, walkable){
	this.context = context;
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.color = color;
	this.x = x;
	this.y = y;
	this.walkable = walkable;
	this.render = function(){
		with(this){
			context.beginPath();
			context.fillStyle = color;
			context.strokeStyle = '#99AA00';
			context.lineWidth = 1;
			context.moveTo(x + 10, y + (height / 4));
			context.lineTo(x + (width / 2), y + 5);
			context.lineTo(x - 10 + width, y + (height / 4));
			context.lineTo(x + (width / 2), y + (height / 2) - 5);
			context.lineTo(x + 10, y + (height / 4));
			context.fill();
			context.stroke();
			context.closePath();
		};
	};
};