var tile_data = new TileData(40);

tile_data.lookup['0'] = function(context, depth, x, y){
	this.walkable = true;
	width = tile_data.size;
	height = tile_data.size;
	this.depth = depth;
	this.layer = 1;
	this.x = x;
	this.y = y;
	this.mouse_over = function(map_x, map_y){
		if(cursor == undefined) cursor = carter_henry.add_sprite("CursorSprite", map_x, map_y);
		else carter_henry.move_sprite(cursor, map_x, map_y);
		jQuery("#world_canvas").css("cursor", "pointer");
	};
	this.mouse_out = function(map_x, map_y){
		jQuery("#world_canvas").css("cursor", "default");
	};
	this.mouse_down = function(map_x, map_y){
		var path_exists = carter_henry.can_travel_sprite(hero, map_x, map_y);
		if(!path_exists) return;
		carter_henry.travel_sprite(hero, map_x, map_y);
	};
	this.render = function(){
		context.beginPath();
		context.fillStyle = "#CACF43";
		context.moveTo(this.x, this.y + (height >> 2));
		context.lineTo(this.x + (width >> 1), this.y);
		context.lineTo(this.x + width, this.y + (height >> 2));
		context.lineTo(this.x + (width >> 1), this.y + (height >> 1));
		context.lineTo(this.x, this.y + (height >> 2))
		context.fill();
		context.closePath();
	};
};
tile_data.lookup['1'] = function(context, depth, x, y){
	this.walkable = false;
	width = tile_data.size;
	height = tile_data.size;
	this.depth = depth;
	this.layer = 1;
	this.x = x;
	this.y = y;
	this.render = function(){
		context.beginPath();
		context.fillStyle = "#924E34";
		context.moveTo(this.x, this.y + (height / 4));
		context.lineTo(this.x, this.y - (height / 16));
		context.lineTo(this.x + (width / 2), this.y - ((height / 16) + height / 4));
		context.lineTo(this.x + width, this.y - (height / 16));
		context.lineTo(this.x + width, this.y + (height / 4));
		context.lineTo(this.x + (width / 2), this.y + (height / 2));
		context.lineTo(this.x, this.y + (height / 4));
		context.fill();
		context.closePath();
		
		context.beginPath();
		context.fillStyle = "#703C13";
		context.moveTo(this.x, this.y - (height / 16));
		context.lineTo(this.x + (width / 2), this.y + ((height / 4) - (height / 16)));
		context.lineTo(this.x + width, this.y - (height / 16));
		context.lineTo(this.x + (width / 2), this.y - ((height / 16) + height / 4));
		context.lineTo(this.x, this.y - (height / 16));
		context.fill();
		context.closePath();
		
		context.beginPath();
		context.fillStyle = "#290907";
		context.moveTo(this.x + (width / 2), this.y + ((height / 4) - (height / 16)));
		context.lineTo(this.x + (width / 2), this.y + (height / 2));
		context.lineTo(this.x + width, this.y + (height / 4));
		context.lineTo(this.x + width, this.y - (height / 16));
		context.fill();
		context.closePath();
	};
};
tile_data.lookup['CursorSprite'] = function(context, depth, x, y){
	width = tile_data.size;
	height = tile_data.size;
	this.x = x;
	this.y = y;
	this.depth = depth;
	this.layer = 2;
	this.render = function(){
		var slimming = height / 1;
		
		context.beginPath();
		context.fillStyle = "#008800";
		context.moveTo(this.x + slimming, this.y + (height / 4));
		context.lineTo(this.x + (width / 2), this.y + (slimming / 2));
		context.lineTo(this.x - slimming + width, this.y + (height / 4));
		context.lineTo(this.x + (width / 2), this.y + (height / 2) - (slimming / 2));
		context.lineTo(this.x + slimming, this.y + (height / 4));
		context.fill();
		context.closePath();
	};
};
tile_data.lookup['HeroSprite'] = function(context, depth, x, y){
	width = tile_data.size;
	height = tile_data.size;
	slimming = tile_data.size / 6;
	this.x = x;
	this.y = y;
	this.depth = depth;
	this.type = "Hero"
	this.layer = 4;
	this.render = function(){
		context.beginPath();
		context.fillStyle = "#555555";
		context.moveTo(this.x + slimming, this.y + (height / 4));
		context.lineTo(this.x + slimming, this.y - (height / 3));
		context.lineTo(this.x + (width / 2), this.y - ((height / 3) + height / 4) + (slimming / 2));
		context.lineTo(this.x - slimming + width, this.y - (height / 3));
		context.lineTo(this.x - slimming + width, this.y + (height / 4));
		context.lineTo(this.x + (width / 2), this.y + (height / 2) - (slimming / 2));
		context.lineTo(this.x + slimming, this.y + (height / 4));
		context.fill();
		context.closePath();
		
		context.beginPath();
		context.fillStyle = "#000000";
		context.moveTo(this.x + (width / 2), this.y + ((height / 4) - (height / 3)) - (slimming / 2));
		context.lineTo(this.x + (width / 2), this.y + (height / 2) - (slimming / 2));
		context.lineTo(this.x - slimming + width, this.y + (height / 4));
		context.lineTo(this.x - slimming + width, this.y - (height / 3));
		context.fill();
		context.closePath();
		
		context.beginPath();
		context.fillStyle = "#333333";
		context.moveTo(this.x + slimming, this.y - (height / 3));
		context.lineTo(this.x + (width / 2), this.y + ((height / 4) - (height / 3)) - (slimming / 2));
		context.lineTo(this.x - slimming + width, this.y - (height / 3));
		context.lineTo(this.x + (width / 2), this.y - ((height / 3) + height / 4) + (slimming / 2));
		context.lineTo(this.x + slimming, this.y - (height / 3));
		context.fill();
		context.closePath();
	};
};
tile_data.lookup['ScrollSprite'] = function(context, depth, x, y){
	width = tile_data.size;
	height = tile_data.size;
	slimming = tile_data.size / 6;
	this.x = x;
	this.y = y;
	this.depth = depth;
	this.layer = 3;
	this.type = "sprite"
	this.render = function(){
		context.beginPath();
		context.fillStyle = "#FFFFFF";
		context.moveTo(this.x + slimming, this.y + (height / 4));
		context.lineTo(this.x + slimming, this.y - (height / 3));
		context.lineTo(this.x + (width / 2), this.y - ((height / 3) + height / 4) + (slimming / 2));
		context.lineTo(this.x - slimming + width, this.y - (height / 3));
		context.lineTo(this.x - slimming + width, this.y + (height / 4));
		context.lineTo(this.x + (width / 2), this.y + (height / 2) - (slimming / 2));
		context.lineTo(this.x + slimming, this.y + (height / 4));
		context.fill();
		context.closePath();
		
		context.beginPath();
		context.fillStyle = "#AAAAAA";
		context.moveTo(this.x + (width / 2), this.y + ((height / 4) - (height / 3)) - (slimming / 2));
		context.lineTo(this.x + (width / 2), this.y + (height / 2) - (slimming / 2));
		context.lineTo(this.x - slimming + width, this.y + (height / 4));
		context.lineTo(this.x - slimming + width, this.y - (height / 3));
		context.fill();
		context.closePath();
		
		context.beginPath();
		context.fillStyle = "#DDDDDD";
		context.moveTo(this.x + slimming, this.y - (height / 3));
		context.lineTo(this.x + (width / 2), this.y + ((height / 4) - (height / 3)) - (slimming / 2));
		context.lineTo(this.x - slimming + width, this.y - (height / 3));
		context.lineTo(this.x + (width / 2), this.y - ((height / 3) + height / 4) + (slimming / 2));
		context.lineTo(this.x + slimming, this.y - (height / 3));
		context.fill();
		context.closePath();
	};
};