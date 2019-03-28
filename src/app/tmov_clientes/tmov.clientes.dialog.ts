import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map, switchMap, startWith} from 'rxjs/operators';

import { TMOV_ClientesService } from './tmov.clientes.service';
import { TMOV_ClientesModel } from './tmov.clientes.model';

@Component({
  templateUrl: './tmov.clientes.dialog.html',
  styleUrls: ['./tmov.clientes.dialog.css'],
  providers: [TMOV_ClientesService]
})
export class TMOV_Clientes_Dialog {
    rows: TMOV_ClientesModel[] = [];
    TMOV_ClientesForm: FormGroup;

    selectedTMOV_Clientes: TMOV_ClientesModel = new TMOV_ClientesModel();

    GOVCOPaisNombreCtrl: FormControl = new FormControl();
    filteredGOVCOPaisNombre: Array<any> = [];

    _proc: boolean = false;
    _status: boolean = false;

    constructor(private builder: FormBuilder,
                private translate: TranslateService,    
                private TMOV_ClientesService: TMOV_ClientesService,
                public dialogRef: MatDialogRef<TMOV_Clientes_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: TMOV_ClientesModel) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');
 
         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('es');


        this.selectedTMOV_Clientes = data;
    }

    ngOnInit() {
        this.TMOV_ClientesForm = this.builder.group({
            'TMOVClienteTipoDocumento': [ this.selectedTMOV_Clientes.TMOVClienteTipoDocumento || 'CC', Validators.required ],
            'TMOVClienteNumeroDocumento': [ this.selectedTMOV_Clientes.TMOVClienteNumeroDocumento || '0', Validators.required ],
            'TMOVClienteFecha': [ this.selectedTMOV_Clientes.TMOVClienteFecha || '', Validators.required ],
            'TMOVClienteNombres': [ this.selectedTMOV_Clientes.TMOVClienteNombres || '', Validators.required ],
            'TMOVClienteApellidos': [ this.selectedTMOV_Clientes.TMOVClienteApellidos || '', Validators.required ],
            'TMOVClienteNombreCompleto': [ this.selectedTMOV_Clientes.TMOVClienteNombreCompleto || '' ],
            'TMOVClienteSexo': [ this.selectedTMOV_Clientes.TMOVClienteSexo || 'M', Validators.required ],
            'TMOVClienteFechaNacimiento': [ this.selectedTMOV_Clientes.TMOVClienteFechaNacimiento || '', Validators.required ],
            'GOVCOPaisId': [ this.selectedTMOV_Clientes.GOVCOPaisId || '', Validators.required ],
            'TMOVClienteTelefono': [ this.selectedTMOV_Clientes.TMOVClienteTelefono || '', Validators.required ],
            'TMOVClienteCelular': [ this.selectedTMOV_Clientes.TMOVClienteCelular || '', Validators.required ],
            'TMOVClienteEmail': [ this.selectedTMOV_Clientes.TMOVClienteEmail || '', Validators.required ],
            'TMOVClienteEmailAlternativo': [ this.selectedTMOV_Clientes.TMOVClienteEmailAlternativo || '', Validators.required ],
            'TMOVClienteOcupacion': [ this.selectedTMOV_Clientes.TMOVClienteOcupacion || '', Validators.required ],
            'TMOVClientePaisResidencia': [ this.selectedTMOV_Clientes.TMOVClientePaisResidencia || '', Validators.required ],
            'TMOVClienteEstado': [ this.selectedTMOV_Clientes.TMOVClienteEstado || 'AC', Validators.required ],
            'Estado': [ this.selectedTMOV_Clientes.Estado, Validators.required ]
        });

        this.GOVCOPaisNombreCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.TMOV_ClientesService.filterGOVCOPaisNombre(data))
            ).subscribe((data) => this.filteredGOVCOPaisNombre = data);

    }

    onSelect(event, row: TMOV_ClientesModel) {
        this.selectedTMOV_Clientes = row;
    }

    onSubmit(formData) {
        this._proc = true;
        if (this.TMOV_ClientesForm.valid) {
            this.TMOV_ClientesService.saveTMOV_Clientes(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = data.result;
    
                this.dialogRef.close({ 
                    TMOV_Clientes: this.selectedTMOV_Clientes          
                });
            })/*.catch((reason) => {
                this._proc = false;
                console.log(reason)
            })*/;

        }
    }
    
    selectGOVCOPaisNombre(opt: any){
        this.selectedTMOV_Clientes.GOVCOPaisId = opt.GOVCOPaisId;
    }
    
}
