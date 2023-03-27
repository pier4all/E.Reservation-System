<script>
  import {
    addWeeks,
    getDate,
    addDays,
    addMinutes,
    addHours,
    getDaysInMonth,
    add,
    getWeek,
    format,
    getTime,
    getHours,
    getDay,
  } from "date-fns";
  import { getAllReservations, getDateByRessource } from "../requests";
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
  export let deleteRessourceToggle;
  let calenderEndDate;
  let calenderStartDate;
  let startDate;
  let endDate;
  let daysCalendar = [];
  let appointmentsArray = [];
  let pickedDate = false;
  let pickedRessource = false;
  let allReservations = [];
  let allBookedRessources = [];
  let selectedAppointment;
  let confirmationToggle = false;

  // getByRessource und getByDate =>

  // $: reactivity, if(variable changes) then....
  $: if (selectedRessource) pickedRessource = true;
  $: if (selectedDate) {
    pickedDate = true;
    confirmationToggle = false;
    appointmentsArray = [];
  }
  $: if (selectedDate) {
    const state = handleSelectedDate();
  }

  /**
   * @param {bool} stateDay
   * @param {bool} stateCalendarText
   * @param {bool} stateAppointments
   */
  const handleSelectedDate = (
    stateDay,
    stateCalendarText,
    stateAppointments
  ) => {
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
  const createAppointments = (appointmentLenght, workingHours) => {
    let time = workingHours / appointmentLenght;
    //time = Math.round(time * 100)
    let timeCalculated = calculateTime(appointmentLenght);
    for (let i = 0; i < time; i++) {
      let appointment = {
        slot: i,
        time: (timeCalculated = addMinutes(timeCalculated, appointmentLenght)),
      };
      appointmentsArray.push(appointment);
    }
    console.log("appointmentsArray:", appointmentsArray);

    return true;
  };

  /**
   * calculate time for the appointment
   * @param {number} appointmentLenght
   */
  const calculateTime = (appointmentLenght) => {
    console.log("Length:", appointmentLenght);
    let time = new Date();
    time = time - time;

    if (appointmentLenght != 60)
      console.log("time:", (time = addMinutes(time, workingHours - 30)));
    else time = addHours(time, workingHours + 7);
    console.log("TimeCalculated:", time);

    return time;
  };

  // for creates the days for the calender
  const creatingCalendarDays = () => {
    for (let i = 0; i < 14; i++) {
      let day;
      let dayCalendar = {
        weekDay: (day = addDays(calenderStartDate, i)),
      };
      daysCalendar.push(dayCalendar);
    }
    return true;
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
  const selectAppointment = (appointmentTime, ressource, dayCalendar) => {
    let time = format(getTime(appointmentTime), "HH:mm");
    let day = format(dayCalendar.weekDay, "dd.MM.yy");
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
  const handleBooked = () => {
    confirmationToggle = false;
  };
</script>

<!-- Logik des Kalenders ?-->
{#await getAllReservations() then reservations}
  <m-box id="calendarBox">
    {#if confirmationToggle === true}
      <Confirmation on:Booked={handleBooked} {selectedAppointment} {userName} {userSurname} {emailAdmin} {nameCompany}/>
    {/if}
    {#if pickedDate === true && confirmationToggle === false}
      <m-row id="selectedDateCalendar">
        <h3 id="calendarTitleDate">
          {"Termine von " + startDate + " bis " + endDate}
        </h3>
      </m-row>
      <m-row id="calendarDayRow">
        {#each daysCalendar as dayCalendar}
          {#each ressourceArray as ressource}
            {#if format(dayCalendar.weekDay, "E") !== "Sun" && format(dayCalendar.weekDay, "E") !== "Sat"}
              {#if ressource === selectedRessource}
                <div id="dayCalendar">
                  <m-box id="dayDateBox">
                    <m-row id="weekDayCol">
                      {format(dayCalendar.weekDay, "E") + " " + format(dayCalendar.weekDay, "dd.MM.yy")}
                    </m-row>
                    <h4 id="ressourceTitel">{ressource.name}</h4>
                    {#each appointmentsArray as appointment}
                      <!-- find()-->
                      <div id="selectOption" value={appointment.time} on:click={() => selectAppointment(appointment.time,ressource,dayCalendar )}>
                        {format(appointment.time, "HH:mm")}
                      </div>
                    {/each}
                  </m-box>
                </div>
              {/if}
            {/if}
          {/each}
        {/each}
      </m-row>
    {/if}
  </m-box>
{/await}

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
