const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");


const port = 9100;
app.use(cors());
dotenv.config();

// mongoose
//   .connect(
//     `mongodb+srv://khachiep:khachiep12@cluster0.75k6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
//     {
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Connected to DB")
//   })
//   .catch(console.error)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-with,Content-Type,Accept")
  next()
})

main().catch((err) => console.log(err))

async function main() {
  await mongoose.connect(process.env.MONGO_URL)
  console.log("😎 DB is running succesfully")
}



app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/movies", movieRoute)
app.use("/api/lists", listRoute)




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
