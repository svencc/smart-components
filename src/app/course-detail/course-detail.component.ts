import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Lesson} from '../shared/model/lesson';
import {switchMap, take} from 'rxjs/operators';
import {CoursesService} from '../services/courses.service';
import {LessonsService} from '../services/lessons.service';
import {Observable, Subscription} from 'rxjs';
import {Course} from '../shared/model/course';


@Component({
  selector: 'course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnDestroy {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService,
              private lessonsService: LessonsService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params
      .pipe(
        take(1)
      )
      .subscribe(params => {
          const courseUrl = params['id'];
          this.course$ = this.coursesService.findCourseByUrl(courseUrl);
          this.lessons$ = this.coursesService.findCourseKeyByUrl(courseUrl)
            .pipe(
              switchMap((courseKey: string) => {
                return this.lessonsService.findLessonsForCourseKey(courseKey);
              })
            );
        }
      );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
