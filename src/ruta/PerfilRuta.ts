import { Router } from "express";
import perfilControlador from "../controlador/PerfilControlador";

class PerfilRuta {
  public rutaAPI: Router;
  constructor() {
    this.rutaAPI = Router();
    this.configurarRutas();
  }
  public configurarRutas() {
    this.rutaAPI.get("/listado", perfilControlador.consulta);
    this.rutaAPI.post("/crear", perfilControlador.crear);
    this.rutaAPI.delete("/eliminar/:codiguito", perfilControlador.eliminar);
    this.rutaAPI.put("/actualizar/:codiguito", perfilControlador.actualizar);
  }
}

const perfilRuta = new PerfilRuta();
export default perfilRuta.rutaAPI;
