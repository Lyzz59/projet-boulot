import { ClientService } from './../../services/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-ins-client',
  templateUrl: './ins-client.component.html',
  styleUrls: ['./ins-client.component.scss'],
})
export class InsClientComponent implements OnInit {
  submitClient!: FormGroup;
  edit: boolean = false;
  client: any;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<InsClientComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public props: any
  ) {}

  ngOnInit(): void {
    if (this.props?.client) {
      this.edit = true;
    }
    this.submitClient = this.fb.group({
      company: this.edit ? this.props.client.company : [],
      phone: this.edit ? this.props.client.phone : [],
      email: this.edit ? this.props.client.email : [],
      address: this.edit ? this.props.client.address : [],
    });
  }

  submit() {
    if (this.edit) {
      this.clientService
        .updateClient(this.submitClient.value, this.props.client.id)
        .subscribe((data) => {
          alert('Ton client à bien été modifier !');
        });
    } else {
      this.clientService.client(this.submitClient.value).subscribe((data) => {
        alert('Félicitation, ton client à bien été enregistré !');
        this.client.reset();
      });
    }
    this.dialogRef.close();
  }

  handleDelete(){
    const clientId = this.props.client.id;

      this.authService.deleteClient(clientId).subscribe((data) => {
        alert('supprimer !');
      });
      
    this.dialogRef.close();
  }
}
