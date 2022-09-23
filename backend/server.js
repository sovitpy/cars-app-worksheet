import express from 'express';
import cors from 'cors';
import fs from 'fs';

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js
 * import express */

/** Create GET API. API shoudl return  const carsMockData*/
app.get('/cars', (req, res) => {
  fs.readFile('./data/cars.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    }
    const carsMockData = JSON.parse(data);
    res.json({
      status: 'success',
      data: carsMockData,
    });
  });
});

/** Create POST API. Get the new car data from react.
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */

app.post('/cars', (req, res) => {
  const { id, brand, name, releaseYear, color } = req.body;
  if (id && brand && name && releaseYear && color) {
    const carObj = { id, brand, name, releaseYear, color };
    fs.readFile('./data/cars.json', (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        const cars = JSON.parse(data);
        const car = cars.filter((car) => car.id === id);
        if (!car.length == 0) {
          res.status(400).send('Car already exists');
        } else {
          const newCars = [...cars, carObj];
          const data = JSON.stringify(newCars);
          fs.writeFile('./data/cars.json', data, (err, data) => {
            if (err) {
              res.sendStatus(500);
              console.log(err);
            } else {
              res.json({
                status: 'success',
                message: 'Car Created!',
                data: newCars,
              });
            }
          });
        }
      }
    });
  } else {
    res.sendStatus(400);
  }
});

/** Create PUT API.
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'.
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */
app.put('/cars', (req, res) => {
  const { id, brand, name, releaseYear, color } = req.body;
  if (id) {
    fs.readFile('./data/cars.json', (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        const cars = JSON.parse(data);
        const oldCar = cars.filter((car) => car.id == id)[0];
        if (oldCar.length == 0) {
          res.status(404).send('No car with given id exists');
        } else {
          const filteredCars = cars.filter((car) => car.id != id);
          let newCar = {
            id,
            brand: brand || oldCar.brand,
            name: name || oldCar.name,
            releaseYear: releaseYear || oldCar.releaseYear,
            color: color || oldCar.color,
          };
          const newCars = [...filteredCars, newCar];
          const data = JSON.stringify(newCars);
          fs.writeFile('./data/cars.json', data, (err, data) => {
            if (err) {
              res.sendStatus(500);
              console.log(err);
            } else {
              res.json({
                status: 'success',
                message: 'Car Updated!',
                data: newCars,
              });
            }
          });
        }
      }
    });
  } else {
    res.sendStatus(400);
  }
});

/** Create Delete API.
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
 */

app.delete('/cars', (req, res) => {
  const { id } = req.body;
  if (id) {
    fs.readFile('./data/cars.json', (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        const cars = JSON.parse(data);
        const car = cars.filter((car) => car.id === id);
        if (car.length == 0) {
          res.status(404).send('No car with given id exists');
        } else {
          const newCars = cars.filter((car) => car.id !== id);
          const data = JSON.stringify(newCars);
          fs.writeFile('./data/cars.json', data, (err, data) => {
            if (err) {
              res.sendStatus(500);
              console.log(err);
            } else {
              res.json({
                status: 'success',
                message: 'Car Deleted!',
                data: newCars,
              });
            }
          });
        }
      }
    });
  } else {
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log(`Server Started! Listening on port ${PORT}`);
});
