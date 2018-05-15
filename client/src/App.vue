<template>
  <div id="app">
    <menuheader></menuheader>
    <router-view></router-view>
    <boxsearch ref="boxSearch"></boxsearch>
  </div>
</template>

<script>
import menuheader from "./components/menu-header";
import sidebar from "./components/side-bar";
import boxsearch from "./components/box-search"
export default {
  name: "app",
  components: {
    menuheader,
    boxsearch
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1280px;
  margin: auto;
  padding: 0px;
  display: flex;
  flex-direction: column;
  min-width: 320px;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
}
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 transparent;
  outline: none;
  border: none;
  margin-top: 16px;
}

::-webkit-scrollbar-thumb {
  border: none;
  border-radius: 10px;
  background: linear-gradient(180deg, #cacaca 0%, rgba(255, 255, 255, 0) 50%);
}
</style>
