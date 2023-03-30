<script>
  import { addWeeks, getDate, addDays, addMinutes,addHours,getDaysInMonth,add,getWeek,format,getTime,getHours,getDay,} from "date-fns";
  import { getAllReservations, getReservationByDate, getReservationByRessource } from "../requests";
  import Confirmation from "./Confirmation.svelte";
  export let selectedDate;
  export let selectedRessource;
  export let workingHours;
  export let appointmentLenght;
  export let ressourceArray;
  export let userName;
  export let userSurname;
  export let userEmail;
  export let emailAdmin;
  export let nameCompany;
  export let selection
  let calenderEndDate;
  let calenderStartDate;
  let startDate;
  let endDate;
  let appointmentsArray = [];
  let pickedDate = false;
  let allReservations = [];
  let allBookedRessources = [];
  let selectedAppointment;
  let confirmationToggle = false;
  let daysCalendar = []
  
  
  /**
   *   $: reactivity, if(variable changes) then....
   */
  $: if(selectedRessource){
    createDaysForRessource()
    createAppointments()
    getReservations()
  }

  $: if(selectedDate) {
    selectedRessource = null
    pickedDate = true
    confirmationToggle = false;
    appointmentsArray = [];
    handleSelectedDate()
    getReservations()
  }

  /**
   * @param {bool} stateDay
   * @param {bool} stateCalendarText
   * @param {bool} stateAppointments
   */
  const handleSelectedDate = (stateDay,stateCalendarText,stateAppointments ) => {
    confirmationToggle = false
    stateCalendarText = creatingCalendarText();
    stateDay = creatingCalendarDays();

    stateAppointments = createAppointments(appointmentLenght, workingHours);
    if (stateCalendarText === true && stateDay === true)
      return "calendar created";
      else return "failed to create calendar";
  };

  /**
   * creates all appointment with time and pushes in array for iteration
   * @param {number} appointmentLenght
   * @param {number} workingHours
   */
  const createAppointments = () => {
    appointmentsArray = []
    let time = workingHours / appointmentLenght;
    //time = Math.round(time * 100)
    let timeCalculated = calculateTime(appointmentLenght);
    for (let i = 0; i < time; i++) {
      let appointment = {
        slot: i,
        time: timeCalculated = addMinutes(timeCalculated, appointmentLenght),
      };
      appointmentsArray.push(appointment);
    }
    return true;
  };

  /**
   * calculate time for the appointment
   * @param {number} appointmentLenght
   */
  const calculateTime = (appointmentLenght) => {
    let time = new Date();
    time = time - time;

    if (appointmentLenght != 60)
      console.log("time:", (time = addMinutes(time, workingHours - 30)));
    else time = addHours(time, workingHours + 7);

    return time;
  };

  // creates the title text for the calendar
  const creatingCalendarText = () => {
    daysCalendar = [];
    calenderStartDate = selectedDate;
    startDate = format(calenderStartDate, "dd.MM.yy");
    calenderEndDate = addDays(selectedDate, 14);
    endDate = format(calenderEndDate, "dd.MM.yy");
    return true;
  };

  /**
   * creates the selectedtAppointment for the confirmation
   * @param {date}   appointmentTime
   * @param {object} ressource
   * @param {date}   dayCalendar
   */
  const selectAppointment = (appointment, ressource, selectedDay) => {
    let time = format(getTime(appointment), "HH:mm");
    let day = format(selectedDay.weekDay,"dd.MM.yy");
    selectedAppointment = {
      appId: Math.random(),
      appTime: time,
      appDay: day,
      appRes: ressource.name,
      userEmail: userEmail,
    };
    confirmationToggle = true;
  };

  // setting toggle
  const handleBooked = (event) => {
    confirmationToggle = false;
    selection = "Datum"
    if(event.detail === "Ressource"){
    setTimeout(selection = event.detail, 10000)
    } else setTimeout(_, 10000)
    getAllReservations().then(result => reservations = result)
  };

  // filtering Appointments By selected Ressource
  const filterAppointmentByRessource = (ressource, day, time) => {
    return reservations
      ? reservations.find(res => {
        res = res[1]
        const appRes = ressource.name
        const appDay = format(day.weekDay,"dd.MM.yy" )
        const appTime = format(getTime(time), "HH:mm")
       
        return res.appDay === appDay && res.appRes === appRes && res.appTime === appTime
      })
      : false
  }

  let reservations
  /**
   * creatind the days if Ressource got selected
   */
  const createDaysForRessource = () => {
    //ressource
    daysCalendar = [];
    let actualDay = new Date()
    startDate = new Date()
    startDate = format(startDate,"dd.MM.yy" )
    endDate = addDays(new Date(), 13)
    endDate = format(endDate, "dd.MM.yy" )
    for (let i = 0; i < 14; i++) {

      let day = {
        weekDay: addDays(actualDay, i)
      };
      daysCalendar.push(day);
    }
    
    return daysCalendar
  }

  /**
   * creates the days for the calendar
   */
  const creatingCalendarDays = () => {
    let daysCalendar = [];
      let day = {
        weekDay: selectedDate
      };
      daysCalendar.push(day);
    return daysCalendar
  }

  /**
   * refreshing allReservation
   */
  const getReservations = async () => {
    reservations = await getAllReservations()
  }

