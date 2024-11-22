import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, input, Output } from '@angular/core';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

/* Service */
import { BackButtonService } from '@/app/shared/service/backButton.service';

@Component({
  selector: 'app-mat-modal',
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './mat-modal.component.html',
  styleUrl: './mat-modal.component.scss',
  animations: [
    trigger('modalAnimation', [
      state(
        'open',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
      ),
      state(
        'close',
        style({
          transform: 'translateY(100vh)',
          opacity: 0,
        }),
      ),
      transition('open <=> close', [animate('0.2s ease-out')]),
    ]),
  ],
})
export class MatModalComponent {
  hasTitle = input<string>('');
  hasIconName = input<string>('');
  isModalFooter = input<boolean>(false);

  @Input() isTouch: boolean = false;
  @Output() toggleModal = new EventEmitter<boolean>();

  private _backButtonService = inject(BackButtonService);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this._backButtonService.registerHandler(() => {
      this.handleBackButton();
    });
  }

  ngOnDestroy() {
    this._backButtonService.clearHandler();
  }

  toggle() {
    this.toggleModal.emit();
  }

  private handleBackButton() {
    if (this.isTouch) {
      this.toggle();
      this._changeDetectorRef.detectChanges();
    }
    this._changeDetectorRef.detectChanges();
  }
}
