<template>
  <div>
    <div class="clock" v-if="militaryTimeSelected">
      {{ militaryTime }}
    </div>
    <div class="clock" v-else>{{ time }}</div>
    <div class="greeting" v-if="setName">
      Good {{ timeOfDay }},
      <input
        class="nameInput"
        type="text"
        v-model="name"
        v-on:keyup.enter="submit"
      />
    </div>
    <div class="greeting" v-else>Good {{ timeOfDay }}, {{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      time: "",
      militaryTime: "",
      militaryTimeSelected: false,
      timeOfDay: "",
      name: "",
      setName: true
    };
  },
  mounted() {
    this.getTime();
  },
  methods: {
    submit() {
      this.setName = false;
      let name = this.name;
      this.$store.dispatch("setName", name);
    },
    getTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      m = this.checkTime(m);
      s = this.checkTime(s);
      var time = h + ":" + m + ":" + s;
      this.militaryTime = time;
      if (this.militaryTimeSelected == false) {
        h = this.checkTime(h);
        var session = "AM";
        if (h == 0) {
          h = 12;
        }
        if (h > 12) {
          h = h - 12;
          session = "PM";
        }
        var time = h + ":" + m + ":" + s + " " + session;
        this.time = time;
      }
      setTimeout(this.getTime, 500);
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
