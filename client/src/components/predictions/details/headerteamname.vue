<template>
  <div class="headerteamname">
    <div class="teamname">
      <div class="hometeam">{{this.dataDetailPre.team_home}}</div>
      <div class="vs">vs.</div>
      <div class="awayteam">{{this.dataDetailPre.team_away}}</div>
    </div>
    <div class="sytem">
      <span>System Prediction recommended pick:</span>
    </div>
    <div class="height"></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["dataDetailPre"])
  },
}
</script>
<style scoped>
.headerteamname{
  height: 117px;
  background-color: #fff;
}
.teamname{
  height: 48px;
  display: flex;
  align-items: center;
}
.hometeam{
  flex: 1;
  padding-left: 24px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87)
}
.awayteam{
  flex: 1;
  justify-content: flex-end;
  display: flex;
  padding-right: 24px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87)
}
.vs{
  width: 64px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.34)
}
.sytem{
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.34)
}
.height{
  height: 24px;
}
</style>


