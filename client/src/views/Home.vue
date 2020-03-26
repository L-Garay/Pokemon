<template>
  <div
    class="container-fluid"
    id="home"
    :style="{ 'background-image': 'url(' + photo.urls.regular + ')'}"
  >
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
        <button
          @click="getNewPhoto"
        >Get photo</button>
        <button @click="savePhoto">Save photo</button>
        <p @click="openLink">Photo by Unsplash</p>
      </div>
      <div class="col-6 quote">{{quote}}</div>
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
    this.$store.dispatch("getPhoto");
    this.$store.dispatch("getQuote");
  },
  computed: {
    photo() {
      return this.$store.state.photo;
    },
    quote() {
      return this.$store.state.quote;
    }
  },
  methods: {
    getNewPhoto() {
      this.$store.dispatch("getPhoto");
    },
    savePhoto() {
      let savedPhoto = {
        id: this.$store.state.photo.id,
        width: this.$store.state.photo.width,
        height: this.$store.state.photo.height,
        fullUrl: this.$store.state.photo.urls.full,
        regularUrl: this.$store.state.photo.urls.regular,
        downloadLocation: this.$store.state.photo.links.download_location,
        userName: this.$store.state.photo.user.username,
        name: this.$store.state.photo.user.name,
        unsplashLink: this.$store.state.photo.links.html
      };
      this.$store.dispatch("savePhoto", savedPhoto);
    },
    openLink() {
      window.open(
        "https://unsplash.com/@" +
          this.photo.user.username +
          "?utm_source=Inspire&utm_medium=referral"
      );
    }
  },
  components: {
    Clock
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  width: 100vw;
  background-size: cover;
  background-position: center;
  background-repeat: none;
}
</style>
