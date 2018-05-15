<template>
  <ul class="content-detail">
    <li v-for="(item,index) in dataTimeLive" :key="index">
      <div class="detail-stats">
        <div class="stats">
          <div>
            <img :src="setIconTimeLine(item[4],'home',item[3])">
          </div>
          <div>
            <span>{{showHidePlayer(item[6],'home',item[3])}}</span>
          </div>
          <div>
            <span>{{item[5]+"'"}}</span>
          </div>
          <div>
            <span>{{showHidePlayer(item[6],'away',item[3])}}</span>
          </div>
          <div>
            <img :src="setIconTimeLine(item[4],'away',item[3])">
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
import _1 from "../../../assets/images/iconl/1.gif";
import _2 from "../../../assets/images/iconl/2.gif";
import _3 from "../../../assets/images/iconl/3.gif";
import _4 from "../../../assets/images/iconl/4.gif";
import _5 from "../../../assets/images/iconl/5.gif";
import _6 from "../../../assets/images/iconl/6.gif";
import _7 from "../../../assets/images/iconl/7.gif";
import _8 from "../../../assets/images/iconl/8.gif";
import _9 from "../../../assets/images/iconl/9.gif";
import _10 from "../../../assets/images/iconl/10.gif";
import _11 from "../../../assets/images/iconl/11.gif";
export default {
  data(){
    return{
      iconls:{
        "__1":_1,
        "__2":_2,
        "__3":_3,
        "__4":_4,
        "__5":_5,
        "__6":_6,
        "__7":_7,
        "__8":_8,
        "__9":_9,
        "__10":_10,
        "__11":_11
      }
    }
  },
  computed: {
    ...mapGetters(["dataTimeLive"])
  },
   filters: {
    setDash(val) {
      return val == "" ? "-" : val;
    }
  },
  methods: {
    setStats(val, homeAway) {
      let stat = "";
      let homeoraway = [];
      if (val != undefined) {
        homeoraway = val == "" ? "0,0".split(",") : val.split(",");
        switch (homeAway) {
          case "home":
            stat = homeoraway[0] == "0" ? "-" : homeoraway[0];
            break;
          case "away":
            stat = homeoraway[1] == "0" ? "-" : homeoraway[1];
            break;
        }
      } else {
        stat = "-";
      }
      return stat;
    },
    setWidthStats(val) {
      return val == "-" ? "0%" : parseInt(val) * 100 / 30 + "%";
    },
    showHidePlayer(val, homeaway, number) {
      let player = ''
      switch (homeaway) {
        case 'home':
          player = number == 1 ? val : ''
          break
        case 'away':
          player = number == 0 ? val : ''
          break
      }
      return player
    },
    setIconTimeLine(val, homeaway, number){
      let iconl=""
      switch (homeaway) {
        case 'home':
          iconl =number == 1? this.iconls["__"+val]:''
          break;
        case 'away':
          iconl =number == 0? this.iconls["__"+val]:''
          break;
      }
      return iconl
    }
  }
};
</script>
<style lang="scss" scoped>
.content-detail {
  list-style: none;
  margin: 0;
  padding: 0;
}
.detail-stats {
  background-color: #fff;
  padding-left: 16px;
  padding-right: 16px;
}
.stats {
  height: 48px;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 15px;
  div:first-child {
    width: 10%;
  }
  div:nth-child(2) {
    width: 26.5%;
    text-align: right;
    padding-right: 5px;
  }
  div:nth-child(3) {
    width: 29%;
    text-align: center;
    color: #c5c5c5;
  }
  div:nth-child(4) {
    width: 26.5%;
    text-align: left;
    padding-left: 5px;
  }
  div:last-child {
    width: 10%;
    text-align: right;
  }
}
</style>


