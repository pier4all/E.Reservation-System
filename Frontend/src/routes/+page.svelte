<script>
  import Calendar from "../Components/Calendar.svelte";
  import DateRessourcePicker from "../Components/DateRessourcePicker.svelte";
  import Admin from "../Components/Admin.svelte";
  import AdminButton from "../Components/Buttons/AdminButton.svelte";
  import CheckUser from "../Components/CheckUser.svelte";
  let storageUser
  let selectedDate = null;
  let selectedRessource
  let adminToggle = false;
  let adminButtonToggle = true
  let userCheck = false;
  let surnameAdmin
  let emailAdmin
  let appointmentLenght;
  let ressourceArray
  let nameCompany;
  let userEmail;
  let userName;
  let userSurname;
  let deleteRessourceToggle= false
  let workingHours = 8 * 60;
  //for demo

  $: if(ressourceArray) console.log("Array:", ressourceArray)

  // handles AdminButton click event
  const handleAdminClick = (event) => {
    storageUser = Object.entries({...localStorage});
    if (adminToggle === false) adminToggle = true;

    // BOOL setzen !!!
  };

  const handleCheck = (event) => {
    userCheck = event.detail;
  };

  // handles all BackButtons events
  const handlerGoingBack = () => {
    adminToggle = false;
  };

  /**
   * handle data after registration
   * @param {event} event
   */
  const handleAfterRegistration = (event) => {
    console.log(event.details)
    userCheck = true;
    userEmail = event.detail.userEmail;
    userName = event.detail.userName;
    userSurname = event.detail.userSurname;
    
    // set toogle for adimButton
    adminButtonToggle = false
  };

  /**
   * handles the selected date
   * @param event
   */
  const handleSelectedDate = (event) => {
      console.log("handleSelectDate: ", event.detail.selectedDate)
      selectedDate = event.detail.selectedDate
  };

  /**
   * handles selected ressource
   * @param event
   */
  const handleSelectedRessource = (event) => {
    selectedRessource = event.detail.selectedRessource
  }

  /**
   * 
   * @param event
   */
  const handleExistingUser = (event) => {
    // assign event details
    userEmail = event.detail.userEmail;
    userName = event.detail.userName;
    userSurname = event.detail.userSurname;
    // setting toggle for components
  
    userCheck = true
    adminToggle = false
    adminButtonToggle = false
  
  };

  /** 
   * after done changes in the storage, needs to assign again for refreshing data in the components
   */
  const refreshStorage = () => {
   storageUser = Object.entries({...localStorage});
  }

  /**
   * Receiving dispatch event from Admin.svelte after
   * save button clicked, Handling the event here. Set toggles for components.
   * @param event
   */
  const handleAdminSave = async (event, checkStatus) => {
    console.log(event.detail)
    surnameAdmin = event.detail.admin
    emailAdmin = event.detail.email
    nameCompany = event.detail.company
    appointmentLenght = event.detail.length
    ressourceArray = event.detail.ressources
    //checkStatus = await checkAdminData()
    // if OK possible to enter Email
    adminToggle = false
  }

  /**
   * handles the event from the LogoutButton from DateRessourcePicker
   * @param event
   */
  const handleLogout = (event) => {
    userCheck = false
    adminButtonToggle = true
    deleteRessourceToggle = true
    ressourceArray = []
    selectedDate = null
  }

</script>


<!-- on:name are dipstached events from the Component.
     all {variable} getting set with data, they are exported from the component -->

  <m-box id="appBox">
    {#if adminToggle === false && adminButtonToggle === true}
      <AdminButton on:adminClick={handleAdminClick} />
    {/if}
    <m-box id="innerAppBox">
      <m-row id="checkUserRow">
      {#if userCheck === false && adminToggle === false}
        <CheckUser
          on:userExists={handleExistingUser}
          on:registrationSucces={handleAfterRegistration}
          on:checkingEmail={handleCheck}/>
      {/if}
    </m-row>
    <m-row id="adminRow">
      {#if adminToggle === true}
        <Admin 
          on:savingAdminData={handleAdminSave} 
          on:deleteUser={refreshStorage} 
          on:backClick={handlerGoingBack} 
          {appointmentLenght} {nameCompany} {surnameAdmin} {emailAdmin} {ressourceArray} {storageUser} />
      {/if}
    </m-row>
      {#if userCheck === true}
        {#if adminToggle === false}
          <DateRessourcePicker 
          on:logout={handleLogout} 
          on:selectedDate={handleSelectedDate} 
          on:selectedRessource={handleSelectedRessource} 
          {nameCompany} {userEmail} {userName} {userSurname} {ressourceArray}/>
        {/if}
        {#if selectedDate != undefined && adminToggle === false}
          <Calendar 
          {appointmentLenght} {ressourceArray} {workingHours} {selectedDate} {selectedRessource} {userName} {userSurname} {userEmail} {emailAdmin} {nameCompany} {deleteRessourceToggle}/>
        {/if}
      {/if}
    </m-box>
  </m-box>


<style>
  #appContainer {
    margin-top: 4%;
    min-width: 500px;
  }

  #appBox {
    background-color: rgb(176, 239, 236);
    border-style: solid;
    border-width: 2px;
    border-color: grey;
    max-width: 97%;
    margin-top: 3%;
    margin-left: 3%;
    margin-right: 3%;
    
  }

  #innerAppBox {
    border-color: rgb(185, 182, 182);
    border-width: 2px;
    justify-content:center;
  }

  #checkUserRow {
    justify-content: center;
  }

  #adminRow {
    justify-content: center;
  }
</style>
