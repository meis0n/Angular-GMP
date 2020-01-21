import { Injectable } from '@angular/core';
import uuidv1 from 'uuid/v1';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoaderSession {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  _queue = new BehaviorSubject<string[]>([]);

  isLoaded$ = this._queue.pipe(
    map(q => Boolean(q.length))
  );

  add (): LoaderSession {
    const id = uuidv1();
    this._queue.next([...this._queue.getValue(), id]);
    return {
      id
    };
  }

  resolve (session: LoaderSession): void {
    this._queue.next([...this._queue.getValue().filter(s => s !== session.id)]);
  }
}
