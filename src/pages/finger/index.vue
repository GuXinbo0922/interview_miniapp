<template>
  <div>
    指纹识别页面
    <button @click="startFinger">点击认证</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      fingerVerifyAction: "user/fingerVerify"
    }),
    startFinger() {
      //指纹解锁
      wx.startSoterAuthentication({
        requestAuthModes: ["fingerPrint"],
        challenge: "每天用指纹解锁一次",
        authContent: "请用指纹解锁",
        success: async res => {
          console.log("res...", res);
          if (res.errCode === 0) {
            /**请求成功 解构出生物认证接口用到的参数 */
            let { resultJSON, resultJSONSignature } = res;
            let result = await this.fingerVerifyAction({
              json_string: resultJSON,
              json_signature: resultJSONSignature
            });
            if (result === 0) {
                /**指纹验证成功 将finger存入到本地存储中 并返回上一页面*/
              wx.setStorageSync("finger", {
                finger: true,
                timestamp: +new Date()
              });
              wx.navigateBack();
            } else {
              wx.showToast({
                title: "指纹验证失败", //提示的内容,
                icon: "none" //图标,
              });
            }
          }
        }
      });
    },
    onLoad() {
      //获取本机支持的 SOTER 生物认证方式
      wx.checkIsSupportSoterAuthentication({
        success(res) {
          console.log(res, "res");
          if (res.supportMode.indexOf("fingerPrint") === -1) {
            wx.showToast({title:"本机不支持指纹识别"});
            /**判断本机若不支持指纹验证 则返回上一个页面 直接将finger存入到本地存储中 */
            wx.setStorageSync("finger", {
              finger: true,
              timestamp: +new Date()
            });
            wx.navigateBack();
          } else {
            console.log("指纹识别");
          }
        }
      });
    }
  }
};
</script>