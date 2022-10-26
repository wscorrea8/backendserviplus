import PerfilEntidad from "./PerfilEntidad";

class UsuarioEntidad {
  public nombreUsuario: string;
  public estadoUsuario: number;
  public correoUsuario: string;
  public claveUsuario: string;
  public fechaCreacion: Date;
  public codPerfil: PerfilEntidad;

  constructor(
    nomu: string,
    estu: number,
    coru: string,
    clau: string,
    fecu: Date,
    codp: PerfilEntidad
  ) {
    this.nombreUsuario = nomu;
    this.estadoUsuario = estu;
    this.correoUsuario = coru;
    this.claveUsuario = clau;
    this.fechaCreacion = fecu;
    this.codPerfil = codp;
  }
}

export default UsuarioEntidad;
