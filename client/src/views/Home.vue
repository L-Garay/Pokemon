<template>
  <div class="container" id="home" :style="{'backgroundImage': 'url(photo.urls.full)'}">
    <div class="row top">
      <div class="col-3 offset-9 weather">weather will go here</div>
    </div>
    <div class="row middle">
      <div class="col-6 offset-3 clockGreeting">
        <clock />
      </div>
    </div>
    <div class="row bottom">
      <div class="col-3 settings-background">
        this is where the settings will go, and bg-img seetings
        <button @click="getPhoto">Get photo</button>
      </div>
      <div class="col-6 quote">this is where the quote will go</div>
      <div class="col-3 todo">this is where the todo will go</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Clock from "@/components/ClockGreeting.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {},
  mounted() {
    // this.$store.dispatch("getPhoto");
  },
  computed: {
    photo() {
      return this.$store.state.photo;
    }
  },
  methods: {
    getPhoto() {
      this.$store.dispatch("getPhoto");
    }
  },
  components: {
    Clock
  }
};
</script>

<style scoped>
#home {
  max-height: 100vh;
  max-width: 100vw;
}
</style>
