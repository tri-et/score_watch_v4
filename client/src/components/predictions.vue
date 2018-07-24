<template>
  <div class="prediction">
    <div class="leftcol" :class="{'spaceTop':countLeague!=0}">
      <calendar></calendar>
      <div class="container">
        <div class="contentPrediction">
          <div class="inplay">
            <div class="containprediction">
              <div class="header inplayheader">
                <span>inplay</span>
              </div>
              <div class="nomatch" v-show="filterLeagueInPlay.length==0">No matches to show</div>
              <template v-for="(league,index) in filterLeagueInPlay">
                <leagueprediction :leaguename="league" :key="index"></leagueprediction>
                <containprediction expire="inplay" typematch="inplay" :match="match" v-for="(match,index) in filterHomeAwayName" :key="index+match.idmatch" v-if="league==match.league && match.match_period!='FT'"></containprediction>
              </template>
            </div>
            <div class="containprediction">
              <div class="header expiredheader">
                <span>expired in-play</span>
              </div>
              <div class="nomatch" v-show="filterLeagueInPlayExp.length==0">No matches to show</div>
              <template v-for="(league,index) in filterLeagueInPlayExp">
                <leagueprediction :leaguename="league" :key="index"></leagueprediction>
                <containprediction expire="expired" typematch="inplay" :match="match" v-for="(match,index) in filterHomeAwayName" :key="index+match.idmatch" v-if="league==match.league && match.match_period=='FT'"></containprediction>
              </template>
            </div>
          </div>
          <div class="pregame">
            <div class="containprediction">
              <div class="header preagmeheader">
                <span>pregame</span>
              </div>
              <div class="nomatch" v-show="filterLeaguePre.length==0">No matches to show</div>
              <div>
                <template v-for="(league,index) in filterLeaguePre">
                  <leagueprediction :leaguename="league" :key="index"></leagueprediction>
                  <containprediction expire="pregame" typematch="pregame" :match="match" v-for="(match,index) in filterHomeAwayNamePre" :key="index+match.idmatch" v-if="league==match.league  && match.match_period!='FT'"></containprediction>
                </template>
              </div>
            </div>
            <div class="containprediction">
              <div class="header expiredheader">
                <span>expired pre-game</span>
              </div>
              <div class="nomatch" v-show="filterLeagueExpPre.length==0">No matches to show</div>
              <div>
                <template v-for="(league,index) in filterLeagueExpPre">
                  <leagueprediction :leaguename="league" :key="index"></leagueprediction>
                  <containprediction expire="expired" typematch="pregame" :match="match" v-for="(match,index) in filterHomeAwayNamePre" :key="index+match.idmatch" v-if="league==match.league && match.match_period=='FT'"></containprediction>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="footerPrediction">
          <span>All Right Reserved. © 2018. Powered by In-Play</span>
        </div>
      </div>
      <errorprediction></errorprediction>
      <div class="loading" :class="{'loading-active':loadingPredictions}">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="rightcol" :class="{'showDetailPanel':ishowDetailPredictions,'spaceTop':countLeague!=0}">
      <div class="detailPanel">
        <detail></detail>
      </div>
    </div>
    <div class="boxLeague" :class="{'show-boxleague':isShowLeagueBoxDesk}">
      <div>
        <input type="text" v-model="filterLeagueText" @input="onchange()">
        <i class="material-icons" :class="{'showClearBt':isShowClearBt}" @click="clearBt()">clear</i>
      </div>
      <div>
        <ul>
          <li>
            <input value="all" type="checkbox" v-model="checkAll">
            <label for="all">All</label>
          </li>
          <template v-for="(leaguename,index) in filterLeagueDesk">
            <li :key="index">
              <input :value="leaguename" :id="leaguename" type="checkbox" @change="updateCheckAll()" v-model="checkLeagueDesk">
              <label :for="leaguename">{{leaguename}}</label>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import calendar from "./predictions/calendar";
