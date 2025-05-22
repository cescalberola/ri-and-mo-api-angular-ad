import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { AuthGuard } from '../../core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserPanelComponent,
    canActivateChild: [AuthGuard],
    data: { roles: ['user'] },
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
