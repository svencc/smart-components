import {Component, OnInit} from '@angular/core';
import {Course} from '../shared/model/course';
import {Lesson} from '../shared/model/lesson';
import {Observable} from 'rxjs';
import {CoursesService} from '../services/courses.service';
import {LessonsService} from '../services/lessons.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses$: Observable<Course[]>;
  latestLessons$: Observable<Lesson[]>;

  constructor(
    private coursesService: CoursesService,
    private lessonsService: LessonsService
  ) { }

  ngOnInit() {
    this.courses$ = this.coursesService.findAllCourses();
    this.latestLessons$ = this.lessonsService.findLatestLessons();
  }

  changeCourseData() {
    // this.courses.forEach(course => course.description = '=> ' + course.description);
  }
}
