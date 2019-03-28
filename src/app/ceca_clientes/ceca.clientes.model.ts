export class CECA_ClientesModel {
    public Compania: number = 1;
    public CECAClienteCodigoNuevo: number;
    public CECAClienteViejo: number;
    public CECAClienteNoCedula: number;
    public CECAClienteRelacionActual: string;
    public CECAClienteTitulo: string;
    public CECAClienteProvincia: string;
    public CECAClientePrimerApellido: string;
    public CECAClienteCanton: string;
    public CECAClienteSegundoApellido: string;
    public CECAClienteDistrito: string;
    public CECAClienteNombre: string;
    public CECAClienteTipoCuenta: string;
    public CECAClienteRepresentante: string;
    public CECAClienteCuentaPrincipal: string;
    public CECAClienteFechaNacimiento: Date;
    public CECAClienteDireccionPostal: string;
    public CECAClienteTelefono: string;
    public CECAClienteTipo: string;
    public CECAClienteRecibidor: string;
    public CECAClienteCuentaCongelada: boolean;
    public CECAClientePromotor: string;
    public CECAClienteZona: string;
    public CECAClienteSobregiro: boolean;
    public CECAClienteReservado: boolean;
    public CECAClienteCobroJudicial: boolean;
    public CECAClienteEmbargado: boolean;
    public CECAClientePagaSubflete: boolean;
    public CECAClienteRepelaPermitida: number;
    public Secuencia: number;
    public Estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.CECAClienteCodigoNuevo = json.CECAClienteCodigoNuevo;
            this.CECAClienteViejo = json.CECAClienteViejo;
            this.CECAClienteNoCedula = json.CECAClienteNoCedula;
            this.CECAClienteRelacionActual = json.CECAClienteRelacionActual;
            this.CECAClienteTitulo = json.CECAClienteTitulo;
            this.CECAClienteProvincia = json.CECAClienteProvincia;
            this.CECAClientePrimerApellido = json.CECAClientePrimerApellido;
            this.CECAClienteCanton = json.CECAClienteCanton;
            this.CECAClienteSegundoApellido = json.CECAClienteSegundoApellido;
            this.CECAClienteDistrito = json.CECAClienteDistrito;
            this.CECAClienteNombre = json.CECAClienteNombre;
            this.CECAClienteTipoCuenta = json.CECAClienteTipoCuenta;
            this.CECAClienteRepresentante = json.CECAClienteRepresentante;
            this.CECAClienteCuentaPrincipal = json.CECAClienteCuentaPrincipal;
            this.CECAClienteFechaNacimiento = json.CECAClienteFechaNacimiento;
            this.CECAClienteDireccionPostal = json.CECAClienteDireccionPostal;
            this.CECAClienteTelefono = json.CECAClienteTelefono;
            this.CECAClienteTipo = json.CECAClienteTipo;
            this.CECAClienteRecibidor = json.CECAClienteRecibidor;
            this.CECAClienteCuentaCongelada = json.CECAClienteCuentaCongelada;
            this.CECAClientePromotor = json.CECAClientePromotor;
            this.CECAClienteZona = json.CECAClienteZona;
            this.CECAClienteSobregiro = json.CECAClienteSobregiro;
            this.CECAClienteReservado = json.CECAClienteReservado;
            this.CECAClienteCobroJudicial = json.CECAClienteCobroJudicial;
            this.CECAClienteEmbargado = json.CECAClienteEmbargado;
            this.CECAClientePagaSubflete = json.CECAClientePagaSubflete;
            this.CECAClienteRepelaPermitida = json.CECAClienteRepelaPermitida;
        }
    }
}
