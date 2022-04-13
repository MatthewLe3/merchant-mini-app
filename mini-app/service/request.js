import { ENV,X_WX_SERVICE } from "../config"

export const service = async ({
	url='',
	dataType = 'application/json',
	method = "POST",
	data = {}
}) => {
	uni.showLoading({
		title: '加载中'
	});
	let res = await wx.cloud.callContainer({
		config:{
			env:ENV
		},
		path:url,
		header:{
			"X-WX-SERVICE": X_WX_SERVICE,
        	"content-type": dataType
		},
		method,
		data
	})

	uni.hideLoading();
	return res.data
}


