import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {

  constructor(private toastr: ToastrService) { }

  success(message:string):void {
    this.toastr.success(message,"SUCCES");
  }

  error(message:string):void {
    this.toastr.error(message,"ERREUR");
  }

  info(message:string):void {
    this.toastr.info(message,"INFORMATION");
  }

  warning(message:string):void {
    this.toastr.warning(message,"ALERT");
  }
}
