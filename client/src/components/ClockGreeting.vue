<template>
  <div class="CG containter">
    <div class="row">
      <div class="col-6 offest-3 clock" v-if="militaryTimeSelected">
        {{ militaryTime }}
      </div>
      <div class="col-6 offest-3 clock" v-else>{{ time }}</div>
      <div class="col-6 offset-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClockGreeting",
  data() {
    return {
      time: "",
      militaryTime: "",
      militaryTimeSelected: false
    };
  },
  mounted: {
    time() {
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

      this.time = h + ":" + m + ":" + s + " " + session;
    },
    militaryTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      var session = "PM";

      if (h > 12) {
        session = "PM";
      }

      m = this.checkTime(m);
      s = this.checkTime(s);

      this.militaryTime = h + ":" + m + ":" + s;
    }
  },
  methods: {
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
