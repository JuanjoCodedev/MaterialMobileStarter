import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material */
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListItemIcon, MatListModule } from '@angular/material/list';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';

/* Service */
import { BackButtonService } from '@/app/shared/service/backButton.service';

/* Interface */
import { Interface_Bottom_sheet } from '../../shared/interface/bottomSheet.interface';

@Component({
  selector: 'app-bottom-sheet',
  imports: [CommonModule, MatListModule, MatIconModule, MatListItemIcon],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
  standalone: true,
})
export class BottomSheetComponent {
  private _bottomSheetRef = inject<MatBottomSheetRef<BottomSheetComponent>>(MatBottomSheetRef);
  public readonly data = inject<Interface_Bottom_sheet[]>(MAT_BOTTOM_SHEET_DATA);
  private _backButtonService = inject(BackButtonService);

  ngOnInit() {
    this._backButtonService.registerHandler(() => {
      this.close();
    });
  }

  ngOnDestroy() {
    this._backButtonService.clearHandler();
  }

  close(): void {
    this._bottomSheetRef.dismiss();
  }

  handler(item: any): void {
    if (item.handler) {
      item.handler();
    }
    this._bottomSheetRef.dismiss();
  }
}
