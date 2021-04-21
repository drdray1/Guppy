<template>
  <div class="row justify-content-center mt-auto mb-5">
    <main class="col-5">
      <div>
        <form>
          <h2 class="mb-2">Create Account</h2>
          <div class="mb-3">
            <label for="firstNameInputCreate" class="form-label">First Name</label>
            <input type="text" class="form-control" id="firstNameInputCreate" v-model="firstName">
          </div>
          <div class="mb-3">
            <label for="LastNameInputCreate" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="LastNameInputCreate" v-model="lastName">
          </div>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email</label>
            <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp"  v-model="email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="usernameInputCreate" class="form-label">Username</label>
            <input type="text" class="form-control" id="usernameInputCreate" v-model="username">
          </div>
          <div class="mb-3">
            <label for="inputPassword1Create" class="form-label">Password</label>
            <input type="password" class="form-control" id="inputPassword1Create" v-model="password">
          </div>
        </form>
        <button type="submit" class="btn btn-primary" @click.prevent="register">Create</button>
      </div>
      <p v-if="error" class="bg-warning">{{ error }}</p>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password || !this.email)
        return;
      try {
        let response = await axios.post('/api/employees', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
          email: this.email,
        });
        this.$root.$data.employee = response.data.employee;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.employee = null;
      }
    },
  }
}
</script>

<style scoped>

</style>