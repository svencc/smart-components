import { Injectable } from '@angular/core';
import {AngularFireDatabase, snapshotChanges} from '@angular/fire/database';
import {Course} from '../shared/model/course';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {DatabaseSnapshot} from '@angular/fire/database-deprecated/interfaces';
import {Lesson} from '../shared/model/lesson';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses')
      .valueChanges()
      .pipe(
        tap(console.log)
      );
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db.list<Course>(
      'courses',
      ref => ref.orderByChild('url').equalTo(courseUrl)
    ).valueChanges()
      .pipe(
        map( (data: Course[] ) => {
          return data[0];
        })
      );
  }

  findCourseKeyByUrl(courseUrl: string): Observable<string> {
    this.db.list<Course>(
      'courses',
      ref => ref.orderByChild('url').equalTo(courseUrl)
    ).snapshotChanges()
      .pipe(
        map( snapshots => snapshots[0].key ),
      ).subscribe(
      (next) => console.log(next),
      (err) => console.log(err),
      () => console.log('xxx-COMPLETED'),
    );


    return this.db.list<Course>(
      'courses',
      ref => ref.orderByChild('url').equalTo(courseUrl)
    ).snapshotChanges()
      .pipe(
        map( snapshots => snapshots[0].key ),
      )
  }

}
