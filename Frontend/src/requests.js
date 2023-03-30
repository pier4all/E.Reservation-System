import axios from "axios";

// requests with axios
export const getAllReservations = () => 
  axios
    .get("http://localhost:9000/reservation") 
    .then((response => response.data.reservations))
    .catch((error) => {
      console.log("Error: ", error);
    });


export function postReservation(selectedAppointment) {
  axios.post("http://localhost:9000/reservation", selectedAppointment)
  .then((response) => (console.log(response.data)))
  .catch((error) => console.log(error));
};

export function getReservationByRessource(ressource){
  axios.get("http://localhost:9000/reservation/ressource/"+ressource)
      .then((response => response.data.reservations)) 
      .catch((error) => {
        console.log("Error: ", error);
      })
    }


export function getReservationByDate(date) {
  axios.get("http://localhost:9000/reservation/date/"+date)
      .then((response) => {
        console.log(response.data.reservations);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
}

export function deleteReservation(id) {
  console.log("delete", id)
  axios
  .delete("http://localhost:9000/reservation/"+id)
  .then((response) => {
    console.log(response.data);
  })

  .catch((error) => {
    console.log("Error: ", error);
  });
}




