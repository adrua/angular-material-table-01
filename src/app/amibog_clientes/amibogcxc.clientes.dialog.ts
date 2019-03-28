import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {map, switchMap, startWith} from 'rxjs/operators';

import { AMIBOGCXC_ClientesService } from './amibogcxc.clientes.service';
import { AMIBOGCXC_ClientesModel } from './amibogcxc.clientes.model';

@Component({
  templateUrl: './amibogcxc.clientes.dialog.html',
  styleUrls: ['./amibogcxc.clientes.dialog.css'],
  providers: [AMIBOGCXC_ClientesService]
})
export class AMIBOGCXC_Clientes_Dialog {
    rows: AMIBOGCXC_ClientesModel[] = [];
    AMIBOGCXC_ClientesForm: FormGroup;

    selectedAMIBOGCXC_Clientes: AMIBOGCXC_ClientesModel = new AMIBOGCXC_ClientesModel();

    CiudadNombreCiudadCtrl: FormControl = new FormControl();
    filteredCiudadNombreCiudad: Array<any> = [];

    CodigoCiiuDescripcionCtrl: FormControl = new FormControl();
    filteredCodigoCiiuDescripcion: Array<any> = [];

    _proc: boolean = false;
    _status: boolean = false;

    constructor(private builder: FormBuilder,
                private translate: TranslateService,    
                private AMIBOGCXC_ClientesService: AMIBOGCXC_ClientesService,
                public dialogRef: MatDialogRef<AMIBOGCXC_Clientes_Dialog>,
                @Inject(MAT_DIALOG_DATA) public data: AMIBOGCXC_ClientesModel) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');
 
         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('es');


        this.selectedAMIBOGCXC_Clientes = data;
    }

    ngOnInit() {
        this.AMIBOGCXC_ClientesForm = this.builder.group({
            'ClienteAMIBOGCXCId': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCId || '0', Validators.required ],
            'ClienteAMIBOGCXCTipoId': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCTipoId || 'NIT', Validators.required ],
            'ClienteAMIBOGCXCIdTributario': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCIdTributario || '0', Validators.required ],
            'ClienteAMIBOGCXCRazonSocial': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCRazonSocial || '', Validators.required ],
            'ClienteAMIBOGCXCPrimerApellido': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCPrimerApellido || '', Validators.required ],
            'ClienteAMIBOGCXCSegundoApellido': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCSegundoApellido || '' ],
            'ClienteAMIBOGCXCPrimerNombre': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCPrimerNombre || '', Validators.required ],
            'ClienteAMIBOGCXCSegundoNombre': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCSegundoNombre || '' ],
            'ClienteAMIBOGCXCDireccion': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCDireccion || '', Validators.required ],
            'CiudadDepartamentoId': [ this.selectedAMIBOGCXC_Clientes.CiudadDepartamentoId || '0', Validators.required ],
            'Ciudadid': [ this.selectedAMIBOGCXC_Clientes.Ciudadid || '0', Validators.required ],
            'CodigoCiiuId': [ this.selectedAMIBOGCXC_Clientes.CodigoCiiuId || '', Validators.required ],
            'ClienteAMIBOGCXCContactoCompras': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCContactoCompras || '' ],
            'ClienteAMIBOGCXCCorreoCompras': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCCorreoCompras || '' ],
            'ClienteAMIBOGCXCContactoTesoreria': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCContactoTesoreria || '' ],
            'ClienteAMIBOGCXCCorreoTesoreria': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCCorreoTesoreria || '' ],
            'ClienteAMIBOGCXCTelefono': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCTelefono || '', Validators.required ],
            'ClienteAMIBOGCXCCelular': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCCelular || '' ],
            'ClienteAMIBOGCXCDescuento': [ this.selectedAMIBOGCXC_Clientes.ClienteAMIBOGCXCDescuento || '0', Validators.required ],
            'Estado': [ this.selectedAMIBOGCXC_Clientes.Estado, Validators.required ]
        });

        this.CiudadNombreCiudadCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.AMIBOGCXC_ClientesService.filterCiudadNombreCiudad(data))
            ).subscribe((data) => this.filteredCiudadNombreCiudad = data);

        this.CodigoCiiuDescripcionCtrl.valueChanges
            .pipe(
                startWith(''),
                switchMap((data) => this.AMIBOGCXC_ClientesService.filterCodigoCiiuDescripcion(data))
            ).subscribe((data) => this.filteredCodigoCiiuDescripcion = data);

    }

    onSelect(event, row: AMIBOGCXC_ClientesModel) {
        this.selectedAMIBOGCXC_Clientes = row;
    }

    onSubmit(formData) {
        this._proc = true;
        if (this.AMIBOGCXC_ClientesForm.valid) {
            this.AMIBOGCXC_ClientesService.saveAMIBOGCXC_Clientes(formData).subscribe((data: any) => {
                this._proc = false;
                this._status = data.result;
    
                this.dialogRef.close({ 
                    AMIBOGCXC_Clientes: this.selectedAMIBOGCXC_Clientes          
                });
            })/*.catch((reason) => {
                this._proc = false;
                console.log(reason)
            })*/;

        }
    }
    
    selectCiudadNombreCiudad(opt: any){
        this.selectedAMIBOGCXC_Clientes.CiudadDepartamentoId = opt.CiudadDepartamentoId;
        this.selectedAMIBOGCXC_Clientes.Ciudadid = opt.Ciudadid;
    }
    
    selectCodigoCiiuDescripcion(opt: any){
        this.selectedAMIBOGCXC_Clientes.CodigoCiiuId = opt.CodigoCiiuId;
    }
    
}
