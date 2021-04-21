<template>
  <div class="home">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="mb-auto">
        <div>
          <h3 class="float-md-start mb-0"><a href="#">Guppy</a></h3>
          <nav class="nav nav-masthead justify-content-center float-md-end">
            <a class="nav-link active" aria-current="page" href="#" @click="login = false; createAccount = false">Home</a>
            <a class="nav-link" v-if="!employee && !login" @click="login = true; createAccount = false">Login</a>
            <a class="nav-link" v-if="!employee && !createAccount && login" @click="createAccount = true; login = false">Create Account</a>
            <a class="nav-link" v-if="employee" @click="logout">Logout, {{ employee.firstName }}</a>
          </nav>
        </div>
      </header>

      <AdminDashboard v-if="employee && employee.role === 'admin'"/>
      <EmployeeDashboard v-else-if="employee"/>
      <Login v-else-if="!employee && login"/>
      <Register v-else-if="!employee && createAccount"/>
      <HomePage v-else/>

      <footer class="mt-auto text-white-50">
        <p><a href="https://github.com/drdray1/Guppy" target="1" class="text-white">Github</a></p>
      </footer>
    </div>
  </div>
</template>

<script>
import EmployeeDashboard from "../components/EmployeeDashboard";
import HomePage from "../components/HomePage";
import AdminDashboard from "../components/AdminDashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import axios from 'axios';

export default {
  name: 'Home',
  components: {Register, Login, EmployeeDashboard, HomePage, AdminDashboard},
  data() {
    return {
      createAccount: false,
      login: false,
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/employees');
      this.$root.$data.employee = response.data.employee;
    } catch (error) {
      this.$root.$data.employee = null;
    }
  },
  computed: {
    employee() {
      return this.$root.$data.employee;
    }
  },
  methods: {
    async logout() {
      this.login = false;
      this.createAccount = false;
      try {
        await axios.delete("/api/employees");
        this.$root.$data.employee = null;
      } catch (error) {
        this.$root.$data.employee = null;
      }
    },
  }
}
</script>

<style scoped>

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

a {
  text-decoration: none;
  background-color: transparent;
  color: inherit;
}
a:hover {
  text-decoration: underline;
}

/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; /* Prevent inheritance from `body` */
}

body {
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
}

.cover-container {
  max-width: 50em;
}

.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}
</style>
