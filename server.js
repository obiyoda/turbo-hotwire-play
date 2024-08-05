const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

function getRandomZodiacSign() {
  return zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
}

const people = [
  { id: 1, name: "Alice", age: 30, city: "New York" },
  { id: 2, name: "Bob", age: 25, city: "Los Angeles" },
  { id: 3, name: "Charlie", age: 35, city: "Chicago" },
  { id: 4, name: "Diana", age: 28, city: "Houston" },
  { id: 5, name: "Eva", age: 32, city: "Miami" },
  { id: 6, name: "Fred", age: 35, city: "Boston" },
  { id: 7, name: "Gina", age: 28, city: "Dallas" },
  { id: 8, name: "Harry", age: 32, city: "Seattle" },
  { id: 9, name: "Ivy", age: 30, city: "Denver" },
  { id: 10, name: "John", age: 35, city: "Las Vegas" },
];

app.get("/", (req, res) => {
  res.render("index", { people, selectedPerson: null });
});

app.get("/compare/:id1/:id2", (req, res) => {
  const person1 = people.find((p) => p.id === parseInt(req.params.id1));
  const person2 = people.find((p) => p.id === parseInt(req.params.id2));
  if (person1 && person2) {
    res.render("compare", { people, person1, person2 });
  } else {
    res.status(404).send("Person not found");
  }
});

app.get("/person/:id", (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id));
  if (person) {
    res.render("index", { people, selectedPerson: person });
  } else {
    res.status(404).send("Person not found");
  }
});

app.get("/zodiac/:id", (req, res) => {
  console.log(req.params);
  const person = people.find((p) => p.id === parseInt(req.params.id));
  console.log(person);
  if (person) {
    res.render("zodiac", { person, zodiac: getRandomZodiacSign() });
  } else {
    res.status(404).send("Person not found");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
