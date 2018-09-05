$(".top").load("../../../public/public.html .top-content",function(){
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
 $(".footer").load("../../../public/public.html .footer-content")

class Shopping{
    constructor(options){
        this.url = options.url;
        this.url2 = options.url2;
        this.productList = options.productList;
        this.youLikeList = options.youLikeList;
        this.load()
    }
    load(){
        var that = this;
        ajax({
            url:this.url,
            data:{user:localStorage.getItem('user')},
            success:function(res){
                that.res = res;
                that.display()
                that.counting()
                that.remove()
            }
        })
    }
    display(){
        var str = ""
        for(var i=0;i<this.res.length;i++){
            str += `<div class="product-body" index="${this.res[i].goodsID}">
                        <div class="product-body-content">
                            <em class="_checkbox none"></em>
                            <a href="#" target="_blank" class="product-body-content-img">
                                <img src="${this.res[i].shopImg}">
                            </a>
                            <div class="product-body-content-info">
                                <h5>${this.res[i].brand}</h5>
                                <a href="#" target="_blank" class="product-body-content-productNameCN">${this.res[i].title}</a>
                            </div>
                            <div class="product-body-content-unit">
                                <span>${this.res[i].price}</span>
                            </div>
                            <div class="product-body-content-amount">
                                <div class="product-body-content-amount-module clear">
                                    <span class="product-body-content-amount-btn reduce">-</span>
                                    <span class="product-body-content-amount-num sum">${this.res[i].num}</span>
                                    <span class="product-body-content-amount-btn plus">+</span>
                                </div>
                            </div>
                            <div class="product-body-content-subtotal">
                                <span>${this.res[i].price*this.res[i].num}</span>
                            </div>
                            <div class="product-body-content-handle">
                                <i class="product-body-content-handle-delete"></i>
                            </div>
                        </div>          
                    </div>`

        }
        this.productList.html(str)
    }

    show(){
        var str = ""
        for(var i=0;i<5;i++){
            str += `<li>
                        <a href="../../../detail.html?id=${this.res[i].goodsID}" target="_blank" class="guessyoulike-info-list-img"><img src="${this.res[i].src}"></a>
                        <p class="guessyoulike-info-list-brand">${this.res[i].brand}</p>
                        <a href="http://localhost/sephora/detail/detail.html?id=${this.res[i].goodsID}" target="_blank" class="guessyoulike-info-list-content over">${this.res[i].title}</a>
                        <p class="guessyoulike-info-list-price">￥${this.res[i].price}</p>
                    </li>`           
        }
        this.youLikeList.html(str)
    }

    counting(){
        var $allCheckbox = $("._checkbox");
        var $wholeChexbox = $('.allcheckbox');
        var $checkboxs = $(".product-body").find('._checkbox');
        var that=this;
        $allCheckbox.click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active')
            }
            totalMoney();
        });

        $wholeChexbox.click(function () {
            if ($(this).hasClass('active')) {
                $checkboxs.addClass('active');
            } else {
                $checkboxs.removeClass('active');
            }
            totalMoney();
        });

        $checkboxs.each(function () {
            $(this).click(function () {
                if ($(this).hasClass('active')) {
                    //判断：所有单个商品是否勾选
                    var len = $checkboxs.length;
                    var num = 0;
                    $checkboxs.each(function () {
                        if ($(this).hasClass('active')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $wholeChexbox.addClass('active');
                    }
                } else {
                    //单个商品取消勾选，全局全选取消勾选
                    $wholeChexbox.removeClass('active');
                }
            })
        })


       $('.plus').click(function () {
            var goodsId = $(this).parent().parent().parent().parent().attr("index")
            var $sumVal = $(this).prev();
            var $count = parseInt($sumVal.html())+1;
            var $price = $(this).parent().parent().prev().find("span").html();  //单价
            var $priceTotal = $count*$price;
            $sumVal.html($count);
            $(this).parent().parent().next().find("span").html($priceTotal);
            that.Ajax(1,goodsId,$count)
            totalMoney();
        });

        $('.reduce').click(function () {   
            var goodsId = $(this).parent().parent().parent().parent().attr("index")     
            var $sumVal = $(this).next();
            if($sumVal.html()>1){
                var $count = parseInt($sumVal.html())-1;
                var $price = $(this).parent().parent().prev().find("span").html();  //单价
                var $priceTotal =  $count*$price;
                $sumVal.html($count);
                $(this).parent().parent().next().find("span").html($priceTotal);
                that.Ajax(1,goodsId,$count)
            }
            totalMoney();

        });

        function totalMoney() {
            var total_money = 0;
            var total_count = 0;
            var calBtn = $('.calBtn a');
            $checkboxs.each(function () {
                if ($(this).hasClass('active')) {
                    var goods = parseFloat($(this).parent().find('.product-body-content-subtotal').children('span').html());
                    var num =  parseFloat($(this).parent().find('.sum').html());
                    total_money += goods;
                    total_count += num;
                }
            });
            $('.goods-num span').html(total_count);
            $('.totalMoney span').html(total_money);
        }
    }

    remove(){
        var that=this
        $(".product-body-content-handle-delete").click(function() {
            var goods = $(this).parent().parent().parent().attr("index")
            $(this).parent().parent().parent().remove()
            that.Ajax(1,goods,0)
        });

        $(".bar-left span").click(function() {
            that.productList.html("")
            that.Ajax(0)        
        });
    }

    Ajax(type,goodsId,num){
        var that = this;
        ajax({
            url:this.url2,
            data:{type:type,user:localStorage.getItem('user'),goodsId:goodsId,num:num},
            success:function(res){
                console.log(res)
            }
        })
    }
}

new Shopping({
    url:"http://localhost:3000/shopping",
    url2:"http://localhost:3000/changeCar",
    productList:$(".product-body-wrap"),
    youLikeList:$(".guessyoulike-info-content"),
})