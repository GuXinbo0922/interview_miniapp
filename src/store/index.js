import Vue from 'vue'
import Vuex from 'vuex'

import user from "./modules/user"
import sign from "./modules/sign"
import interview from './modules/interview'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		user,
		sign,
		interview
	},
	plugins:[]
})

export default store
