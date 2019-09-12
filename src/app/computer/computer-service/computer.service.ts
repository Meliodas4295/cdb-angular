import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';
import { Computer } from '../computer.model';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  private readonly API_URL = 'http://localhost:8080/webapp/api/computers/';

  constructor(private httpClient: HttpClient) { }

  public getComputerByPage(limit: number, pageNumber: number): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(`${this.API_URL}/all/page=${pageNumber}&limit=${limit}`);
  }

  public getComputer(id: number): Observable<Computer> {
    return this.httpClient.get<Computer>(`${this.API_URL}/${id}`);
  }
  public getCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.API_URL}/count`);
  }

  public getComputers(): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(this.API_URL);
  }

  public createComputer(computer: Computer): Observable<number> {
    return this.httpClient.post<number>(this.API_URL, computer);
  }

  public deleteComputer(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }

  public updateComputer(computer: Computer, id: number): Observable<void> {
    return this.httpClient.put<void>(`${this.API_URL}/${id}`, computer);
  }
  public getAllComputersByNameByPage(name: string, pageNb: number, pageSize: number): Observable<Computer[]> {
    return this.httpClient.get<Computer[]>(`${this.API_URL}/all/${name}?page=${pageNb}&size=${pageSize}`);
  }
}
