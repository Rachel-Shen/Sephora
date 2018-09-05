 $(".footer").load("../../../public/public.html .footer-declaration")

class Register{
	constructor(options){
		this.url = options.url;
        this.userInp = options.userInp;
        this.passInp = options.passInp;
        this.vpswInp = options.vpswInp;
        this.confirmBtn = options.confirmBtn;
        this.a = false;
		this.b = false;
		this.c = false;

        this.validate();
    }
    validate(){
    	var that=this
    	this.userInp.blur(function(){
			var userReg=/^[\w\-\u2E80-\u9FFF]{4,20}$/
			if (userReg.test(this.value)) {
				that.success(this)
				that.a = true;
			} else{
				that.error(this,"不符合规则，仅支持中文、字母、数字、“-”“_”的组合，4-20个字符")
				that.a = false;
			}
		})

		this.passInp.blur(function(){
			if (this.value != that.vpswInp.val() && that.vpswInp.val() != "") {
				that.vpswInp.parent().next().children("div").css({display: 'block'});
				that.vpswInp.parent().next().children("span").css({display: 'block'});
				that.vpswInp.parent().next().children("span").html("密码不一致");
				that.c = false
			} else {
				that.vpswInp.parent().next().children("div").css({display: 'none'});
				that.vpswInp.parent().next().children("span").css({display: 'none'});
				that.vpswInp.parent().next().children("span").html("");
				that.c = true
			}
			if (this.value.length>=6 && this.value.length<=18) {
				var num=0
				var msg=""
				var numReg=/\d+/g
				var azReg=/[a-zA-Z]+/g
				var teReg=/[^a-zA-Z\d]+/g
				if (numReg.test(this.value)) {
					num++
				}
				if (azReg.test(this.value)) {
					num++
				}
				if (teReg.test(this.value)) {
					num++
				}
				if (num==1) {
					that.error(this,"不符合规则，至少包含一个数字和一个字母")
					that.b = false
				} else if (num==2 || num==3) {
					that.success(this)
					that.b = true
				}
			} else{
				that.error(this,"不符合规则，密码长度为6-18个字符")
				that.b = false
			}
		})

		this.vpswInp.blur(function(){
			if (this.value==that.passInp.val()) {
				that.success(this)
				that.c = true
			} else{
				that.error(this,"密码不一致")
				that.c = false
			}
		})
		this.regist();
    }
    success(obj){
    	obj.parentNode.nextElementSibling.children[0].style.display = 'none'
		obj.parentNode.nextElementSibling.children[1].style.display = 'none'  
		obj.parentNode.nextElementSibling.children[1].innerHTML=""
    }
    error(obj,msg){
    	obj.parentNode.nextElementSibling.children[0].style.display = 'block' 
		obj.parentNode.nextElementSibling.children[1].style.display = 'block' 
		obj.parentNode.nextElementSibling.children[1].innerHTML=msg
    }
    regist(){
    	var that = this;
    	this.confirmBtn.click(function() {
			if (that.a && that.b && that.c) {
				var user = that.userInp.val();
				var pass = that.passInp.val()
	            // that.setCookie(user,pass)
	            ajax({
			        url:that.url,
			        data:{username:user,password:pass},
			        success:function(res){
			            if (res.data) {
			            	that.userInp.parent().next().children("div").css({display: 'block'});
							that.userInp.parent().next().children("span").css({display: 'block'});
							that.userInp.parent().next().children("span").html("用户名已存在")
			            } else {
			            	localStorage.setItem("user",user)
			            	location.href="../../../index.html";
			            }
			        }
			    })
			}
		})
    }
}

new Register({
	url:"http://localhost:3000/register",
	userInp:$("input[name='user']"),
	passInp:$("input[name='pass']"),
	vpswInp:$("input[name='vpsw']"),
	confirmBtn:$(".confirmButton")
})
