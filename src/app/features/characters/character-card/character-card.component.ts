import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() character!: any;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor(public auth: AuthService) {}

  ngOnInit() {
    if (!this.character) {
      throw Error('Character data is not provided');
    }
  }

  getCharacterImageUrl(): string {
    return this.character.image || 'assets/default-character.png';
  }

  onDelete() {
    if (confirm(`¿Eliminar a ${this.character.name}?`)) {
      this.delete.emit(this.character.id);
    }
  }
}
