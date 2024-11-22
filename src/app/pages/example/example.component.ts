import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';

/* Component */
import { MatContentSpinnerComponent } from '@/app/components/mat-content-spinner/mat-content-spinner.component';
import { MatModalComponent } from '@/app/components/mat-modal/mat-modal.component';

/* Service */
import { MaterialNotificationService } from '@/app/shared/service/materiaDesign/material-notification.service';

/* Interface */
import { Interface_Bottom_sheet } from '@/app/shared/interface/bottomSheet.interface';
import { Interface_Dialog_Data } from '@/app/shared/interface/diaglo.interface';

@Component({
  selector: 'app-example',
  imports: [MatButtonModule, MatContentSpinnerComponent, MatModalComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent {
  isTouch: boolean = false;

  private _materialNotificationService = inject(MaterialNotificationService);
  private _router = inject(Router);

  dialog() {
    const items: Interface_Dialog_Data = {
      title: '¡Hola mundo!',
      message: 'Saludando al Planeta Tierra',
      btnAction: 'Aceptar',
      btnClose: 'Cerrar',
      onAccept() {
        console.log('Dialog Accept');
      },
      onClose(item: string = 'cerrar boton') {
        console.log('Ejecutado: ', item);
      },
    };

    this._materialNotificationService.openDialog(items);
  }

  hadler() {
    const items: Interface_Bottom_sheet[] = [
      {
        title: 'Lista de personas',
        line: 'Personas que habitan en el Planeta',
        handler() {
          console.log('hola mundo');
        },
      },
    ];

    this._materialNotificationService.openBottomSheet(items);
  }

  toggle() {
    this.isTouch = !this.isTouch;
  }

  navigateExampleTwo() {
    this._router.navigate(['/home/example-two']);
  }
}
