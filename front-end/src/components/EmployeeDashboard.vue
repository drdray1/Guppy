<template>
  <div class="main">
    <h1>Employee Dashboard</h1>
    <h3>Welcome, {{ employee.firstName }} {{ employee.lastname }}</h3>
  </div>
</template>

<script>
export default {
  name: "EmployeeDashboard",
  computed: {
    employee() {
      return this.$root.$data.employee;
    }
  }
}
</script>

<style scoped>

</style>