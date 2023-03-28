const { getReservation , postReservation, getRessources, getDates, deleteReservation } = require("./db")

module.exports = {
      postReservation: async (context, req, res) => res.status(201).json(postReservation(req)),
      getReservation: async (context, req, res) => res.status(200).json(getReservation()),
      getReservationRessource: async (context, req, res) => res.status(200).json(getRessources(req)),
      getReservationDate: async (context, req, res) => res.status(200).json(getDates(req)),
      deleteReservation: async (context, req, res) => res.status(200).json(deleteReservation(req, context))
}
