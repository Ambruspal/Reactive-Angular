import { Lesson } from "./../model/lesson";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "lesson",
  templateUrl: "./lesson.component.html",
  styleUrls: ["./lesson.component.css"],
})
export class LessonComponent {
  @Input() lesson: Lesson;
}
