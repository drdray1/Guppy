<template>
  <div class="home">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="mb-auto">
        <div>
          <h3 class="float-md-start mb-0"><a href="/">Guppy</a></h3>
          <nav class="nav nav-masthead justify-content-center float-md-end">
            <a class="nav-link active" aria-current="page" href="/" @click="login = false; createAccount = false">Home</a>
            <a class="nav-link" v-if="!employee && !login" @click="login = true; createAccount = false">Login</a>
            <a class="nav-link" v-if="!employee && !createAccount && login" @click="createAccount = true; login = false">Create Account</a>
            <a class="nav-link" v-if="employee" @click="logout">Logout, {{ employee.firstName }} </a>
          </nav>
        </div>
      </header>

      <AdminDashboard v-if="employee && employee.role === 'admin'"/>
      <EmployeeDashboard v-else-if="employee"/>
      <Login v-else-if="!employee && login"/>
      <Register v-else-if="!employee && createAccount"/>
      <HomePage v-else/>

      <footer class="mt-auto text-white-50 row justify-content-center">
        <a href="https://github.com/drdray1/Guppy" target="1" class="text-white col-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <p>Github</p>
        </a>
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
  max-width: 70em;
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
