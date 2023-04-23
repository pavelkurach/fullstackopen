const express = require("express");
const { v4: uuid } = require("uuid");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

morgan.token("body", req => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :body - :response-time ms"));
app.use(cors());
app.use(express.static("build"));

app.get("/info", (request, response) => {
  response.send(
    `<div>
        Phonebook has info of ${persons.length} people.   
        ${new Date()}
    </div>`,
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then(person => {
      response.json(person);
    })
    .catch(error => {
      response.status(404);
      response.json({ error: `no user with id ${id}` });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter(person => person.id != id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  const _name = request.body?.name;
  const _number = request.body?.number;

  if (!_number) {
    response.status(400);
    response.json({ error: "number is missing" });
  }

  if (!_name) {
    response.status(400);
    response.json({ error: "name is missing" });
  } else {
    Person.findOne({ name: _name })
      .then(person => {
        if (person) {
          response.status(400);
          response.json({ error: "name must be unique" });
        } else {
          newPerson = new Person({
            name: _name,
            number: _number,
          });
          newPerson.save().then(person => {
            response.status(201);
            response.json(person);
          });
        }
      })
      .catch(error => {
        response.status(404);
        response.json({ error: String(error) });
      });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
