<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let storageUser;
  export let nameCompany = "pier4all AG"
  export let surnameAdmin;
  export let emailAdmin = null;
  export let appointmentLenght;
  export let ressourceArray = []
  let ressourceInput;
  // toggles for html/svelte if statements
  let showUser = false;
  let showUserlistCol = false;
  let userListNotEmpty = false;

  /**
   * svelte reactivity, if topLevel +page.svelte sends storageUser(changing), set toggles for if statements 
   */
  $: if (storageUser) {
    if (storageUser.length > 0) userListNotEmpty = true;
    else userListNotEmpty = false;
  }

  /** 
   * handles userListButton clickEvent, set toggles for html if statement.
   * deletes storage initObj (from initiating storage)
   */
  const handleUserList = () => {
    if (showUser === true) {
      showUser = false;
      showUserlistCol = false;
    } else {
      showUser = true;
      showUserlistCol = true;
    }
    localStorage.removeItem(0, "initObj");
    dispatch("refreshList");
  };

  /**
   * handles saveButton clickEvent. Brings all admin inputs to topLevel +page.svelte
   */
  const handleAdminSave = () => {
    if(emailAdmin === null || ressourceArray.length < 1) alert("Email Adresse und mindestens eine Ressource muss angegeben werden!")
    else{
    dispatch("savingAdminData", {
      company: nameCompany,
      admin: surnameAdmin,
      email: emailAdmin,
      length: appointmentLenght,
      ressources: ressourceArray,
    });
    }
  };

  /**
   * Deleting user from localStorage and sending
   * dispatch event to topLevel +page.svelte
   * @param {object} user
   */
  const deleteUser = (user) => {
    localStorage.removeItem(user[0], user[1]);
    // Svelte's reactivity is triggered by assignments.
    storageUser = storageUser;
    dispatch("deleteUser");
  };

  /**
   * handles clickEvent from addRessourceButton, creates
   * ressource object and push to array.
   * @param {string} ressourceInput
   */
  const addRessource = (ressourceInput) => {
    const id = Math.random();
    const ressource = {
      id: id,
      name: ressourceInput,
    };
    ressourceArray.push(ressource);
    ressourceInput = null
  };

</script>

<m-box id="adminBox">
  <m-row>
    <m-col id="adminCol">
      <m-row id="titleAdminRow">
        <h2>Administration</h2>
      </m-row>
      <fieldset id="inputFieldset">
        <form>
        <m-row class="inputRows">
          <m-col>
            <label for="inputName">Admin-Name:</label>
          </m-col>
          <m-col>
            <input type="text" bind:value={nameCompany} placeholder="bsp. Pier4all AG"/>
          </m-col>
        </m-row>
        <m-row class="inputRows">
          <m-col>
            <label for="inputSurname">Vorname:</label>
          </m-col>
          <m-col>
            <input type="text" bind:value={surnameAdmin} placeholder="Optional"/>
          </m-col>
        </m-row>
        <m-row class="inputRows">
          <m-col>
            <label for="emailAdmin">E-Mail:</label>
          </m-col>
          <m-col>
            <input bind:value={emailAdmin} type="email" required/>
          </m-col>
        </m-row>
        <m-row class="inputRows">
          <m-col >
            <label  for="inputRessourcen">Ressourcen:</label>
          </m-col>
            <m-col>
              <input  bind:value={ressourceInput}  type="text" required />
              <button id="addRessourceButton" type="button" on:click={() => addRessource(ressourceInput)}>+</button>
            </m-col>
          </m-row>
        <m-row class="inputRows">
          <m-col>
            <label for="appointmentLenght">Termindauer:</label>
          </m-col>
          <m-col>
            <select id="selectLenght" name="users" bind:value={appointmentLenght}>
              <option value=15>15min</option>
              <option value=20>20min</option>
              <option value=30>30min</option>
              <option value=60>60min</option>
            </select>
          </m-col>
        </m-row>
        <m-row />
        <m-row class="inputRows" id="registredUserRow">
          <m-col>
            <label for="registredUser">Registrierte Benutzer:</label>
          </m-col>
          <m-col>
            {#if userListNotEmpty === true}
              <button id="userListButton" type="button" on:click={handleUserList}>Benutzer anzeigen</button>
            {/if}
            {#if userListNotEmpty === false}
              <p id="noUserFound">Keine Benutzer registriert</p>
            {/if}
          </m-col>
        </m-row>
        <m-row>
          <button  type="button" on:click={handleAdminSave} id="saveButton">Speichern</button>
        </m-row>
      </form>
      </fieldset>
      <form>
    </m-col>
    <!--showing userList section if all toggles set correctly-->
    {#if userListNotEmpty === true && showUserlistCol === true}
      <m-col id="userListCol">
        <m-box id="userListBox">
          {#if showUser === true}
            <h2>Registrierte Benutzer</h2>
            {#each storageUser as user, index}
              <m-box id="userListInnerBox">
                <button id="deleteUserButton" on:click={() => deleteUser(user)}>X</button>
                <ul>
                  <li id="userListObj">{user}</li>
                </ul>
              </m-box>
            {/each}
          {/if}
        </m-box>
      </m-col>
    {/if}
  </m-row>
</m-box>

<style>
  
  li {
    list-style: none;
  }

  h2 {
    background-color: #ffffff;
    
  }

  .inputRows {
    margin-top: 10%;
  }

  #adminBox {
    background-color: rgb(255, 255, 255);
    min-width: 40%;
  }

  label {
    float: right;
    margin-top: 2%;
  }

  #inputFieldset {
    padding-right: 25%;
  }

  input {
    background-color: #ffffff; 
  }

  select {
    float: right;
    
    background-color: #ffffff;
  }

  ::placeholder {
    text-align:center;
  }

  input:hover {
    border-color: grey;
  }

  #titleAdminRow {
    padding: 0%;
    margin: 0%;
    justify-content:center;
  }

  #adminCol {
    min-width: 500px
  }

  #registredUserRow {
    margin-top: 3%;
  }

  #userListCol {
    height: 100%;
  }

  #userListButton {
    margin-right: 40px;
    width: 100px;
    height: 40px;
    background-color: #f4e736;
  }

  #userListBox {
    background-color: #ffffff;
    padding: 0%;
    border-style: none;
  }

  #userListInnerBox {
    background-color: #dfd8da;
    padding: 3%;
  }

  #userListObj {
    background-color: #dfd8da;
  }

  #deleteUserButton {
    background-color: red;
    color: #000000;
    float: right;
    margin-bottom: 10px;
  }

  #noUserFound {
    color: #f4364f;
    margin-top: 3%;
  }

  #addRessourceButton {
    background-color: #3dea34;
    height: 40px;
    width: 100%;
    margin-top:1%
  }

  #saveButton {
    background-color: #beefbb;
    box-shadow: inset 0 0 0 0 #1faa15;
    color: #000000;
    width: 100px;
    height: 40px;
    margin: 5%;
    margin-left: 5%;
    padding: 0 0.25rem;
    transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  #saveButton:hover {
    box-shadow: inset 100px 0 0 0 #0ffd02;
    color: rgb(39, 38, 38);
  }
  
</style>
