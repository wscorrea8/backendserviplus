import { Request, Response } from "express";
import UsuarioDAO from "../dao/UsuarioDAO";

class UsuarioControlador extends UsuarioDAO {
  public consulta(req: Request, res: Response) {
    UsuarioControlador.consultarUsuarios(res);
  }

  public crear(req: Request, res: Response) {
    const elCorreo={correoUsuario:req.body.correoUsuario};
    UsuarioControlador.crearUsuario(elCorreo,req.body, res);
  }

  public eliminar(req: Request, res: Response) {
    UsuarioControlador.eliminarUsuario(req.params.codiguito, res);
  }

  public actualizar(req: Request, res: Response) {
    UsuarioControlador.actualizarUsuario(req.params.codiguito, req.body, res);
  }
}

const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;
