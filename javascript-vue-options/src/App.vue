<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="GrowthBook"/>

    <hr />

    <h3>Navigate the Example</h3>
    <ul class="example-nav">
      <li><a v-bind:class="{ 'active-link': route == 'public'}" v-on:click="goToPublic()">Public</a></li>
      <li><a v-bind:class="{ 'active-link': route == 'employees'}" v-on:click="goToEmployees()">Employees</a></li>
    </ul>

    <PublicPage v-if="route == 'public'" />
    <EmployeePage v-if="route == 'employees'" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import EmployeePage from './components/EmployeePage.vue';
import PublicPage from './components/PublicPage.vue';

export default {
  name: 'App',

  components: {
    HelloWorld,
    EmployeePage,
    PublicPage
  },

  data() {
    return {
      route: 'public',
    }
  },

  methods: {
    goToEmployees() {
      this.route = 'employees'
    },
    
    goToPublic() {
      this.route = 'public'
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.example-nav {
  margin-bottom: 60px;
}

hr {
  height: 1px;
  background: #efefef;
  border: none;
  margin: 60px 0;
}

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
  cursor: pointer;
}

.active-link {
  font-weight: 700;
}
</style>
