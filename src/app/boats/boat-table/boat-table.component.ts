import { ADD_BOAT, UPDATE_BOAT } from 'src/app/cores/routes.const';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  NgbdSortableHeader,
  SortEvent,
} from 'src/app/cores/directives/sortable.directive';

import { BoatDetailComponent } from '../boat-detail/boat-detail.component';
//import { BoatDetailComponent } from '../boat-detail/boat-detail.component';
import { BoatDto } from 'src/api';
import { DataBoatService } from 'src/app/shares/services/data-boat.service';
import { NavigationService } from 'src/app/cores/services/navigation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boat-table',
  templateUrl: './boat-table.component.html',
  styleUrls: ['./boat-table.component.scss'],
})
export class BoatTableComponent implements OnInit {
  boats$: Observable<BoatDto[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor(
    public dataBoatService: DataBoatService,
    private navigationService: NavigationService,
    private modalService: NgbModal
  ) {
    this.boats$ = dataBoatService.boats$;
    this.total$ = dataBoatService.total$;
  }

  ngOnInit(): void {}

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.dataBoatService.sortColumn = column;
    this.dataBoatService.sortDirection = direction;
  }

  addBoat(): void {
    this.navigationService.routeToPath(ADD_BOAT);
  }

  updateBoat(id: number): void {
    this.navigationService.routeToPathWithId(UPDATE_BOAT, id);
  }

  deleteBoat(id: number): void {
    this.dataBoatService.deleteBoat(id);
  }

  boatDetail(boat:BoatDto) {
		const modalRef = this.modalService.open(BoatDetailComponent);
		modalRef.componentInstance.boat = boat;
	}
}
