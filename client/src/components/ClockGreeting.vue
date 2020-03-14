<template>
  <div>
    <div class="clock" v-if="militaryTimeSelected">
      {{ militaryTime }}
    </div>
    <div class="clock" v-else>{{ time }}</div>
    <div class=""></div>
  </div>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      time: "",
      militaryTime: "",
      militaryTimeSelected: false
    };
  },
  mounted() {
    this.getMilitaryTime();
    this.getTime();
  },
  methods: {
    getTime() {
      var today = new Date();
      var h = today.getHours(); // 0 - 23
      var m = today.getMinutes(); // 0 - 59
      var s = today.getSeconds(); // 0 - 59
      var session = "AM";

      if (h == 0) {
        h = 12;
      }

      if (h > 12) {
        h = h - 12;
        session = "PM";
      }

      h = this.checkTime(h);
      m = this.checkTime(m);
      s = this.checkTime(s);

      var time = h + ":" + m + ":" + s + " " + session;
      this.time = time;
      setTimeout(this.getTime, 500);
    },
    getMilitaryTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();

      m = this.checkTime(m);
      s = this.checkTime(s);

      var time = h + ":" + m + ":" + s;
      this.militaryTime = time;
      setTimeout(this.getMilitaryTime, 500);
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      } // add zero in front of numbers < 10
      return i;
    }
  }
};
</script>

<style scoped></style>
