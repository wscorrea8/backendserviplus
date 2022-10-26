import { Router } from "express";
import usuarioControlador from "../controlador/UsuarioControlador";

class UsuarioRuta {
  public rutaAPI: Router;
  constructor() {
    this.rutaAPI = Router();
    this.configurarRutas();
  }
  public configurarRutas() {
    this.rutaAPI.get("/listado", usuarioControlador.consulta);
    this.rutaAPI.post("/crear", usuarioControlador.crear);
    this.rutaAPI.delete("/eliminar/:codiguito", usuarioControlador.eliminar);
    this.rutaAPI.put("/actualizar/:codiguito", usuarioControlador.actualizar);
  }
}

const usuarioRuta = new UsuarioRuta();
export default usuarioRuta.rutaAPI;
