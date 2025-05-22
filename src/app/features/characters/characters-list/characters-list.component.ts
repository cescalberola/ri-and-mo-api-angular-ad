import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  Subject,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  takeUntil
} from 'rxjs';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  characters: any[] = [];
  statusFilter: '' | 'Alive' | 'Dead' = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private svc: CharactersService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({ name: [''] });
    this.svc.fetchAll(1, '').subscribe(res => this.characters = res.results);
    this.form.get('name')!.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(name => this.svc.fetchAll(1, name)),
        takeUntil(this.destroy$)
      )
      .subscribe(res => (this.characters = res.results));
  }

  setFilter(status: '' | 'Alive' | 'Dead') {
    this.statusFilter = status;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
