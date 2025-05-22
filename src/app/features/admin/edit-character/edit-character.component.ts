import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CharactersService } from '../../characters/characters.service';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrl: './edit-character.component.scss'
})
export class EditCharacterComponent implements OnInit {
  form: FormGroup;
  public id!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private svc: CharactersService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      species: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    // 1) lee el id de la URL Y lo almacena en this.id
    this.id = +this.route.snapshot.params['id'];

    // 2) carga los datos y patch al formulario
    this.svc.fetchById(this.id).subscribe(c => {
      this.form.patchValue({
        name: c.name,
        status: c.status,
        species: c.species,
        image: c.image
      });
    });
  }

  save() {
    if (this.form.invalid) return;
    const updated = this.form.value;
    // 3) ahora this.id está bien definido
    this.svc.editInMemory(this.id, updated);
    this.router.navigate(['/characters']);
  }
}
