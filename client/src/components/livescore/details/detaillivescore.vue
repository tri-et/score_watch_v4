<template>
  <div class="detail">
    <div class="headerdetail">
      <tabbar></tabbar>
      <league></league>
      <headerscore></headerscore>
      <headerteamname></headerteamname>
    </div>
    <div class="oddcontent">
      <headerstats></headerstats>
      <contentstats></contentstats>
      <headertimelive></headertimelive>
      <contentimelive></contentimelive>
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import tabbar from "./tabbar";
import league from "./leaguedetail";
import headerscore from "./headerscore";
import headerteamname from "./headerteamname";
import headerstats from "./headerstats";
import contentstats from "./contentstats";
import headertimelive from "./headertimeline";
import contentimelive from "./contenttimelive";
export default {
  computed: {
    ...mapGetters(["dataDetailLive"])
  },
  components: {
    tabbar,
    league,
    headerscore,
    headerteamname,
    headerstats,
    contentstats,
    headertimelive,
    contentimelive
  }
};
</script>
<style lang="scss" scoped>
.oddcontent {
  height: 100%;
  overflow-x: hidden;
  max-height: calc(100% - 234px);
}
.detail {
  height: 100%;
}
.livecast {
  background-color: blue;
  height: 200px;
}
</style>


