define(["banner1"],function(banner1){

	class Banner{
		constructor(){}
		init(){
			
			 $(".banner-imgbox").banner({
			 	items: $(".banner-imgbox a"), //必选,要切换的元素
			 	left: $(".carousel-multiple-arrows-left"), //可选，左按钮
			 	right: $(".carousel-multiple-arrows-right"), //可选，右按钮
			 	list: $(".banner-list"), //可选，下标按钮
			 	autoPlay: true, //可选，是否自动播放
			 	time: 3000, //可选，间隔时间
			 	moveTime: 1000, //可选，运动时间
			 })

			 $(".module-carousel").banner({
			 	items: $(".module-imgbox a"), //必选,要切换的元素
			 	left: $(".module-arrows-left"), //可选，左按钮
			 	right: $(".module-arrows-right"), //可选，右按钮
			 	list: $(".module-list"), //可选，下标按钮
			 	autoPlay: true, //可选，是否自动播放
			 	time: 3000, //可选，间隔时间
			 	moveTime: 800, //可选，运动时间
			 })
		}
	}
	
	return new Banner();
})