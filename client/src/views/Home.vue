<template>
  <div class="home container">
    <div class="row top">
      <div class="col-3 offset-9 weather">weather will go here</div>
    </div>
    <div class="row middle">
      <div class="col-6 offset-3 clock-greeting">
        this is the clock and greeting
      </div>
    </div>
    <div class="row bottom">
      <div class="col-3 settings-background">
        this is where the settings will go, and bg-img seetings
      </div>
      <div class="col-6 quote">this is where the quote will go</div>
      <div class="col-3 todo">this is where the todo will go</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>
.home {
  max-height: 100vh;
  max-width: 100vw;
}
</style>