import leagueprediction from "./predictions/league";
import containprediction from "./predictions/containprediction";
import detail from "./predictions/details/detail";
import GetData from "../modules/get_data";
import boxsearch from "./box-search";
import errorprediction from "./predictions/error";
let getdata = new GetData();
export default {
  data() {
    return {
      filterLeagueText: "",
      checkLeagueDesk: [],
      getData: getdata
    };
  },
  components: {
    calendar,
    leagueprediction,
    containprediction,
    detail,
    errorprediction
  },
  computed: {
    ...mapGetters([
      "ishowDetailPredictions",
      "dataPreGame",
      "dataInplay",
      "filterTeamName",
      "allLeague",
      "allLeagueDesk",
      "leagueSelected",
      "isShowLeagueBoxDesk",
      "dataDetailPre",
      "loadingPredictions",
      "countLeague",
      "isShowClearBt"
    ]),
    filterLeagueExpPre() {
      var matchPreagme = this.filterDataPregame.filter(el => {
        var currentdate = new Date().getDate();
        var match_dt = new Date(el.match_dt).getDate();
        if (el.match_period == "FT" || match_dt < currentdate) {
          return true;
        } else {
          return false;
        }
      }); // select match finished
      var leaguepregame = Array.from(
        new Set(this.filterHomeAwayNamePre.map(x => x.league))
      ); //select league filter by team name
      var league = matchPreagme.filter(el => leaguepregame.includes(el.league)); //filter league and team name
      return Array.from(new Set(league.map(x => x.league)));
    },
    filterLeaguePre() {
      var currentdate = new Date().getDate();
      var matchPreagme = this.filterDataPregame.filter(el => {
        var currentdate = new Date().getDate();
        var match_dt = new Date(el.match_dt).getDate();
        if (el.match_period != "FT") {
          return true;
        } else {
          return false;
        }
      }); // select match finished
      var leaguepregame = Array.from(
        new Set(this.filterHomeAwayNamePre.map(x => x.league))
      ); //select league filter by team name
      var league = matchPreagme.filter(el => leaguepregame.includes(el.league)); //filter league and team name
      if (this.filterLeagueInPlay.length == 0) {
        if (league.length != 0) {
          if (this.dataDetailPre.idmatch == undefined) {
            this.setDataDefault(
              Array.from(new Set(league.map(x => x.league))),
              matchPreagme
            );
            this.$store.commit("settypePrediction", {
              colorheader: "#5bb6e7",
              colorprediction: "#C8E6F7"
            });
            this.$store.commit("settypeMatch", "pregame");
          }
        }
      }
      return Array.from(new Set(league.map(x => x.league)));
    },
    filterDataPregame() {
      if (this.leagueSelected.length == 0) {
        var dataDetail = this.dataPreGame.find(
          el => el.idmatch == this.dataDetailPre.idmatch
        );
        if (dataDetail != undefined) {
          this.$store.commit("setdataDetailPre", dataDetail);
        }
        return this.dataPreGame;
      } else {
        return this.dataPreGame.filter(el =>
          this.leagueSelected.includes(el.league)
        );
      }
    },
    filterDataInplay() {
      if (this.leagueSelected.length == 0) {
        var dataDetail = this.dataInplay.find(
          el => el.idmatch == this.dataDetailPre.idmatch
        );
        if (dataDetail != undefined) {
          this.$store.commit("setdataDetailPre", dataDetail);
        }
        return this.dataInplay;
      } else {
        return this.dataInplay.filter(el =>
          this.leagueSelected.includes(el.league)
        );
      }
    },
    filterLeagueInPlay() {
      var matchInPlay = this.filterHomeAwayName.filter(
        el => el.match_period != "FT"
      ); // select match living
      var leaguepregame = Array.from(
        new Set(this.filterDataInplay.map(x => x.league))
      ); //select league filter by team name
      var league = matchInPlay.filter(el => leaguepregame.includes(el.league)); //filter league and team name
      if (league.length != 0) {
        if (this.dataDetailPre.idmatch == undefined) {
          this.setDataDefault(
            Array.from(new Set(league.map(x => x.league))),
            matchInPlay
          );
          this.$store.commit("settypePrediction", {
            colorheader: "#ff7c7c",
            colorprediction: "#FEE1E1"
          });
        }
      }
      return Array.from(new Set(league.map(x => x.league)));
    },
    filterLeagueInPlayExp() {
      var matchPreagme = this.filterHomeAwayName.filter(
        el => el.match_period == "FT"
      ); // select match finished
      var leagueinplay = Array.from(
        new Set(this.filterDataInplay.map(x => x.league))
      ); //select league filter by team name
      var league = matchPreagme.filter(el => leagueinplay.includes(el.league)); //filter league and team name
      if (
        this.filterLeagueInPlay.length == 0 &&
        this.filterLeaguePre.length == 0
      ) {
        if (league.length != 0) {
          if (this.dataDetailPre.idmatch == undefined) {
            this.setDataDefault(
              Array.from(new Set(league.map(x => x.league))),
              matchPreagme
            );
            this.$store.commit("settypePrediction", {
              colorheader: "#767676",
              colorprediction: "#f0f0f0"
            });
          }
        }
      }
      return Array.from(new Set(league.map(x => x.league)));
    },
    filterHomeAwayName() {
      if (this.filterTeamName == "") {
        return this.filterDataInplay;
      } else {
        return this.filterDataInplay.filter(el => {
          return (
            el.team_home.match(new RegExp(this.filterTeamName, "gi")) ||
            el.team_away.match(new RegExp(this.filterTeamName, "gi"))
          );
        });
      }
    },
    filterHomeAwayNamePre() {
      if (this.filterTeamName == "") {
        return this.filterDataPregame;
      } else {
        return this.filterDataPregame.filter(el => {
          return (
            el.team_home.match(new RegExp(this.filterTeamName, "gi")) ||
            el.team_away.match(new RegExp(this.filterTeamName, "gi"))
          );
        });
      }
    },
    filterAwayName() {
      return this.filterDataInplay.filter(el => {
        return el.team_away.match(new RegExp(this.filterTeamName, "gi"));
      });
    },
    filterLeagueDesk() {
      return this.allLeagueDesk.filter(el => {
        return el.match(new RegExp(this.filterLeagueText, "gi"));
      });
    },
    checkAll: {
      get: function() {
        return this.checkLeagueDesk.length == this.allLeagueDesk.length
          ? true
          : false;
      },
      set: function(v) {
        if (v) {
          this.checkLeagueDesk = this.allLeagueDesk;
          this.$store.commit("setleagueSelected", this.checkLeagueDesk);
        }
      }
    }
  },
  watch: {
    allLeagueDesk: function(newData, oldData) {
      this.checkLeagueDesk = newData;
    }
  },
  methods: {
    opendetail() {
      this.$store.commit("setishowDetailPredictions", true);
    },
    updateCheckAll() {
      this.$store.commit("setleagueSelected", this.checkLeagueDesk);
    },
    setDataDefault(league, data) {
      var dataSelected = [];
      if (this.dataDetailPre.idmatch == undefined) {
        dataSelected = data.filter(el => el.league == league[0]);
      } else {
        dataSelected = data.filter(
          el => el.idmatch == this.dataDetailPre.idmatch
        );
      }
      if (dataSelected.length != 0) {
        this.$store.commit("setdataDetailPre", dataSelected[0]);
      }
    },
    onchange() {
      if (this.filterLeagueText.length >= 2) {
        this.$store.commit("setisShowClearBt", true);
      }
    },
    clearBt() {
      this.filterLeagueText = "";
    }
  },
  mounted() {
    var today = new Date();
    var dateselected =
      today.getFullYear() +
      "-" +
      (parseInt(today.getMonth()) + 1) +
      "-" +
      today.getDate();
    getdata.getInPlayPreGame(this, dateselected);
    getdata.getIpAddress(this);
  }
};
</script>
<style lang="scss" scoped>
@media (min-width: 320px) {
  .leftcol {
    width: 100%;
  }
  .rightcol {
    width: 100%;
    position: fixed;
    z-index: 3;
    top: 0;
  }
  .contentPrediction {
    flex-direction: column;
    align-items: center;
    margin-right: 0px;
  }
}
@media (min-width: 672px) {
  .leftcol {
    position: unset;
    width: 352px;
  }
  .rightcol {
    position: unset;
    flex: 1;
    z-index: 1;
  }
  .container {
    margin-right: 8px;
    margin-left: 8px;
  }
  .contentPrediction {
    margin-right: 8px;
  }
}
@media (min-width: 865px) {
  .leftcol {
    flex: 1;
  }
  .rightcol {
    flex: none;
    width: 512px;
  }
}
@media (min-width: 1248px) {
  .contentPrediction {
    flex-direction: unset;
    align-items: unset;
    justify-content: center;
  }
  .inplay {
    margin-right: 8px;
  }
}
.spaceTop {
  position: relative;
  top: 64px;
}
.boxLeague {
  position: absolute;
  z-index: 4;
  width: 350px;
  background-color: #212121;
  height: 400px;
  right: 318px;
  top: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  transition: transform 0.5s ease-in-out;
  transform: scale(0);
  transform-origin: top center;
  div:first-child {
    background-color: #444;
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: relative;
    input {
      border-radius: 10px;
      border: none;
      height: 25px;
      outline: none;
      background-color: #575757;
      padding-left: 10px;
      width: 100%;
      color: #fff;
    }
    i {
      color: #fff;
      font-size: 14px;
      position: absolute;
      right: 18px;
      cursor: pointer;
      display: none;
    }
  }
  div:nth-child(2) {
    height: 355px;
    overflow-x: hidden;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      color: #fff;
      li {
        box-shadow: 0px 1px 0 0 rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        padding-left: 15px;
        height: 35px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
.showClearBt {
  display: block !important;
}
.show-boxleague {
  transform: scale(1) !important;
}
.prediction {
  background-color: #333;
  height: 100%;
  display: flex;
  width: 100%;
  position: absolute;
  top: 64px;
}
.leftcol {
  background-color: #333;
  height: 100%;
  position: relative;
}
.rightcol {
  background-color: rgba(0, 0, 0, 0.5);
  transform: translateX(100%);
  transition: transform 0.5s linear;
  height: 100%;
}
.showDetailPanel {
  transform: translateX(0) !important;
}
.disable {
  visibility: hidden;
}
.detailPanel {
  background-color: #fff;
  height: 100%;
  width: 100%;
  position: relative;
  max-width: 512px;
  min-width: 320px;
  float: right;
}
.calendar {
  height: 62px;
  background-color: #212121;
}
.container {
  height: 100%;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  min-height: calc(100% - 126px);
  max-height: calc(100% - 126px);
}
.contentPrediction {
  display: flex;
  // padding-top: 16px;
  min-height: calc(100% - 81px);
}
.inplay {
  max-width: 360px;
  min-width: 320px;
  width: 100%;
}
.pregame {
  max-width: 360px;
  min-width: 320px;
  width: 100%;
}
.footerPrediction {
  background-color: #333;
  height: 64px;
  box-shadow: 0 -1px 0 0 hsla(0, 0%, 100%, 0.1);
  color: #fff;
  opacity: 0.34;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-top: 16px;
}
.containprediction {
  background-color: #f0f0f0;
  padding-bottom: 5px;
}
.header {
  width: 100%;
  min-width: 320px;
  max-width: 360px;
  height: 48px;
  text-transform: uppercase;
  font-size: 16px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.54);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
}
.inplayheader {
  background-color: #ff7c7c;
}
.preagmeheader {
  background-color: #5bb6e7;
}
.expiredheader {
  background-color: #767676;
}
.nomatch {
  background-color: #f0f0f0;
  height: 100px;
  color: #b7b7b7;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 62px;
  display: none;
}
.loading-active {
  display: block !important;
}
.lds-ring {
  display: inline-block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40px;
  height: 40px;
  margin: 6px;
  border: 6px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


