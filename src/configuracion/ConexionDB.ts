//creamos una funcion fecha para realzia la conexion a la base de datos

import { connect } from "mongoose";

const ConexionDB = () => {
  const URL = String(process.env.DB_MONGO);
  //console.log(URL); muestra las variables de conexion
  //aqui se esca colocando dentro del connect la variable url de conexion de la base
  connect(URL)
    .then(() => {
      console.log("Estas conectado a mongoDB ", process.env.DB_MONGO);
    })
    //aqui estamos generando el codigo que muestra el error de conexion o porque nos e conecta
    .catch((miError) => {
      console.log("no encuentro a mongo ", miError);
    });
};

export default ConexionDB;
