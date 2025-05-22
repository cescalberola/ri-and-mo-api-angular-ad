import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersListComponent } from './features/characters/characters-list/characters-list.component';
import { CharacterDetailComponent } from './features/characters/character-detail/character-detail.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },

  // Módulos lazy‑loaded
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then(m => m.UserModule),
    canLoad: [AuthGuard],
    data: { roles: ['user'] }
  },

  // Rutas públicas o mixtas
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
