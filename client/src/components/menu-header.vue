<template>
  <div>
    <div class="menu-header">
      <header>
        <nav>
          <ul class="desktop" :class="{'showMenuMobile':menuMobile}">
            <li>
              <div class="logo"></div>
            </li>
            <router-link to="/" tag="li">
              <a>
                <div class="menu" @click="menuSelected('predictions')">
                  <div>
                    <span>predictions</span>
                  </div>
                  <div class="bar" :class="{'active-bar':activeMenu=='predictions'}"></div>
                </div>
              </a>
            </router-link>
            <router-link to="/livescore" tag="li">
              <a>
                <div class="menu" @click="menuSelected('live score')">
                  <div>
                    <span>live score</span>
                  </div>
                  <div class="bar" :class="{'active-bar':activeMenu=='live score'}"></div>
                </div>
              </a>
            </router-link>
            <li>
              <div class="containerSearch" :class="{'show-containerSearch':activeSearchDesk}">
                <div @click="openFilterDesk()">
                  <span>Filter by League</span>
                  <span>
                    <i class="material-icons">expand_more</i>
                  </span>
                </div>
                <div>
                  <input type="text" placeholder="Search here" @input="updateTeamName">
                </div>
              </div>
            </li>
            <li @click="openSearchDesk()">
              <div class="search">
                <i class="material-icons">{{activeSearchDesk?'youtube_searched_for':'search'}}</i>
              </div>
            </li>
          </ul>

          <!--start menu for mobile -->
          <ul class="mobile" :class="{'showMenuMobile':!menuMobile}">
            <li>
              <div class="logo"></div>
            </li>
            <li>
              <div class="group-menu">
                <router-link to="/" tag="li" :class="{'active-menu-mobile':activeMenu=='predictions'}">
                  <div class="menu" @click="menuSelected('predictions')">
                    <div>
                      <span>prediction</span>
                    </div>
                  </div>
                </router-link>
                <router-link to="/livescore" tag="li" :class="{'active-menu-mobile':activeMenu=='live score'}">
                  <div class="menu" @click="menuSelected('live score')">
                    <div>
                      <span>live score</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </li>

            <li>
              <div class="search" @click="openSearch()">
                <i class="material-icons">{{countLeague!=0?'youtube_searched_for':'search'}}</i>
              </div>
            </li>
          </ul>
          <!--end menu for mobile -->
        </nav>
      </header>
      <resize-observer @notify="menuResize" />
    </div>
    <div class="result-search" :class="{'show-result-search':countLeague!=0}">
      <ul>
        <li>
          <div>
            <span>Search term</span>
          </div>
          <div>
            <span>{{filterTeamName|setTerm}}</span>
          </div>
        </li>
        <li>
          <div>
            <span>Filter by League</span>
          </div>
          <div>
            <span>{{countLeague+" selected"}} </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import boxsearch from "./box-search";
