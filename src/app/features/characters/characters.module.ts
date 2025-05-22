import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterCardComponent } from './character-card/character-card.component';

@NgModule({
  declarations: [
    CharactersListComponent,
    CharacterDetailComponent,
    CharacterCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    CharactersListComponent,
    CharacterDetailComponent,
    CharacterCardComponent
  ]
})
export class CharactersModule {}
