var RenderQueue = function(){
	var _heap = [];
	var _count = 0;
	var _lookup = [];
	this.enqueue = function(obj){
		_count++;
		_heap[_count] = obj;
		_lookup[obj] = _count;
		walk_up(_count);
	};
	this.swap_depth = function(obj, depth){
		if(!_lookup[obj]) return;
		var old_depth = obj.depth;
		obj.depth = depth;
		var pos = _lookup[obj];
		old_depth > depth ? walk_up(pos) : walk_down(pos);
	};
	var walk_up = function(index){
		if(_heap.length < 2) return;
		while(true){
			if(index - 1 >= 1 && _heap[index].depth < _heap[index - 1].depth){
				var tmp = _heap[index - 1];
				_lookup[_heap[index - 1]] = index;
				_lookup[_heap[index]] = index - 1;
				_heap[index - 1] = _heap[index]
				_heap[index] = tmp;
			}else{
				break;
			};
			index--;
		};
	};
	var walk_down = function(index){
		if(_heap.length < 2) return;
		while(true){
			if(index + 1 <= _count && _heap[index].depth > _heap[index + 1].depth){
				var tmp = _heap[index + 1];
				_lookup[_heap[index + 1]] = index;
				_lookup[_heap[index]] = index + 1;
				_heap[index + 1] = _heap[index];
				_heap[index] = tmp;
			}else{
				break;
			};
			index++;
		};
	};
	this.toArray = function(){
		return _heap.slice(1, _count + 1);
	};
};
var RenderQueueIterator = function(render_queue){
	var _values = render_queue.toArray();
	var _length = _values.length;
	var _cursor = 0;
	this.data = function(obj){
		if(obj != undefined){
			_values[_cursor] = obj;
		}else{
			return _values[_cursor];
		};
	};
	this.start = function(){
		_cursor = 0;
	};
	this.has_next = function(){
		return _cursor < _length;
	};
	this.next = function(){
		return _values[_cursor++];
	};
};