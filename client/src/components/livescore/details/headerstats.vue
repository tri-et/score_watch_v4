<template>
   <div class="stats">
     <div class="content-stats">
       <div><span>HOME</span></div>
       <div><span>STATS</span></div>
       <div><span>AWAY</span></div>
     </div>
   </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.stats{
  /* background-color: #FF7C7C; */
  height: 55px;
  display:flex;
  align-items: flex-end;
  background-color:#444;
}
.content-stats{
  /* background-color: rgb(22, 66, 66); */
  height: 55px;
  width: 100%;
  color:#fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
}
.content-stats div {
  width: 25%;
}
.content-stats div:nth-child(2){
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  width: 50% !important;
}
.content-stats div:last-child{
  text-align: right;
}
</style>


