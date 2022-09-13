import { InsTimetrackingComponent } from './../ins-timetracking/ins-timetracking.component';
import { TimetrackingService } from './../../services/timetracking.service';
import { TimeTracking } from './../../models/timetracking';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timetracking',
  templateUrl: './timetracking.component.html',
  styleUrls: ['./timetracking.component.scss'],
})
export class TimetrackingComponent implements OnInit {
  timeTracking$!: Observable<TimeTracking[]>;
  _today: Date = new Date(); 
  formDate!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private timetrackingService: TimetrackingService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    const fromDate = new Date(this._today.setDate(this._today.getDate()-7)).toISOString().split('T')[0];
    this.formDate = this.fb.group({
    selectDate: fromDate 
    });
    this.onChanges();

    this.timeTracking$ = this.timetrackingService.getAllByUserId(fromDate);
  }
// rajouter un minimum de 7jours anterieur et un max a la date du jours (pas mettre une date futur) 

  onChanges(){
    this.formDate.get("selectDate")?.valueChanges.subscribe((data) =>{
    this.timeTracking$ = this.timetrackingService.getAllByUserId(data);
      
    })
  }

  conversion(temps: String) {
    const [hours, mins] = temps.split(':').map((e) => Number(e));
    return hours * 60 + mins;
  }

  showModal(timetracking?: TimeTracking) {
    const dialogRef = this.dialog.open(InsTimetrackingComponent, {
      data: {
        timetracking: timetracking,
      },
    });
    dialogRef.beforeClosed().subscribe(() => {
      window.location.reload();
    });
  }
}
