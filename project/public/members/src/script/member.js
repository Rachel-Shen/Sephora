class Member{
	constructor(options){
        this.text = options.text;
        this.load();
    }
    load(){
    	if (localStorage.getItem('user')) {
		 	var user = localStorage.getItem('user');
		 	this.text.html(user)
	 	}
    }
}

new Member({
    text:$(".text p")
})


 











