import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { StatusFilterPipe } from './pipes/status-filter.pipe';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HighlightDirective,
    StatusFilterPipe,
    HeaderComponent
  ],
  exports: [
    CommonModule,
    HighlightDirective,
    StatusFilterPipe,
    HeaderComponent
  ]
})
export class SharedModule {}
