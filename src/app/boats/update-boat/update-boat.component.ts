import { BoatDto, BoatInput } from 'src/api';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { DataBoatService } from 'src/app/shares/services/data-boat.service';

@Component({
  selector: 'app-update-boat',
  templateUrl: './update-boat.component.html',
  styleUrls: ['./update-boat.component.scss']
})
export class UpdateBoatComponent implements OnInit {

  _name = new FormControl('',Validators.required);
  _description = new FormControl('',Validators.required);
  boatForm = this.fb.group({
    name: this._name,
    description: this._description
  });
  boatId:number=-1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataBoatService:DataBoatService,
    private fb: FormBuilder
  ) {
    this.boatId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.initBoat();
  }

  initBoat():void {
    this.dataBoatService.getBoatById(this.boatId)
    .subscribe(boat=>{
      this.setForm(boat);
    });

}

private setForm(boat: BoatDto) {
  this.boatForm.patchValue({
    name: boat.name,
    description: boat.description
  });
}

  onSubmit(): void {
    if (this.boatForm.valid) {
      const input:BoatInput = Object.assign({},this.boatForm.value) || {};
      this.dataBoatService.updateBoat(this.boatId,input);
    }
  }
}
