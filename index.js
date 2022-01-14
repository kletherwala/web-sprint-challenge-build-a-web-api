const app = require("./api/server");
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("<h1>Beenza Boys</h1>");
  });

  app.get("/port", (req, res) => {
    res.send(`<div>port is ${PORT}</div>`);
  })

  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });