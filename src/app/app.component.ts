import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PlatformLocation } from '@angular/common';

/* Services */
import { NetworkService } from './shared/service/network.service';
import { MaterialNotificationService } from './shared/service/materiaDesign/material-notification.service';

/* Capacitor */
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'mobileMaterial';

  private lastBackPress = 0;
  private timePeriodToExit = 2000;

  private _networkService = inject(NetworkService);
  private _materialNotificationService = inject(MaterialNotificationService);
  private _router = inject(Router);
  private _location = inject(PlatformLocation);

  constructor() {
    this.initializeBackButtonHandler();
  }

  async ngOnInit() {
    this._networkService.networkStatus$.subscribe((connected: boolean) => {
      if (connected && this._networkService.getWasDisconnected()) {
        this._materialNotificationService.showSnackBar('Conexión a Internet restablecidad.');
      }
    });

    this.checkNetworkStatus();
  }

  /**
   * Maneja el comportamiento del botón de retroceso en dispositivos móviles.
   *
   * Este método se encarga de interceptar el evento del botón de retroceso del sistema
   * y realizar una acción específica dependiendo de la ruta actual en la aplicación:
   *
   * - Si el usuario está en la ruta principal (`/home/example` o `/`), el método permite
   *   cerrar la aplicación únicamente si el botón de retroceso se presiona dos veces
   *   dentro de un intervalo de tiempo definido (`timePeriodToExit`).
   * - Si el usuario está en cualquier otra ruta, el método navega hacia atrás en el historial.
   *
   * @returns {void}
   */
  initializeBackButtonHandler(): void {
    document.addEventListener('backbutton', () => {
      const currentUrl = this._router.url;

      if (currentUrl === '/home/example' || currentUrl === '/') {
        const currentTime = new Date().getTime();
        if (currentTime - this.lastBackPress < this.timePeriodToExit) {
          App.exitApp();
        } else {
          this.lastBackPress = currentTime;
        }
      } else {
        this._location.back();
      }
    });
  }

  /**
   * Verifica el estado actual de la conexión a Internet y muestra el resultado en la consola.
   *
   * Este método utiliza el servicio `NetworkService` para obtener el estado de la red en tiempo real.
   * - Si la conexión está activa, se registra "Conectado" en la consola.
   * - Si no hay conexión, se registra "Desconectado".
   *
   * @returns {Promise<void>} Una promesa que se resuelve al completar la verificación del estado de la red.
   */
  async checkNetworkStatus(): Promise<void> {
    const status: boolean = await this._networkService.getCurrentNetworkStatus();
    console.log('Conexión actual:', status ? 'Conectado' : 'Desconectado');
  }
}
