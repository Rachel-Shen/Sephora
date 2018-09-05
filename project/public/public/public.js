$(".top").load("../public/public.html .top-content",function(){
	var span1=document.querySelector(".top-content-left").children[1]
 	var span2=document.querySelector(".top-content-left").children[3]
 	var span3=document.querySelector(".top-content-left").children[4]
	if (localStorage.getItem('user')) {
	 	var user = localStorage.getItem('user');
	 	span1.innerHTML=user
	 	span1.onclick=function(){
	 		location.href="../../member.html"
	 	}
	 	span2.innerHTML="退出"
	 	span2.onclick=function(){
	 		console.log(1)
	 		localStorage.removeItem('user');
	 		location.href="../../index.html"
	 	}
	 	span3.innerHTML=""
	}else {
		span1.innerHTML="请登录"
 		span1.onclick=function(){
	 		location.href="../../login.html"
	 	}
 		span2.innerHTML="免费注册"
 		span2.onclick=function(){
	 		location.href="../../register.html"
	 	}
 		span3.innerHTML="手机验证码登录"
	}
 })
 $(".search").load("../public/public.html .search-content",function(){
	var a = document.querySelector(".search-content-shopping-main a")
 	if (localStorage.getItem('user')) {
 		a.href="../../shopping.html"
    } else {
	    a.href="../../login.html"
	}
 })
 $(".Navigation").load("../public/public.html .navigation-content",function(){
 	$(".navigation-content-menu-Col li").mouseover(function() {
	 	$(".navigation-content-menu-Col li").removeClass("active")
	 	$(".navigation-content-hover").removeClass("on")
	 	$(this).addClass("active")
	 	$(this).find(".navigation-content-hover").addClass("on")
	 })
	 $(".navigation-content-menu-Col li").mouseout(function() {
	 	$(this).removeClass("active")
	 	$(this).find(".navigation-content-hover").removeClass("on")
	 })
})
$(".footer").load("../public/public.html .footer-content")