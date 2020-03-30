<template>
  <div>
    <div class="clock" v-if="User.militaryTimeSelected">{{ militaryTime }}</div>
    <div class="clock" v-else>{{ time }}</div>
    <div class="greeting" v-if="userPreferences.setName">
      Good {{ timeOfDay }},
      <input
        ref="focus"
        type="text"
        v-model="userPreferences.name"
        v-on:keyup.enter="submit"
        v-autowidth="{ maxWidth: '550px', minWidth: '100px', comfortZone: 30 }"
      />
    </div>
    <div class="greeting" v-else>
      Good {{ timeOfDay }}, {{ User.name }}
      <i class="fas fa-pencil-alt" @click="editName"></i>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from "vue-input-autowidth";
import Vue from "vue";
Vue.use(VueInputAutoWidth);
export default {
  name: "Clock",
  data() {
    return {
      time: "",
      militaryTime: "",
      timeOfDay: "evening",
      // NOTE Don't forget to add the option to set time preference!!!
      userPreferences: {
        name: "",
        militaryTimeSelected: false,
        setName: true
      }
    };
  },
  mounted() {
    this.getTime();
    this.getTimeOfDay();
    this.checkUser();
    this.bus.$on("change", this.changeTime);
  },
  computed: {
    User() {
      return this.$store.state.userPreferences;
    }
  },
  methods: {
    submit() {
      this.userPreferences.setName = false;
      this.$store.dispatch("setUser", this.userPreferences);
    },
    async checkUser() {
      let result = await this.$store.dispatch("getUser");
      if (Object.keys(result).length === 0) {
        this.userPreferences.setName = true;
      } else {
        this.userPreferences.setName = false;
      }
    },
    getTime() {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();

      m = this.checkTime(m);

      let time = h + ":" + m;
      this.militaryTime = time;
      if (this.userPreferences.militaryTimeSelected == false) {
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
    getTimeOfDay() {
      let h = new Date().getHours(); // 0 - 23
      if (h < 12) {
        this.timeOfDay = "morning";
      } else if (h > 12 && h < 17) {
        this.timeOfDay = "afternoon";
      }
      setTimeout(this.getTimeOfDay, 6000); //every minute (I don't know how this will effect app speed)
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
      this.checkUser();
    },
    editName() {
      this.userPreferences.setName = true;
      this.userPreferences.name = "";
      this.$nextTick(() => this.$refs.focus.focus());
    }
  },
  props: ["parentTime", "bus"]
};
</script>

<style scoped>
.clock {
  font-size: 8rem;
}
.greeting {
  font-size: 3rem;
}
input {
  border: none;
  border-bottom: 1pt solid black;
  /* max-width: 500px; */
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
