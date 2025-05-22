import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './features/admin-panel/admin-panel.component';
import { UserPanelComponent } from './features/user-panel/user-panel.component';
import { CharactersListComponent } from './features/characters/characters-list/characters-list.component';
import { CharacterDetailComponent } from './features/characters/character-detail/character-detail.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },      // ruta pública de login
  {
    path: 'user',
    component: UserPanelComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] }
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'characters',
    component: CharactersListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user','admin'] }
  },
  {
    path: 'characters/:id',
    component: CharacterDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user','admin'] }
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
