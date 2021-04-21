<template>
  <div>
    <main class="px-3">
      <h1>Welcome</h1>
      <p class="lead">This is Guppy! We're here to help you keep track of your time at work!</p>
      <img src="../assets/Guppy.png" alt="guppy image" class="rounded col-10 mb-5">
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "HomePage",

  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.email || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/employees', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.employee = response.data.employee;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.employee = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/employees/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.employee = response.data.employee;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.employee = null;
      }
    }
  }
}
</script>

<style scoped>

</style>