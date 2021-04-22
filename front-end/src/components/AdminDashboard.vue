<template>
  <div>
    <h1 class="btn-outline-danger m-2">Admin Dashboard</h1>
    <div v-for="emp in timesheets" :key="emp.id">
      <div class="card bg-warning mb-3">
        <div class="card-header align-content-start">
          {{ emp.firstName }} {{ emp.lastName }}
        </div>
        <div class="card-body">
          <!--<h5 class="card-title"></h5>-->
          <p class="card-text">Email: {{ emp.clockIn }}</p>
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
      timesheets: [],
      employee: null,
      timesheet: null,
    }
  },
  computed: {
    admin() {
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
    async getTimesheets() {
      try {
        let response = await axios.get("/api/timesheets");
        this.timesheets = response.data.timesheets;
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