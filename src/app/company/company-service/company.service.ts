import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import { Company } from '../company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly API_URL = 'http://localhost:8080/webapp/api/companies/';
  constructor(private httpClient: HttpClient) { }

  public getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_URL}/${id}`);
  }

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.API_URL);
  }

  public deleteCompany(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }
}
