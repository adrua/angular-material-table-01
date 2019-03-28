export enum EnumTMOVClienteTipoDocumento {
  'Cédula_de_ciudadania' = 'CC',
  'Cédula_de_Extranjería' = 'CE',
  'Tarjeta_de_Identidad' = 'TI',
  'NIT' = 'NI',
  'Pasaporte' = 'PA'
}

export enum EnumTMOVClienteSexo {
  'Masculino' = 'M',
  'Femenino' = 'F',
  'Otro' = 'O'
}

export enum EnumTMOVClienteEstado {
  'Activo' = 'AC',
  'Inactivo' = 'IN'
}

export class TMOV_ClientesModel {
    public Compania: number = 1;
    public TMOVClienteTipoDocumento: EnumTMOVClienteTipoDocumento = EnumTMOVClienteTipoDocumento['Cédula_de_ciudadania'];
    public TMOVClienteNumeroDocumento: number;
    public TMOV_Clientes_Comp: string;
    public TMOVClienteFecha: Date;
    public TMOVClienteNombres: string;
    public TMOVClienteApellidos: string;
    public TMOVClienteNombreCompleto: string;
    public TMOVClienteSexo: EnumTMOVClienteSexo = EnumTMOVClienteSexo['Masculino'];
    public TMOVClienteFechaNacimiento: Date;
    public GOVCOPaisId: string;
    public TMOVClienteTelefono: string;
    public TMOVClienteCelular: string;
    public TMOVClienteEmail: string;
    public TMOVClienteEmailAlternativo: string;
    public TMOVClienteOcupacion: string;
    public TMOVClientePaisResidencia: string;
    public TMOVClienteEstado: EnumTMOVClienteEstado = EnumTMOVClienteEstado['Activo'];
    public Secuencia: number;
    public Estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.TMOVClienteTipoDocumento = json.TMOVClienteTipoDocumento;
            this.TMOVClienteNumeroDocumento = json.TMOVClienteNumeroDocumento;
            this.TMOV_Clientes_Comp =  json.TMOV_Clientes_Comp;
            this.TMOVClienteFecha = json.TMOVClienteFecha;
            this.TMOVClienteNombres = json.TMOVClienteNombres;
            this.TMOVClienteApellidos = json.TMOVClienteApellidos;
            this.TMOVClienteNombreCompleto = json.TMOVClienteNombreCompleto;
            this.TMOVClienteSexo = json.TMOVClienteSexo;
            this.TMOVClienteFechaNacimiento = json.TMOVClienteFechaNacimiento;
            this.GOVCOPaisId = json.GOVCOPaisId;
            this.TMOVClienteTelefono = json.TMOVClienteTelefono;
            this.TMOVClienteCelular = json.TMOVClienteCelular;
            this.TMOVClienteEmail = json.TMOVClienteEmail;
            this.TMOVClienteEmailAlternativo = json.TMOVClienteEmailAlternativo;
            this.TMOVClienteOcupacion = json.TMOVClienteOcupacion;
            this.TMOVClientePaisResidencia = json.TMOVClientePaisResidencia;
            this.TMOVClienteEstado = json.TMOVClienteEstado;
        }
    }
}
