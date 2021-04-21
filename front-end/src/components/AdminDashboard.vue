<template>
  <div>
    <h1 class="btn-outline-danger m-2">Admin Dashboard</h1>
    <div v-for="emp in employees" :key="emp.id">
      <div class="card bg-warning mb-3">
        <div class="card-header align-content-start">
          {{ emp.firstName }} {{ emp.lastName }}
        </div>
        <div class="card-body">
          <!--<h5 class="card-title"></h5>-->
          <p class="card-text">Email: {{ emp.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminDashboard",
  data() {
    return {
      employees: [],
    }
  },
  computed: {
    employee() {
      return this.$root.$data.employee;
    },
  },
  created() {
    this.getEmployees();
  },
  methods: {
    async getEmployees() {
      try {
        let response = await axios.get("/api/employees");
        this.employees = response.data.employees;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>

</style>