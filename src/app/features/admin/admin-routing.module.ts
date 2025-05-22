import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { EditCharacterComponent } from './edit-character/edit-character.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'edit/:id', component: EditCharacterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
