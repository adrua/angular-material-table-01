import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AMIBOGCXC_ClientesModel } from './amibogcxc.clientes.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({ providedIn: 'root' })
export class AMIBOGCXC_ClientesService {
    private AMIBOGCXC_ClientesUrl: string = '';  // URL to web api

    constructor(private http: HttpClient) {
        this.AMIBOGCXC_ClientesUrl = `${environment.dataServiceUrl}/AMIBOGCXC_ClientesDataServices_5005_AMIBOG`;
    }

    getAMIBOGCXC_Clientes(row: AMIBOGCXC_ClientesModel): Observable<{}|AMIBOGCXC_ClientesModel> {
        let params: HttpParams = new HttpParams();
        params.set('Compania', row.Compania.toString());
        params.set('ClienteAMIBOGCXCId', row.ClienteAMIBOGCXCId.toString());

        return this.http.get<AMIBOGCXC_ClientesModel>(this.AMIBOGCXC_ClientesUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched AMIBOGCXC_Clientes')),
            catchError(this.handleError('getAMIBOGCXC_Clientes', []))
        );
    }

    getAMIBOGCXC_ClientesList(val: string, pageSize: number): Observable<AMIBOGCXC_ClientesModel[]> {
        let params: HttpParams = new HttpParams();
        params.set('term', val);
        params.set('pageSize', pageSize.toString());

        let sUrl = `${this.AMIBOGCXC_ClientesUrl}/Search/${val || ''}`;

        return this.http.get<AMIBOGCXC_ClientesModel[]>(sUrl, {params: params}).pipe(
            retry(3),
            tap(row => this.log('fetched AMIBOGCXC_Clientes')),
            catchError(this.handleError('getAMIBOGCXC_ClientesList', []))
        );
    }

    addAMIBOGCXC_Clientes(row: AMIBOGCXC_ClientesModel): Observable<AMIBOGCXC_ClientesModel> {
        return this.http.post<AMIBOGCXC_ClientesModel>(`${this.AMIBOGCXC_ClientesUrl}/add`, row, httpOptions).pipe(
            retry(3),
            tap((row: AMIBOGCXC_ClientesModel) => this.log(`added AMIBOGCXC_Clientes w/ id=${row.ClienteAMIBOGCXCId}`)),
            catchError(this.handleError<AMIBOGCXC_ClientesModel>('addAMIBOGCXC_Clientes'))
        );
    }

    updateAMIBOGCXC_Clientes(row: AMIBOGCXC_ClientesModel): Observable<AMIBOGCXC_ClientesModel> {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
        
        let sUrl = `${this.AMIBOGCXC_ClientesUrl}/update/${row._id}`;
        return this.http.put<AMIBOGCXC_ClientesModel>(sUrl, row, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`update AMIBOGCXC_Clientes id=${row.ClienteAMIBOGCXCId}`)),
            catchError(this.handleError<any>('updateAMIBOGCXC_Clientes'))
        );
    }

    saveAMIBOGCXC_Clientes(row: AMIBOGCXC_ClientesModel): Observable<AMIBOGCXC_ClientesModel> {
        if (row.Estado === 'N') {
            return this.addAMIBOGCXC_Clientes(row);
        } else {
            return this.updateAMIBOGCXC_Clientes(row);
        }
    }

    deleteAMIBOGCXC_Clientes(row: AMIBOGCXC_ClientesModel): Observable<AMIBOGCXC_ClientesModel | {}> {
        let sUrl = `${this.AMIBOGCXC_ClientesUrl}/delete/${row._id}`;

        return this.http.delete(sUrl, httpOptions).pipe(
            retry(3),
            tap(_ => this.log(`filter AMIBOGCXC_Clientes id=${row.ClienteAMIBOGCXCId}`)),
            catchError(this.handleError<AMIBOGCXC_ClientesModel>('deleteAMIBOGCXC_Clientes'))
        );
    }
  
    filterCiudadNombreCiudad(val: string): Observable<any> {
        let sUrl = `${this.AMIBOGCXC_ClientesUrl}/CNT_Ciudades/0`;
        let params = { term: (val)?val:''};
        
        return this.http.get<any>(sUrl, {params: params}).pipe(
            retry(3),
            tap(_ => this.log(`filter AMIBOGCXC_Clientes id=${val}`)),
            catchError(this.handleError<AMIBOGCXC_ClientesModel>('filterAMIBOGCXC_Clientes'))
        );
    }

    filterCodigoCiiuDescripcion(val: string): Observable<any> {
        let sUrl = `${this.AMIBOGCXC_ClientesUrl}/CNT_CodigosCiiu/0`;
        let params = { term: (val)?val:''};
        
        return this.http.get<any>(sUrl, {params: params}).pipe(
            retry(3),
            tap(_ => this.log(`filter AMIBOGCXC_Clientes id=${val}`)),
            catchError(this.handleError<AMIBOGCXC_ClientesModel>('filterAMIBOGCXC_Clientes'))
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

    /** Log a AMIBOGCXC_ClientesService message with the MessageService */
    private log(message: string) {
        //this.messageService.add(`AMIBOGCXC_ClientesService: ${message}`);
        console.log(`AMIBOGCXC_ClientesService: ${message}`);
    }

}
