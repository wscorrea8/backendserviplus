import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import Conexiondb from "./ConexionDB"; //se realzia la conexiona BD
import apiPerfilRuta from "../ruta/PerfilRuta";
import apiUsuarioRuta from "../ruta/UsuarioRuta";
import seguridad from "../middleware/Seguridad";

class Servidor {
  //definimos la variable paa configuracion de todo lo que usamos en el api
  public app: express.Application;

  //creamos un constructor
  constructor() {
    //primer paso del contructor
    //habilitar proyecto para usar variables de ambiente
    dotenv.config({ path: "variables.env" });
    //Conectarse a mongo
    Conexiondb();
    this.app = express();
    this.iniciarconfig();
    this.iniciarRutas();
  }

  public iniciarconfig() {
    //Establecemos el puerto
    this.app.set("PORT", process.env.PORT);
    //Bloquear y permitir acceso del Backend
    this.app.use(cors());
    //permite que los mensaje salgan en consola modo desarrollo
    this.app.use(morgan("dev"));
    //permite subir archivos hasta de 50MB
    this.app.use(express.json({ limit: "50MB" }));
    //sirve para recibir parametros o consultas
    this.app.use(express.urlencoded({ extended: true }));
  }

  public iniciarRutas() {
    this.app.use("/api/perfil",seguridad.analizarToken,apiPerfilRuta);
    this.app.use("/api/usuario",apiUsuarioRuta);
  }

  public iniciarServidor() {
    this.app.listen(this.app.get("PORT"), () => {
      console.log("Backend listo en el puerto: ", this.app.get("PORT"));
    });
  }
}
export default Servidor; //esta linea permite utilizar la clase de forma global
