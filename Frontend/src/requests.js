import axios from "axios";

// requests with axios

export const getAllReservations = () => 
  axios
    .get("http://localhost:9000/reservation") 
    .then((response => response.data))
    .catch((error) => {
      console.log("Error: ", error);
    });


export function postReservation(seelectedAppointment) {
  axios.post("http://localhost:9000/reservation", {
    /*id: seelectedAppointment.appId,
    day: seelectedAppointment.appDay,
    time: seelectedAppointment.appTime,
    ressource: seelectedAppointment.appRes,
    userEmail: seelectedAppointment.userEmail*/
    seelectedAppointment
})
  .then((response) => (console.log(response.data)))
  .catch((error) => console.log(error));
};

export function getDateByRessource(ressource) {
  axios.get("http://localhost:9000/reservation/{ressource}", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        ressource: {
          id: "1",
        },
      })
      .then((response) => {
        showRessByDate(response.data);
      })

      .catch((error) => {
        console.log("Error: ", error);
      });
}

export function getRessourceByDate(date) {
  axios.get("http://localhost:9000/reservation/{date}", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },

        date: {
          date: "30.03.2024",
        },
      })
      .then((response) => {
        console.log(response.data);
      })

      .catch((error) => {
        console.log("Error: ", error);
      });
}

export function deleteReservation(idReservation) {
  axios
  .delete("http://localhost:9000/reservation/ressource{id}",{ 
     id: idReservation
  })
  .then((response) => {
    console.log(response.data);
  })

  .catch((error) => {
    console.log("Error: ", error);
  });
}

export function sayHello () {
  console.log("HAllo")
}  


