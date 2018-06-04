<template>
  <div class="match">
    <div class="match-time" v-show="item.match_period=='FT'">
      <span>FT</span>
      <span>{{item.match_dt|filterDate}}</span>
    </div>
    <div class="match-live" v-show="item.match_period!='FT'">
      <div class="icon-live"></div>
      <!-- <span>{{item.match_period+"\' "+item.match_period}}</span> -->
      <div>
        <span>{{item.match_minute+"'"}}</span>
        <span>{{item.match_period|filterMatchTime(item.match_minute)}}</span>
      </div>
      <!-- <span>{{item.match_period|filterMatchTime(item.match_minute)}}</span> -->
    </div>
    <div class="teamname">
      <span v-html="this.$options.filters.highlight(item.team_home,this.filterTeamName)"></span>
      <span v-html="this.$options.filters.highlight(item.team_away,this.filterTeamName)"></span>
    </div>
    <div class="score">
      <span>{{item.score_home}}</span>
      <span>{{item.score_away}}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    item: [Object]
  },
  filters: {
    filterDate(value) {
      var date = new Date(value.replace(/-/g, "/"));
      return (
        date.getHours() +
        ":" +
        (date.getMinutes() == 0 ? "00" : date.getMinutes())
      );
    },
    filterMatchTime(value, minutes) {
      var time = "";
      switch (value) {
        case "HT":
          time = "HT";
          break;
        case "Part2":
          time ="2H";
          break;
        case "Part1":
          time ="1H";
          break;
        default:
          var matchPeriod = parseInt(value);
          time =matchPeriod > 0 && matchPeriod < 45? "1H": "2H";
      }
      return time;
    }
  },
  computed: {
    ...mapGetters(["filterTeamName"])
  }
};
</script>
<style lang="scss" scoped>
.match {
  background-color: #fff;
  display: flex;
  padding: 7px 0;
  line-height: 1.5;
  font-size: 14px;
}
.teamname {
  display: grid;
  flex: 1;
}
.score {
  display: grid;
  margin-right: 8px;
}
.match-time {
  display: grid;
  padding: 0 8px;
  text-align: center;
  span:first-child {
    font-weight: bold;
  }
}
.icon-live {
  height: 10px;
  width: 6px;
  background-color: #8ce898;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  margin-right: 10px;
}
.match-live {
  display: flex;
  align-items: center;
  padding-right: 8px;
  div:nth-of-type(2){
    display: grid;
  }
}
</style>


