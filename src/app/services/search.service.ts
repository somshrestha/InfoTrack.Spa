import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";
import { SearchDto } from "../models/search-dto.model";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(
        private readonly httpClient: HttpClient
    ) {}

    getSearchResult(dto: SearchDto): Observable<any> {
        const url = `${environment.apiUrl}/Search/GetSearchResult`;

        return this.httpClient.post(url, dto).pipe(
            catchError((response: HttpErrorResponse) => {
                return throwError(response);
            })
        );
    }

    getAllSearchHistory(): Observable<any> {
        const url = `${environment.apiUrl}/Search/GetAllSearchHistory`;

        return this.httpClient.get(url).pipe(
            catchError((response: HttpErrorResponse) => {
                return throwError(response);
            })
        );
    }
}