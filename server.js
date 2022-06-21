const http = require("http");
const app = require("./app");

app.set('port', process.env.PORT || 3000);
const serve = http.createServer(app);
const PORT = process.env.PORT || 3000;
serve.listen(PORT, console.log("app running"));