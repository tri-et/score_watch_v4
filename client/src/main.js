import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes} from './routers';
import store from './store';
import { ResizeObserver } from 'vue-resize'
Vue.component('resize-observer', ResizeObserver);
Vue.use(VueRouter);
Vue.filter('highlight', function(words, query){
  var iQuery = new RegExp(query, "ig");
  return words.toString().replace(iQuery, function(matchedTxt){
      return ('<span style="background-color: yellow">' + matchedTxt + '</span>');
  });
});
const router = new VueRouter({
  routes,
  // mode:'history'
});
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
