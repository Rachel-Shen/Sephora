require.config({	
	paths:{
		"load":"load",
		"data":"data",
		"banner1":"lib/banner.1.0",
		"banner":"banner",
		"fixed":"fixed",
		"tab":"tab",
		"ajax":"lib/ajax"
	}
})


require(["load","data","banner","fixed","tab"],function(load,data,banner,fixed,tab){

	var options = {
		url:"http://localhost:3000/index",
		skinCareList:$(".category_skinCare .category-body-content-right"),
		makeUpList:$(".category_makeUp .category-body-content-right"),
		fragranceList:$(".category_fragrance .category-body-content-right"),
		toolsList:$(".category_tools .category-body-content-right"),
		manSkinCareList:$(".category_manSkinCare .category-body-content-right"),
		bodyCareList:$(".category_bodyCare .category-body-content-right"),
		hairCareList:$(".category_hairCare .category-body-content-right"),
		youLikeList:$(".guessyoulike-info-content"),
		picksList1:$(".picks-list1"),
		picksList2:$(".picks-list2"),
		list:$(".brand-title-content-right").children("li"),
		show:$(".module_tabGroupList").children("ul")
	}

	load.init()
	data.init(options)
	banner.init()
	fixed.init()
	tab.init(options)
})