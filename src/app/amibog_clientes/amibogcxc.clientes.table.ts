import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { AMIBOGCXC_Clientes_Dialog } from './amibogcxc.clientes.dialog';
import { AMIBOGCXC_ClientesService } from './amibogcxc.clientes.service';
import { AMIBOGCXC_ClientesModel } from './amibogcxc.clientes.model';

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
  selector: 'amibogcxc-clientes-table',
  templateUrl: './amibogcxc.clientes.table.html',
  styleUrls: ['./amibogcxc.clientes.table.css'],
  providers: [AMIBOGCXC_ClientesService]
})
export class AMIBOGCXC_Clientes_Table implements AfterViewInit  {
    rows: AMIBOGCXC_ClientesModel[] = [];
    selectedRow: AMIBOGCXC_ClientesModel;
    
    public displayedColumns: string[] = ['ClienteAMIBOGCXCId', 'ClienteAMIBOGCXCTipoId', 'ClienteAMIBOGCXCIdTributario', 'ClienteAMIBOGCXCRazonSocial', 'ClienteAMIBOGCXCPrimerApellido', 'ClienteAMIBOGCXCSegundoApellido', 'ClienteAMIBOGCXCPrimerNombre', 'ClienteAMIBOGCXCSegundoNombre', 'ClienteAMIBOGCXCDireccion', 'CiudadDepartamentoId', 'Ciudadid', 'CodigoCiiuId', 'ClienteAMIBOGCXCContactoCompras', 'ClienteAMIBOGCXCCorreoCompras', 'ClienteAMIBOGCXCContactoTesoreria', 'ClienteAMIBOGCXCCorreoTesoreria', 'ClienteAMIBOGCXCTelefono', 'ClienteAMIBOGCXCCelular', 'ClienteAMIBOGCXCDescuento'];

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
                private AMIBOGCXC_ClientesService: AMIBOGCXC_ClientesService) {
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
              return this.AMIBOGCXC_ClientesService.getAMIBOGCXC_ClientesList("", this._pageSize);
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
      this.selectedRow = new AMIBOGCXC_ClientesModel();
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
        const dialogRef = this.dialog.open(AMIBOGCXC_Clientes_Dialog, {
          data: this.selectedRow
        });
        
        dialogRef.afterClosed().subscribe(result => {
          this.selectedRow = result;
        });
    }

    onSelect(event, row: AMIBOGCXC_ClientesModel) {
        this.selectedRow = row;
        this.openDialog();
    }

}
