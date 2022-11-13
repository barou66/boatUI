import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/cores/services/auth.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  isNavbarCollapsed=true;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
