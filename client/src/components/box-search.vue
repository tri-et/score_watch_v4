<template>
  <div class="container-search" :class="{'active-search':activeSearch,'expand-league':openFilter}">
    <div class="header-search" :class="{'hide-header-search':openFilter}">
      <div class="input-teamname">
        <input placeholder="Search here" @input="updateTeamName" v-model="filterTeam" />
      </div>
      <div class="close-button" @click="closeSearch()">
        <i class="material-icons">clear</i>
      </div>
    </div>
    <div class="header-filters" :class="{'show-header-filter':openFilter}">
      <div>
        <span>Filter by League</span>
      </div>
      <div class="refresh" :style="{'opacity':countLeague==0?'0.34':'1'}" @click="resetChecked()">
        <i class="material-icons">replay</i>
      </div>
      <div class="close-button" @click="closeFilter()">
        <i class="material-icons">clear</i>
      </div>
    </div>
    <div class="title-filters" :class="{'hide-title-filters':openFilter}">
      <div>
        <span>Filter by League</span>
      </div>
      <div @click="expandFilters()">
        <span>None</span>
        <span>
          <i class="material-icons">expand_more</i>
        </span>
      </div>
    </div>
    <div class="contain-filter" :class="{'show-contain-filter':openFilter}">
      <div class="search-league">
        <input type="text" placeholder="Search league" v-model="filterText">
      </div>
    </div>
    <div class="league-content">
      <ul>
        <template v-for="(items,index) in filterLeague">
          <li :key="index">
            <input :value="items" :id="items" type="checkbox" v-model="checkLeague">
            <label :for="items">{{items}}</label>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      filterText: "",
      filterTeam: "",
      checkLeague: []
    };
  },
  watch: {
    checkLeague(newvalue) {
      this.$store.commit("setcountLeague", newvalue.length);
      if (this.activeMenu == "predictions") {
        this.$store.commit("setleagueSelected", newvalue);
      } else {
        this.$store.commit("setleagueSelectedLiveScore", newvalue);
      }
    }
  },
  computed: {
    ...mapGetters([
      "activeSearch",
      "openFilter",
      "allLeague",
      "countLeague",
      "filterTeamName",
      "allLeagueLiveScore",
      "activeMenu"
    ]),
    filterLeague() {
      var league =
        this.activeMenu == "predictions"
          ? this.allLeague
          : this.allLeagueLiveScore;
      return league.filter(el => {
        return el.match(new RegExp(this.filterText, "gi"));
      });
    }
  },
  methods: {
    updateTeamName(e) {
      this.$store.commit("setfilterTeamName", e.target.value);
    },
    expandFilters() {
      this.$store.commit("setopenFilter", true);
    },
    closeFilter() {
      this.$store.commit("setopenFilter", false);
      this.$store.commit("setactiveSearch", false);
    },
    closeSearch() {
      this.$store.commit("setactiveSearch", false);
      this.$store.commit("setfilterTeamName", "");
      this.filterTeam = "";
    },
    resetChecked() {
      this.checkLeague = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.container-search {
  background-color: #444;
  top: 0;
  position: absolute;
  width: 100%;
  color: #000;
  transition: transform 0.2s linear;
  transform: translateY(-100%);
  z-index: 5;
  // height: 104px;
}
.expand-league {
  height: 100%;
  transition: height 1s ease-in;
}
.active-search {
  transform: translateY(0) !important;
}
.header-search {
  display: flex;
  align-items: center;
  height: 64px;
  transition: transform 0.2s linear;
  transform: translateY(0);
}
.hide-header-search {
  transform: translateY(-100%);
}
.close-button,
.refresh {
  color: #fff;
  box-shadow: -1px 0 0 0 rgba(255, 255, 255, 0.1);
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  i {
    font-weight: bold !important;
    font-size: 27px !important;
  }
}
.title-filters {
  background-color: #333;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 15px;
  div:first-child {
    flex: 1;
    color: #fff;
    opacity: 0.34;
    font-size: 14px;
  }
  div:nth-child(2) {
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    span:nth-child(2) {
      padding-top: 5px;
    }
  }
}
.input-teamname {
  flex: 1;
  margin: 0 15px;
  input {
    border: none;
    border-radius: 15px;
    height: 30px;
    background-color: #575757;
    outline: none;
    padding-left: 10px;
    width: -webkit-fill-available;
    color: #fff;
  }
}
.header-filters {
  height: 64px;
  top: 0;
  position: absolute;
  width: 100%;
  display: none;
  color: #fff;
  box-shadow: 0px 1px 0 0 rgba(255, 255, 255, 0.1);
  div:first-child {
    flex: 1;
    padding-left: 15px;
  }
}
.hide-title-filters {
  display: none !important;
}
.show-header-filter {
  display: flex !important;
  align-items: center;
}
.contain-filter {
  height: 0;
  visibility: hidden;
}
.show-contain-filter {
  visibility: visible;
  height: 100% !important;
  transition: height 0.5s ease-in;
}
.search-league {
  box-shadow: 0px 1px 0 0 rgba(255, 255, 255, 0.1);
  padding: 8px 15px;
  input {
    height: 20px;
    border: none;
    border-radius: 15px;
    height: 30px;
    background-color: #575757;
    outline: none;
    padding-left: 10px;
    width: -webkit-fill-available;
    color: #fff;
  }
}
.league-content {
  overflow-x: hidden;
  position: absolute;
  top: 116px;
  height: 100%;
  width: 100%;
  max-height: calc(100% - 116px);
  -webkit-overflow-scrolling: touch;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: flex;
    padding: 8px 15px;
    box-shadow: 0px 1px 0 0 rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 14px;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
}
</style>


