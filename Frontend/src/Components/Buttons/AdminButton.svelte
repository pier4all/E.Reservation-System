<script>
      import { createEventDispatcher } from "svelte";
      const dispatch = createEventDispatcher();
    
      // handles the button click
      const handleClick = () => {
        dispatch("adminClick", true);
      };
    </script>

      <m-row id="adminSettings">
            <fieldset>
                  <!--<label id="adminLabel" for="adminButton"><h3>Admin:</h3></label>-->
                  <button id="adminButton" on:click={handleClick}><img src="src/images/gearIcon.png" alt="A button with the gearIcon, leads to Admin"/></button>
            </fieldset>
      </m-row>
    
    
    <style>

      #adminSettings {
            margin-left: 88%;
      }

      #adminButton {
        background-color: rgb(255, 255, 255);
        margin-bottom: 1%;
      }
    
      #adminButton:hover {
          background-color: rgb(131, 174, 247)
      }
    
      img {
        width: 40px;
        height: 40px;
      }
    </style>
    