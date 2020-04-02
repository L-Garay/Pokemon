<template>
  <div>
    <div class="clock" v-if="User.militaryTimeSelected">{{ militaryTime }}</div>
    <div class="clock" v-else>{{ time }}</div>
  </div>
</template>

<script>
export default {
  name: "Clock",
  data() {
    return {
      time: "",
      militaryTime: "",
      userPreferences: {
        name: "",
        militaryTimeSelected: false,
        setName: true
      }
    };
  },
  mounted() {
    this.getTime();
    this.bus.$on("change", this.changeTime);
  },
  computed: {
    User() {
      return this.$store.state.userPreferences;
    }
  },
  methods: {
    getTime() {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();

      m = this.checkTime(m);

      let time = h + ":" + m;
      this.militaryTime = time;
      if (this.$store.state.userPreferences.militaryTimeSelected == false) {
        h = this.checkTime(h);
        let session = "AM";
        if (h == 0) {
          h = 12;
        }
        if (h > 12) {
          h = h - 12;
          session = "PM";
        }
        let time = h + ":" + m + " " + session;
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
    async changeTime() {
      console.log("parentTime", this.parentTime);
      // debugger;
      if (this.parentTime == false) {
        this.userPreferences.militaryTimeSelected = false;
      } else if (this.parentTime == true) {
        this.userPreferences.militaryTimeSelected = true;
      }
      console.log(this.userPreferences.militaryTimeSelected);
      console.log(this.militaryTime);

      this.updateTime();
    },
    async updateTime() {
      let newUserTime = {
        name: this.$store.state.userPreferences.name,
        militaryTimeSelected: this.userPreferences.militaryTimeSelected,
        setName: false
      };
      await this.$store.dispatch("updateTime", newUserTime);
      this.$store.dispatch("getUser");
    }
  },
  props: ["parentTime", "bus"]
};
</script>

<style>
.clock {
  font-size: 8rem;
}
</style>