<template>
  <div>
    <div class="clock" v-if="militaryTimeSelected">
      {{ militaryTime }}
    </div>
    <div class="clock" v-else>{{ time }}</div>
    <div class="greeting" v-if="setName">
      Good {{ timeOfDay }},
      <input ref="input" type="text" v-model="name" v-on:keyup.enter="submit" />
    </div>
    <div class="greeting" v-else>
      Good {{ timeOfDay }}, {{ name }}
      <i class="fas fa-pencil-alt" @click="editName"></i>
    </div>
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
      timeOfDay: "evening",
      name: "",
      setName: true
    };
  },
  mounted() {
    this.getTime();
    this.getTimeOfDay();
  },
  methods: {
    submit() {
      this.setName = false;
      let name = this.name;
      this.$store.dispatch("setName", name);
    },
    getTime() {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      m = this.checkTime(m);
      s = this.checkTime(s);
      let time = h + ":" + m + ":" + s;
      this.militaryTime = time;
      if (this.militaryTimeSelected == false) {
        h = this.checkTime(h);
        let session = "AM";
        if (h == 0) {
          h = 12;
        }
        if (h > 12) {
          h = h - 12;
          session = "PM";
        }
        let time = h + ":" + m + ":" + s + " " + session;
        this.time = time;
      }
      setTimeout(this.getTime, 500);
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      } // add zero in front of numbers < 10
      return i;
    },
    getTimeOfDay() {
      let h = new Date().getHours(); // 0 - 23
      if (h < 12) {
        this.timeOfDay = "morning";
      } else if (h > 12 && h < 17) {
        this.timeOfDay = "afternoon";
      }
      setTimeout(this.getTimeOfDay, 6000); //every minute (I don't know how this will effect app speed)
    },
    editName() {
      this.setName = true;
      this.name = "";
      debugger;
      this.$refs.input.focus();
    }
  }
};
</script>

<style scoped>
input {
  border: none;
  border-bottom: 1pt solid black;
  width: 100px;
  text-align: center;
}
input:focus {
  outline: none;
}
i {
  color: green;
  opacity: 0.1;
}
i:hover {
  cursor: pointer;
  opacity: 1;
}
</style>
