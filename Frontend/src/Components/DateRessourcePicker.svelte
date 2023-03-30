<script>
  import { getAllReservations, deleteReservation } from "../requests";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let userEmail;
  export let userName;
  export let userSurname;
  export let nameCompany;
  export let ressourceArray = [];
  export let emailAdmin
  let reservations;
  let selectedRessource;
  let dateInput;
  let selectedDate;
  let reservationToggle = false;
  let selectedRadioDate = false
  let selectedRadioRessource = false
  let radioValue;
  let selection = [];
  const options = [
    "Ressource",
    "Datum"
  ] 

  /**
   * reactivity, if selection changes
   */
  $: if(selection){
      if(selection === "Ressource"){
        selectedRadioRessource = true
        selectedRadioDate = false
      }
      if(selection === "Datum"){
        selectedRadioDate = true
        selectedRadioRessource = false
      }
      dispatch("selection", selection)
  }
  
  /**
    *  reactive, if dateInput changes
    */
  $: if (dateInput) {
    selectedDate = new Date(dateInput);
    dispatch("selectedDate", {
      selectedDate,
    });
  }

  /**
   * reactivity, if selectedRessource changes
   */
  $: if (selectedRessource) {
    dispatch("selectedRessource", {
      selectedRessource,
    });
  };

  /**
   * handles the click event for deletin a reservation
   * @param {number} id
   */
  const deleteBookedReservation = (id) => {
    reservationToggle = false
    deleteReservation(id);
  };

  /**
   * setting visibility toggle, for booked reservations
   */
  const anzeigeClick = () => {
    reservationToggle = !reservationToggle
    getAllReservations().then(res => reservations = res)
  };
  
  /**
   * handles the logout event click
   */
  const handleLogout = () => {
          dispatch("logout", emailAdmin)
  }

</script>


<div id="buttonDiv">
  <button on:click={handleLogout}>LogOut</button>
</div>
  <m-box id="userInformationOuterBox">
    <m-row>
      <m-col class="infoCol">
        <m-box class="infoBox">
          <h3>Information Benutzer</h3>
          <p>Name: {userName}</p>
          <p>Vorname: {userSurname}</p>
          <p>Email: {userEmail}</p>
        </m-box>
      </m-col>
      <m-col class="infoCol">
        <m-box class="infoBox">
            <h3>Bereits gebuchte Termine</h3>
            {#if reservationToggle === true}
            {#if reservations === null}
             <p style="color: red">Keine Buchungen gefunden. </p>
            {/if}
            {#if reservations != null}
              {#each reservations as [id, res]}
                <div>
                  <m-col>
                        {res.appDay + " / " + res.appTime + " / " + res.appRes}
                  </m-col>
                  <m-col>
                       <!-- <button
                        on:click={() => deleteBookedReservation(id)}
                        id="deleteReservationButton">X</button>-->
                  </m-col>
                </div>
              {/each}
            {:else}
              <div style="color:red; margin-top:5%;">Keine termine gebucht.</div>
            {/if}
          {/if}
          {#if reservationToggle ===false}
            <button id="showButton" 
            on:click={() => anzeigeClick()}>anzeigen</button>
          {/if}
        </m-box>
      </m-col>
    </m-row>
  </m-box>
  <m-box id="pickerBox">
    <m-row id="textPickerRow">
      <h2 id="pickerTitle">Datum oder Ressource für neuen Termin bei {nameCompany} wählen:</h2>
    </m-row>
    <m-row center>
      <m-col>
    {#each options as option}
	    <label>
		    <input type="radio" bind:group={selection} name="selection" value={option}>
		    {option}
	    </label>
    {/each}
      </m-col>
    </m-row>
    {#if selectedRadioDate === true && selection.length != 0 }
    <m-row id="dateRessourcePickerRow" center>
      <m-col id="datePickerCol">
        <input id="dateInput" type="date" bind:value={dateInput} />
      </m-col>
    </m-row>
    {/if}
    {#if selectedRadioRessource === true && selection.length != 0}
    <m-row center>
      <m-col id="selectRessourceCol">
        <select id="selectRessource" name="users" bind:value={selectedRessource}>
          <option value="">"Bitte wählen"</option>
          {#each ressourceArray as ressource}
            <!--iterates array and setting every ressource as a select option-->
             <option value={ressource}>{(ressource.name)}</option>
          {/each}
        </select>
      </m-col>
    </m-row>
    {/if}
  </m-box>


<style>
    
  p {
    color: black;
    font-size: larger;
  }

  #userInformationOuterBox {
    background-color: rgb(255, 255, 255);
    border-color: black;
    border-style: solid;
    max-height: 1000px;
  }

  .infoBox {
    min-height: 200px;
  }

  .infoCol {
    justify-content: center;
    align-content: center;
    text-align: center;
  }

  #pickerTitle {
    margin-bottom: 3%;
  }

  #pickerBox {
    margin-top: 0%;
    border-color: #020202;
    margin-top: 2%;
    margin-bottom: 2%;
  }

  #textPickerRow {
    padding: 0%;
    margin: 0%;
    justify-content: center;
  }

  #dateRessourcePickerRow {
    background-color: rgb(255, 255, 255);
  }

  #datePickerCol {
    padding: 1%;
  }

  #selectRessourceCol {
    padding: 1%;
  }

  input[type="date"] {
    background-color: rgb(131, 174, 247);
    color: black;
    padding: 15px;
    min-width: 200px;
    top: 50%;
    left: 50%;
    font-family: "Roboto Mono", monospace;
    border: none;
    outline: none;
    color: #020202;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
    float: right;
  }

  #selectRessource {
    background-color: rgb(131, 174, 247);
    color: black;
    padding: 15px;
    min-width: 230px;
    top: 50%;
    left: 50%;
    height: 100%;
    font-family: "Roboto Mono", monospace;
    border: none;
    outline: none;
    color: #020202;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
  }

  ::-webkit-calendar-picker-indicator {
    padding: 5px;
    cursor: pointer;
    border-radius: 3px;
  }

  #deleteReservationButton {
    background-color: red;
    color: #020202;
    margin-bottom: 1%;
    margin-left: 2px;
    width: 5%;
    height: 10%;
  }

  #showButton {
    background-color: yellow ;
    color: #020202;
    width: 100px;
    height: 30px;
    margin-top: 5%;
  }

  #buttonDiv {
    text-align: right;
  }
  
  button {
    background-color: rgb(26, 26, 25);
    color: aliceblue;
    height: 50px;
    width: 80px;
    margin-left: 1%;
    margin-bottom: 2%;
    font-size: large;
  }
</style>
