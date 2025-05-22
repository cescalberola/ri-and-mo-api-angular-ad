import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  tap,
  map
} from 'rxjs';
import { Character, ApiResponse } from '../../core/auth/interfaces/character.interface';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  // 1) Stream que emite la lista filtrada/patchada
  private chars$ = new BehaviorSubject<Character[]>([]);
  public characters$ = this.chars$.asObservable();

  // 2) Registro de ediciones y eliminaciones
  private edits: Record<number, Partial<Character>> = {};
  private deletedIds = new Set<number>();

  constructor(private http: HttpClient) {
    // Opcional: cargar desde localStorage
    const storedEdits = localStorage.getItem('characterEdits');
    const storedDeleted = localStorage.getItem('characterDeleted');
    if (storedEdits) {
      this.edits = JSON.parse(storedEdits);
    }
    if (storedDeleted) {
      JSON.parse(storedDeleted).forEach((id: number) => this.deletedIds.add(id));
    }
  }

  /**
   * Trae la página de personajes, filtra eliminados y aplica ediciones
   */
  fetchAll(page = 1, name = ''): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.apiUrl}?page=${page}&name=${name}`)
      .pipe(
        map(res => {
          // filtrar eliminados
          const filtered = res.results.filter(c => !this.deletedIds.has(c.id));
          // aplicar ediciones
          const patched = filtered.map(c => ({ ...c, ...this.edits[c.id] }));
          return { ...res, results: patched };
        }),
        tap(res => this.chars$.next(res.results))
      );
  }

  /**
   * Trae un personaje por ID, aplica edición si existe
   */
  fetchById(id: number): Observable<Character> {
    if (this.deletedIds.has(id)) {
      throw new Error('Personaje eliminado');
    }
    return this.http
      .get<Character>(`${this.apiUrl}/${id}`)
      .pipe(map(c => ({ ...c, ...this.edits[c.id] })));
  }

  /** Marca un personaje como eliminado */
  deleteFromMemory(id: number) {
    this.deletedIds.add(id);
    localStorage.setItem('characterDeleted', JSON.stringify(Array.from(this.deletedIds)));
    this.chars$.next(this.chars$.getValue().filter(c => c.id !== id));
  }


  /** Guarda cambios de edición para un personaje */
  editInMemory(id: number, changes: Partial<Character>) {
    const prev = this.edits[id] || {};
    this.edits[id] = { ...prev, ...changes };
    this.persistEdits();
    // actualizar stream
    const updatedList = this.chars$.getValue().map(c =>
      c.id === id ? { ...c, ...this.edits[id] } : c
    );
    this.chars$.next(updatedList);
  }

  /** Persistir en localStorage */
  private persistEdits() {
    localStorage.setItem('characterEdits', JSON.stringify(this.edits));
  }
}
