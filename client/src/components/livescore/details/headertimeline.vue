<template>
   <div class="timelive">
     <div class="content-timelive">
       <div><span>HOME</span></div>
       <div><span>TIMELINE</span></div>
       <div><span>AWAY</span></div>
     </div>
   </div>
</template>
<script>
import { mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters(["typePrediction"])
  }
}
</script>
<style scoped>
.timelive{
  height: 55px;
  display:flex;
  align-items: flex-end;
  background-color:#444;
}
.content-timelive{
  height: 55px;
  width: 100%;
  color:#fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
}
.content-timelive div {
  width: 25%;
}
.content-timelive div:nth-child(2){
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  width: 50% !important;
}
.content-timelive div:last-child{
  text-align: right;
}
</style>


