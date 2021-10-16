const Cars = require("../cars/cars-model");
const vinValidator = require('vin-validator')
const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  Cars.getById(id).then((cars) => {
    if (!cars) {
      res.status(404).json({ message: `car with id ${id} is not found` });
    } else {
      req.cars = cars;
      next();
    }
  });
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  const messageUser = (missingString) =>{
    return `${missingString} is missing`
  }
  if (
    Object.keys(req.body).length === 0
  ) {
    res.status(400).json({ message: "request body required" });
  }
  else if(vin === undefined){
    res.status(400).json({ message: messageUser("vin") });
  }else if(make ===undefined){
    res.status(400).json({ message: messageUser("make") });
  }else if(model ===undefined){
    res.status(400).json({ message: messageUser("model") });
  }else if(mileage ===undefined){
    res.status(400).json({ message: messageUser("mileage") });
  }
  else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin} = req.body
  if(!vinValidator.validate(vin)){
    res.status(400).json({message:`vin ${vin} is invalid`})
  } else {
    next();
  }
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const requestVin = req.body.vin
  Cars.getAll().then((accounts) => {
    const vinFound = accounts.find(({ vin }) => {
      return vin === requestVin;
    });
    if (vinFound) {
      res.status(400).json({ message: `vin ${requestVin} already exists` });
    } else {
      next();
    }
  });
};
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
};
