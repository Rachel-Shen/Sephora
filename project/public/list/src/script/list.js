
class Page{
    constructor(options){
        this.url = options.url;
        this.url2 = options.url2;
        this.list = options.list;
        this.num = options.num;
        this.index = 1;
        this.load()
    }
    load(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                that.res = res;
                that.display();
                that.createPage();
                that.init();
            }
        })
    }
    display(){
        var str = "";
        for(var i=this.num*this.index-this.num;i<this.num*this.index;i++){
            if(i<this.res.length){
                str += `<li index="${this.res[i].goodsID}">
                            <a href="../../../../detail.html?id=${this.res[i].goodsID}" target="_blank" class="mainList-info-list-img"><img src="${this.res[i].src}"></a>
                            <div class="p_buy">加入购物车</div>
                            <p class="mainList-info-list-brand">${this.res[i].brand}</p>
                            <a href="http://localhost/sephora/detail/detail.html?id=${this.res[i].goodsID}" target="_blank" class="mainList-info-list-content over">${this.res[i].title}</a>
                            <p class="mainList-info-list-price">￥${this.res[i].price}</p>
                        </li>`;
            }
        }
        this.list.html(str)
    }
    createPage(){
        var that = this;
        $(".tcdPageCode").createPage({
            pageCount:Math.ceil(this.res.length/this.num),
            current:1,
            backFn:function(index){
                that.index = index;
                that.display()
            }
        });
    }
    init(){
        var that = this;
        this.list.on("click","div",function(){
            var goodsId = $(this).parent().attr("index");
             that.addCar(goodsId,1)
        })
    }
    addCar(goodsId,num){
        var that = this;
        ajax({
            url:this.url2,
            data:{user:localStorage.getItem('user'),id:goodsId,num:num},
            success:function(res){
                console.log(res)
            }
        })
    }
}

new Page({
    url:"http://localhost:3000/list",
    url2:"http://localhost:3000/addCar",
    list:$(".mainList-info-content"),
    num:10
})


