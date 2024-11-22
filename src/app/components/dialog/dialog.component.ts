import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material */
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/* Interface */
import { Interface_Dialog_Data } from '../../shared/interface/diaglo.interface';
import { BackButtonService } from '@/app/shared/service/backButton.service';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule, MatDialogModule, MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  standalone: true,
})
export class DialogComponent {
  readonly data = inject<Interface_Dialog_Data>(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef<DialogComponent>);
  private _backButtonService = inject(BackButtonService);

  ngOnInit() {
    this._backButtonService.registerHandler(() => {
      this.close();
    });
  }

  ngOnDestroy() {
    this._backButtonService.clearHandler();
  }

  close() {
    if (this.data.onClose) {
      this.data.onClose();
    }

    this._dialogRef.close();
  }

  hanlderAccept() {
    if (this.data.onAccept) this.data.onAccept();
  }

  handlerClose() {
    this.close();
  }
}
