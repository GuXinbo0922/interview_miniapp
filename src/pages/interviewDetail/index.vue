<template>
  <div>
    <form>
      <li>
        <span class="tip">面试地址</span>
        <span class="content address">{{data.newAddress}}</span>
      </li>
      <li>
        <span class="tip">面试时间</span>
        <span class="content">{{new Date(data.start_time * 1).toLocaleString()}}</span>
      </li>
      <li>
        <span class="tip">联系方式</span>
        <span class="content">{{data.phone}}</span>
      </li>
      <li>
        <span class="tip">是否提醒</span>
        <span class="content" v-if="data.remind===-1">未提醒</span>
        <span class="content" v-if="data.remind===0">已提醒</span>
      </li>
      <li>
        <span class="tip">面试状态</span>
        <span class="content" v-if="data.status===-1">未开始</span>
        <span class="content" v-if="data.status===0">已打卡</span>
        <span class="content" v-if="data.status===1">已放弃</span>
      </li>
      <li>
        <span class="tip">取消提醒</span>
        <span class="content">
          <switch :checked="cancelRemind" @change="switch1Change" />
        </span>
      </li>
    </form>
    <div class="btns">
      <button class="btn" style="background:royalblue">去打卡</button>
      <button class="btn" style="background:tomato" @click="abandon">放弃面试</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      //id:wx.getStorageSync("detailId")
      data: {},
      cancelRemind: false,
      id:wx.getStorageSync("detailId")
    };
  },
  methods: {
    ...mapActions("sign", ["interviewDetailAction","updateInterviewAction"]),
    switch1Change() {
      console.log("0000",this.id);
      this.cancelRemind = !this.cancelRemind;
      let remind=this.cancelRemind ?1:-1
      this.updateInterviewAction({id:this.id,data:{remind}})
    },
    abandon(){
        this.updateInterviewAction({id:this.id,data:{status:1}})
    }
  },
  created() {
    wx.getStorage({
      key: "detailId",
      success: async res => {
        let result = await this.interviewDetailAction(res.data);
        console.log(result, "resssssss");
        this.data = result;
        let reg = /^{/;
        if (reg.test(result.address)) {
          this.data.newAddress = JSON.parse(result.address).address;
        } else {
          this.data.newAddress = result.address;
        }
        uni.setNavigationBarTitle({
          title: result.company
        });
      }
    });
  }
};
</script>
<style lang="scss">
li {
  display: flex;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #ccc;
  padding-left: 10px;
  .tip{
      flex:3
  }
  .content {
      flex:7;
    display: flex;
    margin-left: 10px;
    height: 44px;
    line-height: 44px;
  }
  .address {
    display: flex;
    margin-left: 10px;
    height: 44px;
    overflow: hidden;
  }
}
.btns {
  display: flex;
  padding: 10px;
  .btn {
    width: 45%;
    color:#fff;
  }
}
</style>
/**address: ""北京市东城区北三环东路36号环球贸易中心E座1层""
company: "环球"
create_time: "1571795653165"
description: "测试form_id"
form_id: "cd9f22cbac3a488d9d23323afa677810"
id: 3528
latitude: 39.59
longitude: 116.18
openid: "oUy9p5PN65_b2rVAtChyCN0bzLwg"
phone: "15981676102"
remind: -1
sign_time: null
start_time: "-158739836"
status: 1 */