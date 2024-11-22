import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* WebSocket */
import { io, Socket } from 'socket.io-client';

/* Environment */
import { environment } from '@/environment/environment';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private _socket: Socket;
  private _baseUrl = environment.URLSERVER;

  constructor() {
    this._socket = io(`${this._baseUrl}`, {
      transports: ['websocket'],
    });
  }

  // ?Método para conectar con el servidor
  public connect() {
    this._socket.connect();
  }

  // ?Método para desconectar del servidor
  public disconnect() {
    this._socket.disconnect();
  }

  // ?Método genérico para escuchar cualquier evento
  public onEvent(event: string): Observable<any> {
    return new Observable((observer) => {
      this._socket.on(event, (data: any) => {
        observer.next(data);
      });

      return () => {
        this._socket.off(event);
      };
    });
  }

  // ?Método para escuchar un evento específico de notificación para un usuario
  public onNotification(userId: number): Observable<any> {
    return this.onEvent(`notification-${userId}`);
  }

  // ?Método para emitir eventos al servidor
  public emit(event: string, data: any) {
    this._socket.emit(event, data);
  }
}
