import { TypologyService } from './../../services/typology.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimetrackingService } from './../../services/timetracking.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { Type_project } from '../../models/type_project';
import { ProjectService } from '../../services/project.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-ins-timetracking',
  templateUrl: './ins-timetracking.component.html',
  styleUrls: ['./ins-timetracking.component.scss'],
})

export class InsTimetrackingComponent implements OnInit {
  formTime!: FormGroup;
  projects$!: Observable<Project[]>;
  type_projects$!: Observable<Type_project[]>;
  dateMax: string = new Date(Date.now()).toISOString().split('T')[0];


  edit: boolean = false;
  timetracking: any;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private timetrackingService: TimetrackingService,
    private dialogRef: MatDialogRef<InsTimetrackingComponent>,
    private typologyService: TypologyService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public props: any
  ) {}

  ngOnInit(): void {
    
    this.projects$ = this.projectService.getProjectAll();
    this.type_projects$ = this.typologyService.getTypologyAll();

    console.log("tjntkjt", this.props?.timetracking);
    if (this.props?.timetracking) {
      this.edit = true;
    }
    console.log(this.edit);
    console.log(this.props.timetracking);
    
    
    this.formTime = this.fb.group({
      createdAt: this.edit ? new Date(this.props.timetracking.createdAt).toISOString().split('T')[0] : this.dateMax,
      projectId: this.edit ? this.props.timetracking.project.id : [],
      typologyId: this.edit ? this.props.timetracking.typology.id : [],
      valeur: this.edit ? this.conversionMinuteToInputFormat(this.props.timetracking.valeur) : [],
      description: this.edit ? this.props.timetracking.description : [],
    });
  };

  conversionInputFormatToMinut(temps: String) {
    const [hours, mins] = temps.split(':').map((e) => Number(e));
    return hours * 60 + mins;
  };

  conversionMinuteToInputFormat(minute: number){
    let heure:any = Math.trunc(minute / 60);
    if (heure < 10){
      heure =  "0" + heure;
    } 
    let minutes:any = minute % 60;
    if (minutes < 10){
      minutes = "0" + minutes;
    }
    return heure + ":" + minutes;
  }
  
  submit() {
    console.log(this.formTime.value);
  
    const valeur = this.conversionInputFormatToMinut(this.formTime.value.valeur);
    const formData = {
      ...this.formTime.value,
      valeur: valeur,
    };

    if (this.edit) {
      this.timetrackingService
        .update(formData, this.props.timetracking.id)
        .subscribe((data) => {
          alert('Le temps à bien été modifier');
        });
    } else {
  
      this.timetrackingService.create(formData).subscribe((data) => {
        console.log(data);
        alert('temps envoyer !');
        this.formTime.reset();
      });
    }

    this.dialogRef.close();
  }

  handleDelete(){
    const timetrackingId = this.props.timetracking.id;

      this.timetrackingService.deleteOne(timetrackingId).subscribe((data)=> {
        alert("supprimer !");
      });
      
    this.dialogRef.close();
  }
}
