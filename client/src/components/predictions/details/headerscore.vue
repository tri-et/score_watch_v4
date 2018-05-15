<template>
  <div class="headerscore">
     <div class="homescore">{{dataDetailPre.score_home}}</div>
    <div class="match-time">
      <div class="hour" :style="{'background-color':typePrediction.colorheader}">{{dataDetailPre.match_minute|matchDate(dataDetailPre.match_dt)}}</div>
      <div class="minute" :style="{'background-color':typePrediction.colorprediction}">{{dataDetailPre.match_period|period}}</div>
    </div>
    <div class="awayscore">{{dataDetailPre.score_away}}</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  filters: {
    period(val) {
      let period = "";
      switch (val) {
        case "Part1":
          period = "1H";
          break;
        case "Part2":
          period = "2H";
          break;
        case "":
          period = "Kickoff";
          break;
        default:
          period = val;
      }
      return period;
    },
    matchDate(value,match_dt) {
      switch (value) {
        case "0":
          var date = new Date(match_dt.replace(/-/g, "/"));
          return (
            date.getHours() +
            ":" +
            (date.getMinutes() == 0 ? "00" : date.getMinutes())
          );
          break;
        default:
          return value + "'";
          break;
      }
    }
  },
   computed: {
    ...mapGetters(["dataDetailPre","typePrediction"])
  },
}
</script>
<style lang="scss" scoped>
.headerscore {
  background-color: #fff;
  height: 64px;
  display: flex;
  align-items: center;
}
.homescore {
  height: 100%;
  align-items: center;
  display: flex;
  flex: 1;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.87);
  padding-left: 24px;
}
.match-time {
  height: 100%;
  width: 64px;
  display: grid;
}
.hour {
  border-top-left-radius: 130px;
  border-top-right-radius: 130px;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.minute {
  border-bottom-left-radius: 130px;
  border-bottom-right-radius: 130px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.awayscore {
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  font-size: 28px;
  color: rgba(0, 0, 0, 0.87);
  padding-right: 24px;
}
</style>


