import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { EditCharacterComponent } from './edit-character/edit-character.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    EditCharacterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule {}
