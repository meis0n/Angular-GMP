import { Injectable } from '@angular/core';
import { uuid } from 'uuid';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoaderSession {
  id: string,
};

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  _queue = new BehaviorSubject<string[]>([]);

  isLoaded = this._queue.pipe(
    map(q => Boolean(q.length))
  );

  constructor() { }

  add (): LoaderSession {
    const id = uuid();
    this._queue.next([...this._queue.getValue(), id]);
    return {
      id
    };
  }

  resolve (session: LoaderSession): void {
    this._queue.next([...this._queue.getValue().filter(s => s !== session.id)]);
  }
}
