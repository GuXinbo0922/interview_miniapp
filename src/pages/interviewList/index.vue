<template>
  <div>
    <nav class="nav">
      <span
        v-for="(item,index) in navList"
        :key="index"
        :class="navIndex===index?'active':null"
        @click="changeIndex(index,item)"
      >{{item.title}}</span>
    </nav>
    <div v-for="(item) in interviewList" :key="item.id" class="interview-item">
      <div @click="jumpDetail(item)">
        <div class="item-top">
          <div class="item-top-left">{{item.company}}</div>
          <div class="item-top-right">
            <span v-if="item.status===-1">未开始</span>
            <span v-if="item.status===0">已打卡</span>
            <span v-if="item.status===1">已放弃</span>
          </div>
        </div>
        <p class="item-middle">{{item.newAddress}}</p>
        <p class="item-bottom">{{item.start_time}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      params: {},
      interviewList: [],
      navList: [
        {
          title: "未开始",
          status: -1
        },
        {
          title: "已打卡",
          status: 0
        },
        {
          title: "已放弃",
          status: 1
        },
        {
          title: "全部",
          status: ""
        }
      ],
      navIndex: 0,
      nowStatus: -1,
      nowPage: 1,
      isAll: false //是否为请求全部
    };
  },
  onPullDownRefresh() {
    console.log("下拉刷新");
  },
  onReachBottom() {
    console.log("上拉加载");
    this.nowPage = this.nowPage + 1;
    if (this.navIndex === 3) {
      this.getInterviewsList({ page: this.nowPage }, "add");
    } else {
      this.getInterviewsList({ page: this.nowPage,status:this.nowStatus }, "add");
    }
  },
  methods: {
    ...mapActions("sign", ["getInterviewsAction"]),
    onLoad: function(options) {
      setTimeout(function() {
        console.log("start pulldown");
      }, 1000);
      uni.startPullDownRefresh();
    },
    onPullDownRefresh() {
      console.log("refresh");
      setTimeout(function() {
        uni.stopPullDownRefresh();
      }, 1000);
    },
    changeIndex(index, item) {
      console.log(index, "index", item);
      this.navIndex = index;
      this.nowPage = 1;
      if (item.status !== "") {
        //this.params.status = ;
        this.nowStatus = item.status;
        this.getInterviewsList({ status: item.status, page: 1 });
      } else {
        this.nowStatus = "";
        this.getInterviewsList({ page: 1 });
      }
    },
    async getInterviewsList(params, type = "replace") {
      let list = await this.getInterviewsAction(params);
      list.map(item => {
        item.start_time = new Date(item.start_time * 1).toLocaleString();
        let reg = /^{/;
        if (reg.test(item.address)) {
          item.newAddress = JSON.parse(item.address).address;
        } else {
          item.newAddress = item.address;
        }
      });
      if (type === "replace") {
        this.interviewList = list;
      } else {
        this.interviewList = [...this.interviewList, ...list];
      }
    },
    jumpDetail(item) {
      wx.setStorageSync("detailId", item.id);
      wx.navigateTo({ url: "../interviewDetail/index" });
    }
  },
  computed: {},
  created() {
    this.getInterviewsList({ status: this.nowStatus });
  }
};
</script>
<style lang="scss">
.nav {
  height: 44px;
  line-height: 44px;
  display: flex;
  background: #fff;
  span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    color: seagreen;
    border-bottom: 1px solid seagreen;
  }
}
.interview-item {
  height: 80px;
  margin: 10px 0;
  background: #fff;
}
.item-top {
  display: flex;
  .item-top-left {
    flex: 7;
  }
  .item-top-right {
    flex: 3;
  }
}
</style>

/**
address: ""北京市昌平区汤尚路339号""
company: "就看看"
create_time: "1565333553611"
description: ""
form_id: "the formId is a mock one"
id: 2616
latitude: 40.1525
longitude: 116.384
openid: ""
phone: "15652630780"
remind: -1
sign_time: null
start_time: "1565334000000"
status: 1 */