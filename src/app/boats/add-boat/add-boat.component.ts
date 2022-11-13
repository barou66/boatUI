import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/cores/services/auth.service';
import { BoatInput } from 'src/api';
import { DataBoatService } from 'src/app/shares/services/data-boat.service';
import { NavigationService } from 'src/app/cores/services/navigation.service';

@Component({
  selector: 'app-add-boat',
  templateUrl: './add-boat.component.html',
  styleUrls: ['./add-boat.component.scss']
})
export class AddBoatComponent implements OnInit {

  _name = new FormControl('',Validators.required);
  _description = new FormControl('',Validators.required);
  boatForm = this.fb.group({
    name: this._name,
    description: this._description
  });

  constructor(
    private dataBoatService:DataBoatService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.boatForm.valid) {
      let input:BoatInput = Object.assign({},this.boatForm.value) || {};
       this.dataBoatService.addBoat(input);
    }
  }
}
