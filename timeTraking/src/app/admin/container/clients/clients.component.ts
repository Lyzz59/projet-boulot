import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { InsClientComponent } from '../ins-client/ins-client.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients$!: Observable<Client[]>;

  constructor(private clientService: ClientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.clients$ = this.clientService.getAllClients();
    this.clientService.getAllClients().subscribe((data) => console.log(data));
  }

  showModal(client?: Client) {
    const dialogRef = this.dialog.open(InsClientComponent, {
       data: {
         client: client,
       },
     });
     dialogRef.beforeClosed().subscribe(()=>{
       window.location.reload();
     });
   };
}
