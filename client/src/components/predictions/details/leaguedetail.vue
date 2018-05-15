<template>
  <div class="league-prediction">
    <div class="icon_league"></div>
    <div><span>{{dataDetailPre.league}}</span></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["dataDetailPre"])
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
}
.icon_league {
  height: 24px;
  width: 8px;
  border-radius: 4px;
  background-color: #5700af;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.34);
  margin: 0 8px;
}
</style>


