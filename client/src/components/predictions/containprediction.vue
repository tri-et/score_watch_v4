<template>
  <div class="contentprediction" @click="matchSelected()" :style="{'border':match.idmatch==dataDetailPre.idmatch && !menuMobile?'1px solid '+setColorBorder():'none'}">
    <match :item="match" v-show="typematch=='inplay'"></match>
    <matchpregame :item="match" v-show="typematch=='pregame'"></matchpregame>
    <template v-for="(item,index) in match.detail" v-show="typematch=='inplay'">
      <predictioninplay :srore="{'score_home':match.score_home,'score_away':match.score_away}" :items="item" :key="index" :typeinplay="expire"></predictioninplay>
    </template>
    <predictionpregame :items="match" v-show="typematch=='pregame'" :typepregame="expire"></predictionpregame>
    <template v-for="(item,index) in match.detailou" v-show="typematch=='inplay'">
      <overunderinplay :srore="{'score_home':match.score_home,'score_away':match.score_away}" :items="item" :typeprediction="expire" :key="index+item.match_code"></overunderinplay>
    </template>
    <overunderpregame v-show="typematch=='pregame'" :items="match" :typeprediction="expire"></overunderpregame>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import match from "./match";
import matchpregame from "./matchpregame";
import overunderinplay from "./overunder";
import overunderpregame from "./overunderpregame";
import predictioninplay from "./predictioninplay";
import predictionpregame from "./predictionpregame";
export default {
  computed: {
    ...mapGetters(["dataDetailPre","menuMobile"])
  },
  props: {
    match: [Object],
    typematch: [String],
    expire: [String]
  },
  components: {
    match,
    matchpregame,
    overunderinplay,
    overunderpregame,
    predictioninplay,
    predictionpregame
  },
  methods: {
    matchSelected() {
      this.$store.commit("setdataDetailPre", this.match);
      this.$store.commit("setishowDetailPredictions", true);
      this.$store.commit("settypeMatch",this.typematch)
      switch (this.expire) {
        case "inplay":
          this.$store.commit("settypePrediction", {
            colorheader: "#ff7c7c",
            colorprediction: "#FEE1E1"
          });
          break;
        case "pregame":
          this.$store.commit("settypePrediction", {
            colorheader: "#5bb6e7",
            colorprediction: "#C8E6F7"
          });
          break;
        default:
          this.$store.commit("settypePrediction", {
            colorheader: "#767676",
            colorprediction: "#f0f0f0"
          });
      }
    },
    setColorBorder() {
      var color = "";
      switch (this.expire) {
        case "inplay":
          color = "#ff7c7c";
          break;
        case "pregame":
          color = "#5bb6e7";
          break;
        default:
          color = "#767676";
      }
      return color;
    }
  },
  created(){
    this.setColorBorder()
  }
};
</script>
<style lang="scss" scoped>
.contentprediction {
  background-color: #f0f0f0;
  margin: 0px 8px 10px 8px;
  box-shadow: -1px -1px 8px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  // border: 1px solid transparent;
}
</style>


