const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const moment = require("moment")
const port = 9800;

const app = express()
app.use(express.json())
app.use(cors())

mongoose
  .connect(
    `mongodb+srv://khachiep:khachiep12@cluster0.75k6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect to DB")
  })
  .catch(console.error)

app.get('/movie', (req, res) => {
    res.status(200).send("Movies")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
