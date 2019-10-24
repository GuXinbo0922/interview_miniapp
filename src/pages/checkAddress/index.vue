<template>
  <div>
    <p>
      <span>北京</span>
      <input type="text" v-model="address" @input="search" />
    </p>
    <div>
      <div v-for="(item,index) in addressList" :key="index" class="address-item">
        <div @click="checkAddress(item)">
          <li>{{item.title}}</li>
          <li>{{item.address}}</li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QQMapWX from "../../util/qqmap-wx-jssdk.min.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      address: "",
      addressList: []
    };
  },
  methods: {
    ...mapMutations("sign", ["sureAddress"]),
    checkAddress(item){
      console.log(item,"999")
      this.sureAddress(item)
      wx.navigateTo({ url: "../addInterview/index" });
    },
    search() {
      //实例化API核心类
      let qqmapsdk = new QQMapWX({
        key: "ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM"
      });
      qqmapsdk.getSuggestion({
        //获取输入框的值并设置keyword参数
        keyword: this.address, //用户输入的关键词，可设置固定值
        region: "北京",
        success: res => {
          //搜索成功后的回调
          console.log(res,"address");
          this.addressList = res.data;
        }
      });

      wx.getLocation({
        success: res => {
          console.log("res...", res);
          const latitude = res.latitude;
          const longitude = res.longitude;
          const speed = res.speed;
          const accuracy = res.accuracy;
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="scss">
p {
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #ccc;
  span {
    padding: 0 10px;
  }
  input {
    height: 44px;
    line-height: 44px;
    padding-left: 10px;
    border-left: 1px solid #ccc;
  }
}
.address-item {
  border-bottom: 1px solid #000;
}
</style>