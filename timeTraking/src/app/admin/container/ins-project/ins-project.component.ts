import { ProjectService } from '../../services/project.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-ins-project',
  templateUrl: './ins-project.component.html',
  styleUrls: ['./ins-project.component.scss'],
})
export class InsProjectComponent implements OnInit {
  clients$!: Observable<Client[]>;
  formProject!: FormGroup;
  edit: boolean = false;
  project: any;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private projectService: ProjectService,
    private dialogRef: MatDialogRef<InsProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public props: any
  ) {}

  ngOnInit(): void {
    this.clients$ = this.clientService.getAllClients();

    

    if (this.props?.project) {
      this.edit = true;
    }
    this.formProject = this.fb.group({
      name: this.edit ? this.props.project.name : [],
      clientId: this.edit ? this.props.project.client.id : [],
      timeSold: this.edit ? this.props.project.timeSold : [],
      isActive: this.edit ? this.props.project.isActive : [],
    });
  }


  submit() {
    if (this.edit) {
      this.projectService
        .updateProject(this.formProject.value, this.props.project.id)
        .subscribe((data) => {
          alert('Le projet à bien été modifier');
        });
    } else {
      this.projectService.createProject(this.formProject.value).subscribe((data) => {
        alert('temps envoyer !');
        this.project.reset();
      });
    }
    this.dialogRef.close();
  }

  handleDelete() {
    const projectId = this.props.project.id;

    this.projectService.deleteProject(projectId).subscribe((data) => {
      alert('supprimer !');
    });

    this.dialogRef.close();
  }
}
