import { Response } from "express";
import UsuarioEsquema from "../esquema/UsuarioEsquema";
import Cifrado from  "bcryptjs"; // Libreria para encriptar
import jwt from "jsonwebtoken"; // Genera el token  del cifrado

class UsuarioDAO {
  protected static async consultarUsuarios(res: Response): Promise<any> {
    const datos = await UsuarioEsquema.find().sort({ _id: -1 });
    res.status(200).json(datos);
  }

  protected static async crearUsuario(
    correo:any, parametros: any, res: Response): Promise<any> {
    const existe = await UsuarioEsquema.findOne(correo).exec();
     if (existe) {
      res.status(400).json({ respuesta: "Ël correo ya existe" });
    } else {
      // Hacemos el cifrado de la contraseña
      parametros.claveUsuario = Cifrado.hashSync(parametros.claveUsuario, 10);
      const objUsuario = new UsuarioEsquema(parametros);
      objUsuario.save((miError, miObjeto) => {
        if (miError) {
          //console.log(miError)
          res.status(400).json({ respuesta: "No se puede crear el usuario" });
        } else {
          const misDatos = {
            // dentro de jwt voy enviar la informacion
            codUsuario:miObjeto._id,
            correo:parametros.correoUsuario
          };
          const miLlavecita = String(process.env.CLAVE_SECRETA);
          // genera credenciales
          const miToken = jwt.sign(misDatos,miLlavecita,{expiresIn:86400});
          res.status(200).json({
            token: miToken
          });
        }
      });
    }
  }

  protected static async eliminarUsuario(
    identificador: any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    //const existe = await PerfilEsquema.findById(identificador);
    const existe = await UsuarioEsquema.findById(identificador).exec();
    if (existe) {
      UsuarioEsquema.findByIdAndDelete(
        identificador,
        (miError: any, MiObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "No se puede Eliminar socio paila " });
          } else {
            res.status(200).json({
              respuesta: "Breve ya se Elimino todo bien ",
              eliminado: MiObjeto
            });
          }
        }
      );
    } else {
      res.status(400).json({ respuesta: "Paila el perfil no existe yuca " });
    }
  }

  protected static async actualizarUsuario(
    identificador: any,
    parametros: any,
    res: Response
  ): Promise<any> {
    //en esta line se hace una consulta
    //const existe = await PerfilEsquema.findById(identificador);
    const existe = await UsuarioEsquema.findById(identificador).exec();
    if (existe) {
      UsuarioEsquema.findByIdAndUpdate(
        { _id: identificador },
        { $set: parametros },
        (miError: any, MiObjeto: any) => {
          if (miError) {
            res
              .status(400)
              .json({ respuesta: "No se puede actualizar" });
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
      res.status(400).json({ respuesta: "El usuario no existe" });
    }
  }
}

export default UsuarioDAO;
