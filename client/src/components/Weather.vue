<template>
  <div
    class="main"
    id="changeColor"
    :style="{'background-color': backgroundColor, 'color': textColor }"
  >
    <div class="background">
      <div class="content">
        <h1 class="Condition">
          <div v-if="sunny">
            <i class="fas fa-sun icon" :style="{'color': iconColor}"></i>
            {{weather.weather[0].main}}
          </div>
          <div v-else-if="rain">
            <i class="fas fa-cloud-showers-heavy icon" :style="{'color': iconColor}"></i>
            {{weather.weather[0].main}}
          </div>
          <div v-else-if="cloudy">
            <i class="fas fa-cloud icon" :style="{'color': iconColor}"></i>
            {{weather.weather[0].main}}
          </div>
          <div v-else-if="snow">
            <i class="far fa-snowflake icon" :style="{'color': iconColor}"></i>
            {{weather.weather[0].main}}
          </div>
          <div v-else-if="fog">
            <i class="fas fa-smog icon" :style="{'color': iconColor}"></i>
            {{weather.weather[0].main}}
          </div>
          <div v-else>
            <i class="fas fa-question icon" :style="{'color': iconColor}"></i>
            <p>Unkown Weather Condition</p>
          </div>
        </h1>
        <h1 class="Temp">
          {{Math.round(weather.main.temp)}}
          <span id="F">&#8457;</span>
        </h1>
        <h1 class="Time">{{month}} {{day}}</h1>
        <div>
          <input
            type="text"
            v-model="city.name"
            v-on:keyup.enter="submitNewCity"
            v-autowidth="{ maxWidth: '100px', minWidth: '20px', comfortZone: 10 }"
            v-if="city.changeCity"
            class="locationInput"
          />
          <h1 class="Location" v-else @click="getNewCity">
            <i class="fas fa-map-marker-alt locationIcon"></i>
            {{weather.name}}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from "vue-input-autowidth";
