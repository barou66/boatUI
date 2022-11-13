import { Component, Input, OnInit } from '@angular/core';

import { BoatDto } from 'src/api';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-boat-detail',
  templateUrl: './boat-detail.component.html',
  styleUrls: ['./boat-detail.component.scss']
})
export class BoatDetailComponent implements OnInit {
  @Input() boat!: BoatDto;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
