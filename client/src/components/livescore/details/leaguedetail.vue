<template>
  <div class="league-prediction">
    <div class="icon_league" :style="{'background-color':dataDetailLive[7]}"></div>
    <div><span :style="{'color':dataDetailLive[7]}">{{dataDetailLive[6]}}</span></div>
    <div><span>{{dataDetailLive[5]}}</span></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["dataDetailLive"])
  }
};
</script>
<style lang="scss" scoped>
.league-prediction {
  height: 48px;
  color: rgba(0, 0, 0, 0.54);
  font-size: 16px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  div:nth-child(2){
    font-size: 14px;
    flex: 1;
  }
  div:nth-child(3){
    color: #cbcbcb;
    font-size: 12px;
    padding-right: 8px;
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


