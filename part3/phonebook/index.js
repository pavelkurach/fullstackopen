const express = require("express");
const { v4: uuid } = require("uuid");
const morgan = require("morgan");

const app = express();

morgan.token("body", req => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :status :body - :response-time ms"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  response.send(
    `<div>
        Phonebook has info of ${persons.length} people.   
        ${new Date()}
    </div>`,
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id == id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id != id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  _name = request.body?.name;
  _number = request.body?.number;

  if (!_number) {
    response.status(400);
    response.json({ error: "number is missing" });
  }

  if (!_name) {
    response.status(400);
    response.json({ error: "name is missing" });
  } else if (persons.find(person => person.name === _name)) {
    response.status(400);
    response.json({ error: "name must be unique" });
  } else {
    newPerson = {
      id: uuid(),
      name: _name,
      number: _number,
    };
    persons.push(newPerson);
    response.status(201);
    response.json(newPerson);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
