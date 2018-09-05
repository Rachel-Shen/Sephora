 $(".footer").load("../../../public/public.html .footer-declaration")

class Login{
	constructor(options){
        this.url = options.url;
        this.userInp = options.userInp;
        this.passInp = options.passInp;
        this.tip = options.tip;
        this.confirmBtn = options.confirmBtn;

        this.validate();
    }
    validate(){
    	var that=this
    	this.userInp.blur(function(){
    		if (this.value.length>0) {
    			that.success()  			
    		} else {
    			that.error("请输入用户名")
    		}
    	})

    	this.passInp.blur(function(){
    		if (this.value.length>0) {
    			that.success()
    		} else {
    			that.error("请输入密码")
    		}
    	})

        this.login()
    }
    success(){
    	this.tip.children("div").css({display: 'none'});
		this.tip.children("span").css({display: 'none'});
		this.tip.children("span").html("");
    }
    error(msg){
    	this.tip.children("div").css({display: 'block'});
		this.tip.children("span").css({display: 'block'});
		this.tip.children("span").html(msg);
    }
    login(){
    	var that = this;
    	this.confirmBtn.click(function() {
    		var user = that.userInp.val();
			var pass = that.passInp.val()

            ajax({
                url:that.url,
                data:{username:user,password:pass},
                success:function(res){
                    if (res.data) {
                        if (res.data[0].password==pass) {
                            localStorage.setItem("user",user)
                            location.href="../../../index.html";
                        } else {
                            that.error("用户名或密码错误")
                        }
                    }else {
                        that.error("用户名不存在，立即注册？")
                    }
                }
            })
		})
    }
}


new Login({
    url:"http://localhost:3000/login",
	userInp:$("input[name='user']"),
	passInp:$("input[name='password']"),
	tip:$(".tip"),
	confirmBtn:$(".confirmButton")
})





