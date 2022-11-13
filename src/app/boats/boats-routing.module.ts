import { RouterModule, Routes } from '@angular/router';

import { AddBoatComponent } from './add-boat/add-boat.component';
import { AuthServiceGuard } from '../cores/services/auth-service.guard';
import { BoatTableComponent } from './boat-table/boat-table.component';
import { NgModule } from '@angular/core';
import { UpdateBoatComponent } from './update-boat/update-boat.component';

const routes: Routes = [
  {
    path:'',
    component: BoatTableComponent,
    canActivate: [AuthServiceGuard],
  },
  {
    path:'add',
    component: AddBoatComponent,
    canActivate: [AuthServiceGuard],
  },
  {
    path:'update/:id',
    component:UpdateBoatComponent,
    canActivate: [AuthServiceGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoatsRoutingModule { }
