
<script>
      import { createEventDispatcher } from "svelte";
      const dispatch = createEventDispatcher();

      // clickEvent
      const handleLogout = () => {
          dispatch("logout", true)
      }

</script>

<div id="buttonDiv">
      <button on:click={handleLogout}>LogOut</button>
</div>

<style>

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