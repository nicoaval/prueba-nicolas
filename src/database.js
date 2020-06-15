const mongoose = require("mongoose");

const MONGODB_URI = 'mongodb+srv://usuarioprueba:usuarioPrueba20@cluster0-xayhs.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));
