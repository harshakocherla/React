const mongoose = require('mongoose');
const User = require('./models/User');
const Chit = require('./models/Chits');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose.connection
  .once('open', () => {
    console.log('CONNECTED.');
  })
  .on('error', err => {
    console.log(`Couldn't connect`, err);
  });
app.use('/', express.static(__dirname + '/client/chits'));
// app.use(
//   '/chitsTable',
//   express.static(__dirname + '/client/chits/'),
// );
// app.get('/', (req, res) => {
//   res.send('Root.');
// });

app.use((req, res, next) => {
  console.log('middleware');
  next();
});

app.use(cors());

///////////////
//User CRUD.
/////////////////
//POST User details.

app.post('/postuser', (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  });

  newUser
    .save()
    .then(saveUser => {
      res.send('User Saved.');
    })
    .catch(err => {
      res.status(404).send('User not saved...');
    });
});

//Display User details.
app.get('/displayusers', (req, res) => {
  User.find({}).then(users => {
    res.status(200).send(users);
  });
});

//Patch User by id.
app.patch('/users/:id', (req, res) => {
  const id = req.params.id;
  const firstName = req.body.firstName;

  User.findByIdAndUpdate(
    id,
    { $set: { firstName: firstName } },
    { new: true },
  ).then(saveUser => {
    res.status(200).send(`User patched...`);
  });
});

// PUT user by id.
app.put('usersput/:id', (req, res) => {
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;

  User.findByIdAndUpdate(
    id,
    {
      $set: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      },
    },
    { new: true },
  )
    .then(saveUser => {
      res.status(200).send(`User patched...`);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

//Delete User by id.
app.delete('/deleteuser/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);

  User.findByIdAndRemove(id)
    .then(user => res.status(200).send(`${user} deleted.`))
    .catch(err => err);
});

////////////////////////
//Chit CRUD/
///////////////////

//POST chit details.
app.post('/chits', (req, res) => {
  const newChit = new Chit({
    chitNumber: req.body.chitNumber,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    amount: req.body.amount,
    no_of_persons: req.body.no_of_persons,
  });

  newChit
    .save()
    .then(() => {
      // res.send(saveChit);
      res.end();
    })
    .catch(err => {
      res.status(404).send('Chit not saved...');
    });
});

//Display Chits.
app.get('/displaychits', (req, res) => {
  Chit.find({}).then(chits => {
    res.status(200).send(chits);
  });
});

const port = 4444 || process.env.PORT;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

// Delete chit by id.
app.delete('/deletechit/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);

  Chit.findByIdAndRemove(id)
    .then(chit => res.status(200).send(`${chit} deleted.`))
    .catch(err => err);
});
