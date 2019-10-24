import {code2session, fingerVerify,decryptPhone} from "../../service"
const state= {
    openid: null,
    phoneNumber:""
}
const mutations={
    updateOpenid(state,payload){
        state.openid=payload
    },
    setphoneNumber(state,payload){
        state.phoneNumber=payload
    }
}
const actions= {
    async login({commit},params){
        let data=await code2session(params);
        console.log("data...",data)
        if(data.openid){
            commit('updateOpenid',data.openid)
        }
        if(data.phone.length){
            commit("setphoneNumber",data.phone)
        }
    },
    async fingerVerifyAction({state:{openid}},params){
        params.openid=openid;
        let data=await fingerVerify(params);
        return data.code
    },
    async decryptPhoneAction({commit},params){
        let data=await decryptPhone(params)
        console.log(data,"dataaaaaa")
        if(data.phoneNumber){
            commit("setphoneNumber",data.phoneNumber)
        }
        return data
    }
}
const getters={
    phoneNumber:state=>state.phoneNumber

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}