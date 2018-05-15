<template>
  <div class="match">
    <div class="match-time" v-show="item.match_period=='FT'">
      <span>FT</span>
      <span>{{item.match_dt|filterDate}}</span>
    </div>
    <div class="match-live" v-show="item.match_period!='FT'">
      <span>{{item.match_dt|filterDate}}</span>
    </div>
    <div class="teamname">
      <span v-html="this.$options.filters.highlight(item.team_home,this.filterTeamName)"></span>
      <span v-html="this.$options.filters.highlight(item.team_away,this.filterTeamName)"></span>
    </div>
    <div class="score" v-show="item.match_period=='FT'">
       <span>{{item.score_home}}</span>
      <span>{{item.score_away}}</span>
    </div>
    <div class="time" v-show="item.match_period!='FT'">
      <span v-show="item.match_period!=''">Live</span>
      <span v-show="item.match_period==''">{{item.match_dt|timeremaining}}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props:{
    item:[Object]
  },
  computed: {
    ...mapGetters(["filterTeamName"])
  },
  filters:{
    filterDate(value){
      var date = new Date(value.replace(/-/g,'/'));
      return (date.getHours() +":" +(date.getMinutes() == 0 ? "00" : date.getMinutes()));
    },
    timeremaining(matchdate) {
      var matchDate = new Date(matchdate.replace(/-/g,'/'));
      var currentDate = new Date();
      var millisec = matchDate.getTime() - currentDate.getTime();
      var seconds = (millisec / 1000).toFixed(0);
      var minutes = Math.floor(seconds / 60);
      var hours = "";
      if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = hours >= 10 ? hours : hours;
        minutes = minutes - hours * 60;
        minutes = minutes >= 10 ? minutes : minutes;
      }

      seconds = Math.floor(seconds % 60);
      seconds = seconds >= 10 ? seconds : seconds;
      if (hours != "") {
        return "in " + hours + "h " + minutes + "m";
      }
      return "in " + minutes + "m";
    }
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
.teamname{
  display: grid;
  flex: 1;
}
.score{
  display: grid;
  margin-right: 8px;
}
.match-time{
  display: grid;
  padding: 0 8px;
  text-align: center;
  span:first-child{
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
.match-live{
  display:flex;
  align-items: center;
  padding:0 8px;
}
.time{
  display: flex;
  align-items: center;
  margin-right: 8px;
  span:first-child{
    color:#69ae72;
    font-weight: 700;
  }
  span:nth-child(2){
    color: #000;
    opacity: 0.34;
  }
}
</style>


