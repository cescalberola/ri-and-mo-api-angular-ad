import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Subject,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  catchError,
  of,
  throwError
} from 'rxjs';
import { CharactersService } from '../characters.service';
import { AuthService } from '../../../core/auth/auth.service';
import { Character } from '../../../core/auth/interfaces/character.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  characters: Character[] = [];
  statusFilter: '' | 'Alive' | 'Dead' = '';
  noResults = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private svc: CharactersService,
    public auth: AuthService,
    private router: Router
  ) { }

ngOnInit() {
  this.form = this.fb.group({ name: [''] });

  this.form.get('name')!.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name =>
        this.svc.fetchAll(1, name)
          .pipe(
            catchError(err => {
              if (err.status === 404) {
                // no hay resultados en la API
                this.noResults = true;
                this.characters = [];
                return of({ info: null, results: [] });
              }
              return throwError(() => err);
            })
          )
      ),
      takeUntil(this.destroy$)
    )
    .subscribe(res => {
      // si llegamos aquí es porque la API devolvió un array (posiblemente vacío)
      this.noResults = res.results.length === 0;
      this.characters = res.results;
    });

  // carga inicial
  this.svc.fetchAll(1, '').pipe(
    catchError(() => {
      this.noResults = true;
      this.characters = [];
      return of({ info: null, results: [] });
    })
  )
  .subscribe(res => {
    this.noResults = false;
    this.characters = res.results;
  });
}

  setFilter(status: '' | 'Alive' | 'Dead') {
    this.statusFilter = status;
  }

  clearSearch() {
    this.form.get('name')!.setValue('');
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/edit', id]);
  }

  onDeleteCharacter(id: number) {
    this.svc.deleteFromMemory(id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
