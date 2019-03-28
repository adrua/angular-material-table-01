import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { CECA_ClientesModel } from './ceca.clientes.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class CECA_ClientesService {
    private CECA_ClientesUrl: string = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.CECA_ClientesUrl = `${environment.dataServiceUrl}/CECA_ClientesDataServices_27650_CECA`;
    }

    getCECA_Clientes(row: CECA_ClientesModel): Observable<{}|CECA_ClientesModel> {
        let params: HttpParams = new HttpParams();
        params.set('Compania', row.Compania.toString());
        params.set('CECAClienteCodigoNuevo', row.CECAClienteCodigoNuevo.toString());

        return this.http.get<CECA_ClientesModel>(this.CECA_ClientesUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched CECA_Clientes')),
            catchError((error) => this.handleError('getCECA_Clientes', error))
        );
    }

    getCECA_ClientesList(val: string, pageSize: number): Observable<CECA_ClientesModel[]> {
        let params: HttpParams = new HttpParams();
        params.set('term', val);
        params.set('pageSize', pageSize.toString());

        let sUrl = `${this.CECA_ClientesUrl}/Search/${val || ''}`;

        return this.http.get<CECA_ClientesModel[]>(sUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched CECA_Clientes')),
            catchError((error) => this.handleError('getCECA_ClientesList', error))
        );
    }

    addCECA_Clientes(row: CECA_ClientesModel): Observable<CECA_ClientesModel> {
        let sUrl = `${this.CECA_ClientesUrl}/add/0`;
        return this.http.post<CECA_ClientesModel>(sUrl, row, httpOptions).pipe(
            retry(3),
            tap((row: CECA_ClientesModel) => this.log(`added CECA_Clientes w/ id=${row.CECAClienteCodigoNuevo}`)),
            catchError((error) => this.handleError('addCECA_Clientes', error))
        );
    }

    updateCECA_Clientes(row: CECA_ClientesModel): Observable<CECA_ClientesModel> {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
        
        let sUrl = `${this.CECA_ClientesUrl}/update/0`;
        return this.http.post<CECA_ClientesModel>(sUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update CECA_Clientes id=${row.CECAClienteCodigoNuevo}`)),
            catchError((error) => this.handleError('updateCECA_Clientes', error))
        );
    }

    saveCECA_Clientes(row: CECA_ClientesModel): Observable<CECA_ClientesModel> {
        if (row.Estado === 'N') {
            return this.addCECA_Clientes(row);
        } else {
            return this.updateCECA_Clientes(row);
        }
    }

    deleteCECA_Clientes(row: CECA_ClientesModel): Observable<CECA_ClientesModel | {}> {
        let sUrl = `${this.CECA_ClientesUrl}/delete/${row._id}`;

        return this.http.delete(sUrl, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter CECA_Clientes id=${row.CECAClienteCodigoNuevo}`)),
            catchError((error) => this.handleError('deleteCECA_Clientes', error))
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

    /** Log a CECA_ClientesService message with the MessageService */
    private log(message: string) {
        //this.messageService.add(`CECA_ClientesService: ${message}`);
        console.log(`CECA_ClientesService: ${message}`);
    }

}
