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
        <button @click="getPhoto">Get photo</button>
        <button @click="savePhoto">Save photo</button>
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
    return {
      image: {
        id: "",
        width: 0,
        height: 0,
        fullUrl: "",
        regularUrl: "",
        downloadLocation: "",
        userName: "",
        unsplashLink: ""
      }
    };
  },
  components: {},
  mounted() {
    this.$store.dispatch("getPhoto");
  },
  computed: {
    photo() {
      this.image.id = this.$store.state.photo.id;
      this.image.width = this.$store.state.photo.width;
      this.image.height = this.$store.state.photo.height;
      this.image.fullUrl = this.$store.state.photo.urls.full;
      this.image.regularUrl = this.$store.state.photo.urls.regular;
      this.image.downloadLocation = this.$store.state.photo.links.download_location;
      this.image.userName = this.$store.state.photo.user.name;
      this.image.unsplashLink = this.$store.state.photo.links.html;
      return this.$store.state.photo;
    }
  },
  methods: {
    // getPhoto() {
    //   this.$store.dispatch("getPhoto");
    // },
    savePhoto() {
      let savedPhoto = { ...this.image };
      this.$store.dispatch("savePhoto", this.image);
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
