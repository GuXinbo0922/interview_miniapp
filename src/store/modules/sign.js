import { requestAddInterview, requestInterviews, requestInterviewDetail, requestUpdateInterview } from "../../service/index"

const state = {
    address: ""
}

const mutations = {
    sureAddress(state, payload) {
        console.log(payload, "payload")
        state.address = payload
    }
}
const actions = {
    async addInterviewAction({ commit }, params) {
        let data = await requestAddInterview(params)

        return data;
    },
    async getInterviewsAction({ commit }, params) {
        let data = await requestInterviews(params)
        console.log(data,"akakakakakaak")
        return data;
    },
    async interviewDetailAction({ commit }, params) {
        let data = await requestInterviewDetail(params)
        return data;
    },
    async updateInterviewAction({ commit }, params) {
        let data = await requestUpdateInterview(params)
        console.log(data, "datainterview")
        return data;
    }

}
const getters = {
    address: state => state.address
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters

}
