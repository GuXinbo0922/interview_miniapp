<script>
    import {mapActions} from "vuex"
    export default {
        methods:{
            ...mapActions("user",["login"])
        },
        onLaunch: function() {
            //小程序初始化时触发App里的onLaunch
            wx.login({
                complete:res=>{
                    console.log('res...',res);
                    /**
                     * 通过code获取openid  
                     * 将请求到的openid通过请求头携带上（相当于token），做后续的项目操作
                     * */
                    if(res.code){
                        this.login({code:res.code})
                    }else{
                        wx.showToast({
                            title:res.errMsg,//提示的内容
                            icon:'none',//图标
                        })
                    }
                }
            })
        }
    }
</script>

<style>
    /* #ifndef APP-PLUS-NVUE */
    /* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
    @import './common/uni.css';

    /* 以下样式用于 hello uni-app 演示所需 */
    page {
        background-color: #F4F5F6;
        height: 100%;
        font-size: 28upx;
        line-height: 1.8;
    }

    .uni-header-logo {
        padding: 30upx;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10upx;
    }

    .uni-header-image {
        width: 100px;
        height: 100px;
    }

    .uni-hello-text {
        color: #7A7E83;
    }

    .uni-hello-addfile {
        text-align: center;
        line-height: 300upx;
        background: #FFF;
        padding: 50upx;
        margin-top: 10px;
        font-size: 38upx;
        color: #808080;
    }

    /* #endif*/
</style>
