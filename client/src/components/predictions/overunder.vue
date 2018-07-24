<template>
  <div class="overunder" :style="bg">
    <div class="icon"><img :src="setSrcIconUnder(items,typeprediction)" width="24" height="24"></div>
    <div class="teamname">{{items.pick_ou=="O"?'Over':'Under'}}&nbsp;</div>
    <div class="odds">
      <span>{{'['+items.score_home+':'+items.score_away+']'}}</span>
      <span>{{items.sys_ou}}</span>
      <span>@</span>
      <span>{{items.pick_ou=="O"?items.sys_odds_over:items.sys_odds_under}}</span>
    </div>
    <div class="timer expired" v-show="typeprediction!='expired'">
      <countdown :items="items"></countdown>
    </div>
    <div v-show="typeprediction=='expired'" class="timeexpired">
      <span>{{'MIN '+items.minutes+'\' - '+calculatorExpired(items.minutes)+'\''}}</span>
    </div>
  </div>
</template>
<script>
import pred_gold from "../../assets/images/pred_gold.svg";
import lose_icon from "../../assets/images/lose_icon@1x.svg";
import win_icon from "../../assets/images/win_icon@1x.svg";
import draw_icon from "../../assets/images/draw_icon@1x.svg";
import countdown from "./countdown";
export default {
  props: {
    items: [Object],
    typeprediction: [String],
    srore: [Object]
  },
  components: {
    countdown
  },
  data() {
    return {
      bg: {
        backgroundColor: "",
        color: ""
      },
      icon: lose_icon
    };
  },
  methods: {
    setSrcIconUnder(data, typepre) {
      let url = "";
      let ou = parseFloat(data.sys_ou);
      let finalsocre =
        parseInt(this.srore.score_home) + parseInt(this.srore.score_away);
      if (typepre == "expired") {
        switch (data.pick_ou) {
          case "O":
            if (finalsocre > ou) {
              url = win_icon;
              this.bg.backgroundColor = "#69AE72";
              this.bg.color = "#ffffff";
            } else if (finalsocre < ou) {
              url = lose_icon;
            } else {
              url = draw_icon;
            }
            break;
          default:
            if (ou > finalsocre) {
              url = win_icon;
              this.bg.backgroundColor = "#69AE72";
              this.bg.color = "#ffffff";
            } else if (ou < finalsocre) {
              url = lose_icon;
            } else {
              url = draw_icon;
            }
            break;
        }
      } else {
        url = pred_gold;
      }
      return url;
    },
    calculatorExpired(minutes_prdiction) {
      var time = parseInt(minutes_prdiction);
      if (time < 70) {
        time = time + 10;
      } else {
        time = time + 3;
      }
      return time;
    }
  },
  created() {
    switch (this.typeprediction) {
      case "inplay":
        this.bg.backgroundColor = "#FEE1E1";
        break;
      case "pregame":
        this.bg.backgroundColor = "#C8E6F7";
        break;
      default:
        this.bg.backgroundColor = "#f0f0f0";
        this.bg.color = "rgba(51,51,51,0.45)";
    }
  }
};
</script>
<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  padding: 0 10px;
}
.overunder {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.teamname {
  font-weight: 700;
  font-size: 14px;
}
.odds {
  font-size: 14px;
  flex: 1;
  span:nth-child(4) {
    font-weight: 700;
  }
}
.timeexpired {
  padding-right: 5px;
}
.expired {
  padding-right: 5px;
  font-weight: 600;
  font-size: 12px;
}
</style>


