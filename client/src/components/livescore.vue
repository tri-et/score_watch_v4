<template>
  <div class="livescore">
    <div class="leftcol" :class="{'spaceTop':countLeague!=0}">
      <calendar></calendar>
      <div class="container">
        <div class="contentPrediction">
          <div class="inplay">
            <div class="containprediction">
              <template v-for="(league,index) in filterLeagueLeft">
                <leaguelivescore :leaguename="league" :key="index"></leaguelivescore>
                <match :match="items" v-for="(items,index) in filterHomeAwayNameLeft" v-if="items[5]==league.league" :key="index+items[0]"></match>
              </template>
            </div>
          </div>
          <div class="pregame">
            <div class="containprediction">
              <template v-for="(league,index) in filterLeagueRight">
                <leaguelivescore :leaguename="league" :key="index"></leaguelivescore>
                <match :match="items" v-for="(items,index) in filterHomeAwayNameRight" v-if="items[5]==league.league" :key="index+items[0]"></match>
              </template>
            </div>
          </div>
        </div>
        <div class="footerPrediction">
          <span>All Right Reserved. © 2018. Powered by In-Play</span>
        </div>
      </div>
    </div>
    <div class="rightcol" :class="{'showDetailPanel':ishowDetailPredictions,'spaceTop':countLeague!=0}">
      <div class="detailPanel">
        <detaillivescore></detaillivescore>
      </div>
    </div>
    <div class="boxLeague" :class="{'show-boxleague':isShowLeagueBoxDesk}">
      <div><input type="text" v-model="filterLeagueText"></div>
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
import calendar from "./livescore/calendar";
import leaguelivescore from "./livescore/leaguelivescore";
import match from "./livescore/match";
import detaillivescore from "./livescore/details/detaillivescore";
import GetData from "../modules/get_data";
import boxsearch from "./box-search";
let getdata = new GetData();
export default {
  data() {
    return {
      filterLeagueText: "",
      checkLeagueDesk: [],
      getData:getdata
    };
  },
  components: {
    calendar,
    leaguelivescore,
    match,
    detaillivescore
  },
  computed: {
    ...mapGetters([
      "ishowDetailPredictions",
      "filterTeamName",
      "isShowLeagueBoxDesk",
      "dataLiveScoreLeft",
      "dataLiveScoreRight",
      "allLeagueLiveScore",
      "leagueSelectedLiveScore",
      "leagueSelected",
      "allDataStats",
      "allDataTimeLive",
      "countLeague",
      "allLeagueLiveScoreDesk"
    ]),
    filterLeagueLeft() {
      var leagueLeft = Array.from(
        new Set(this.dataLiveScoreLeft.map(x => x[5]))
      );
      var leagueFilter = Array.from(
        new Set(this.filterHomeAwayNameLeft.map(x => x[5]))
      );
      if (this.leagueSelectedLiveScore.length == 0) {
        var leagueFilterArr = this.checkLeagueName(leagueLeft.filter(el => leagueFilter.includes(el)),this.filterHomeAwayNameLeft);
        this.setDataDefault(Array.from(new Set(leagueFilterArr.map(x=>x.league))), this.filterHomeAwayNameLeft);
        return leagueFilterArr;
      } else {
        var datafilter = this.filterHomeAwayNameLeft.filter(el =>this.leagueSelectedLiveScore.includes(el[5]));
        var league=Array.from(new Set(datafilter.map(x=>x[5])))
        this.setDataDefault(league,datafilter);
        return this.checkLeagueName(league, datafilter);
      }
    },
    filterLeagueRight() {
      var leagueLeft = Array.from(
        new Set(this.dataLiveScoreRight.map(x => x[5]))
      );
      var leagueFilter = Array.from(
        new Set(this.filterHomeAwayNameRight.map(x => x[5]))
      );
      if (this.leagueSelectedLiveScore.length == 0) {
        return this.checkLeagueName(
          leagueLeft.filter(el => leagueFilter.includes(el)),
          this.filterHomeAwayNameRight
        );
      } else {
        var datafilter = this.filterHomeAwayNameRight.filter(el =>
          this.leagueSelectedLiveScore.includes(el[5])
        );
        return this.checkLeagueName(leagueFilter, datafilter);
      }
    },
    filterLeagueDesk() {
      return this.allLeagueLiveScoreDesk.filter(el => {
        return el.match(new RegExp(this.filterLeagueText, "gi"));
      });
    },
    filterHomeAwayNameLeft() {
      if (this.filterTeamName == "") {
        return this.dataLiveScoreLeft;
      } else {
        return this.dataLiveScoreLeft.filter(el => {
          return (
            el[8].match(new RegExp(this.filterTeamName, "gi")) ||
            el[9].match(new RegExp(this.filterTeamName, "gi"))
          );
        });
      }
    },
    filterHomeAwayNameRight() {
      if (this.filterTeamName == "") {
        return this.dataLiveScoreRight;
      } else {
        return this.dataLiveScoreRight.filter(el => {
          return (
            el[8].match(new RegExp(this.filterTeamName, "gi")) ||
            el[9].match(new RegExp(this.filterTeamName, "gi"))
          );
        });
      }
    },
    checkAll: {
      get: function() {
        return this.checkLeagueDesk.length == this.allLeagueLiveScoreDesk.length
          ? true
          : false;
      },
      set: function(v) {
        if (v) {
          this.checkLeagueDesk = this.allLeagueLiveScoreDesk;
          this.$store.commit("setleagueSelectedLiveScore", this.checkLeagueDesk);
        }
      }
    }
  },
  watch: {
    allLeagueLiveScoreDesk: function(newData, oldData) {
      this.checkLeagueDesk = newData;
    }
  },
  methods: {
    checkLeagueName(allleague, alldata) {
      var league = [];
      allleague.forEach(function(x) {
        for (var i = 0; i < alldata.length; i++) {
          if (x == alldata[i][5]) {
            league.push({
              league: alldata[i][5],
              leagueShortName: alldata[i][6],
              leagueColorCode: alldata[i][7]
            });
            break;
          }
        }
      });
      return league;
    },
    opendetail() {
      this.$store.commit("setishowDetailPredictions", true);
    },
    updateCheckAll() {
      this.$store.commit("setleagueSelectedLiveScore", this.checkLeagueDesk);
    },
    setDataDefault(league, data) {
      if (league.length != 0) {
        var firstLeague = league[0];
        var firstData = data.filter(el => el[5] == firstLeague);
        var statsData = this.allDataStats.filter(x => x[2] == firstData[0][0]);
        var timeliveData = this.allDataTimeLive.filter(
          x => x[2] == firstData[0][0]
        );
        this.$store.commit("setdataDetailLive", firstData[0]);
        if (statsData.length != 0) {
          this.$store.commit("setdataStats", statsData[0]);
        }
        this.$store.commit("setdataTimeLive", timeliveData);
      }
    }
  },
  mounted() {
    let today = new Date();
    getdata.getLiveScore(
      this,
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    );
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
.spaceTop{
  position: relative;
  top:64px;
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
.show-boxleague {
  transform: scale(1) !important;
}
.livescore {
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
  padding-top: 16px;
}
.pregame {
  max-width: 360px;
  min-width: 320px;
  width: 100%;
  padding-top: 16px;
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
</style>


