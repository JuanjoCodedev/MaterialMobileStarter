import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

/* Services */
import { MaterialNotificationService } from '../service/materiaDesign/material-notification.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const materialNotificationService = inject(MaterialNotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Error de conexión al servidor';

      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }

      switch (error.status) {
        case 400:
          errorMessage = `${error.error.message ?? 'Solicitud incorrecta. Verifica los datos enviados'}`;
          break;
        case 401:
          errorMessage = `${error.error.message ?? 'No autorizado. Por favor, inicia sesión'}`;
          break;
        case 403:
          errorMessage = 'Acceso denegado. No tienes permisos';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado. Verifica la URL';
          break;
        case 500:
          errorMessage = 'Error en el servidor. Intenta más tarde';
          break;
        case 0:
          errorMessage = 'Error de conexión al servidor';
          break;
        default:
          errorMessage = `${error.error.message || 'Error en el servidor. Intenta más tarde'}`;
          break;
      }

      materialNotificationService.showSnackBar(errorMessage);

      return throwError(() => new Error(errorMessage));
    }),
  );
};
