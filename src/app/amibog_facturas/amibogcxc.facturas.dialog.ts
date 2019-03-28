import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map, switchMap, startWith} from 'rxjs/operators';

import { AMIBOGCXC_FacturasService } from './amibogcxc.facturas.service';
import { AMIBOGCXC_FacturasModel } from './amibogcxc.facturas.model';
//import { AMIBOGCXCFacturaDetallesComponent } from './amibogcxc.facturadetalles';

@Component({
  templateUrl: './amibogcxc.facturas.dialog.html',
  // styleUrls: ['./amibogcxc.facturas.dialog.css'],
  providers: [AMIBOGCXC_FacturasService]
})
export class AMIBOGCXC_Facturas_Dialog {
    rows: AMIBOGCXC_FacturasModel[] = [];
    AMIBOGCXC_FacturasForm: FormGroup;

    selectedAMIBOGCXC_Facturas: AMIBOGCXC_FacturasModel = new AMIBOGCXC_FacturasModel();

    ClienteAMIBOGCXCRazonSocialCtrl: FormControl = new FormControl();
    filteredClienteAMIBOGCXCRazonSocial: Array<any> = [];

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private translate: TranslateService,    
                private AMIBOGCXC_FacturasService: AMIBOGCXC_FacturasService,
                public dialogRef: MatDialogRef<AMIBOGCXC_Facturas_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: AMIBOGCXC_FacturasModel) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');
 
         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('es');


        this.selectedAMIBOGCXC_Facturas = data;
    }

    ngOnInit() {
        this.AMIBOGCXC_FacturasForm = this.builder.group({
            'Compania': [ this.selectedAMIBOGCXC_Facturas.Compania || 1 ],        
            'AMIBOGCXCFacturaid': [ this.selectedAMIBOGCXC_Facturas.AMIBOGCXCFacturaid || '0', Validators.required ],
            'AMIBOGCXCFacturaFecha': [ this.selectedAMIBOGCXC_Facturas.AMIBOGCXCFacturaFecha || '', Validators.required ],
            'ClienteAMIBOGCXCId': [ this.selectedAMIBOGCXC_Facturas.ClienteAMIBOGCXCId || '0', Validators.required ],
            'AMIBOGCXCFacturaFormaPago': [ this.selectedAMIBOGCXC_Facturas.AMIBOGCXCFacturaFormaPago || 'CO', Validators.required ],
            'AMIBOGCXCFacturaSubTotal': [ this.selectedAMIBOGCXC_Facturas.AMIBOGCXCFacturaSubTotal || '0' ],
            'AMIBOGCXCFacturaIva': [ this.selectedAMIBOGCXC_Facturas.AMIBOGCXCFacturaIva || '0' ],
            'AMIBOGCXCFacturaTotal': [ this.selectedAMIBOGCXC_Facturas.AMIBOGCXCFacturaTotal || '0' ],
            'AMIBOGCXCFacturaDescuento': [ this.selectedAMIBOGCXC_Facturas.AMIBOGCXCFacturaDescuento || '0.0' ],
            'AMIBOGCXCFacturaObservaciones': [ this.selectedAMIBOGCXC_Facturas.AMIBOGCXCFacturaObservaciones || '' ],
            'Estado': [ this.selectedAMIBOGCXC_Facturas.Estado, Validators.required ]
        });

        this.ClienteAMIBOGCXCRazonSocialCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.AMIBOGCXC_FacturasService.filterClienteAMIBOGCXCRazonSocial(data))
            ).subscribe((data) => this.filteredClienteAMIBOGCXCRazonSocial = data);

    }

    onSelect(event, row: AMIBOGCXC_FacturasModel) {
        this.selectedAMIBOGCXC_Facturas = row;
    }

    onSubmit(formData) {
        this._proc = true;
        if (this.AMIBOGCXC_FacturasForm.valid) {
            this.AMIBOGCXC_FacturasService.saveAMIBOGCXC_Facturas(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = !!data.error;
                this.resultError = null;

                if(!this._status) {
                    this.dialogRef.close({ 
                        data: formData          
                    });
                } else {
                  this.resultError = data.error.map((x) => x.Message).join('');  
                }
            });

        }
    }
    
    selectClienteAMIBOGCXCRazonSocial(opt: any){
        this.selectedAMIBOGCXC_Facturas.ClienteAMIBOGCXCId = opt.ClienteAMIBOGCXCId;
    }
    
}
