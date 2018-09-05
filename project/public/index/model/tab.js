define(function(){

	class Tab{
		constructor(){}
		init(options){
			 this.list = options.list;
			 this.show = options.show;
			 for (var i = 0; i < this.list.length - 1; i++) {
			 	this.list[i].num = i;
			 	var that=this
			 	this.list[i].onclick = function() {
			 		for (var j = 0; j < that.list.length - 1; j++) {
			 			that.list[j].className = "";
			 			that.show[j].className = "";
			 		}
			 		this.className = "active"
			 		that.show[this.num].className = "module_tabGroupList_show";
			 	}
			 }
		}
	}
	
	return new Tab();
})