export default {
  components: {
    boxsearch
  },
  computed: {
    ...mapGetters([
      "isActiveSideBar",
      "activeMenu",
      "menuMobile",
      "countLeague",
      "filterTeamName",
      "activeSearchDesk",
      "isShowLeagueBoxDesk"
    ])
  },
  filters: {
    setTerm(val) {
      return val == "" ? '"None"' : '"' + val + '"';
    }
  },
  methods: {
    openSearchDesk() {
      this.$store.commit("setactiveSearchDesk", !this.activeSearchDesk);
    },
    openFilterDesk() {
      this.$store.commit('setisShowLeagueBoxDesk',!this.isShowLeagueBoxDesk)
    },
    openSearch() {
      if (this.countLeague == 0) {
        this.$store.commit("setactiveSearch", true);
      } else {
        this.$store.commit("setcountLeague", 0);
        this.$parent.$refs.boxSearch.checkLeague = []; //reset league selected
        this.$parent.$refs.boxSearch.checkLeague = []
      }
    },
    openSideBar() {
      this.$store.commit("setisActiveSideBar", true);
    },
    menuSelected(menuName) {
      this.$store.commit("setcountLeague", 0);
      this.$store.commit("setactiveMenu", menuName);
    },
    menuResize() {
      var headerWidth = this.$el.querySelector("header").offsetWidth;
      if (headerWidth >= 672) {
        this.$store.commit("setishowDetailPredictions", true);
        this.$store.commit("setishowDetailLivescore", true);
      }
      if (headerWidth >= 843) {
        this.$store.commit("setmenuMobile", false);
        this.$store.commit("setactiveSearch", false);
      } else {
        this.$store.commit("setmenuMobile", true);
      }
    },
    updateTeamName(e){
      this.$store.commit('setfilterTeamName', e.target.value)
    }
  },
  mounted() {
    var headerWidth = this.$el.querySelector("header").offsetWidth;
    if (headerWidth >= 672) {
      this.$store.commit("setishowDetailPredictions", true);
      this.$store.commit("setishowDetailLivescore", true);
    }
    if (headerWidth >= 843) {
      this.$store.commit("setmenuMobile", false);
    } else {
      this.$store.commit("setmenuMobile", true);
    }
  }
};
</script>
<style lang="scss" scoped>
.containerSearch {
  text-transform: none;
  align-items: center;
  display: none;
  div:nth-child(1) {
    padding: 0 10px;
    display: flex;
    align-items: center;
    box-shadow: -1px 0 0 0 rgba(255, 255, 255, 0.1);
    height: 64px;
    span:nth-child(2) {
      margin-top: 3px;
    }
  }
  div:nth-child(2) {
    box-shadow: -1px 0 0 0 rgba(255, 255, 255, 0.1);
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    input {
      border: none;
      border-radius: 15px;
      height: 23px;
      outline: none;
      background-color: #575757;
      padding-left: 10px;
      width: 210px;
      color:#fff;
    }
  }
}
.show-containerSearch {
  display: flex !important;
}
.result-search {
  background-color: #333;
  z-index: 5;
  position: absolute;
  width: 100%;
  top: 64px;
  display: none;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      display: flex;
      padding: 8px 15px;
      box-shadow: 0px 1px 0 0 rgba(255, 255, 255, 0.1);
      font-size: 14px;
      div:first-child {
        color: #fff;
        opacity: 0.34;
        flex: 1;
      }
      div:nth-child(2) {
        color: #fff;
      }
    }
  }
}
.show-result-search {
  display: block !important;
}
.menu-header {
  height: 64px;
  width: 100%;
  background-color: #444;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  max-width: 1280px;
  min-width: 320px;
  z-index: 2;
  position: absolute;
  top: 0;
  ul {
    margin: 0;
    padding: 0;
    height: 64px;
    display: flex;
    text-transform: uppercase;
    li {
      margin: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  .desktop {
    li {
      padding-right: 20px;
      height: 64px;
    }
    li:nth-child(3) {
      flex: 1;
    }
    li:last-child {
      padding: 0 !important;
      box-shadow: -1px 0 0 0 rgba(255, 255, 255, 0.1);
    }
    li a:hover .bar {
      visibility: visible !important;
    }
    a {
      text-decoration: none;
      color: #fff;
      padding: 15px 0;
    }
  }
  .mobile {
    li:nth-child(2) {
      flex: 1;
      justify-content: center;
    }
    > li:last-child {
      box-shadow: -1px 0 0 0 rgba(255, 255, 255, 0.1);
      height: 64px;
    }
  }
}
.menu {
  display: grid;
  justify-items: center;
  width: fit-content;
}
.bar {
  width: 72px;
  height: 4px;
  background: #fff;
  border-radius: 50px;
  margin-top: 2px;
  visibility: hidden;
}
.active-bar {
  visibility: visible !important;
}
.logo {
  height: 48px;
  width: 48px;
  border-radius: 8px;
  background: #000;
  margin-left: 8px;
}
.search {
  height: 48px;
  width: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-help {
  margin-top: 7px;
}
.group-menu {
  display: flex;
  height: 45px;
  border: 2px solid #fff;
  li {
    padding: 0 10px;
    color: #a4a4a4;
  }
  li:hover {
    color: #4d4d4d !important;
    background-color: #fff;
  }
}
.active-menu-mobile {
  color: #4d4d4d !important;
  background-color: #fff;
}
.showMenuMobile {
  display: none !important;
}
</style>


