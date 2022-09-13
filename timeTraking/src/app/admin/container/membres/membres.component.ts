import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from 'src/app/auth/containers/registration/registration.component';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.scss'],
})
export class MembresComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUserAll();
    this.userService.getUserAll().subscribe((data) => console.log(data));
  }

  showModal(user?: User) {
    const dialogRef = this.dialog.open(RegistrationComponent, {
      data: {
        user: user,
      },
    });
    dialogRef.beforeClosed().subscribe(() => {
      window.location.reload();
    });
  }
}
