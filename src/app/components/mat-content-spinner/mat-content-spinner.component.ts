import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mat-content',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './mat-content-spinner.component.html',
  styleUrl: './mat-content-spinner.component.scss'
})
export class MatContentSpinnerComponent {
  public spinnerPosition: number = 0;
  public showSpinner: boolean = false;
  public spinnerValue: number = 0;
  public maxMovementSpinner = input<number>(100);
  public diameterSpinner = input<number>(45);
  public spinnerMode: ProgressSpinnerMode = 'determinate';

  private _isDragging: boolean = false;
  private _initialTouchY: number = 0;
  private _dragStartY: number = 0;

  onTouchStart(event: TouchEvent): void {
    this._initialTouchY = event.touches[0].clientY;
    this._dragStartY = this._initialTouchY;
    this._isDragging = true;
    this.spinnerMode = 'determinate';
  }

  onTouchMove(event: TouchEvent): void {
    if (!this._isDragging) return;

    const currentTouchY = event.touches[0].clientY;
    const movement = currentTouchY - this._dragStartY;

    let progress = (movement / this.maxMovementSpinner()) * 100;
    progress = Math.min(Math.max(progress, 1), 100);

    this.spinnerValue = progress;
    this.spinnerPosition = Math.min(movement, this.maxMovementSpinner());

    this.showSpinner = movement > 0;
  }

  onTouchEnd(): void {
    if (this._isDragging) {
      this.spinnerValue = 0;
      this.spinnerMode = 'indeterminate';

      setTimeout(() => {
        this.showSpinner = false;
      }, 3000);
    }

    this._isDragging = false;
  }
}
