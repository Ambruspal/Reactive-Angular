import { filter } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MessagesService {
  private subject$ = new BehaviorSubject<Array<string>>([]);

  errors$: Observable<Array<string>> = this.subject$
    .asObservable()
    .pipe(filter((messages) => messages && messages.length > 0));

  showErrors(...errors: Array<string>) {
    this.subject$.next(errors);
  }
}
