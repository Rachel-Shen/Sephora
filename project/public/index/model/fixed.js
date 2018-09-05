define(function(){

	class Fixed{
		constructor(){}
		init(){
			var that=this
		 	$(window).scroll(function() {
		 		var top = $(document).scrollTop();
		 		if (top > 600) {
		 			$(".FixedTop").addClass("active");
		 		}
		 		if (top < 600) {
		 			$(".FixedTop").removeClass("active");
		 		}
		 		if (top > 1190) {
		 			$(".FixedLeft").addClass("active");
		 		}
		 		if (top < 1190) {
		 			$(".FixedLeft").removeClass("active");
		 		}

		 		if (top > 800) {
		 			$(".FixedRight").addClass("active");
		 			that.cookie()
		 		}
		 		if (top < 800) {
		 			$(".FixedRight").removeClass("active");
		 		}
		 	});
		 	this.move();
		}
		move(){			
	 		$(".fixedLeft-info-content-list").children("li").click(function() {
	 			var scrollT = $(".category").eq($(this).index()).offset().top;
	 			$("html").stop().animate({
	 				scrollTop: scrollT - 100
	 			}, 1000)
	 			$(".fixedLeft-info-content-list").children("li").removeClass("active")
	 			$(this).addClass("active")
	 		})

	 		$(".returnTop").click(function() {
			 	$("html").stop().animate({
			 		scrollTop: 0
			 	}, 1000)
			 })
		}
		cookie(){
        	var a1 = document.querySelector(".myAccount a")
        	var a2 = document.querySelector(".myCart a")
			if (localStorage.getItem('user')) {
			 	a1.href="../../member.html"
			    a2.href="../../shopping.html"
			}else {
	        	a1.href="../../login.html"
		        a2.href="../../login.html"
	        }
		}
	}	
	return new Fixed();
})