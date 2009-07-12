var RenderQueue = function(){
	var _heap = [];
	var _count = 0;
	this.enqueue = function(obj){
		_count++;
		_heap[_count] = obj;
		walk_up(_count);
	};
	this.swap_depth = function(obj, depth){
		obj.depth = depth;
		quick_sort(_heap, 1, _heap.length);
	};
	this.contains = function(obj){
		for(var i = 1; i <= _count; i++){
			if(_heap[i] === obj) return true;
		};
		return false;
	};
	var walk_up = function(index){
		if(_heap.length < 2) return;
		while(true){
			if(index - 1 >= 1 && _heap[index].depth < _heap[index - 1].depth){
				var tmp = _heap[index - 1];
				_heap[index - 1] = _heap[index]
				_heap[index] = tmp;
			}else{
				break;
			};
			index--;
		};
	};
	this.toArray = function(){
		return _heap.slice(1, _count + 1);
	};
	var partition = function(array, begin, end, pivot){
		var piv = array[pivot];
		array.swap(pivot, end - 1);
		var store = begin;
		var ix;
		for(ix = begin; ix < end - 1; ++ix){
			if(array[ix].depth <= piv.depth){
				array.swap(store, ix);
				++store;
			};
		};
		array.swap(end - 1, store);
		return store;
	};
	var quick_sort = function(array, begin, end){
		if(end - 1 > begin){
			var pivot = begin + Math.floor(Math.random() * (end - begin));
			pivot = partition(array, begin, end, pivot);
			quick_sort(array, begin, pivot);
			quick_sort(array, pivot + 1, end );
		};
	};
};
Array.prototype.swap = function(a, b){
	var tmp = this[a];
	this[a] = this[b];
	this[b] = tmp;
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