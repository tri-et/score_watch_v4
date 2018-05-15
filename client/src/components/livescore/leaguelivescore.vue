<template>
  <div class="league-livescore">
    <div class="icon_league" :style="{'background-color':leaguename.leagueColorCode}"></div>
    <div><span :style="{'color':leaguename.leagueColorCode}">{{leaguename.leagueShortName}}</span></div>
    <div><span>{{leaguename.league}}</span></div>
  </div>
</template>
<script>
export default {
  props:{
    leaguename:[Object]
  }
};
</script>
<style lang="scss" scoped>
.league-livescore {
  height: 48px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  text-transform: uppercase;
  // box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.34);
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  div:nth-child(2){
    white-space: nowrap;
    margin-right: 5px;
  }
}
.icon_league {
  height: 24px;
  width: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.34);
  margin: 0 8px;
}
</style>


