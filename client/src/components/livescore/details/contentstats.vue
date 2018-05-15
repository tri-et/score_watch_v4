<template>
  <ul class="content-detail">
    <li>
      <div class="detail-stats">
        <div class="stats">
          <div>
            <span>{{setStats(dataStats[6],'home')}}</span>
          </div>
          <div>
            <hr class="home-percent-line" :style="{'width':setWidthStats(setStats(dataStats[6],'home'))}">
          </div>
          <div>
            <span>Shots</span>
          </div>
          <div>
            <hr class="away-percent-line" :style="{'width':setWidthStats(setStats(dataStats[6],'away'))}">
          </div>
          <div>
            <span>{{setStats(dataStats[6],'away')}}</span>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div class="detail-stats">
        <div class="stats">
          <div>
            <span>{{setStats(dataStats[37],'home')}}</span>
          </div>
          <div>
            <hr class="home-percent-line" :style="{'width':setWidthStats(setStats(dataStats[37],'home'))}">
          </div>
          <div>
            <span>Off Target</span>
          </div>
          <div>
            <hr class="away-percent-line" :style="{'width':setWidthStats(setStats(dataStats[37],'away'))}">
          </div>
          <div>
            <span>{{setStats(dataStats[37],'away')}}</span>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div class="detail-stats">
        <div class="stats">
          <div>
            <span>{{setStats(dataStats[9],'home')}}</span>
          </div>
          <div>
            <hr class="home-percent-line" :style="{'width':setWidthStats(setStats(dataStats[9],'home'))}">
          </div>
          <div>
            <span>Corner Kicks</span>
          </div>
          <div>
            <hr class="away-percent-line" :style="{'width':setWidthStats(setStats(dataStats[9],'away'))}">
          </div>
          <div>
            <span>{{setStats(dataStats[9],'away')}}</span>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div class="detail-stats">
        <div class="stats">
          <div>
            <span>{{setStats(dataStats[14],'home')}}</span>
          </div>
          <div>
            <hr class="home-percent-line" :style="{'width':setWidthStats(setStats(dataStats[14],'home'))}">
          </div>
          <div>
            <span>Yellow Cards</span>
          </div>
          <div>
            <hr class="away-percent-line" :style="{'width':setWidthStats(setStats(dataStats[14],'away'))}">
          </div>
          <div>
            <span>{{setStats(dataStats[14],'away')}}</span>
          </div>
        </div>
      </div>
    </li>
    <li>
      <div class="detail-stats">
        <div class="stats">
          <div>
            <span>{{setStats(dataStats[16],'home')}}</span>
          </div>
          <div>
            <hr class="home-percent-line" :style="{'width':setWidthStats(setStats(dataStats[16],'home'))}">
          </div>
          <div>
            <span>Red Cards</span>
          </div>
          <div>
            <hr class="away-percent-line" :style="{'width':setWidthStats(setStats(dataStats[16],'away'))}">
          </div>
          <div>
            <span>{{setStats(dataStats[16],'away')}}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["dataStats"])
  },
  methods: {
    setStats(val, homeAway) {
      let stat = "";
      let homeoraway = [];
      if (val != undefined) {
        homeoraway = val == "" ? "0,0".split(",") : val.split(",");
        switch (homeAway) {
          case "home":
            stat = homeoraway[0] == "0" ? "-" : homeoraway[0];
            break;
          case "away":
            stat = homeoraway[1] == "0" ? "-" : homeoraway[1];
            break;
        }
      } else {
        stat = "-";
      }
      return stat;
    },
    setWidthStats(val) {
      return val == "-" ? "0%" : parseInt(val) * 100 / 30 + "%";
    }
  }
};
</script>
<style lang="scss" scoped>
.content-detail {
  list-style: none;
  margin: 0;
  padding: 0;
}
.detail-stats {
  background-color: #fff;
  padding-left: 16px;
  padding-right: 16px;
}
.stats {
  height: 48px;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 15px;
  div:first-child {
    width: 10%;
  }
  div:nth-child(2) {
    width: 26.5%;
    text-align: right;
    padding-right: 5px;
  }
  div:nth-child(3) {
    width: 29%;
    text-align: center;
    color: #c5c5c5;
  }
  div:nth-child(4) {
    width: 26.5%;
    text-align: left;
    padding-left: 5px;
  }
  div:last-child {
    width: 10%;
    text-align: right;
  }
}
.home-percent-line {
  float: right;
  border: none;
  border-top: 6px solid #ff785a;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.away-percent-line {
  float: left;
  border: none;
  border-top: 6px solid #36cc64;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>


