<template>
  <div class="sidebar" :class="{'active-sidebar':isActiveSideBar}">
    <div class="side-header">
      <div class="bt_close" @click="closeSideBar()">
        <span>&times;</span>
      </div>
      <div class="menu">
        <span>menu</span>
      </div>
      <div class="logo"></div>
    </div>
    <div class="side-content">
      <ul>
         <router-link to="/" tag="li">
          <div class="circle" :class="{'circle-active':activeMenu=='predictions'}"></div>
          <div @click="menuSelected('predictions')">
            <span>predictions</span>
          </div>
        </router-link>
        <router-link to="/livescore" tag="li">
          <div class="circle" :class="{'circle-active':activeMenu=='live score'}"></div>
          <div @click="menuSelected('live score')">
            <span>live score</span>
          </div>
        </router-link>
        <li>help</li>
      </ul>
    </div>
    <div class="side-footer">
      <span>All Right Reserved. © 2018. Powered by In-Play</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isActiveSideBar", "activeMenu"])
  },
  methods: {
    closeSideBar() {
      this.$store.commit("setisActiveSideBar", false);
    },
    menuSelected(menuName) {
      this.$store.commit("setactiveMenu", menuName);
      this.$store.commit("settitleMenu", menuName);
      this.$store.commit("setisActiveSideBar", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  background-color: #333;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 2;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s linear;
  transform: translateY(-100%);
}

.active-sidebar {
  transform: translateY(0) !important;
}
.side-header {
  background-color: #444;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  color: #fff;
  text-transform: uppercase;
  div:nth-child(2) {
    flex: 1;
    font-weight: 700;
    font-size: 18px;
  }
}

.side-content {
  flex: 1;
  min-height: 200px;
  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    height: 100%;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
  }
  li {
    display: flex;
    margin: 0;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    padding: 22px 0 22px 29px;
    cursor: pointer;
  }
  li:nth-child(2) {
    flex: 1;
  }
  li:last-child {
    padding-left: 69px;
  }
}

.side-footer {
  padding: 26px 0;
  opacity: 0.34;
  text-align: center;
}
.logo {
  height: 48px;
  width: 48px;
  border-radius: 8px;
  background: #000;
  margin-left: 8px;
  margin-right: 8px;
}
.bt_close {
  margin-left: 24px;
  margin-right: 24px;
  font-size: 35px;
  cursor: pointer;
}
.circle {
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50px;
  visibility: hidden;
  margin-right: 29px;
  margin-top: 5px;
}
.circle-active{
  visibility: visible !important;
}
</style>


