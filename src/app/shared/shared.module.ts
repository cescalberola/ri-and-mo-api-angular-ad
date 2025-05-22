import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { StatusFilterPipe } from './pipes/status-filter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HighlightDirective,
    StatusFilterPipe
  ],
  exports: [
    CommonModule,
    HighlightDirective,
    StatusFilterPipe
  ]
})
export class SharedModule {}
