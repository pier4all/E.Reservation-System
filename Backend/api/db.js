// using Map as storage
let cache = new Map()
let init = {
      b : "c"
}
cache.set("a", init)

 // send array as response, with all reservations from the cache
module.exports.getReservation = () => {
    let responseArray = [...cache]

    return responseArray 
}

// save the reservation cache (map)
module.exports.postReservation = (req) => {
      const data = req.body
      const id = Math.random()
      //cache.set(id, 3)
      cache.set(id, data)
return {status: "reservation booked!"}
}
 
// get all ressources who are booked at specific date, to identifies in the frontend the available date.
module.exports.getRessources = (req) => {
      const requestData = req.body
      const allReservation = [... cache]
      let allBookedRessources = []
      for(const key in allReservation) {
            if(allReservation[key].date === requestData.date) {
                  allBookedRessources.push(allReservation[key].ressource)
            }
      }
      //return allBookedRessources
      return allBookedRessources
}

// get booked dates for a specific ressource, to identifies in the frontend the available ressource.
module.exports.getDates = (req) => {
      const requestData = req.data
      const allReservation = [... cache]
      for(const key in allReservation) {
            let allBookedDates = []
            if(allTeservation[key].ressource === requestData.ressource)
                  allBookedDates.push(allReservation[key].date)
      }
       //return allBookedDates 
      return {status: "here all ressources for date"}
}

// deleting a reservation with the reservation id
module.exports.deleteReservation = (req) => {

      const id = req.body.id
      cache.delete(id);

      return {status: "reservation deleted"}
}

