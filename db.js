const config = require("./config/config");
const mongoose = require('mongoose');
let conexion = config();
mongoose.connect(conexion.db.connectionString, { useNewUrlParser: true, useUnifiedTopology: true})
.catch((err)=>{
    //istanbul ignore next
    next(err)
});
module.exports = {
  mongoose: mongoose}