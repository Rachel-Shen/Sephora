
class Detail{
	constructor(options){
        this.url = options.url;
        this.url2 = options.url2;
        this.main = options.main;
        this.image = options.image;
        this.goodsId = options.goodsId;
        this.load();
    }
    load(){
        var that = this;
        ajax({
			url:this.url,
			data:{id:this.goodsId},
			success:function(res){
				that.res=res
				that.display();
			}
		})
    }
    display(){    
		var str1 = `<div class="title clear">
						<div class="testBox left">
							<h1>${this.res.title}</h1>
							<p>${this.res.detTitleEn}</p>
							<p>${this.res.detShow}</p>
						</div>
						<img src="${this.res.detBrandImg}" class="right">
					</div>
					<div class="price">
						<p class="one">价格</p>
						<p class="two">￥</p>
						<p class="three">${this.res.price}</p>
					</div>
					<div class="capacityElse">
						<p id="title">规格</p>
						<span>${this.res.capacityElse}</span>
					</div>
					<div class="fourButton">
						<div class="number">
							<div class="numberBox left">
								<input type="number" value="1" min=1>
							</div>
						</div>
						<div class="addCartButton" index="${this.res.goodsID}">
							<p>加入购物车</p>
							<div class="add-icon"></div>
						</div>
					</div>`
		this.main.html(str1);						
		var str2 = `<div class="imgOrVideo">
						<div class="bigIcon"></div>
						<img src="${this.res.detImgOrVideo}" class="picture">
						<span></span>
						<p></p>
						<div class="magnifier-container">
							<img src="${this.res.detImgOrVideo}" class="magnifier-pic">
						</div>
					</div>
					<div class="controlModule">
						<ul class="pic-list">
							<li><img src="${this.res.picList}" class="" alt="" title=""></li>
						</ul>
					</div>`	
		this.image.html(str2);			

		this.bigger();
		this.addShopping()
    }
    bigger(){	 
		var oSbox=document.querySelector(".imgOrVideo")
		var oSpan=document.querySelector(".imgOrVideo span")
		var oBbox=document.querySelector(".magnifier-container")
		var oBimg=oBbox.children[0]

		oSbox.onmouseover=function(){
			oBbox.style.display="block"
			oSpan.style.display="block"
			
			oSbox.onmousemove=function(eve){
				var e=eve || window.event
				var l=e.offsetX - oSpan.offsetWidth/2 
				var t=e.offsetY - oSpan.offsetHeight/2 
			
				if(l<0) l=0;
				if(t<0) t=0;
				if(l>oSbox.offsetWidth-oSpan.offsetWidth) l=oSbox.offsetWidth-oSpan.offsetWidth;
				if(t>oSbox.offsetHeight-oSpan.offsetHeight) t=oSbox.offsetHeight-oSpan.offsetHeight;
				
				oSpan.style.left = l + "px";
				oSpan.style.top = t + "px";
				
				var x=oSpan.offsetLeft/(oSbox.offsetWidth-oSpan.offsetWidth)
				var y=oSpan.offsetTop/(oSbox.offsetHeight-oSpan.offsetHeight)
				
				oBimg.style.left=-x*(oBimg.offsetWidth - oBbox.offsetWidth)+"px"
				oBimg.style.top=-y*(oBimg.offsetHeight - oBbox.offsetHeight)+"px"
				
			}
		}

		oSbox.onmouseout=function(){
			oBbox.style.display="none"
			oSpan.style.display="none"
		}
	}
	addShopping(){
		var that = this;
		$(".addCartButton").click(function() {
			var goodsId = $(this).attr("index");
			var num = parseInt($(".number input").val())
            that.addCar(num)
		});
	}

	addCar(num){
		var that = this;
        ajax({
			url:this.url2,
			data:{user:localStorage.getItem('user'),id:this.goodsId,num:num},
			success:function(res){
				console.log(res)
			}
		})
	}
}

new Detail({
    url:"http://localhost:3000/detail",
    url2:"http://localhost:3000/addCar",
    main:$(".ProductMain"),
    image:$(".productImageChange"),
    goodsId:location.href.split("?")[1].split("=")[1]
})


 











