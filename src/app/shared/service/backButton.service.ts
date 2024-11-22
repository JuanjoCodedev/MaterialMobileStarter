import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackButtonService {
  private backButtonHandler: (() => void) | null = null;

  constructor() {
    document.addEventListener('backbutton', this.handleBackButton.bind(this));
  }

  /**
   * Registra un controlador para el botón de retroceso.
   * @param handler Función a ejecutar al presionar el botón.
   */
  registerHandler(handler: () => void): void {
    if (this.backButtonHandler) {
      this.clearHandler();
    }

    this.backButtonHandler = handler;
    document.addEventListener('backbutton', this.handleBackButton.bind(this));
  }

  /**
   * Limpia el controlador actual del botón de retroceso.
   */
  clearHandler(): void {
    if (this.backButtonHandler) {
      document.removeEventListener('backbutton', this.handleBackButton.bind(this));
      this.backButtonHandler = null;
    }
  }

  /**
   * Maneja el evento del botón de retroceso.
   */
  private handleBackButton() {
    if (this.backButtonHandler) {
      this.backButtonHandler();
    }
  }
}
