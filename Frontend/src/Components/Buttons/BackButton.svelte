<script>
      import { createEventDispatcher } from "svelte";
      const dispatch = createEventDispatcher();
    
      const handleClick = () => {
        console.log("back");
        dispatch("backClick", true);
      };
</script>
    
        <button id="backButton" on:click={handleClick}><img src="src/images/back-arrow.png" alt="Arrow who shows to the left (for going back)"/></button>
    
<style>
      #backButton {
        background-color: rgb(241, 175, 7);
        margin: 0%;
        padding: 0%;
      }
    
      #backButton:hover {
          background-color: rgb(225, 226, 187)
      }
    
      img {
        width: 30x;
        height: 30px;
      }
</style>
    