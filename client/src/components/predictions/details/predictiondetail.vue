<template>
  <div class="predictiondetail" :style="{'background-color':typePrediction.colorprediction}">
    <div><img :src="icon" width="24" height="24"></div>
    <div class="teamname" :style="{'min-width':marquee?'70px':''}">
      <span :class="{'marquee':marquee}">{{dataDetailPre.pick_hdp=="H"?dataDetailPre.team_home:dataDetailPre.team_away}}</span>
    </div>
    <resize-observer @notify="handleResize" />
    <div>
      <span>{{'['+dataDetailPre.score_home+':'+dataDetailPre.score_away+']'}}</span>
    </div>
    <div>
      <span>{{dataDetailPre.sys_hdp}}</span>
    </div>
    <div>
      <span>@</span>
    </div>
    <div>
      <span>{{dataDetailPre.pick_hdp=="H"?dataDetailPre.sys_odds_home:dataDetailPre.sys_odds_away}}</span>
    </div>
  </div>
</template>
<script>
import pred_gold from "../../../assets/images/pred_gold.svg";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      icon: pred_gold,
      marquee: false
    };
  },
  computed: {
    ...mapGetters(["dataDetailPre", "typePrediction"])
  },
  methods: {
    handleResize() {
      var length = this.$el.querySelector(".teamname span").offsetWidth;
      if (length > 75) {
        this.marquee = true;
      } else {
        this.marquee = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@media (min-width: 320px) {
  .predictiondetail {
    top: 249px;
  }
}
@media (min-width: 672px) {
  .predictiondetail {
    top: 201px;
  }
}
.predictiondetail {
  // background-color: #C8E6F7;
  position: absolute;
  left: 15px;
  right: 15px;
  padding: 7px 10px;
  box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.17);
  border-radius: 5px;
  display: flex;
  align-items: center;
  z-index: 1;
  div {
    margin-right: 5px;
  }
  div:nth-child(2),
  :nth-child(6) {
    font-weight: bold;
  }
}
.teamname {
  font-weight: 700;
  font-size: 14px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  height: 40px;
  display: flex;
  align-items: center;
  max-width: fit-content;
  width: 100%;
}
.marquee {
  position: absolute;
  animation: leftmarquee 5s linear infinite;
}
@keyframes leftmarquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>


