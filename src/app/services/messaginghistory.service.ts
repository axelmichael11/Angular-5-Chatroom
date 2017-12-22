import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
// import { Response } from './response.ts'
// const initialMessages: Response[] = [];

interface ItemsResponse {
  results: string[];
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MessagingHistoryService {
  private chatHistoryUrl = 'http://localhost:8888/history';  // URL to web routes...
  private url = 'ws://localhost:8888';
  // private connection;
  private messageHistorySource: Observable<Response[]>;

  constructor(private http: HttpClient){ }


// leaving this function.... the tail end doesn't seem to work and I need to investivate what pipe does exactly...
  getHistory(): Observable<Response[]> {
  return this.http.get<ItemsResponse>(this.chatHistoryUrl, httpOptions)
  .pipe(
    // tap(heroes => this.log(`fetched history`)),
    catchError(this.handleError('getHistory', []))
    );
  }

  newGetHistory(nick: string): Observable<Response[]> {
    return this.http.get<ItemsResponse>(this.chatHistoryUrl, httpOptions)
        .map((response) => {
          if (response.errors){
            catchError(this.handleError('getUsers', []))
          }
          return response.data;
        })

}


  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error); // log to console instead
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
    };
  }
}
