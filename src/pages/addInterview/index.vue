<template>
  <div>
    <h3>面试信息</h3>
    <form report-submit="true" @submit="submit" @reset="reset">
      <p>
        <span label="name">公司名称</span>
        <input type="text" placeholder="请输入公司名称" id="name" v-model="company" />
      </p>

      <p>
        <span label="tel">联系电话</span>
        <input type="number" placeholder="请输入面试联系人电话" id="tel" v-model="phone" />
      </p>
      <p>
        <span label="date">面试时间</span>
        <picker
          mode="multiSelector"
          @change="bindMultiPickerChange"
          @columnchange="bindMultiPickerColumnChange"
          :value="multiIndex"
          :range="multiArray"
          class="ipt"
        >
          <view class="picker">
            <!-- 2019年10月{{multiArray[0][multiIndex[0]]}} {{multiArray[1][multiIndex[1]]}}:{{multiArray[2][multiIndex[2]]}} -->
            {{showDate}}
          </view>
        </picker>
      </p>
      <p>
        <span label="address">面试地址</span>
        <input
          type="text"
          placeholder="请选择面试地址"
          id="address"
          @click="jumpAddress"
          v-model="address.address"
        />
      </p>
      <h3>备注信息</h3>
      <textarea name id="info" cols="30" rows="10" placeholder="备注信息（可选，100字以内）"></textarea>
      <button form-type="submit">添加面试</button>
    </form>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      date: "2019-10-22",
      time: "12:00",
      nowMonth: moment().month(),
      nowDate: moment().date(),
      nowHour: moment().hour(),
      checkDate: "",
      company: "",
      phone: "",
      checkArr: [
        [],
        [
          "0点",
          "1点",
          "2点",
          "3点",
          "4点",
          "5点",
          "6点",
          "7点",
          "8点",
          "9点",
          "10点",
          "11点",
          "12点",
          "13点",
          "14点",
          "15点",
          "16点",
          "17点",
          "18点",
          "19点",
          "20点",
          "21点",
          "22点",
          "23点"
        ],
        ["00分", "10分", "20分", "30分", "40分", "50分"]
      ],
      multiArray: [[], [], []],
      multiIndex: [0, 0, 0],
      TimeArr: [],
      index: 0,
      checkTimestamp:""
    };
  },
  created() {
    //console.log(this.nowMonth,";;;;;")//9
    let everyTime = 1000 * 60 * 60 * 24; //一天的毫秒数
    let dateArr = [];

    for (let i = 0; i <= 15; i++) {
      //日期的时间戳
      let everyDate = new Date().getTime() + everyTime * i;
      this.TimeArr.push(everyDate);
      dateArr.push(`${new Date(everyDate).getDate()}号`);
    }
    this.multiArray[0] = dateArr;
    let hourArr = [];
    for (let i = this.nowHour + 1; i <= 23; i++) {
      hourArr.push(`${i}点`);
    }
    this.multiArray[1] = hourArr;
    this.$forceUpdate();
    this.multiArray[2] = this.checkArr[2];
  },
  computed: {
    ...mapGetters("sign", ["address"]),
    showDate() {
      let index = this.multiIndex[0];
      let nowYear = new Date(this.TimeArr[index]).getFullYear();
      let nowMonth = new Date(this.TimeArr[index]).getMonth();
      let nowDate = new Date(this.TimeArr[index]).getDate();
      let nowHour = parseInt(this.multiArray[1][this.multiIndex[1]]);
      let nowMinute = parseInt(this.multiArray[2][this.multiIndex[2]]);
      let time = `${nowYear}-${nowMonth+1}-${nowDate} ${nowHour}:${nowMinute}`;
      this.checkTimestamp =new Date(`${nowYear}/${nowMonth+1}/${nowDate} ${nowHour}:${nowMinute}`).getTime()
      return time;
    }
  },
  methods: {
    ...mapActions("sign", ["addInterviewAction"]),
    async submit(e) {
      console.log("e...", e,this.checkTimestamp);
      let result = await this.addInterviewAction({
        company: this.company,
        phone: this.phone,
        form_id: e.detail.formId,
        address: JSON.stringify(this.address.address),
        latitude: this.address.location.lat,
        longitude: this.address.location.lng,
        start_time: ~~(this.checkTimestamp/ 60000) * 60000,
        description: "测试form_id"
      });
      console.log(result, "result,,,,,");
      if (result.data.code === 0) {
        wx.navigateTo({ url: "../interviewList/index" });
      }
    },
    jumpAddress() {
      wx.navigateTo({ url: "../checkAddress/index" });
    },
    bindMultiPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      //当前时间的时间戳
      let str = new Date().getTime();
      let checkStr = str + e.detail.value[0] * 24 * 60 * 60;
      let transform = moment.unix(checkStr);
      this.multiIndex = e.detail.value;
    },
    //监听每列的变化
    bindMultiPickerColumnChange: function(e) {
      console.log("修改的列为", e.detail.column, "，值为", e.detail.value);
      this.multiIndex[e.detail.column] = e.detail.value;
      if (e.detail.column === 0 && e.detail.value === 0) {
        let hourArr = [];
        for (let i = this.nowHour + 1; i <= 23; i++) {
          hourArr.push(`${i}点`);
        }
        this.multiArray[1] = hourArr;
        //强制刷新
        this.$forceUpdate();
      } else if (e.detail.column === 0 && e.detail.value !== 0) {
        this.multiArray[1] = this.checkArr[1];
        this.$forceUpdate();
      }
    }
  }
};
</script>
<style lang="scss">
p {
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #ccc;
  display: flex;
  span {
    flex: 3;
  }
  input {
    flex: 7;
    height: 44px;
    line-height: 44px;
    padding-left: 10px;
  }
  .ipt {
    flex: 7;
    height: 44px;
    line-height: 44px;
    padding-left: 10px;
  }
}
.picker {
  height: 44px;
  line-height: 44px;
}
#info {
  border: 1px solid #ccc;
  margin-left: 20px;
}
</style>