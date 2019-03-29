import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { AMIBOGCXC_FacturaDetallesService } from './amibogcxc.facturadetalles.service';
import { AMIBOGCXC_FacturaDetallesModel } from './amibogcxc.facturadetalles.model';

@Component({
  templateUrl: './amibogcxc.facturadetalles.dialog.html',
  // styleUrls: ['./amibogcxc.facturadetalles.dialog.css'],
  providers: [AMIBOGCXC_FacturaDetallesService]
})
export class AMIBOGCXC_FacturaDetalles_Dialog {
    AMIBOGCXC_FacturaDetallesForm: FormGroup;

    selectedAMIBOGCXC_FacturaDetalles: AMIBOGCXC_FacturaDetallesModel;

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private translate: TranslateService,    
                private AMIBOGCXC_FacturaDetallesService: AMIBOGCXC_FacturaDetallesService,
                public dialogRef: MatDialogRef<AMIBOGCXC_FacturaDetalles_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: AMIBOGCXC_FacturaDetallesModel) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');
 
         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('es');
        //this.selectedAMIBOGCXCFacturas = navParams.get('AMIBOGCXCFacturas');


        this.selectedAMIBOGCXC_FacturaDetalles = data;
    }

    ngOnInit() {
        this.AMIBOGCXC_FacturaDetallesForm = this.builder.group({
            'Compania': [ this.selectedAMIBOGCXC_FacturaDetalles.Compania || 1 ],        
            'AMIBOGCXCFacturaid': [ this.selectedAMIBOGCXC_FacturaDetalles.AMIBOGCXCFacturaid || '0', Validators.required ],
            'AMIBOGCXCFacturaDetalleRow': [ this.selectedAMIBOGCXC_FacturaDetalles.AMIBOGCXCFacturaDetalleRow || '0', Validators.required ],
            'AMIBOGCXCFacturaDetalleCantidad': [ this.selectedAMIBOGCXC_FacturaDetalles.AMIBOGCXCFacturaDetalleCantidad || '1', Validators.required ],
            'AMIBOGCXCFacturaDetalleDescripcion': [ this.selectedAMIBOGCXC_FacturaDetalles.AMIBOGCXCFacturaDetalleDescripcion || '', Validators.required ],
            'AMIBOGCXCFacturaDetalleValorUnitario': [ this.selectedAMIBOGCXC_FacturaDetalles.AMIBOGCXCFacturaDetalleValorUnitario || '0', Validators.required ],
            'AMIBOGCXCFacturaDetalleValorTotal': [ this.selectedAMIBOGCXC_FacturaDetalles.AMIBOGCXCFacturaDetalleValorTotal || '0' ],
            'Estado': [ this.selectedAMIBOGCXC_FacturaDetalles.Estado, Validators.required ]
        });

    }

    onSelect(event, row: AMIBOGCXC_FacturaDetallesModel) {
        this.selectedAMIBOGCXC_FacturaDetalles = row;
    }

    onSubmit(formData: AMIBOGCXC_FacturaDetallesModel) {
        this._proc = true;
        if (this.AMIBOGCXC_FacturaDetallesForm.valid) {
            this.AMIBOGCXC_FacturaDetallesService.saveAMIBOGCXC_FacturaDetalles(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = !!data.error;
                this.resultError = null;

                if(!this._status) {
                    this.dialogRef.close({ 
                        data: this.selectedAMIBOGCXC_FacturaDetalles          
                    });
                } else {
                  this.resultError = data.error.map((x) => x.Message).join('');  
                }
            });

        }
    }
    
}
