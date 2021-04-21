<template>
  <div class="main">
    <div class="row">
      <h1 class="m-4">Employee Dashboard</h1>
      <h3 class="lead">Welcome, {{ employee.firstName }} {{ employee.lastName }}</h3>
    </div>

    <div id="viewToggler" class="row justify-content-end">
      <button v-if="flag" type="button" class="btn btn-light m-3" style="width: 10em" @click="flag = !flag">
        Log Today
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
      </button>
      <button v-if="!flag" type="button" class="btn btn-light m-3" style="width: 10em" @click="flag = !flag">
        Last 7 Days
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3-week" viewBox="0 0 16 16">
          <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
          <path d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
        </svg>
      </button>
    </div>

    <div class="col-12 mt-3 mb-5">
      <div v-if="flag">
        <table class="table table-dark table-striped">
          <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Date</th>
            <th scope="col">In</th>
            <th scope="col">Out Lunch</th>
            <th scope="col">In Lunch</th>
            <th scope="col">Out</th>
            <th scope="col">Day Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row-dark">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row-dark">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@fat</td>
            <td>@fat</td>
            <td>@fat</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="row justify-content-center">
        <div class="row mb-4">
          <div class="text-start col">
            <label>Today</label>
            <h3 class="align-bottom"><b-badge class="bg-light text-dark">{{ date }}</b-badge></h3>
          </div>
          <div class="text-start col">
            <label>
              In
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-alt-high-fill" viewBox="0 0 16 16">
                <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4z"/>
              </svg>
            </label>
            <b-form-timepicker v-model="clockIn" locale="en"></b-form-timepicker>
          </div>
          <div class="text-start col">
            <label>
              Out Lunch
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
              </svg>
            </label>
            <b-form-timepicker v-model="clockOutLunch" locale="en"></b-form-timepicker>
          </div>
          <div class="text-start col">
            <label>
              In Lunch
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
              </svg>
            </label>
            <b-form-timepicker v-model="clockInLunch" locale="en"></b-form-timepicker>
          </div>
          <div class="form-group text-start col">
            <label>
              Out
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-alt-high" viewBox="0 0 16 16">
                <path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4zm0 1a3 3 0 0 1 2.959 2.5H5.04A3 3 0 0 1 8 8z"/>
              </svg>
            </label>
            <b-form-timepicker v-model="clockOut" locale="en"></b-form-timepicker>
          </div>
        </div>
        <div class="row justify-content-center">
          <div @click="submitTimesheet" class="btn btn-warning col-1">Submit</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: "EmployeeDashboard",
  data() {
    return {
      flag: false,

      date: null,
      clockIn: '',
      clockOut: '',
      clockInLunch: '',
      clockOutLunch: '',

      timesheets: [],
    }
  },
  computed: {
    employee() {
      return this.$root.$data.employee;
    }
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate(date) {
      this.date =  moment(date).format('DD MMMM YYYY');
      /*if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');*/
    },
    submitTimesheet(){
      console.log("Clicked Submit");
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
    async editTimesheet() {

    }
  }
}
</script>

<style scoped>

</style>