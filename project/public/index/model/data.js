define(["ajax"],function(){

	class Data{
		constructor(){}
		init(options){
			this.url = options.url;
			this.skinCareList = options.skinCareList;
			this.makeUpList = options.makeUpList;
			this.fragranceList = options.fragranceList;
			this.toolsList = options.toolsList;
			this.manSkinCareList = options.manSkinCareList;
			this.bodyCareList = options.bodyCareList;
			this.hairCareList = options.hairCareList;
			this.youLikeList = options.youLikeList;
			this.picksList1 = options.picksList1;
			this.picksList2 = options.picksList2;

			var that = this;
			ajax({
				url:this.url,
				success:function(res){
					that.res=res
					that.display();
				}
			})
		}
		display(){
			var str1=""
		 	var str2=""
		 	var str3=""
		 	var str4=""
		 	var str5=""
		 	for (var i = 0; i < 2; i++) {
		 		str1 += `<li index="${this.res[i].goodsID}">
										<a href="../../../../detail.html?id=${this.res[i].goodsID}" target="_blank">
											<div class="picks-info-product-brand">${this.res[i].brand}</div>
											<div class="picks-info-product-content over">${this.res[i].title}</div>
											<div class="picks-info-product-price">￥${this.res[i].price}</div>
											<img src="${this.res[i].src}">
										</a>
									</li> `
		 	}
			this.picksList1.html(str1)						
		 	for (var i = 8; i < 10; i++) {
		 		str2 += `<li index="${this.res[i].goodsID}">
										<a href="../../../../detail.html?id=${this.res[i].goodsID}" target="_blank">
											<div class="picks-info-product-brand">${this.res[i].brand}</div>
											<div class="picks-info-product-content over">${this.res[i].title}</div>
											<div class="picks-info-product-price">￥${this.res[i].price}</div>
											<img src="${this.res[i].src}">
										</a>
									</li> `
		 	}
			this.picksList2.html(str2)						
		 	for (var i = 0; i < 8; i++) {
		 		str3 += `<li index="${this.res[i].goodsID}">
								<a href="../../../../detail.html?id=${this.res[i].goodsID}" target="_blank">
									<div class="module_categoryProduct_img">
										<img src="${this.res[i].src}">
									</div>
									<div class="module_categoryProduct_content module_categoryProduct_brand">${this.res[i].brand}</div>
									<div class="module_categoryProduct_content module_categoryProduct_content over">${this.res[i].title}</div>
									<div class="module_categoryProduct_content module_categoryProduct_price">￥${this.res[i].price}</div>
								</a>
							</li>`
		 	}
		 	for (var i = 8; i < this.res.length; i++) {
		 		str4 += `<li index="${this.res[i].goodsID}">
								<a href="../../../../detail.html?id=${this.res[i].goodsID}" target="_blank">
									<div class="module_categoryProduct_img">
										<img src="${this.res[i].src}">
									</div>
									<div class="module_categoryProduct_content module_categoryProduct_brand">${this.res[i].brand}</div>
									<div class="module_categoryProduct_content module_categoryProduct_content over">${this.res[i].title}</div>
									<div class="module_categoryProduct_content module_categoryProduct_price">￥${this.res[i].price}</div>
								</a>
							</li>`
		 	}

		 	this.skinCareList.html(str3);
		 	this.makeUpList.html(str4);
		 	this.fragranceList.html(str3);
		 	this.toolsList.html(str4);
		 	this.manSkinCareList.html(str3);
		 	this.bodyCareList.html(str4);
		 	this.hairCareList.html(str3);
		 	
		 	for (var i = 0; i < 15; i++) {
		 		str5 += `<li index="${this.res[i].goodsID}">
								<a href="../../../../detail.html?id=${this.res[i].goodsID}" target="_blank" class="guessyoulike-info-list-img"><img src="${this.res[i].src}"></a>
								<p class="guessyoulike-info-list-brand">${this.res[i].brand}</p>
								<a href="http://localhost/sephora/detail/detail.html" target="_blank" class="guessyoulike-info-list-content over">${this.res[i].title}</a>
								<p class="guessyoulike-info-list-price">￥${this.res[i].price}</p>
							</li>`
		 	}
		 	this.youLikeList.html(str5)
		}
	}
	
	return new Data();
})