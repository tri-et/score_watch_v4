<template>
  <div class="predictioninplay" :style="bg">
    <div class="icon"><img :src="icon" width="24" height="24"></div>
    <div class="teamname" :style="{'min-width':marquee?'70px':''}">
      <span :class="{'marquee':marquee}">{{items.pick_hdp=="H"?items.team_home:items.team_away}}</span>
    </div>
    <resize-observer @notify="handleResize" />
    <div class="odds">
      <span>&nbsp;{{'['+items.score_home+':'+items.score_away+']'}}</span>
      <span>{{items.sys_hdp}}</span>
      <span>@</span>
      <oddou :items="{'odd':items.pick_hdp=='H'?items.sys_odds_home:items.sys_odds_away,'match_id':items.match_code}"></oddou>
    </div>
    <div class="timer expired" v-show="typeinplay!='expired'">
      <countdown :items="items"></countdown>
    </div>
    <div class="expired" v-show="typeinplay=='expired'">
      <span>{{'expired ['+items.minutes+'\']'}}</span>
    </div>
  </div>
</template>
<script>
import pred_gold from "../../assets/images/pred_gold.svg";
import lose_icon from "../../assets/images/lose_icon@1x.svg";
import win_icon from "../../assets/images/win_icon@1x.svg";
import draw_icon from "../../assets/images/draw_icon@1x.svg";
import oddou from "./oddou";
import countdown from "./countdown";
export default {
  props: {
    items: [Object],
    typeinplay: [String],
    srore: [Object]
  },
  components: {
    oddou,
    countdown
  },
  data() {
    return {
      icon: pred_gold,
      marquee: false,
      bg: {
        backgroundColor: "",
        color: ""
      }
    };
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
  },
  created() {
    switch (this.typeinplay) {
      case "expired":
        let hdp = parseFloat(this.items.sys_hdp);
        let score_home =
          parseInt(this.srore.score_home) +
          (hdp > 0 ? hdp : 0) -
          parseInt(this.items.score_home);
        let score_away =
          parseInt(this.srore.score_away) +
          (hdp < 0 ? Math.abs(hdp) : 0) -
          parseInt(this.items.score_away);
        if (this.items.pick_hdp == "H") {
          if (score_home > score_away) {
            this.bg.backgroundColor = "#69AE72";
            this.icon = win_icon;
            this.bg.color = "#fff";
          } else if (score_home < score_away) {
            this.icon = lose_icon;
          } else {
            this.icon = draw_icon;
          }
        } else {
          if (score_away > score_home) {
            this.icon = win_icon;
            this.bg.backgroundColor = "#69AE72";
            this.bg.color = "#fff";
          } else if (score_away < score_home) {
            this.icon = lose_icon;
          } else {
            this.icon = draw_icon;
          }
        }
        break;
      default:
        var minutes = parseInt(this.items.minutes);
        var predictionTime = new Date(this.items.time).getTime();
        var currentTime = new Date().getTime();
        if (minutes < 70) {
          if (currentTime - predictionTime > 13 * 60000) {
            this.bg.backgroundColor = "#f0f0f0";
          } else {
            this.bg.backgroundColor = "#FEE1E1";
            this.bg.color = "#000";
          }
        } else {
          if (currentTime - predictionTime > 6 * 60000) {
            this.bg.backgroundColor = "#f0f0f0";
          } else {
            this.bg.backgroundColor = "#FEE1E1";
            this.bg.color = "#000";
          }
        }

      // this.icon = pred_gold;
      // this.bg.color = "rgba(51,51,51,0.45)";
    }
  }
};
</script>
<style lang="scss" scoped>
.predictioninplay {
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: rgba(51, 51, 51, 0.45);
}
.icon {
  width: 24px;
  height: 24px;
  padding: 0 10px;
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
}
.odds {
  display: flex;
  flex: 1;
  span {
    margin-right: 3px;
  }
}
.expired {
  padding-right: 5px;
  font-weight: 600;
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




