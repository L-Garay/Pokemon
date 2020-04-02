<template>
  <div class="quote">
    <p>{{Quote.quote}}</p>
    <p>Author: {{Quote.author}}</p>
  </div>
</template>

<script>
export default {
  name: "Quote",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getQuote");
    this.bus.$on("getQuote", this.getQuote);
    this.bus.$on("saveQuote", this.saveQuote);
  },
  computed: {
    Quote() {
      return this.$store.state.quote;
    }
  },
  methods: {
    getQuote() {
      this.$store.dispatch("getQuote");
    },
    saveQuote() {
      this.$store.dispatch("saveQuote", this.$store.state.quote);
    }
  },
  props: ["bus"]
};
</script>

<style>
</style>