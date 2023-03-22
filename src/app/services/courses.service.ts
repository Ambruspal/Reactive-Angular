import { Lesson } from "./../model/lesson";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  loadAllCourses(): Observable<Array<Course>> {
    return this.http.get<Array<Course>>("/api/courses").pipe(
      map((resp) => resp["payload"]),
      shareReplay()
    );
  }

  updateCourse(courseId: string, course: Partial<Course>): Observable<any> {
    return this.http
      .put<Observable<any>>(`/api/courses/${courseId}`, course)
      .pipe(shareReplay());
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>("/api/lessons", {
        params: {
          filter: search,
          pageSize: 100,
        },
      })
      .pipe(
        map((resp) => resp["payload"]),
        shareReplay()
      );
  }
}
