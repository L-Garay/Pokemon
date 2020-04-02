<template>
  <div>
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
  name: "Greeting",
  data() {
    return {
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
    this.getTimeOfDay();
    this.checkUser();
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
    editName() {
      this.userPreferences.setName = true;
      this.userPreferences.name = "";
      this.$nextTick(() => this.$refs.focus.focus());
    },
    getTimeOfDay() {
      let h = new Date().getHours(); // 0 - 23
      if (h < 12) {
        this.timeOfDay = "morning";
      } else if (h > 12 && h < 17) {
        this.timeOfDay = "afternoon";
      }
      setTimeout(this.getTimeOfDay, 6000); //every minute (I don't know how this will effect app speed)
    }
  }
};
</script>

<style scoped>
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