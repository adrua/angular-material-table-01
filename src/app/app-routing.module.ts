import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CECA_Clientes_Table } from './ceca_clientes/ceca.clientes.table';
import { TMOV_Clientes_Table } from './tmov_clientes/tmov.clientes.table';
import { AMIBOGCXC_Clientes_Table } from './amibog_clientes/amibogcxc.clientes.table';
import { AMIBOGCXC_Facturas_Table } from './amibog_facturas/amibogcxc.facturas.table';


//import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';

//import { AuthGuard }                          from './auth/auth.guard';
//import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
  { path: 'ceca-clientes', component: CECA_Clientes_Table },
  { path: 'tmov-clientes', component: TMOV_Clientes_Table },
  { path: 'amibog-clientes', component: AMIBOGCXC_Clientes_Table },
  { path: 'amibog-facturas', component: AMIBOGCXC_Facturas_Table },
  { path: '**',  component: AMIBOGCXC_Clientes_Table}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        //preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/