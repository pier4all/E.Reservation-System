<script>
  import { postReservation } from "../requests";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let selectedAppointment;
  export let userName;
  export let userSurname;
  export let emailAdmin;
  export let nameCompany;
  export let selection
  export let selectedDate

  /**
   * starting post request with axios
   * @param {object} selectedAppointment
   */
  const postRes = (selectedAppointment) => {
    postReservation(selectedAppointment);
    dispatch("Booked", selection, selectedDate);
  };
</script>

<m-box id="confirmationBox">
  <m-row id="titleRow">
    <h2>Buchung</h2>
  </m-row>
  <m-row>
    <m-col>
      <m-box id="appointmentBox">
        <h4>Von:</h4>
        <div>{userName + " " + userSurname}</div>
        <div>Datum: {selectedAppointment.appDay}</div>
        <div>Zeit: {selectedAppointment.appTime}</div>
      </m-box>
    </m-col>
    <m-col>
      <m-box id="companyBox">
        <h4>Bei:</h4>
        <div>{nameCompany}</div>
        <div>Email: {emailAdmin}</div>
        <div>Bei: {selectedAppointment.appRes}</div>
      </m-box>
    </m-col>
  </m-row>
  <m-row id="buttonRow">
    <button id="setButton" on:click={() => postRes(selectedAppointment)}>Buchen</button>
  </m-row>
</m-box>

<style>
  h4 {
    font-size: large;
  }

  div {
    font-size: large;
  }

  #confirmationBox {
    border-style: none;
  }

  #titleRow {
    justify-content: center;
    margin: 0%;
  }
  #appointmentBox {
    border-style: none;
    float: right;
  }

  #companyBox {
    border-style: none;
    margin-left: 5%;
  }
  #buttonRow {
    justify-content: center;
  }

  #setButton {
    width: 500px;
    height: 40px;
    background-color: green;
    margin-top: 3%;
  }
</style>
