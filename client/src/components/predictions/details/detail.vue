<template>
  <div class="detail">
    <predictiondetail></predictiondetail>
    <div class="headerdetail">
      <tabbar></tabbar>
      <league></league>
      <headerscore></headerscore>
      <headerteamname></headerteamname>
    </div>
    <div class="oddcontent">
      <headerodds></headerodds>
      <div class="detail-odd">
        <div class="m8">
          <div>
            <span>M8</span>
          </div>
          <div>
            <span>{{dataDetailPre.sys_hdp|setDash}}</span>
          </div>
          <oddou :items="{'odd':dataDetailPre.sys_odds_home,'match_id':dataDetailPre.idmatch}"></oddou>
          <oddou :items="{'odd':dataDetailPre.sys_odds_away,'match_id':dataDetailPre.idmatch}"></oddou>
        </div>
        <div class="m8">
          <div>
            <span>SBO</span>
          </div>
          <div>
            <span>{{dataDetailPre.sbo_hdp|setDash}}</span>
          </div>
          <oddou :items="{'odd':dataDetailPre.sbo_odds_home,'match_id':dataDetailPre.idmatch}"></oddou>
          <oddou :items="{'odd':dataDetailPre.sbo_odds_away,'match_id':dataDetailPre.idmatch}"></oddou>
        </div>
        <div class="m8">
          <div>
            <span>IBC</span>
          </div>
          <div>
            <span>{{dataDetailPre.ibc_hdp|setDash}}</span>
          </div>
          <oddou :items="{'odd':dataDetailPre.ibc_odds_home,'match_id':dataDetailPre.idmatch}"></oddou>
          <oddou :items="{'odd':dataDetailPre.ibc_odds_away,'match_id':dataDetailPre.idmatch}"></oddou>
        </div>
      </div>
      <headerou></headerou>
      <div class="detail-odd">
        <div class="m8">
          <div>
            <span>M8</span>
          </div>
          <div>
            <span>{{dataDetailPre.sys_ou|setDash}}</span>
          </div>
          <oddou :items="{'odd':dataDetailPre.sys_odds_over,'match_id':dataDetailPre.idmatch}"></oddou>
          <oddou :items="{'odd':dataDetailPre.sys_odds_under,'match_id':dataDetailPre.idmatch}"></oddou>
        </div>
        <div class="m8">
          <div>
            <span>SBO</span>
          </div>
          <div>
            <span>{{dataDetailPre.sbo_ou|setDash}}</span>
          </div>
          <oddou :items="{'odd':dataDetailPre.sbo_odds_over,'match_id':dataDetailPre.idmatch}"></oddou>
          <oddou :items="{'odd':dataDetailPre.sbo_odds_under,'match_id':dataDetailPre.idmatch}"></oddou>
        </div>
        <div class="m8">
          <div>
            <span>IBC</span>
          </div>
          <div>
            <span>{{dataDetailPre.ibc_ou|setDash}}</span>
          </div>
          <oddou :items="{'odd':dataDetailPre.ibc_odds_over,'match_id':dataDetailPre.idmatch}"></oddou>
          <oddou :items="{'odd':dataDetailPre.ibc_odds_under,'match_id':dataDetailPre.idmatch}"></oddou>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import tabbar from "./tabbar";
import league from "./leaguedetail";
import headerscore from "./headerscore";
import headerteamname from "./headerteamname";
import predictiondetail from "./predictiondetail";
import headerodds from "./headerodds";
import oddou from "../oddou";
import headerou from "./headerou";
export default {
  computed: {
    ...mapGetters(["dataDetailPre"])
  },
  components: {
    tabbar,
    league,
    headerscore,
    headerteamname,
    predictiondetail,
    headerodds,
    oddou,
    headerou
  },
  filters: {
    setDash(val) {
      return val == "" ? "-" : val;
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  height: 100%;
}
.livecast {
  background-color: blue;
  height: 200px;
}
.oddcontent {
  background-color: #fff;
  height: 100%;
  overflow: auto;
  max-height: calc(100% - 295px);
}
.m8 {
  height: 48px;
  display: flex;
  align-items: center;
  width: 100%;
  div {
    width: 25%;
    text-align: center;
  }
}

.m8 div:first-child {
  text-align: left;
  padding-left: 20px;
  font-weight: 700;
  font-size: 16px;
}

.m8 div:nth-child(2) {
  color: #000;
  opacity: 0.54;
}
</style>


