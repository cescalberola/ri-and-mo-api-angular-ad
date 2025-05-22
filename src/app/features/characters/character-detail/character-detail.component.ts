import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent
  implements OnChanges, AfterViewInit
{
  @Input() characterId!: number;
  character: any;
  @ViewChild('title') titleEl!: ElementRef<HTMLHeadingElement>;

  constructor(private svc: CharactersService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['characterId'] && this.characterId) {
      this.svc.fetchById(this.characterId)
        .subscribe(data => (this.character = data));
    }
  }

  ngAfterViewInit() {
    this.titleEl?.nativeElement.focus();
  }
}
