<template>
    <div>
        个人中心
        {{phoneNumber}}
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-show="!phoneNumber.length">
            点击获取手机号
        </button>
    </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
export default {
    methods:{
       ...mapActions("user",["decryptPhoneAction"]),
        getPhoneNumber(res){
            console.log("res...",res)
            if(res.detail.errMsg==="getPhoneNumber:ok"){
                let params={
                    iv:res.detail.iv,
                    encryptedData:res.detail.encryptedData
                }
                this.decryptPhoneAction(params)
            }
            
        }
    },
    computed:{
        ...mapGetters("user",["phoneNumber"])
    }
}
</script>