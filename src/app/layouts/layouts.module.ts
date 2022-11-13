import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { allIcons } from 'ng-bootstrap-icons/icons';

@NgModule({
  declarations: [
    NavHeaderComponent
  ],
  imports: [
    NgbModule,
    RouterModule,
    CommonModule,
  ],
  exports:[NavHeaderComponent]
})
export class LayoutsModule { }
