import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router:Router,private _location: Location) { }

  routeToPath(path:string){
    if(path!==null && path.length>0){
      this.router.navigate([path]);
    }
  }

  routeToPathWithId(path:string,id:number){
    if(path!==null && path.length>0){
      this.router.navigate([path,id]);
    }
  }

  backToPreviousPage() {
    this._location.back();
  }
}
