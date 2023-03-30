<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let userEmail = "";
  let userName = "";
  let userSurname = "";
  let status = true;

  /**
   * 1. checking storage if its not empty for iteration
   * 2. checking if user is registrated.
   * 3. if not registrated set toogle for registration
   * @param {string} userEmail
   */

  const handleInput = (userEmail) => {
    const storageLenght = localStorage.length;
    if(validation(userEmail)){
      if (storageLenght === 0) initiateStorage();
      else {
        let users = [];
        users = { ...localStorage };
        for (const key in users) {
          const user = JSON.parse(users[key]);
          if (user.email === userEmail) {
            userName = user.name;
            userSurname = user.surname;
            // activate datepicker, user exists!!!
            dispatch("userExists", {
              userEmail,
              userName,
              userSurname,
            });
            status = true
            break;
          } 
          else {
            status = false;
          }
        }
      }
    }
  };

  /**
   * @param {string} userEmail
   * @param {string} userName
   * @param {string} userSurname
   *
   * 1. checking input values
   * 2. creating new user and set in localStorage
   */

  const handleRegistration = (userEmail, userName, userSurname) => {
    //(checking user input) and creat object to set in localStorage, dont forgett id
    if(validateText()){
   {
    const id = Math.random();
    let user = {
      id: id,
      email: userEmail,
      name: userName,
      surname: userSurname,
    };

    localStorage.setItem(id, JSON.stringify(user));

    dispatch("registrationSucces", {
      userEmail,
      userName,
      userSurname,
    });
    }
   }
  };

  /**
   * initate localStorage
   */
  const initiateStorage = () => {
    status = false;

    const initObj = {
      message: "initObj",
    };
    localStorage.setItem(0, JSON.stringify(initObj));
  };

  /**
   * validates the email forom user
   * @param {string} userEmail
   */
  function validation(userEmail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)){
      return true
    }
    else {
      alert("Email-Adresse nicht zulässig!")
      return false
    }
  }

  /**
   * validates input text
   * @param {string} text
   */
  function validateText(userName, userSurname) {
    if (/^[a-z][a-zA-Z]*$/.test(userName && userSurname)){
      return true
    }
    else{
      alert("Vorname oder Name nicht zulässig!")
      return false
    }
  }

</script>

<m-box id="checkUserBox">
  <m-row id="titleRow">
    {#if status === true}
      <h2>Anmeldung</h2>
    {/if}
    {#if status === false}
      <h2>Registration</h2>
    {/if}
  </m-row>
  {#if status === false}
    <m-row>
      <m-alert id="alertBox" type="warn">E-Mail Adresse nicht vorhanden, bitte registrieren.</m-alert>
    </m-row>
  {/if}
  <fieldset>
    <form>
      <m-row>
        <m-col>
          <label for="inputEmail">E-Mail:</label>
        </m-col>
        <m-col>
          <input id="inputEmail" type="email" bind:value={userEmail} required />
        </m-col>
      </m-row>
      {#if status === false}
      <m-row>
          <m-col>
            <label for="inputSurname">Vorname:</label>
          </m-col>
          <m-col>
            <input id="inputSurname" type="text" bind:value={userSurname} pattern="/^[a-z][a-zA-Z]*$/"/>
          </m-col>
        </m-row>
        <m-row>
          <m-col>
            <label for="inputName">Name:</label>
          </m-col>
          <m-col>
            <input id="inputName" type="text" bind:value={userName} 
              title="Der Nachname darf nur a-z , 1-15 enthalten." />
          </m-col>
        </m-row>
        <m-row id="registrationRow">
          <button id="registrationButton" type="submit" on:click={() => handleRegistration(userEmail, userName, userSurname)}>Registrieren</button>
        </m-row>
      {/if}
      {#if status === true}
        <m-row id="nextRow">
          <button id="nextButton" type="submit" on:click={() => handleInput(userEmail)}>Weiter</button>
        </m-row>
      {/if}
    </form>
  </fieldset>
</m-box>

<style>

  label {
    float: right;
    margin-right: 35%;
    margin-top: 5%;
    font-size: larger;
  }

  input {
    float: right;
    width: 100px;
    margin-right: 35%;
    margin-top: 4%;
    margin-bottom: 5%;
    background-color: #ffffff;
  }

  #checkUserBox {
    width: 35%;
    height: 5%;
    padding: 1%;
    margin: 7%;
  }

  #titleRow {
    justify-content: center;
  }

  #alertBox {
    padding: 5%;
    width: 500px;
    margin: 1%;
  }

  #registrationRow {
    justify-content: center;
  }

  #nextRow {
    margin-top: 5%;
    justify-content: center;
  }

  #nextButton {
    box-shadow: inset 0 0 0 0 #ffa600;
    color: #000000;
    height: 40px;
    width: 200px;
    margin: 0 -0.25rem;
    margin-bottom: 5%;
    padding: 0 0.25rem;
    transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  #nextButton:hover {
    box-shadow: inset 200px 0 0 0 #84fd02;
    color: rgb(39, 38, 38);
  }

  #registrationButton {
    box-shadow: inset 0 0 0 0 #ffa600;
    color: #000000;
    width: 200px;
    height: 40px;
    margin: 0 -0.25rem;
    margin-top: 5%;
    margin-bottom: 5%;
    padding: 0 0.25rem;
    transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
    
  #registrationButton:hover { 
    box-shadow: inset 200px 0 0 0 #84fd02;
    color: rgb(39, 38, 38);
    }

</style>
