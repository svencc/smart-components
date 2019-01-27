import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Lesson} from '../shared/model/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private db: AngularFireDatabase) { }

  findLatestLessons(): Observable<Lesson[]> {
    return this.db.list('lessons', ref => ref.orderByKey().limitToLast(10))
      .valueChanges()
      .pipe(
        tap(console.log)
      );
  }

  findLessonsForCourseKey(courseKey: string): Observable<Lesson[]> {
    return this.db.list<Lesson>('lessons', ref => ref.orderByChild('courseId').equalTo(courseKey))
      .valueChanges();
  }
}
