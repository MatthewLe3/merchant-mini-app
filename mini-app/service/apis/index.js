import {service} from '../request.js'

export const test = async () =>{
	let res = await service({
		url:'/np/test1/',
	})
	return res
}

export const register = async (data) =>{
	let res = await service({
		url:'/user_manage/user_register/',
		data
	})

	return res
}


export const getUserInfo = async (data) => {
	let res = await service({
		url:'/user_manage/get_user_info/',
		data
	})

	return res
}

export const updateUserInfo = async (data) => {
	let res = await service({
		url:'/user_manage/update_user_info/',
		data
	})

	return res
}

export const getStoreInfo = async (data) => {
	let res = await service({
		url:'/store_manage/get_store_info/',
		data,
		method:'get'
	})

	return res
}

export const addGoods = async (data) => {
	let res = await service({
		url:'/goods_manage/add_goods/',
		data
	})

	return res
}

export const getGoodsInfo = async (data) => {
	let res = await service({
		url:'/goods_manage/get_goods_info/',
		data,
		method:'get'
	})

	return res
}

export const newStore = async (data) => {
	let res = await service({
		url:'/store_manage/new_store/',
		data
	})

	return res
}

export const updateStoreInfo = async (data) => {
	let res = await service({
		url:'/store_manage/update_store_info/',
		data
	})

	return res
}

export const deleteStore = async (data) => {
	let res = await service({
		url:'/store_manage/delete_store/',
		data
	})

	return res
}
