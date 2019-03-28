export enum EnumAMIBOGCXCFacturaFormaPago {
  'Contado' = 'CO',
  'Efectivo' = 'EF',
  'Cheque' = 'CH',
  'Transferencia' = 'TR'
}

export class AMIBOGCXC_FacturasModel {
    public Compania: number = 1;
    public AMIBOGCXCFacturaid: number = 0;
    public AMIBOGCXCFacturaFecha: Date;
    public ClienteAMIBOGCXCId: number;
    public AMIBOGCXCFacturaFormaPago: EnumAMIBOGCXCFacturaFormaPago = EnumAMIBOGCXCFacturaFormaPago['Contado'];
    public AMIBOGCXCFacturaSubTotal: number = 0;
    public AMIBOGCXCFacturaIva: number = 0;
    public AMIBOGCXCFacturaTotal: number = 0;
    public AMIBOGCXCFacturaDescuento: number = 0.0;
    public AMIBOGCXCFacturaObservaciones: string;
    public Secuencia: number;
    public Estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.AMIBOGCXCFacturaid = json.AMIBOGCXCFacturaid;
            this.AMIBOGCXCFacturaFecha = json.AMIBOGCXCFacturaFecha;
            this.ClienteAMIBOGCXCId = json.ClienteAMIBOGCXCId;
            this.AMIBOGCXCFacturaFormaPago = json.AMIBOGCXCFacturaFormaPago;
            this.AMIBOGCXCFacturaSubTotal = json.AMIBOGCXCFacturaSubTotal;
            this.AMIBOGCXCFacturaIva = json.AMIBOGCXCFacturaIva;
            this.AMIBOGCXCFacturaTotal = json.AMIBOGCXCFacturaTotal;
            this.AMIBOGCXCFacturaDescuento = json.AMIBOGCXCFacturaDescuento;
            this.AMIBOGCXCFacturaObservaciones = json.AMIBOGCXCFacturaObservaciones;
        }
    }
}
