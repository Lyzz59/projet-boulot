import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../admin/services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/admin/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private authservice : AuthService) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({      // Crée une instance de FormGroup
      email: [],                          // Crée une instance de FormControl
      password: [],                       // Crée une instance de FormControl
    });
  }
  // Méthode appelé lors du clic sur le bouton "submit"
  login(){
    this.authservice.authenticate(this.loginForm.value);

  }
}
