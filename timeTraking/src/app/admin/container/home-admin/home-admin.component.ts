import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeTracking } from 'src/app/time/models/timetracking';
import { Project } from '../../models/Project';
import { User } from '../../models/User';
import { ProjectService } from '../../services/project.service';
import { TimetrackingService } from '../../services/timetracking.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  timeTrackings$!: Observable<TimeTracking[]>;
  projects$!: Observable<Project[]>;
  users$!: Observable<User[]>;
  weekNumber!: number;
  weekDays! : Date[];

  constructor(
    private timetrackingService: TimetrackingService,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // boucle additionner les memes projetId afin de récupéré un condencer des heures (une somme total pour le meme project)
    this.weekNumber = this.getWeekNumber(new Date());
    this.weekDays = this.getWeekDays(this.weekNumber);
    this.projects$ = this.projectService.getAllActiveProject();
    this.timeTrackings$ = this.timetrackingService.getAll(this.weekNumber);
    this.users$ = this.userService.getUserAll();
    

console.log("jours", this.weekDays, this.weekNumber);

    this.timetrackingService.getAll(this.weekNumber).subscribe((data) => console.log(data));
    this.projectService
      .getAllActiveProject()
      .subscribe((data) => console.log(data));
    this.userService.getUserAll().subscribe((data) => console.log(data));
  }

  getWeekNumber(date: Date | string) {
    let manipulatedDate;
    manipulatedDate = date
      ? new Date(date)
      : new Date(new Date().getFullYear(), 11, 31);
    manipulatedDate.setHours(0, 0, 0, 0);
    manipulatedDate.setDate(
      manipulatedDate.getDate() + 3 - ((manipulatedDate.getDay() + 6) % 7)
    );
    var week1 = new Date(manipulatedDate.getFullYear(), 0, 4);
    return (
      1 +
      Math.round(
        ((manipulatedDate.getTime() - week1.getTime()) / 86400000 -
          3 +
          ((week1.getDay() + 6) % 7)) /
          7
      )
    );
  }
  getWeekDays(week: number) {
    const januaryFour = new Date(new Date().getFullYear(), 0, 4);
    const firstDayOfFirstWeek = new Date(januaryFour);
    firstDayOfFirstWeek.setDate(
      firstDayOfFirstWeek.getDate() - firstDayOfFirstWeek.getDay() + 1
    );
    const manipulatedDate = new Date(firstDayOfFirstWeek);
    manipulatedDate.setDate(manipulatedDate.getDate() + (week - 1) * 7);
    const weekDays = [];
    manipulatedDate.setDate(
      manipulatedDate.getDate() - manipulatedDate.getDay() + 1
    );
    for (var i = 0; i < 7; i++) {
      weekDays.push(new Date(manipulatedDate));
      manipulatedDate.setDate(manipulatedDate.getDate() + 1);
    }
    return weekDays;
  }
}
