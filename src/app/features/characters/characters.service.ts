import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface ApiResponse {
  info: any;
  results: any[];
}

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private chars$ = new BehaviorSubject<any[]>([]);
  public characters$ = this.chars$.asObservable();

  constructor(private http: HttpClient) { }

  fetchAll(page = 1, name = ''): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}?page=${page}&name=${name}`
    );
  }

  fetchById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteFromMemory(id: number) {
    this.chars$.next(this.chars$.getValue().filter(c => c.id !== id));
  }
}
