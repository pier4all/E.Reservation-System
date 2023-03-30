// using Map as storage
let cache = new Map()
let init = {
      b : "c"
}
cache.set("a", init)

 // send array as response, with all reservations from the cache
module.exports.getReservation = () => {
    let responseArray = [...cache]

    return {status: 'reservations found', reservations: responseArray}
}

// save the reservation cache (map)
module.exports.postReservation = (req) => {
      const data = req.body
      const id = Math.random().toString()
      //cache.set(id, 3)
      cache.set(id, data)
return {status: "reservation booked!", id}
}

// get all ressources who are booked at specific ressource, to identifies in the frontend the available date.
module.exports.getRessources = (req) => {
      const ressource = req.params.ressource
      const reservations = [...cache].filter( res =>
          res.ressource === ressource
      )
      return {status: 'reservations found', reservations: reservations}
}

// get booked dates for a specific date, to identifies in the frontend the available ressource.
module.exports.getDates = (req) => {
    const date = req.params.date
    const reservations = [...cache].filter( res =>
        res.date === date
    )
    return {status: 'reservations found', reservations: reservations}
}

// deleting a reservation with the reservation id
module.exports.deleteReservation = (req, context) => {
      const id = context.request.params.id
      cache.delete(id.toString());
      return {status: "reservation deleted"}
}
