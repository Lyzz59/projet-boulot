import { UserService } from './../../../admin/services/user.service';
import { Role } from './../../models/Role';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  timeForm!: FormGroup;
  roles$!: Observable<Role[]>;
  edit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private roleService: RoleService,
    private dialogRef: MatDialogRef<RegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public props: any
  ) {}

  ngOnInit(): void {
    this.roles$ = this.roleService.getAll();
    if (this.props?.user) {
      this.edit = true;
    }
    this.registrationForm = this.fb.group({
      lastName: this.edit ? this.props.user.lastName : [],
      firstName: this.edit ? this.props.user.firstName : [],
      email: this.edit ? this.props.user.email : [],
      password: [],
      rolesId: [],
      isActive: this.edit ? this.props.user.isActive : true,
    });
    if (this.edit) {
      this.registrationForm.controls['rolesId'].setValue(
        this.props.user.roles.map((role: Role) => role.id.toString())
      );
    }
  }

  submit() {
    if (this.edit) {
      this.authService
        .updateUser(this.registrationForm.value, this.props.user.id)
        .subscribe((data) => {
          alert('Ton utilisateur à bien été modifier !');
        });
    } else {
      this.authService
        .registration(this.registrationForm.value)
        .subscribe((data) => {
          alert('Félicitation, ton utilisateur à bien été enregistré !');
          this.registrationForm.reset();
        });
    }

    this.dialogRef.close();
    // manque la methode si l'inscription echoue
    // manque un indicateur si un champs n'est pas correct
  }

  handleDelete(){
    const userId = this.props.user.id;

      this.authService.deleteUser(userId).subscribe((data) => {
        alert('supprimer !');
      });
      
    this.dialogRef.close();
  }
}
