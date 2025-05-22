import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements AfterViewInit {
  @Input('appHighlight') color = 'yellow';

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.style.backgroundColor = this.color;
  }
}
