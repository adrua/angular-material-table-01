import '../polyfills';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from '../material-module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Router } from '@angular/router';

import { AppComponent }          from './app.component';

import { AMIBOGCXC_Clientes_ES } from './amibog_clientes/amibogcxc.clientes.json';
import { AMIBOGCXC_Facturas_ES } from './amibog_facturas/amibogcxc.facturas.json';
import { AMIBOGCXC_FacturaDetalles_ES } from './amibog_facturas/amibogcxc.facturadetalles.json';

import { AppRoutingModule }        from './app-routing.module';

import { CECA_Clientes_Table } from './ceca_clientes/ceca.clientes.table';
import { CECA_Clientes_Dialog } from './ceca_clientes/ceca.clientes.dialog';
import { TMOV_Clientes_Table } from './tmov_clientes/tmov.clientes.table';
import { TMOV_Clientes_Dialog } from './tmov_clientes/tmov.clientes.dialog';
import { AMIBOGCXC_Clientes_Table } from './amibog_clientes/amibogcxc.clientes.table';
import { AMIBOGCXC_Clientes_Dialog } from './amibog_clientes/amibogcxc.clientes.dialog';
import { AMIBOGCXC_Facturas_Table } from './amibog_facturas/amibogcxc.facturas.table';
import { AMIBOGCXC_Facturas_Dialog } from './amibog_facturas/amibogcxc.facturas.dialog';
import { AMIBOGCXC_FacturaDetalles_Table } from './amibog_facturas/amibogcxc.facturadetalles.table';
import { AMIBOGCXC_FacturaDetalles_Dialog } from './amibog_facturas/amibogcxc.facturadetalles.dialog';


import { environment } from '../environments/environment';

if (environment.production) {
  enableProdMode();
}

class CustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of({
      "AMIBOGCXCClientes": AMIBOGCXC_Clientes_ES,
      "AMIBOGCXCFacturas": AMIBOGCXC_Facturas_ES,
      "AMIBOGCXCFacturaDetalles": AMIBOGCXC_FacturaDetalles_ES,
      "CECAClientes" : (<any>Window).CECA_CLientes,
      "TMOVClientes" : (<any>Window).TMOV_Clientes
  });
  }
}

export function createTranslateLoader() {
  return new CustomLoader();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [AppComponent,
    CECA_Clientes_Table,
    CECA_Clientes_Dialog,
    TMOV_Clientes_Table,
    TMOV_Clientes_Dialog,
    AMIBOGCXC_Clientes_Table,
    AMIBOGCXC_Clientes_Dialog,
    AMIBOGCXC_Facturas_Table,
    AMIBOGCXC_Facturas_Dialog,
    AMIBOGCXC_FacturaDetalles_Table,
    AMIBOGCXC_FacturaDetalles_Dialog],
  declarations: [
    AppComponent,
    CECA_Clientes_Table,
    CECA_Clientes_Dialog,
    TMOV_Clientes_Table,
    TMOV_Clientes_Dialog,
    AMIBOGCXC_Clientes_Table,
    AMIBOGCXC_Clientes_Dialog,
    AMIBOGCXC_Facturas_Table,
    AMIBOGCXC_Facturas_Dialog,
    AMIBOGCXC_FacturaDetalles_Table,
    AMIBOGCXC_FacturaDetalles_Dialog
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
