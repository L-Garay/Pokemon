<template>
  <div class="main">
    <div class="background">
      <div class="content">
        <h1 class="Condition">
          <i class="material-icons icon">wb_sunny</i> Sunny
        </h1>
        <h1 class="Temp">
          72 {{weather}}
          <span id="F">&#8457;</span>
        </h1>
        <h1 class="Time">09:35</h1>
        <h1 class="Location">
          <i class="material-icons locationIcon">place</i>
          Raleigh, NC {{coord.lat}} {{coord.lon}}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Weather",
  data() {
    return {
      coord: {
        lat: null,
        lon: null
      }
    };
  },
  mounted() {
    this.getLocation();
  },
  computed: {
    weather() {
      return this.$store.state.weather;
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
      }
    },
    success(position) {
      this.coord.lat = position.coords.latitude;
      this.coord.lon = position.coords.longitude;
      this.$store.dispatch("getWeather", this.coord);
      console.log(this.coord);
    },
    error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
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
  background-color: #f17022;
  border-radius: 10px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
}

/*  CONTENT  */

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

@keyframes enlarge {
  50% {
    transform: scale(1.2);
  }
}
</style>