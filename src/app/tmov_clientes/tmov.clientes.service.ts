import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { TMOV_ClientesModel } from './tmov.clientes.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class TMOV_ClientesService {
    private TMOV_ClientesUrl: string = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.TMOV_ClientesUrl = `${environment.dataServiceUrl}/TMOV_ClientesDataServices_9010_BOLBOG`;
    }

    getTMOV_Clientes(row: TMOV_ClientesModel): Observable<{}|TMOV_ClientesModel> {
        let params: HttpParams = new HttpParams();
        params.set('Compania', row.Compania.toString());
        params.set('TMOVClienteTipoDocumento', row.TMOVClienteTipoDocumento.toString());
        params.set('TMOVClienteNumeroDocumento', row.TMOVClienteNumeroDocumento.toString());

        return this.http.get<TMOV_ClientesModel>(this.TMOV_ClientesUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched TMOV_Clientes')),
            catchError(this.handleError('getTMOV_Clientes', []))
        );
    }

    getTMOV_ClientesList(val: string, pageSize: number): Observable<TMOV_ClientesModel[]> {
        let params: HttpParams = new HttpParams();
        params.set('term', val);
        params.set('pageSize', pageSize.toString());

        let sUrl = `${this.TMOV_ClientesUrl}/Search/${val || ''}`;

        return this.http.get<TMOV_ClientesModel[]>(sUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched TMOV_Clientes')),
            catchError(this.handleError('getTMOV_ClientesList', []))
        );
    }

    addTMOV_Clientes(row: TMOV_ClientesModel): Observable<TMOV_ClientesModel> {
        return this.http.post<TMOV_ClientesModel>(`${this.TMOV_ClientesUrl}/add`, row, httpOptions).pipe(
            retry(3),
            tap((row: TMOV_ClientesModel) => this.log(`added TMOV_Clientes w/ id=${row.TMOVClienteTipoDocumento}`)),
            catchError(this.handleError<TMOV_ClientesModel>('addTMOV_Clientes'))
        );
    }

    updateTMOV_Clientes(row: TMOV_ClientesModel): Observable<TMOV_ClientesModel> {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
        
        let sUrl = `${this.TMOV_ClientesUrl}/update/${row._id}`;
        return this.http.put<TMOV_ClientesModel>(sUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update TMOV_Clientes id=${row.TMOVClienteTipoDocumento}`)),
            catchError(this.handleError<any>('updateTMOV_Clientes'))
        );
    }

    saveTMOV_Clientes(row: TMOV_ClientesModel): Observable<TMOV_ClientesModel> {
        if (row.Estado === 'N') {
            return this.addTMOV_Clientes(row);
        } else {
            return this.updateTMOV_Clientes(row);
        }
    }

    deleteTMOV_Clientes(row: TMOV_ClientesModel): Observable<TMOV_ClientesModel | {}> {
        let sUrl = `${this.TMOV_ClientesUrl}/delete/${row._id}`;

        return this.http.delete(sUrl, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter TMOV_Clientes id=${row.TMOVClienteTipoDocumento}`)),
            catchError(this.handleError<TMOV_ClientesModel>('deleteTMOV_Clientes'))
        );
    }
  
    filterGOVCOPaisNombre(val: string): Observable<any> {
        let sUrl = `${this.TMOV_ClientesUrl}/GOVCO_Paises/0`;
        
        return this.http.get<any>(sUrl, { params: {term: val}}).pipe(
            retry(3),
            tap(_ => this.log(`filter TMOV_Clientes id=${val}`)),
            catchError(this.handleError<TMOV_ClientesModel>('filterTMOV_Clientes'))
        );
    }


    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
        
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
        
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }

    /** Log a TMOV_ClientesService message with the MessageService */
    private log(message: string) {
        //this.messageService.add(`TMOV_ClientesService: ${message}`);
        console.log(`TMOV_ClientesService: ${message}`);
    }

}
