import { Component, OnInit } from '@angular/core';
import {AuthService}  from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  menuVariable: boolean = false;
  openMenu(){
    this.menuVariable =! this.menuVariable;
  }

  ngOnInit(): void {
    this.isAdmin = this.authservice.isAdmin();
  }

  logout(){
      this.authservice.logout();
  }

  isAdmin!: boolean;
  constructor(private authservice : AuthService) { }



}
