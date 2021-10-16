// DO YOUR MAGIC
const express = require("express");
const Cars = require("../cars/cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require("../cars/cars-middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  // DO YOUR MAGIC
  Cars.getAll()
    .then((account) => {
      res.status(200).json(account);
    })
    .catch(() => {
      res.status(500).json({ message: "unable to get data" });
    });
});
router.get("/:id", checkCarId, (req, res, next) => {
  const { id } = req.params;
  // DO YOUR MAGIC
  Cars.getById(id).then((cars) => {
    res.status(200).json(cars);
  });
});
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    const newCar = req.body;
    // DO YOUR MAGIC
    Cars.create(newCar)
    .then((car)=>{
      res.status(201).json(car)
    })
    .catch((err)=>{
        console.log(err)
      res.status(500).json({message:"unable to add that car"})
    })
  })

module.exports = router;
