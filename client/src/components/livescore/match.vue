<template>
  <div class="match" @click="matchSelected(match[3])" :style="{'border-color':match[0]==dataDetailLive[0]?dataDetailLive[7]:'transparent'}">
    <div class="match_time_ft" :style="bg">
      <span v-show="match[4]=='HT'">45</span>
      <span v-show="match[4]!='HT'">{{match[4]|filterTime(matchDate(match[10]))}}</span>
      <span>{{match[3]|filterStatus(matchDate(match[10]),bg)}}</span>
    </div>
    <div class="teamname">
      <span v-html="this.$options.filters.highlight(match[8],this.filterTeamName)"></span>
      <span v-html="this.$options.filters.highlight(match[9],this.filterTeamName)"></span>
    </div>
    <div class="score">
      <span>{{match[12]}}</span>
      <span>{{match[13]}}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    match: [Array]
  },
  data() {
    return {
      bg: {
        color: ""
      }
    };
  },
  computed: {
    ...mapGetters(["filterTeamName", "allDataStats", "allDataTimeLive","dataDetailLive"])
  },
  filters: {
    filterTime(val, match_dt) {
      if (val == "") {
        return match_dt;
      } else {
        return val + "'";
      }
    },
    filterStatus(val, match_dt, bg) {
      var st = "";
      switch (val) {
        case "-1":
          st = match_dt;
          break;
        case "2":
          st = "HT";
          bg.color = "#ff9250";
          break;
        case "1":
        case "3":
          st = "Live";
          bg.color = "#50d278";
          break;
        case "0":
          st = "Kickoff";
          bg.color = "#767676";
          break;
        default:
          st = val;
          break;
      }
      return st;
    }
  },
  methods: {
    matchDate(value) {
      var date = new Date(value.replace(/-/g, "/"));
      return (
        date.getHours() +
        ":" +
        (date.getMinutes() == 0 ? "00" : date.getMinutes())
      );
    },
    matchSelected(st) {
      this.$store.commit("setdataDetailLive", this.match)
      this.$store.commit("setishowDetailPredictions", true);
      var statsData = this.allDataStats.filter(x => x[2] == this.match[0])
      var timeliveData = this.allDataTimeLive.filter(x => x[2] == this.match[0])
      this.$store.commit("setdataStats", statsData.length==0?[]:statsData[0]);
      this.$store.commit("setdataTimeLive", timeliveData.length==0?[]:timeliveData);
      switch (st) {
        case "-1":
          this.$store.commit("settypeLivescore", {
            bgheader: "#767676",
            colorheader: "#fff",
            bglivescore: "#838383",
            colorlivescore: "#fff"
          });
          break;
        case "2":
          this.$store.commit("settypeLivescore", {
            bgheader: "#ff9250",
            colorheader: "#fff",
            bglivescore: "#ff9d61",
            colorlivescore: "#fff"
          });
          break;
        case "1":
        case "3":
          this.$store.commit("settypeLivescore", {
            bgheader: "#50d278",
            colorheader: "#fff",
            bglivescore: "#61d685",
            colorlivescore: "#fff"
          });
          break;
        case "0":
          this.$store.commit("settypeLivescore", {
            bgheader: "#f0f0f0",
            colorheader: "#000",
            bglivescore: "#e3e3e3",
            colorlivescore: "#888888"
          });
          break;
      }
    }
  }
};
</script>
<style scoped>
.match {
  /* background-color: #fff; */
  display: flex;
  padding: 7px 0px;
  line-height: 1.5;
  font-size: 14px;
  box-shadow: 0 -1px 5px -1px rgba(0, 0, 0, 0.2);
  margin: 8px 8px;
  cursor: pointer;
  border: 1px solid transparent;
}
.minutes {
  display: flex;
  align-items: center;
  width: 44px;
  justify-content: left;
}
.match_time {
  display: flex;
  align-items: center;
  width: 44px;
  justify-content: center;
  color: rgba(0, 0, 0, 0.34);
}
.match_time_ft {
  display: grid;
  width: 48px;
  text-align: center;
  color: rgba(0, 0, 0, 0.34);
  font-size: 12px;
  align-items: center;
}

.match_time_ft > span:first-child {
  font-weight: 700;
}
.teamname {
  display: grid;
  flex: 1;
}
.teamname span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.score {
  display: grid;
  width: 30px;
}
.live {
  height: 10px;
  width: 6px;
  background-color: #8ce898;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  margin-right: 10px;
}

.time {
  /* color: #69ae72; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  /* text-transform: uppercase; */
  font-size: 12px;
  /* font-weight: 700; */
}
.timeremaining {
  color: #000;
  opacity: 0.34;
}
.timelive {
  font-weight: bold;
  color: #69ae72;
  text-transform: uppercase;
}
</style>


