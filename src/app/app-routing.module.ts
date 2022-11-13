import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'authentications/login'
  },
  {
    path:"authentications",
    loadChildren: () =>
    import('./authentications/authentications.module').then((m) => m.AuthenticationsModule),
   },
  {
    path:"boats",
    loadChildren: () =>
    import('./boats/boats.module').then((m) => m.BoatsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
