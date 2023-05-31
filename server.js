const mongoose = require("mongoose");
const app = require("./app");

// H0N2OJJ0jwTIlASF

const DB_HOST =
  "mongodb+srv://IhorD:H0N2OJJ0jwTIlASF@cluster0.pvwipli.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
