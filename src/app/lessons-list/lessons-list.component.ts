import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from '../shared/model/lesson';
import {store} from '../event-bus-experiments/app-data';
import {Observer} from 'rxjs';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent {
  @Input()
  latestLessons: Lesson[] = [];
}



