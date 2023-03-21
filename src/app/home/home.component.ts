import { MessagesService } from "./../messages/messages.service";
import { LoadingService } from "./../loading/loading.service";
import { CoursesService } from "./../services/courses.service";
import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Array<Course>>;

  advancedCourses$: Observable<Array<Course>>;

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(): void {
    // this.loadingService.loadingOn();

    const courses$ = this.coursesService.loadAllCourses().pipe(
      map((courses) => courses.sort(sortCoursesBySeqNo)),
      catchError((error) => {
        const message = "Could not load courses";
        this.messagesService.showErrors(message);
        console.log(message, error);
        return throwError(error);
      })
      // finalize(() => this.loadingService.loadingOff())
    );

    // Olvashatobb és egysoros
    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );

    this.advancedCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );
  }

  //   this.beginnerCourses$ = courses$.pipe(
  //     map((courses) =>
  //       courses.filter((course) => course.category === "BEGINNER")
  //     )
  //   );

  //   this.advancedCourses$ = courses$.pipe(
  //     map((courses) =>
  //       courses.filter((course) => course.category === "ADVANCED")
  //     )
  //   );
  // }
}
