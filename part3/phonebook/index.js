/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

morgan.token("body", req => JSON.stringify(req.body));

app.use(express.static("build"));
app.use(express.json());
app.use(morgan(":method :url :status :body - :response-time ms"));
app.use(cors());

app.get("/api/persons/", (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons);
    })
    .catch(error => next(error));
});

app.get("/info", (request, response, next) => {
  Person.countDocuments()
    .then(numberOfPersons => {
      response.send(
        `<div>
        Phonebook has info of ${numberOfPersons} people.   
        ${new Date()}
    </div>`,
      );
    })
    .catch(error => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404);
        response.json({ error: `no user with id ${id}` });
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post("/api/persons/", (request, response, next) => {
  const newPersonName = request.body?.name;
  const newPersonNumber = request.body?.number;

  if (!newPersonNumber) {
    response.status(400);
    response.json({ error: "number is missing" });
  }

  if (!newPersonName) {
    response.status(400);
    response.json({ error: "name is missing" });
  } else {
    Person.findOne({ name: newPersonName })
      .then(person => {
        if (person) {
          response.status(400);
          response.json({ error: "name must be unique" });
        } else {
          const newPerson = new Person({
            name: newPersonName,
            number: newPersonNumber,
          });
          newPerson.save().then(createdPerson => {
            response.status(201);
            response.json(createdPerson);
          });
        }
      })
      .catch(error => next(error));
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const personNumber = request.body?.number;

  if (!personNumber) {
    response.status(400);
    response.json({ error: "number is missing" });
  }

  const person = {
    number: personNumber,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  return response.status(500).end();
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
