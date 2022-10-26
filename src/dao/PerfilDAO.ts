import { Response } from "express";
import PerfilEsquema from "../esquema/PerfilEsquema";

class PerfilDAO {
  protected static async consultarPerfiles(res: Response): Promise<any> {
    const datos = await PerfilEsquema.find().sort({ _id: -1 });
    res.status(200).json(datos);
  }

  protected static async crearPerfiles(
    parametros: any,
    res: Response
  ): Promise<any> {
    const existe = await PerfilEsquema.findOne(parametros);
    if (existe) {
      res.status(400).json({ respuesta: "Ël perfil ya existe..." });
    } else {
      const objPerfil = new PerfilEsquema(parametros);
      objPerfil.save((miError, miObjeto) => {
        if (miError) {
          res.status(400).json({ respuesta: "no se puede crear el perfil" });
        } else {
          res.status(200).json({
            respuesta: "Perfil creado exitosamente",
            codigo: miObjeto._id,
          });
        }
      });
    }
  }

  protected static async eliminarPerfil(
    identificador: any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    //const existe = await PerfilEsquema.findById(identificador);
    const existe = await PerfilEsquema.findById(identificador).exec();
    if (existe) {
      PerfilEsquema.findByIdAndDelete(
        identificador,
        (miError: any, MiObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "No se puede Eliminar socio paila " });
          } else {
            res.status(200).json({
              respuesta: "Breve ya se Elimino todo bien ",
              eliminado: MiObjeto,
            });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "Paila el perfil no existe yuca " });
    }
  }

  protected static async actualizarPerfil(
    identificador: any,
    parametros: any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    //const existe = await PerfilEsquema.findById(identificador);
    const existe = await PerfilEsquema.findById(identificador).exec();
    if (existe) {
      PerfilEsquema.findByIdAndUpdate(
        { _id: identificador },
        { $set: parametros },
        (miError: any, MiObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "No se puede Actualizar socio paila " });
          } else {
            res.status(200).json({
              respuesta: "Breve ya se Actualizo todo bien ",
              antes: MiObjeto,
              despues: parametros,
            });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "Paila el perfil no existe yuca " });
    }
  }
}

export default PerfilDAO;
