<template>
  <div class="row justify-content-center mt-auto mb-5">
    <main class="col-5">
      <div>
        <form>
          <h2 class="mb-2">Login</h2>
          <div class="mb-3">
            <label for="usernameInput" class="form-label">Username</label>
            <input type="text" class="form-control" id="usernameInput" v-model="usernameLogin">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="passwordLogin">
          </div>
          <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
        </form>
        <p v-if="errorLogin" class="bg-warning">{{ errorLogin }}</p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      usernameLogin: '',
      passwordLogin: '',
      errorLogin: '',
    }
  },
  methods: {
    async login() {
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