import Vue from "vue";
Vue.use(VueInputAutoWidth);
export default {
  name: "Weather",
  data() {
    return {
      coord: {
        lat: null,
        lon: null
      },
      day: "",
      month: "",
      // Possible weather conditions
      sunny: false,
      partlyCloudy: false,
      rain: false,
      snow: false,
      cloudy: false,
      fog: false,
      unkownCondition: false,
      // For widget styling
      backgroundColor: "",
      textColor: "black",
      iconColor: "",
      // Change city location
      city: {
        changeCity: false,
        name: ""
      }
    };
  },
  mounted() {
    this.getLocation();
    this.getDate();
  },
  computed: {
    weather() {
      return this.$store.state.weather;
    }
  },
  methods: {
    // Need to get current coordinates to get weather
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
      }
    },
    async success(position) {
      this.coord.lat = position.coords.latitude.toString();
      this.coord.lon = position.coords.longitude.toString();
      let coords = { ...this.coord };
      await this.$store.dispatch("getWeather", coords);
      this.checkCondition();
    },
    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },
    // Get the current date
    getDate() {
      let date = new Date();
      this.day = date.getDate();
      let month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      this.month = month[date.getMonth()];
    },
    // Will take the new city string and get new weather data
    getNewCity() {
      this.city.changeCity = true;
    },
    async submitNewCity() {
      await this.$store.dispatch("getNewWeather", this.city);
      this.checkCondition();

      this.city.changeCity = false;
    },
    // Check the weather condition to then style the widget accordingly
    checkCondition() {
      switch (this.$store.state.weather.weather[0].main) {
        case "Clear":
          this.sunny = true;
          this.cloudy = false;
          this.rain = false;
          this.snow = false;
          this.fog = false;
          this.textColor = "black";
          break;
        case "Clouds":
          this.cloudy = true;
          this.sunny = false;
          this.rain = false;
          this.snow = false;
          this.fog = false;
          this.textColor = "white";
          break;
        case "Rain":
          this.rain = true;
          this.cloudy = false;
          this.sunny = false;
          this.snow = false;
          this.fog = false;
          this.textColor = "white";
          break;
        case "Snow":
          this.snow = true;
          this.cloudy = false;
          this.sunny = false;
          this.rain = false;
          this.fog = false;
          this.textColor = "black";
          break;
        case "Fog":
          this.fog = true;
          this.cloudy = false;
          this.sunny = false;
          this.snow = false;
          this.rain = false;
          this.textColor = "white";
          break;
        // case "Partly Cloudy":
        //   this.partlyCloudy = true;
        //   break;
        default:
          this.unkownCondition = true;
      }
      this.setBackgroundColor();
    },
    setBackgroundColor() {
      // Sunny
      // NOTE THE MAIN BACKGROUND COLOR AND TEXT COLOR DON'T CHANGE BECUASE THE ELEMENT THAT SETS THE COLORS NEVER GET'S RE-RENDERED AFTER NEW CITY IS FOUND...ONLY THE ICON COLOR AND ACTUAL DATA GET'S CHANGED
      // NOTE WORKAROUND IS TO 'FORCE' CHANGE THE COLORS USING getElementById

      if (this.sunny == true && this.$store.state.weather.main.temp > 100) {
        let change = document.getElementById("changeColor");
        change.style.backgroundColor = "rgb(248, 78, 35)";
        this.iconColor = "rgb(252, 196, 15)";
      } else if (
        this.sunny == true &&
        this.$store.state.weather.main.temp >= 70
      ) {
        let change = document.getElementById("changeColor");
        change.style.backgroundColor = "rgb(248, 181, 35)";
        this.iconColor = "rgb(252, 62, 29)";
      } else if (
        this.sunny == true &&
        this.$store.state.weather.main.temp > 50
      ) {
        let change = document.getElementById("changeColor");
        change.style.backgroundColor = "rgb(253, 253, 61)";
        this.iconColor = "rgb(252, 155, 29)";
      } else if (
        this.sunny == true &&
        this.$store.state.weather.main.temp > 0
      ) {
        // this.backgroundColor = "rgb(241, 241, 126)";
        // this.iconColor = "rgb(252, 161, 41)";
        let change = document.getElementById("changeColor");
        change.style.backgroundColor = "rgb(241, 241, 126)";
        this.iconColor = "rgb(252, 161, 41)";
      } else if (
        this.sunny == true &&
        this.$store.state.weather.main.temp <= 0
      ) {
        let change = document.getElementById("changeColor");
        change.style.backgroundColor = "rgb(241, 241, 188)";
        this.iconColor = "rgb(252, 161, 41)";
      }

      // Rain
      if (this.rain) {
        let change = document.getElementById("changeColor");
        change.style.backgroundColor = "deepskyblue";
        // this.textColor = "white";
        this.iconColor = "grey";
      }

      // Snow
      if (this.snow == true) {
        let change = document.getElementById("changeColor");
        change.style.backgroundColor = "white";
        this.iconColor = "black";
      }

      // Cloudy
      if (this.cloudy) {
        let change = document.getElementById("changeColor");
        change.style.backgroundColor = "grey";
        this.iconColor = "white";
        // this.textColor = "white";
      }

      // Fog
      if (this.fog) {
        let change = document.getElementById("changeColor");
        change.style.backgroundColor = "lightslategrey";
        // this.textColor = "white";
        this.iconColor = "rgb(206, 206, 202)";
      }
    }
  }
};
</script>

<style scoped>
.main {
  overflow: hidden;
  z-index: 10;
  position: relative;
  margin: 25px 0 100px 0;
  height: 90px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
}

/* Content */

.icon {
  z-index: 1000;
  font-size: 15px !important;
}

.Condition {
  z-index: 1000;
  position: absolute;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-size: 20px;
  left: 20px;
  top: 10px;
}

.Temp {
  z-index: 1000;
  position: absolute;
  font-family: "Roboto", sans-serif;
  font-size: 35px;
  font-weight: 400;
  left: 20px;
  bottom: 5px;
}

#F {
  z-index: 1000;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-size: 30px;
}

.Time {
  z-index: 1000;
  position: absolute;
  font-family: "Noto Sans", sans-serif;
  font-size: 18px;
  font-weight: 200;
  right: 20px;
  top: 10px;
}

.locationIcon {
  z-index: 1000;
  font-size: 10px !important;
}

.Location {
  z-index: 1000;
  position: absolute;
  font-family: "Noto Sans", sans-serif;
  font-size: 12px;
  font-weight: 200;
  right: 20px;
  bottom: 15px;
}
.locationInput {
  z-index: 1000;
  position: absolute;
  right: 20px;
  bottom: 15px;
}
</style>