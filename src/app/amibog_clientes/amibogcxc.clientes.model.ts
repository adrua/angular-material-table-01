export enum EnumClienteAMIBOGCXCTipoId {
  'Cedula_Ciduadania' = 'CC',
  'Cedula_Extranjeria' = 'CE',
  'Pasaporte' = 'PA',
  'NIT' = 'NIT',
  'RUT' = 'RUT'
}

export class AMIBOGCXC_ClientesModel {
    public Compania: number = 1;
    public ClienteAMIBOGCXCId: number;
    public ClienteAMIBOGCXCTipoId: EnumClienteAMIBOGCXCTipoId = EnumClienteAMIBOGCXCTipoId['Nit'];
    public ClienteAMIBOGCXCIdTributario: number;
    public ClienteAMIBOGCXCRazonSocial: string;
    public ClienteAMIBOGCXCPrimerApellido: string;
    public ClienteAMIBOGCXCSegundoApellido: string;
    public ClienteAMIBOGCXCPrimerNombre: string;
    public ClienteAMIBOGCXCSegundoNombre: string;
    public ClienteAMIBOGCXCDireccion: string;
    public CiudadDepartamentoId: number;
    public Ciudadid: number;
    public CNT_Ciudades_Comp: string;
    public CodigoCiiuId: string;
    public ClienteAMIBOGCXCContactoCompras: string;
    public ClienteAMIBOGCXCCorreoCompras: string;
    public ClienteAMIBOGCXCContactoTesoreria: string;
    public ClienteAMIBOGCXCCorreoTesoreria: string;
    public ClienteAMIBOGCXCTelefono: string;
    public ClienteAMIBOGCXCCelular: string;
    public ClienteAMIBOGCXCDescuento: number;
    public Secuencia: number;
    public Estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.ClienteAMIBOGCXCId = json.ClienteAMIBOGCXCId;
            this.ClienteAMIBOGCXCTipoId = json.ClienteAMIBOGCXCTipoId;
            this.ClienteAMIBOGCXCIdTributario = json.ClienteAMIBOGCXCIdTributario;
            this.ClienteAMIBOGCXCRazonSocial = json.ClienteAMIBOGCXCRazonSocial;
            this.ClienteAMIBOGCXCPrimerApellido = json.ClienteAMIBOGCXCPrimerApellido;
            this.ClienteAMIBOGCXCSegundoApellido = json.ClienteAMIBOGCXCSegundoApellido;
            this.ClienteAMIBOGCXCPrimerNombre = json.ClienteAMIBOGCXCPrimerNombre;
            this.ClienteAMIBOGCXCSegundoNombre = json.ClienteAMIBOGCXCSegundoNombre;
            this.ClienteAMIBOGCXCDireccion = json.ClienteAMIBOGCXCDireccion;
            this.CiudadDepartamentoId = json.CiudadDepartamentoId;
            this.Ciudadid = json.Ciudadid;
            this.CNT_Ciudades_Comp =  json.CNT_Ciudades_Comp;
            this.CodigoCiiuId = json.CodigoCiiuId;
            this.ClienteAMIBOGCXCContactoCompras = json.ClienteAMIBOGCXCContactoCompras;
            this.ClienteAMIBOGCXCCorreoCompras = json.ClienteAMIBOGCXCCorreoCompras;
            this.ClienteAMIBOGCXCContactoTesoreria = json.ClienteAMIBOGCXCContactoTesoreria;
            this.ClienteAMIBOGCXCCorreoTesoreria = json.ClienteAMIBOGCXCCorreoTesoreria;
            this.ClienteAMIBOGCXCTelefono = json.ClienteAMIBOGCXCTelefono;
            this.ClienteAMIBOGCXCCelular = json.ClienteAMIBOGCXCCelular;
            this.ClienteAMIBOGCXCDescuento = json.ClienteAMIBOGCXCDescuento;
        }
    }
}
