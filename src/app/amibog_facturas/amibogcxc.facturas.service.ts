import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AMIBOGCXC_FacturasModel } from './amibogcxc.facturas.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class AMIBOGCXC_FacturasService {
    private AMIBOGCXC_FacturasUrl: string = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.AMIBOGCXC_FacturasUrl = `${environment.dataServiceUrl}/AMIBOGCXC_FacturasDataServices_5015_AMIBOG`;
    }

    getAMIBOGCXC_Facturas(row: AMIBOGCXC_FacturasModel): Observable<{}|AMIBOGCXC_FacturasModel> {
        let params = `Compania=${row.Compania}&AMIBOGCXCFacturaid=${row.AMIBOGCXCFacturaid}`;

        return this.http.get<AMIBOGCXC_FacturasModel>(this.AMIBOGCXC_FacturasUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched AMIBOGCXC_Facturas')),
            catchError((error) => this.handleError('getAMIBOGCXC_Facturas', error))
        );
    }

    getAMIBOGCXC_FacturasList(val: string, pageSize: number): Observable<AMIBOGCXC_FacturasModel[]> {
        let params = `term=${val}&pageSize=${pageSize}`;

        let sUrl = `${this.AMIBOGCXC_FacturasUrl}/Search/0`;

        return this.http.get<AMIBOGCXC_FacturasModel[]>(sUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched AMIBOGCXC_Facturas')),
            catchError((error) => this.handleError('getAMIBOGCXC_FacturasList', error))
        );
    }

    addAMIBOGCXC_Facturas(row: AMIBOGCXC_FacturasModel): Observable<AMIBOGCXC_FacturasModel> {
        let sUrl = `${this.AMIBOGCXC_FacturasUrl}/add/0`;
        return this.http.post<AMIBOGCXC_FacturasModel>(sUrl, row, httpOptions).pipe(
            retry(3),
            tap((row: AMIBOGCXC_FacturasModel) => this.log(`added AMIBOGCXC_Facturas w/ id=${row.AMIBOGCXCFacturaid}`)),
            catchError((error) => this.handleError('addAMIBOGCXC_Facturas', error))
        );
    }

    updateAMIBOGCXC_Facturas(row: AMIBOGCXC_FacturasModel): Observable<AMIBOGCXC_FacturasModel> {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
        
        let sUrl = `${this.AMIBOGCXC_FacturasUrl}/update/0`;
        return this.http.post<AMIBOGCXC_FacturasModel>(sUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update AMIBOGCXC_Facturas id=${row.AMIBOGCXCFacturaid}`)),
            catchError((error) => this.handleError('updateAMIBOGCXC_Facturas', error))
        );
    }

    saveAMIBOGCXC_Facturas(row: AMIBOGCXC_FacturasModel): Observable<AMIBOGCXC_FacturasModel> {
        if (row.Estado === 'N') {
            return this.addAMIBOGCXC_Facturas(row);
        } else {
            return this.updateAMIBOGCXC_Facturas(row);
        }
    }

    deleteAMIBOGCXC_Facturas(row: AMIBOGCXC_FacturasModel): Observable<AMIBOGCXC_FacturasModel | {}> {
        let sUrl = `${this.AMIBOGCXC_FacturasUrl}/delete/0`;

        return this.http.post(sUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter AMIBOGCXC_Facturas id=${row.AMIBOGCXCFacturaid}`)),
            catchError((error) => this.handleError('deleteAMIBOGCXC_Facturas', error))
        );
    }
  
    filterClienteAMIBOGCXCRazonSocial(val: string): Observable<any> {
        let sUrl = `${this.AMIBOGCXC_FacturasUrl}/AMIBOGCXC_Clientes/0`;
        let params = { term: (val)?val:''};
        
        return this.http.get<any>(sUrl, {params: params}).pipe(
            retry(3),
            tap(_ => this.log(`filter AMIBOGCXC_Facturas id=${val}`)),
            catchError((error) => this.handleError('filterAMIBOGCXC_Facturas', error))
        );
    }


    private handleError(operation = 'operation', result?: any) {
        
          // TODO: send the error to remote logging infrastructure
          console.error(result.error); // log to console instead
        
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${result.message}`);
        
          // Let the app keep running by returning an empty result.
          return of(result);
    }

    /** Log a AMIBOGCXC_FacturasService message with the MessageService */
    private log(message: string) {
        //this.messageService.add(`AMIBOGCXC_FacturasService: ${message}`);
        console.log(`AMIBOGCXC_FacturasService: ${message}`);
    }

}
