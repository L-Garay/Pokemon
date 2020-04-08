<template>
  <div
    class="container-fluid"
    id="home"
    :style="{ 'background-image': 'url(' + photo.urls.regular + ')'}"
  >
    <div class="row top">
      <div class="col-3 offset-9 weather">
        <weather />
      </div>
    </div>
    <div class="row middle">
      <div class="col-6 offset-3 clockGreeting">
        <clock :parentTime="militaryTime" :bus="bus" />
        <greeting />
      </div>
      <div class="modal fade photoModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="container-fluid">
              <div class="row images">
                <div class="col-3 image" v-for="photo in savedPhotos" :key="photo.id">
                  <img
                    @click="selectPhoto(photo._id)"
                    :src="photo.urls.thumbUrl"
                    alt="should be a small picture"
                  />
                  <p @click="deletePhoto(photo._id)">Delete photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bottom">
      <div class="col-3 settings-background">
        <div v-if="changeSettings" class="card">
          <h5 class="card-header" @click="toggleSettings">Settings</h5>
          <div class="card-body">
            <h5 class="card-title">Photo Settings</h5>
            <p class="card-text">Get a new photo</p>
            <button @click="getNewPhoto">Get photo</button>
            <p class="card-text">Save the current photo</p>
            <button @click="savePhoto">Save photo</button>
            <p class="card-text">Select a saved photo</p>
            <button type="button" data-toggle="modal" data-target=".photoModal">Choose Photo</button>
            <h5 class="card-title">Quote Settings</h5>
            <p class="card-text">Get a new quote</p>
            <button @click="getQuote">Get Quote</button>
            <p class="card-text">Save quote</p>
            <button @click="saveQuote">Save Quote</button>
            <!-- <p class="card-text">Get a new quote</p>
            <button @click="getQuote">Get Quote</button>-->
            <h5 class="card-title">Time Settings</h5>
            <p class="card-text">Set to military</p>
            <button @click="chooseMilitary">Set to Military</button>
            <p class="card-text">Set to standard</p>
            <button @click="chooseStandard">Set to Standard</button>
          </div>
        </div>
        <div v-else>
          <p @click="toggleSettings">Settings (gear symbol)</p>
          <p @click="openLink">Photo by Unsplash</p>
        </div>
      </div>
      <!-- <button
          @click="getNewPhoto"
        >Get photo</button>
        <button @click="savePhoto">Save photo</button>
        <button type="button" data-toggle="modal" data-target=".photoModal">Choose Photo</button>
        <p @click="openLink">Photo by Unsplash</p>
        <button @click="getQuote">Get Quote</button>
        <button @click="saveQuote">Save Quote</button>
        <button @click="chooseMilitary">Set to Military</button>
      <button @click="chooseStandard">Set to Standard</button>-->
    </div>
    <div class="col-6 quote">
      <quote :bus="bus" />
    </div>
    <div class="col-3 todo">this is where the todo will go</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Clock from "@/components/Clock.vue";
import Greeting from "@/components/Greeting.vue";
import Quote from "@/components/Quote.vue";
import Weather from "@/components/Weather.vue";
import Vue from "vue";
export default {
  name: "Home",
  data() {
    return {
      militaryTime: false,
      bus: new Vue(),
      changeSettings: false
    };
  },
  mounted() {
    this.$store.dispatch("getPhoto");
    this.$store.dispatch("getSavedPhotos");
  },
  computed: {
    photo() {
      return this.$store.state.photo;
    },
    savedPhotos() {
      return this.$store.state.savedPhotos;
    }
  },
  methods: {
    // NOTE All these methods will eventually be in a 'Settings' component
    // Time methods
    async chooseMilitary() {
      await this.setMilitaryTime();
      this.changeChild();
    },
    setMilitaryTime() {
      this.militaryTime = true;
    },
    async chooseStandard() {
      await this.setStandardTime();
      this.changeChild();
    },
    setStandardTime() {
      this.militaryTime = false;
    },
    changeChild() {
      this.bus.$emit("change");
    },

    // Photo methods
    getNewPhoto() {
      this.$store.dispatch("getPhoto");
    },
    savePhoto() {
      let savedPhoto = {
        id: this.$store.state.photo.id,
        width: this.$store.state.photo.width,
        height: this.$store.state.photo.height,
        urls: {
          fullUrl: this.$store.state.photo.urls.full,
          regular: this.$store.state.photo.urls.regular,
          thumbUrl: this.$store.state.photo.urls.thumb
        },
        downloadLocation: this.$store.state.photo.links.download_location,
        userName: this.$store.state.photo.user.username,
        name: this.$store.state.photo.user.name,
        unsplashLink: this.$store.state.photo.links.html
      };
      this.$store.dispatch("savePhoto", savedPhoto);
    },
    selectPhoto(id) {
      this.$store.dispatch("selectPhoto", id);
    },
    deletePhoto(id) {
      this.$store.dispatch("deletePhoto", id);
    },
    openLink() {
      window.open(
        "https://unsplash.com/@" +
          this.photo.user.username +
          "?utm_source=Inspire&utm_medium=referral"
      );
    },

    // Quote methods
    getQuote() {
      this.bus.$emit("getQuote");
    },
    saveQuote() {
      this.bus.$emit("saveQuote");
    },

    // Setting methods
    toggleSettings() {
      if (this.changeSettings) {
        this.changeSettings = false;
      }
      this.changeSettings = true;
    }
  },
  components: {
    Clock,
    Greeting,
    Quote,
    Weather
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
.row.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.image img {
  height: 100px;
  width: 175px;
  margin: 3px;
}
</style>
