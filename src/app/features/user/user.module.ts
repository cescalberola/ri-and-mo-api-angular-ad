import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserPanelComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule {}
