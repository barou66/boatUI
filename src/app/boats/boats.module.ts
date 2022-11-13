import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddBoatComponent } from './add-boat/add-boat.component';
import { BoatDetailComponent } from './boat-detail/boat-detail.component';
import { BoatTableComponent } from './boat-table/boat-table.component';
import { BoatsRoutingModule } from './boats-routing.module';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from '../layouts/layouts.module';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from '../cores/directives/sortable.directive';
import { UpdateBoatComponent } from './update-boat/update-boat.component';
import { allIcons } from 'ng-bootstrap-icons/icons';

@NgModule({
  declarations: [
    BoatTableComponent,
    NgbdSortableHeader,
    AddBoatComponent,
    UpdateBoatComponent,
    BoatDetailComponent
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapIconsModule.pick(allIcons),
    NgbModule,
    BoatsRoutingModule
  ]
})
export class BoatsModule { }
