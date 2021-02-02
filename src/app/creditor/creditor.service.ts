import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { CreateCreditorModel } from "./creditor-create.model";
import { EditCreditorModel } from "./creditor-edit.model";
import { GetCreditorByIdModel } from "./creditor-get-by-id.model";
import { GetCreditorModel } from "./creditor-get.model";

@Injectable({
  providedIn: 'root'
})

export class CreditorService {
  private apiUrl = 'api/creditor';

  constructor(private httpClient: HttpClient) {

  }

  edit(
    creditor: EditCreditorModel
  ): Observable<EditCreditorModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${creditor.id}`;
    return this.httpClient
      .put<EditCreditorModel>(url, creditor, { headers })
      .pipe(
        tap((data) => console.log('editCreditor: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .delete<any>(this.apiUrl + '/' + id, { headers })
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  create(model: CreateCreditorModel)
    : Observable<CreateCreditorModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .post<CreateCreditorModel>(this.apiUrl, model, { headers })
      .pipe(
        tap((data) =>
          console.log('Creating creditor...: ' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );

  }

  get(): Observable<GetCreditorModel[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .get<GetCreditorModel[]>(this.apiUrl, {
        headers,
      })
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );

  }

  getById(id: number): Observable<GetCreditorByIdModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .get<GetCreditorByIdModel>(this.apiUrl + '/' + id, {
        headers,
      })
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err} : ${err.body.error}`;
    }
    console.log(err);
    console.error(err);
    return throwError(errorMessage);
  }
}