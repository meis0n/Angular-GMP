import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../entities/author';
import { map } from 'rxjs/operators';

export const AUTHORS_MAPPER = new InjectionToken('')

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient) { }

  getAuthors(textFragment?: string): Observable<Author[]> {
    return this.httpClient.get('authors', {
      params: {
        textFragment: textFragment || ''
      }
    }).pipe(
      map((c: Record<string, any>[]) => c.map(this.mapAuthorFromBE))
    );
  }

  mapAuthorFromBE (author: Record<string, any>): Author {
    return {
      id: author['id'],
      name: author['name'],
    }
  }
}
