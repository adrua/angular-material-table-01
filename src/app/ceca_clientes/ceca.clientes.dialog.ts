import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map, switchMap, startWith} from 'rxjs/operators';

import { CECA_ClientesService } from './ceca.clientes.service';
import { CECA_ClientesModel } from './ceca.clientes.model';

@Component({
  templateUrl: './ceca.clientes.dialog.html',
  // styleUrls: ['./ceca.clientes.dialog.css'],
  providers: [CECA_ClientesService]
})
export class CECA_Clientes_Dialog {
    rows: CECA_ClientesModel[] = [];
    CECA_ClientesForm: FormGroup;

    selectedCECA_Clientes: CECA_ClientesModel = new CECA_ClientesModel();

    _proc: boolean = false;
    _status: boolean = false;
    resultError: string = null;

    constructor(private builder: FormBuilder,
                private translate: TranslateService,    
                private CECA_ClientesService: CECA_ClientesService,
                public dialogRef: MatDialogRef<CECA_Clientes_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: CECA_ClientesModel) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');
 
         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('es');


        this.selectedCECA_Clientes = data;
    }

    ngOnInit() {
        this.CECA_ClientesForm = this.builder.group({
            'Compania': [ this.selectedCECA_Clientes.Compania || 1 ],        
            'CECAClienteCodigoNuevo': [ this.selectedCECA_Clientes.CECAClienteCodigoNuevo || '0', Validators.required ],
            'CECAClienteViejo': [ this.selectedCECA_Clientes.CECAClienteViejo || '0', Validators.required ],
            'CECAClienteNoCedula': [ this.selectedCECA_Clientes.CECAClienteNoCedula || '0', Validators.required ],
            'CECAClienteRelacionActual': [ this.selectedCECA_Clientes.CECAClienteRelacionActual || '', Validators.required ],
            'CECAClienteTitulo': [ this.selectedCECA_Clientes.CECAClienteTitulo || '', Validators.required ],
            'CECAClienteProvincia': [ this.selectedCECA_Clientes.CECAClienteProvincia || '', Validators.required ],
            'CECAClientePrimerApellido': [ this.selectedCECA_Clientes.CECAClientePrimerApellido || '', Validators.required ],
            'CECAClienteCanton': [ this.selectedCECA_Clientes.CECAClienteCanton || '', Validators.required ],
            'CECAClienteSegundoApellido': [ this.selectedCECA_Clientes.CECAClienteSegundoApellido || '', Validators.required ],
            'CECAClienteDistrito': [ this.selectedCECA_Clientes.CECAClienteDistrito || '', Validators.required ],
            'CECAClienteNombre': [ this.selectedCECA_Clientes.CECAClienteNombre || '', Validators.required ],
            'CECAClienteTipoCuenta': [ this.selectedCECA_Clientes.CECAClienteTipoCuenta || 'CC', Validators.required ],
            'CECAClienteRepresentante': [ this.selectedCECA_Clientes.CECAClienteRepresentante || '', Validators.required ],
            'CECAClienteCuentaPrincipal': [ this.selectedCECA_Clientes.CECAClienteCuentaPrincipal || '', Validators.required ],
            'CECAClienteFechaNacimiento': [ this.selectedCECA_Clientes.CECAClienteFechaNacimiento || '', Validators.required ],
            'CECAClienteDireccionPostal': [ this.selectedCECA_Clientes.CECAClienteDireccionPostal || '', Validators.required ],
            'CECAClienteTelefono': [ this.selectedCECA_Clientes.CECAClienteTelefono || '', Validators.required ],
            'CECAClienteTipo': [ this.selectedCECA_Clientes.CECAClienteTipo || '', Validators.required ],
            'CECAClienteRecibidor': [ this.selectedCECA_Clientes.CECAClienteRecibidor || '', Validators.required ],
            'CECAClienteCuentaCongelada': [ this.selectedCECA_Clientes.CECAClienteCuentaCongelada || '0', Validators.required ],
            'CECAClientePromotor': [ this.selectedCECA_Clientes.CECAClientePromotor || '', Validators.required ],
            'CECAClienteZona': [ this.selectedCECA_Clientes.CECAClienteZona || '', Validators.required ],
            'CECAClienteSobregiro': [ this.selectedCECA_Clientes.CECAClienteSobregiro || '0', Validators.required ],
            'CECAClienteReservado': [ this.selectedCECA_Clientes.CECAClienteReservado || '0', Validators.required ],
            'CECAClienteCobroJudicial': [ this.selectedCECA_Clientes.CECAClienteCobroJudicial || '0', Validators.required ],
            'CECAClienteEmbargado': [ this.selectedCECA_Clientes.CECAClienteEmbargado || '0', Validators.required ],
            'CECAClientePagaSubflete': [ this.selectedCECA_Clientes.CECAClientePagaSubflete || '0', Validators.required ],
            'CECAClienteRepelaPermitida': [ this.selectedCECA_Clientes.CECAClienteRepelaPermitida || '0', Validators.required ],
            'Estado': [ this.selectedCECA_Clientes.Estado, Validators.required ]
        });

    }

    onSelect(event, row: CECA_ClientesModel) {
        this.selectedCECA_Clientes = row;
    }

    onSubmit(formData) {
        this._proc = true;
        if (this.CECA_ClientesForm.valid) {
            this.CECA_ClientesService.saveCECA_Clientes(formData).subscribe((data: any) => {
                this._proc = false;
                this.resultError = null;
                this._status = data.error;
                if(!this._status) {
                  this.dialogRef.close({ 
                      data: this.selectedCECA_Clientes          
                  });
                } else {
                  this.resultError = data.error.map((x) => x.Message).join('\n');  
                }

            })
        }
    }
    
}
