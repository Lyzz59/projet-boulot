import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { InsProjectComponent } from '../ins-project/ins-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  project$!: Observable<Project[]>;
  
  constructor(private projectService: ProjectService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.project$ = this.projectService.getProjectAll();
    this.projectService.getProjectAll().subscribe();
  }

  showModal(project?: Project) {
    const dialogRef = this.dialog.open(InsProjectComponent, {
      data: {
        project: project,
      },
    });
    dialogRef.beforeClosed().subscribe(() => {
      window.location.reload();
    });
  }
}
