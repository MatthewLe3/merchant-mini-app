import {service} from '../request.js'

export const getData = async (data) =>{
	let res = await service({
		url:'/cooperation_manage/get_cooperation_info_by_status_and_test_result/',
		data
	})
    return res
}

export const getStoreGoodsInfo = async (data) =>{
	let res = await service({
		url:'/goods_manage/get_store_goods_info/',
		data
	})
    return res
}

export const newCooperation = async (data) => {
    let res = await service({
		url:'/cooperation_manage/new_cooperation/',
		data
	})
    return res
}

export const updateCooperationInfo = async (data) => {
    let res = await service({
		url:'/cooperation_manage/update_cooperation_info/',
		data
	})
    return res
}

export const getCooperatioInfoById = async (data) => {
    let res = await service({
		url:'/cooperation_manage/get_cooperation_info_by_id/',
		data
	})
    return res
}

export const sendApply = async (data) => {
    let res = await service({
		url:'/cooperation_manage/send_apply/',
		data
	})
    return res
}

export const sendSample = async (data) => {
    let res = await service({
		url:'/cooperation_manage/send_sample/',
		data
	})
    return res
}

export const applyForSample = async (data) => {
    let res = await service({
		url:'/cooperation_manage/apply_for_sample/',
		data
	})
    return res
}
export const testSample = async (data) => {
    let res = await service({
		url:'/cooperation_manage/test_sample/',
		data
	})
    return res
}



export const test2 = async () =>{
	let res = await new Promise((reslove,reject)=>{
        reslove({
            code:200,
            data:[],
            msg:''
        })
    })
    return res
}
