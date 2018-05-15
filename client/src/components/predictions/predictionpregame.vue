<template>
  <div class="predictionpregame" :style="bg">
    <div class="icon"><img :src="icon" width="24" height="24"></div>
    <div class="teamname">{{items.pick_hdp=="H"?items.team_home:items.team_away}}</div>
    <div class="odds">
      <span>&nbsp;{{'['+items.score_home+':'+items.score_away+']'}}</span>
      <span>{{items.sys_hdp}}</span>
      <span>@</span>
      <span>{{items.pick_hdp=="H"?items.sys_odds_home:items.sys_odds_away}}</span>
    </div>
  </div>
</template>
<script>
import pred_gold from "../../assets/images/pred_gold.svg";
import lose_icon from "../../assets/images/lose_icon@1x.svg";
import win_icon from "../../assets/images/win_icon@1x.svg";
import draw_icon from "../../assets/images/draw_icon@1x.svg";
export default {
  props: {
    items: [Object],
    typepregame: [String]
  },
  data() {
    return {
      icon: pred_gold,
      bg: {
        backgroundColor: ""
      }
    };
  },
  created() {
    switch (this.typepregame) {
      case "expired":
        let hdp = parseFloat(this.items.sys_hdp);
        let score_home = parseInt(this.items.score_home) + (hdp > 0 ? hdp : 0);
        let score_away = parseInt(this.items.score_away) + (hdp < 0 ? Math.abs(hdp) : 0);
        if (this.items.pick_hdp == "H") {
          if (score_home > score_away) {
            this.bg.backgroundColor = "#69AE72";
            this.icon = win_icon;
          } else if (score_home < score_away) {
            this.icon = lose_icon;
          } else {
            this.icon = draw_icon;
          }
        } else {
          if (score_away > score_home) {
              this.icon = win_icon;
              this.bg.backgroundColor = "#69AE72";
            } else if (score_away < score_home) {
              this.icon = lose_icon;
            } else {
              this.icon = draw_icon;
            }
        }
        break;
      default:
        this.bg.backgroundColor = "#C8E6F7";
        this.icon = pred_gold;
    }
  }
};
</script>
<style lang="scss" scoped>
.predictionpregame {
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
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
}
</style>




