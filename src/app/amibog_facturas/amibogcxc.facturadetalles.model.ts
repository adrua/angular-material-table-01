export class AMIBOGCXC_FacturaDetallesModel {
    public Compania: number = 1;
    public AMIBOGCXCFacturaid: number;
    public AMIBOGCXCFacturaDetalleRow: number = 0;
    public AMIBOGCXC_FacturaDetalles_Comp: string;
    public AMIBOGCXCFacturaDetalleCantidad: number = 1;
    public AMIBOGCXCFacturaDetalleDescripcion: string;
    public AMIBOGCXCFacturaDetalleValorUnitario: number = 0;
    public AMIBOGCXCFacturaDetalleValorTotal: number = 0;
    public Secuencia: number;
    public Estado: string = 'N';
    public _id: string;
    public _v: number;

    constructor(json: any = null) {
        if (json !== null) {
            this.AMIBOGCXCFacturaid = json.AMIBOGCXCFacturaid;
            this.AMIBOGCXCFacturaDetalleRow = json.AMIBOGCXCFacturaDetalleRow;
            this.AMIBOGCXC_FacturaDetalles_Comp =  json.AMIBOGCXC_FacturaDetalles_Comp;
            this.AMIBOGCXCFacturaDetalleCantidad = json.AMIBOGCXCFacturaDetalleCantidad;
            this.AMIBOGCXCFacturaDetalleDescripcion = json.AMIBOGCXCFacturaDetalleDescripcion;
            this.AMIBOGCXCFacturaDetalleValorUnitario = json.AMIBOGCXCFacturaDetalleValorUnitario;
            this.AMIBOGCXCFacturaDetalleValorTotal = json.AMIBOGCXCFacturaDetalleValorTotal;
        }
    }
}
