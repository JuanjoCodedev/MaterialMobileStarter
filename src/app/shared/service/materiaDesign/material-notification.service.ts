import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* Angular Material */
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';

/* Componentes */
import { DialogComponent } from '@/app/components/dialog/dialog.component';
import { BottomSheetComponent } from '@/app/components/bottom-sheet/bottom-sheet.component';

/* Interface */
import { Interface_Bottom_sheet } from '../../interface/bottomSheet.interface';
import { Interface_Dialog_Data } from '../../interface/diaglo.interface';

@Injectable({ providedIn: 'root' })
export class MaterialNotificationService {
  private _snackBar = inject(MatSnackBar);
  private _dialog = inject(MatDialog);
  private _bottomSheet = inject(MatBottomSheet);
  private _router = inject(Router);

  showSnackBar(message: string, action: string = 'Cerrar'): void {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: ['success-snackbar'],
    };

    this._snackBar.open(message, action, config);
  }

  openDialog(items: Interface_Dialog_Data): void {
    const dialogConfig: MatDialogConfig = {
      width: '300px',
      data: items,
    };

    this._dialog.open(DialogComponent, dialogConfig);
  }

  openBottomSheet(items: Interface_Bottom_sheet[]): void {
    const bottomSheetConfig: MatBottomSheetConfig = {
      panelClass: 'custom-bottom-sheet',
      data: items,
    };

    this._bottomSheet.open(BottomSheetComponent, bottomSheetConfig);
  }

  navigateWithProps(route: string, item: any): void {
    this._router.navigateByUrl(route, { state: { data: item } });
  }
}
