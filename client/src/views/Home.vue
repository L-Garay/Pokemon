<template>
  <div
    class="container-fluid"
    id="home"
    :style="{ 'background-image': 'url(' + photo.urls.regular + ')' }"
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
      <div class="col-3 settings-section">
        <!-- <div v-if="changeSettings" class="settings-card">
          <h3 class="settings-header" @click="toggleSettings">Settings</h3>
          <div class="settings-body">
            <h5 class="settings-title">Photo Settings</h5>
            <div class="individual">
              <p class="settings-text">Get a new photo</p>
              <button @click="getNewPhoto">Get photo</button>
            </div>
            <div class="individual">
              <p class="settings-text">Save the current photo</p>
              <button @click="savePhoto">Save photo</button>
            </div>
            <div class="individual">
              <p class="settings-text">Select a saved photo</p>
              <button type="button" data-toggle="modal" data-target=".photoModal">Choose Photo</button>
            </div>

            <h5 class="settings-title">Quote Settings</h5>
            <div class="individual">
              <p class="settings-text">Get a new quote</p>
              <button @click="getQuote">Get Quote</button>
            </div>
            <div class="individual">
              <p class="settings-text">Save quote</p>
              <button @click="saveQuote">Save Quote</button>
            </div>

            <p class="settings-text">Get a new quote</p>
            <button @click="getQuote">Get Quote</button>
            <h5 class="settings-title">Time Settings</h5>
            <div class="individual">
              <p class="settings-text">Set to military</p>
              <button @click="chooseMilitary">Set to Military</button>
            </div>
            <div class="individual">
              <p class="settings-text">Set to standard</p>
              <button @click="chooseStandard">Set to Standard</button>
            </div>
          </div>
        </div>-->
        <div
          class="modal bd-example-modal-sm"
          tabindex="-1"
          role="dialog"
          data-keyboard="true"
          id="modal"
        >
          <div class="modal-dialog" id="modal-position">
            <div class="modal-content">
              <h5 class="settings-title">Photo Settings</h5>
              <div class="individual">
                <p class="settings-text">Get a new photo</p>
                <button @click="getNewPhoto">Get photo</button>
              </div>
              <div class="individual">
                <p class="settings-text">Save the current photo</p>
                <button @click="savePhoto">Save photo</button>
              </div>
              <div class="individual">
                <p class="settings-text">Select a saved photo</p>
                <button type="button" data-toggle="modal" data-target=".photoModal">Choose Photo</button>
              </div>

              <h5 class="settings-title">Quote Settings</h5>
              <div class="individual">
                <p class="settings-text">Get a new quote</p>
                <button @click="getQuote">Get Quote</button>
              </div>
              <div class="individual">
                <p class="settings-text">Save quote</p>
                <button @click="saveQuote">Save Quote</button>
              </div>

              <h5 class="settings-title">Time Settings</h5>
              <div class="individual">
                <p class="settings-text">Set to military</p>
                <button @click="chooseMilitary">Set to Military</button>
              </div>
              <div class="individual">
                <p class="settings-text">Set to standard</p>
                <button @click="chooseStandard">Set to Standard</button>
              </div>
            </div>
          </div>
        </div>
        <div class="settings">
          <!-- <p @click="toggleSettings">Settings (gear symbol)</p>
          <p @click="openLink">Photo by Unsplash</p>-->
          <button type="button" class="btn btn-primary" @click="openModal">Small modal</button>
        </div>
      </div>
      <div class="col-6 quote">
        <quote :bus="bus" />
      </div>
      <div class="col-3 todo">this is where the todo will go</div>
    </div>
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
      changeSettings: false,
      showModal: false
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
          this.$store.state.photo.user.userName +
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
      } else {
        this.changeSettings = true;
      }
    },
    openModal() {
      $("#modal").modal("show");
      $(".modal-backdrop").remove();
      this.showModal = true;
    },
    closeModal() {}
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
  /* position: relative; */
}
.row.top {
  height: 25vh;
}
.row.middle {
  height: 65vh;
}
.row.bottom {
  height: 10vh;
  color: white;
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

/* Settings styling */
.settings-section {
  display: flex;
}
.settings {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-self: center;
}
.settings p {
  margin-bottom: 0;
}
.individual {
  display: flex;
  color: black;
}
/* .settings-card {
  color: white;
  background-color: grey;
  border: 2pt solid black;
  height: 350px;
}
.settings-header {
  border-bottom: 1pt solid black;
  cursor: pointer;
}
.settings-body {
  height: 300px;
  overflow-y: scroll;
} */

/* Modal specific styling */
@media screen and (min-width: 1100px) {
  #modal-position {
    top: 420px;
    left: -426px;
  }
}
@media screen and (min-width: 1400px) {
  #modal-position {
    top: 600px;
    left: -802px;
  }
}
</style>
