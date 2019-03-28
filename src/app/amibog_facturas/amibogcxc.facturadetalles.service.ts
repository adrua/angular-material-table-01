import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AMIBOGCXC_FacturaDetallesModel } from './amibogcxc.facturadetalles.model';
import { AMIBOGCXC_FacturasModel } from './amibogcxc.facturas.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class AMIBOGCXC_FacturaDetallesService {
    private AMIBOGCXC_FacturaDetallesUrl: string = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.AMIBOGCXC_FacturaDetallesUrl = `${environment.dataServiceUrl}/AMIBOGCXC_FacturasDataServices_5015_AMIBOG/AMIBOGCXC_FacturaDetallesDataServices_5015_AMIBOG`;
    }

    getAMIBOGCXC_FacturaDetalles(row: AMIBOGCXC_FacturasModel): Observable<{}|AMIBOGCXC_FacturaDetallesModel> {
        let params = `Compania=${row.Compania}&AMIBOGCXCFacturaid=${row.AMIBOGCXCFacturaid}`;

        return this.http.get<AMIBOGCXC_FacturaDetallesModel>(this.AMIBOGCXC_FacturaDetallesUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched AMIBOGCXC_FacturaDetalles')),
            catchError((error) => this.handleError('getAMIBOGCXC_FacturaDetalles', error))
        );
    }

    getAMIBOGCXC_FacturaDetallesList(val: string, pageSize: number): Observable<AMIBOGCXC_FacturaDetallesModel[]> {
        let params = `term=${val}&pageSize=${pageSize}`;

        let sUrl = `${this.AMIBOGCXC_FacturaDetallesUrl}/Search/0`;

        return this.http.get<AMIBOGCXC_FacturaDetallesModel[]>(sUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched AMIBOGCXC_FacturaDetalles')),
            catchError((error) => this.handleError('getAMIBOGCXC_FacturaDetallesList', error))
        );
    }

    addAMIBOGCXC_FacturaDetalles(mrow: AMIBOGCXC_FacturasModel, row: AMIBOGCXC_FacturaDetallesModel): Observable<AMIBOGCXC_FacturaDetallesModel> {
        let sUrl = `${this.AMIBOGCXC_FacturaDetallesUrl}/add/0`;
        return this.http.post<AMIBOGCXC_FacturaDetallesModel>(sUrl, row, httpOptions).pipe(
            retry(3),
            tap((row: AMIBOGCXC_FacturaDetallesModel) => this.log(`added AMIBOGCXC_FacturaDetalles w/ id=${row.AMIBOGCXCFacturaid}`)),
            catchError((error) => this.handleError('addAMIBOGCXC_FacturaDetalles', error))
        );
    }

    updateAMIBOGCXC_FacturaDetalles(row: AMIBOGCXC_FacturaDetallesModel): Observable<AMIBOGCXC_FacturaDetallesModel> {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
        
        let sUrl = `${this.AMIBOGCXC_FacturaDetallesUrl}/update/0`;
        return this.http.post<AMIBOGCXC_FacturaDetallesModel>(sUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update AMIBOGCXC_FacturaDetalles id=${row.AMIBOGCXCFacturaid}`)),
            catchError((error) => this.handleError('updateAMIBOGCXC_FacturaDetalles', error))
        );
    }

    saveAMIBOGCXC_FacturaDetalles(mrow: AMIBOGCXC_FacturasModel, row: AMIBOGCXC_FacturaDetallesModel): Observable<AMIBOGCXC_FacturaDetallesModel> {
        if (row.Estado === 'N') {
            return this.addAMIBOGCXC_FacturaDetalles(mrow, row);
        } else {
            return this.updateAMIBOGCXC_FacturaDetalles(row);
        }
    }

    deleteAMIBOGCXC_FacturaDetalles(row: AMIBOGCXC_FacturaDetallesModel): Observable<AMIBOGCXC_FacturaDetallesModel | {}> {
        let sUrl = `${this.AMIBOGCXC_FacturaDetallesUrl}/delete/0`;

        return this.http.post(sUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter AMIBOGCXC_FacturaDetalles id=${row.AMIBOGCXCFacturaid}`)),
            catchError((error) => this.handleError('deleteAMIBOGCXC_FacturaDetalles', error))
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

    /** Log a AMIBOGCXC_FacturaDetallesService message with the MessageService */
    private log(message: string) {
        //this.messageService.add(`AMIBOGCXC_FacturaDetallesService: ${message}`);
        console.log(`AMIBOGCXC_FacturaDetallesService: ${message}`);
    }

}
