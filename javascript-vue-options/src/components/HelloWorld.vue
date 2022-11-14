<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      GrowthBook Vue.js Options API example
    </p>
    <h3>GrowthBook Links</h3>
    <ul>
      <li><a href="https://docs.growthbook.io/lib/vue" target="_blank" rel="noopener">GrowthBook's Vue.js docs</a></li>
      <li><a href="https://github.com/growthbook/examples" target="_blank" rel="noopener">GrowthBook SDK examples</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
