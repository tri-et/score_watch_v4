<template>
  <div class="error" :class="{'show_error':isShowError}">
    <div class="error_img">
      <div>
        <span>Whoop!</span>
      </div>
      <div><img style="margin:25px 0px" width="30%" src="../../assets/images/error_image.png" /></div>
      <div>
        <span>Whoop!</span>
        <span>Something went wrong...</span>
      </div>
      <div>
        <br>
        <a @click="retry()" class="retry" href="">Tap here to retry</a>
      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isShowError", "setselectDatePre"])
  },
  methods: {
    retry() {
      this.$parent.getData.getDataPreInplay(this.$parent, this.setselectDatePre);
    }
  }
};
</script>
<style scoped>
.show_error {
  display: block !important;
}
.error_img {
  margin: auto;
  position: absolute;
  top: -43px;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 500px;
  color: #6f6f6f;
}
.error {
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;
  background-color: #333;
  top: 73px;
}
.retry {
  color: #fff;
  opacity: 0.8;
  font-size: 14px;
}
</style>


