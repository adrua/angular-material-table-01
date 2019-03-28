import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { CECA_Clientes_Dialog } from './ceca.clientes.dialog';
import { CECA_ClientesService } from './ceca.clientes.service';
import { CECA_ClientesModel } from './ceca.clientes.model';

export const CONDITIONS_LIST = [
  { value: "nono", label: "Nono" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
  { value: "is-equal", label: "Is equal" },
  { value: "is-not-equal", label: "Is not equal" }
];

export const CONDITIONS_FUNCTIONS = { // search method base on conditions list value
  "is-empty": function (value, filterdValue) {
    return value === "";
  },
  "is-not-empty": function (value, filterdValue) {
    return value !== "";
  },
  "is-equal": function (value, filterdValue) {
    return value == filterdValue;
  },
  "is-not-equal": function (value, filterdValue) {
    return value != filterdValue;
  }
};

@Component({
  selector: 'ceca-clientes-table',
  templateUrl: './ceca.clientes.table.html',
  // styleUrls: ['./ceca.clientes.table.css'],
  providers: [CECA_ClientesService]
})
export class CECA_Clientes_Table implements AfterViewInit  {
    rows: CECA_ClientesModel[] = [];
    selectedRow: CECA_ClientesModel;
    
    public displayedColumns: string[] = ['CECAClienteCodigoNuevo', 'CECAClienteViejo', 'CECAClienteNoCedula', 'CECAClienteRelacionActual', 'CECAClienteTitulo', 'CECAClienteProvincia', 'CECAClientePrimerApellido', 'CECAClienteCanton', 'CECAClienteSegundoApellido', 'CECAClienteDistrito', 'CECAClienteNombre', 'CECAClienteTipoCuenta', 'CECAClienteRepresentante', 'CECAClienteCuentaPrincipal', 'CECAClienteFechaNacimiento', 'CECAClienteDireccionPostal', 'CECAClienteTelefono', 'CECAClienteTipo', 'CECAClienteRecibidor', 'CECAClienteCuentaCongelada', 'CECAClientePromotor', 'CECAClienteZona', 'CECAClienteSobregiro', 'CECAClienteReservado', 'CECAClienteCobroJudicial', 'CECAClienteEmbargado', 'CECAClientePagaSubflete', 'CECAClienteRepelaPermitida'];

    public conditionsList = CONDITIONS_LIST;
    public searchValue: any = {};
    public searchCondition: any = {};
    private _filterMethods = CONDITIONS_FUNCTIONS;

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    _proc: boolean = false;
    _status: boolean = false;

    _pageSize: number = 10;

    constructor(private translate: TranslateService,
                public dialog: MatDialog,
                private CECA_ClientesService: CECA_ClientesService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('es');
 
         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('es');
    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        
        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.CECA_ClientesService.getCECA_ClientesList("", this._pageSize);
            }),
            map(data => {
              // Flip flag to show that loading has finished.
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = this.rows.length;
        
              return data;
            }),
            catchError(() => {
              this.isLoadingResults = false;
              // Catch if the API has reached its rate limit. Return empty data.
              this.isRateLimitReached = true;
              return observableOf([]);
            })
          ).subscribe(data => this.rows = data);
    }

    add(): void {
      this.selectedRow = new CECA_ClientesModel();
      this.rows.push(this.selectedRow);
      this.openDialog();
    }

    edit(): void {
      if(this.selectedRow) {
        this.openDialog();
      }
    }

    refresh() {
      this.ngAfterViewInit();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CECA_Clientes_Dialog, {
          data: this.selectedRow
        });
        
        dialogRef.afterClosed().subscribe(result => {
          this.selectedRow = result;
        });
    }

    onSelect(event, row: CECA_ClientesModel) {
        this.selectedRow = row;
        this.openDialog();
    }

}