// used for a init function, when Calendar gets activated
getReservations()
</script>

<!-- for picked Ressource-->
{#key reservations}
  {#if selection === "Ressource"}
  <!---->
    <m-box id="calendarBox">
      {#if confirmationToggle === true}
        <Confirmation on:Booked={handleBooked} {selectedAppointment} {userName} {userSurname} {emailAdmin} {nameCompany} {selection}/>
      {/if}
      {#if confirmationToggle === false}
        <m-row id="selectedDateCalendar">
          <h3 id="calendarTitleDate">
            {"Termine von " + startDate + " bis " + endDate}
          </h3>
        </m-row>
        <m-row id="calendarDayRow">
          {#each createDaysForRessource() as day}
          {#if format(day.weekDay, "E") !== "Sun" && format(day.weekDay, "E") !== "Sat"}
            {#each ressourceArray as ressource}
              {#if ressource === selectedRessource}
                  <div id="dayCalendar">
                    <m-box id="dayDateBox">
                      <m-row id="weekDayCol">
                        {format(day.weekDay, "E") + " " + format(day.weekDay, "dd.MM.yy")}
                        </m-row>
                      <h4 id="ressourceTitel">{ressource.name}</h4>
                      {#each appointmentsArray as appointment}
                        {#if filterAppointmentByRessource(selectedRessource, day, appointment.time)}
                          <div style="background-color: red;" id="selectOption" value={appointment.time}>
                            {format(appointment.time, "HH:mm")}
                          </div>
                        {:else}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div id="selectOption" value={appointment.time} on:click={() => selectAppointment(appointment.time, ressource , day)}>
                          {format(appointment.time, "HH:mm")}
                        </div>
                        {/if}
                      {/each}
                    </m-box>
                  </div>  
                  {/if}
            {/each}
            {/if}
          {/each}
        </m-row>
        {/if}
    </m-box> 
  {/if}
  
<!--for picked Date-->
  {#if selection === "Datum"}
    <m-box id="calendarBox">
  {#if confirmationToggle === true}
    <Confirmation on:Booked={handleBooked} {selectedAppointment} {userName} {userSurname} {emailAdmin} {nameCompany} {selectedDate}/>
  {/if}
  {#if confirmationToggle === false}
    <m-row id="selectedDateCalendar">
    </m-row>
    <m-row id="calendarDayRow">
      {#if selectedDate}
      {#each creatingCalendarDays() as dayCalendar}
        {#each ressourceArray as ressource}
          {#if format(dayCalendar.weekDay, "E") !== "Sun" && format(dayCalendar.weekDay, "E") !== "Sat"}
              <div id="dayCalendar">
                <m-box id="dayDateBox">
                  <m-row id="weekDayCol">
                    {format(dayCalendar.weekDay, "E") + " " + format(dayCalendar.weekDay, "dd.MM.yy")}
                  </m-row>
                  {#each appointmentsArray as appointment}
                  {#if filterAppointmentByRessource(ressource, dayCalendar, appointment.time)}                 
                    <div style="background-color: red;" id="selectOption" value={appointment.time} >
                      { JSON.stringify(ressource.name).slice(1, ressource.name.length + 1) + " : " + format(appointment.time, "HH:mm")}
                    </div>
                  {:else}
                    <div id="selectOption" value={appointment.time} on:click={() => selectAppointment(appointment.time,ressource,dayCalendar )}>
                      { JSON.stringify(ressource.name).slice(1, ressource.name.length + 1) + " : " + format(appointment.time, "HH:mm")}
                    </div>
                  {/if}
                  {/each}
                </m-box>
              </div>
            {/if}
        {/each}
      {/each}
      {/if}
    </m-row>
  {/if}
</m-box> 
  {/if}
{/key}

<style>
  #calendarBox {
    max-width: 100%;
    border-style: solid;
    border-color: black;
    margin: 0%;
    border-top: 5%;
  }

  #selectedDateCalendar {
    border-style: none;
    height: 80px;
    font-size: x-large;
    margin-top: 3%;
    margin-bottom: 0%;
    justify-content: center;
  }

  #dayDateBox {
    width: 200px;
    margin-bottom: 10%;
  }

  #dayCalendar {
    border-color: black;
    padding: 0.1%;
    margin-right: 2%;
    font-size: large;
  }

  #calendarTitleDate {
    font-size: larger;
    margin: 0%;
  }

  #weekDayCol {
    justify-content: center;
    font-size: larger;
    color: rgb(21, 138, 21);
    height: 100%;
    width: 100%;
    margin: 0%;
    margin-bottom: 5%;
  }

  #calendarDayRow {
    background-color: rgb(255, 255, 255);
    justify-content: center;
    padding-top: 2%;
  }

  #ressourceTitel {
    text-align: center;
    color: rgb(0, 0, 0);
    margin-top: 0%;
    border-bottom-style: solid;
  }

  #selectOption {
    background-color: rgb(120, 252, 113);
    margin: 2%;
    margin-top: 10%;
    padding: 5%;
    text-align: center;
    border-style: solid;
  }

  #selectOption:hover {
    background-color: rgb(208, 255, 0);
    color: rgb(0, 0, 0);
  }
</style>
