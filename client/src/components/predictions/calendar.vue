<template>
  <div class="calendar">
    <div class="left-arrow" @click="leftArrow()">
      <i class="material-icons">keyboard_arrow_left</i>
    </div>
    <div class="date">
      <div v-for="(item,index) in days" :key="index" :class="{'active-date':(index==calendarPre),'futuredates':index>15}" @click="selectDate(item,index,$event)">
        <span>{{item|date}}</span><br style="clear:both">
        <span>{{item|day}}</span>
      </div>
      <resize-observer @notify="setDateCenter()" />
    </div>
    <div class="right-arrow" @click="rightArrow()">
      <i class="material-icons">keyboard_arrow_right</i>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      days: []
    };
  },
  computed: {
    ...mapGetters(["calendarPre"])
  },
  filters: {
    date(val) {
      var month_names_short = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return month_names_short[val.getMonth()] + " " + val.getDate();
    },
    day(val) {
      var day_names_short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let today = new Date();
      if (
        val.getFullYear() == today.getFullYear() &&
        val.getMonth() == today.getMonth() &&
        val.getDate() == today.getDate()
      ) {
        return "Today";
      }
      return day_names_short[val.getDay()];
    }
  },
  methods: {
    leftArrow() {
      var el = this.$el.querySelector(".date");
      $(el).animate({ scrollLeft: "-=" + 350 });
    },
    rightArrow() {
      var el = this.$el.querySelector(".date");
      $(el).animate({ scrollLeft: "+=" + 350 });
    },
    renderDays() {
      var dateOfmonth = [];
      for (var i = 16; i--; ) {
        var today = new Date();
        var preday = today.setDate(today.getDate() - i);
        dateOfmonth.push(new Date(preday));
      }
      var current = new Date();

      for (var i = 0; i < 15; i++) {
        var nextday = current.setDate(current.getDate() + 1);
        dateOfmonth.push(new Date(nextday));
      }
      this.days = dateOfmonth;
    },
    setDateCenter() {
      let outer = this.$el.querySelector(".date").clientWidth;
      let inner = this.$el.querySelector(".date").scrollWidth;
      this.$el.querySelector(".date").scrollLeft = (inner - outer) / 2;
    },
    selectDate(item, index, event) {
      var today = new Date();
      if (today.getTime() >= item.getTime()) {
        this.$store.commit("setcalendarPre", index);
        this.setDateSelectedCenter(event.currentTarget.offsetLeft);
        var oldDate =item.getFullYear() +"-" +(item.getMonth() + 1) +"-" +item.getDate();
        this.$store.commit('setselectDatePre',oldDate)
        this.$store.commit('setloadingPredictions',true)
        this.$parent.getData.getInPlayPreGame(this.$parent, oldDate);
      }
    },
    setDateSelectedCenter(currentPositionclick) {
      let outer = this.$el.querySelector(".date").clientWidth;
      let inner = this.$el.querySelector(".date").scrollWidth;
      let centerposition = outer / 2;

      let position = currentPositionclick - centerposition;
      $(this.$el.querySelector(".date")).animate({
        scrollLeft: currentPositionclick - outer / 2 + 10
      });
    }
  },
  created() {
    var today = new Date()
    var currentDate =today.getFullYear() +"-" +(today.getMonth() + 1) +"-" +today.getDate();
    this.renderDays();
    this.$store.commit('setselectDatePre',currentDate)
  },
  mounted() {
    this.setDateCenter();
  }
};
</script>
<style lang="scss" scoped>
.calendar {
  width: 100%;
  display: flex;
  background-color: #212121;
  height: 62px;
}
.left-arrow {
  width: 30px;
  height: 100%;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
}
.right-arrow {
  width: 30px;
  height: 100%;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4;
}
.date {
  flex: 1;
  white-space: nowrap;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}
.date::-webkit-scrollbar {
  display: none !important;
}
.date div {
  display: inline-block;
  padding: 15px 18px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #4e4e4e;
  transition: background-color 1s ease-out;
}
.date div[class="futuredates"] {
  cursor: default !important;
}
.date div span:nth-child(3) {
  font-size: 12px !important;
}

.date div:not(.futuredates):hover {
  background-color: #333;
}
.active-date {
  background-color: #333;
  color: #fff !important;
}
</style>


