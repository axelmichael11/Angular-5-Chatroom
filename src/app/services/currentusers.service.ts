import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable, BehaviorSubject } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
// import { Response } from './response.ts'
// const initialMessages: Response[] = [];

interface UsersResponse {
  results: string[];
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CurrentusersService {
  usersUrl = 'http://localhost:8888/users';  // URL to web routes...
  // private url = 'ws://localhost:8888';
  // private connection;
  private currentUsersSource: new BehaviorSubject<UserResponse[]>([]);

  // currentUser = this.currentUsersSource.asObservable();

  constructor(private http: HttpClient){ }


// leaving this function.... the tail end doesn't seem to work and I need to investivate what pipe does exactly...
  getUsers(): BehaviorSubject<UserResponse[]> {
  return this.http.get<UsersResponse>(this.usersUrl, httpOptions)
  .pipe(
    // this.currentUsersSource.next()
    // tap(users => this.log(`fetched users`)),
    catchError(this.handleError('getUsers', []))
    );
  }

  newGetUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(this.usersUrl, httpOptions)
        .map((response) => {
          console.log('this is the repsonse, turning to json', response)
          if (response.errors){
            catchError(this.handleError('getUsers', []))
          }
          return response.data;
        })
}


  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
}
