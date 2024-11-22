import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/* Capacitor */
import { ConnectionStatus, Network } from '@capacitor/network';

/* Service */
import { MaterialNotificationService } from './materiaDesign/material-notification.service';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  private readonly _networkStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public readonly networkStatus$: Observable<boolean> = this._networkStatus.asObservable();
  private readonly materialNotificationService = inject(MaterialNotificationService);
  private _wasDisconnected: boolean = false;

  constructor() {
    this.initializeNetworkListener();
  }

  private async initializeNetworkListener(): Promise<void> {
    const status = await Network.getStatus();
    this._networkStatus.next(status.connected);

    this._wasDisconnected = !status.connected;

    Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      this._networkStatus.next(status.connected);

      if (!status.connected) {
        this._wasDisconnected = true;
        this.materialNotificationService.showSnackBar('Sin conexión a Internet');
      } else if (this._wasDisconnected) {
        this._wasDisconnected = false;
      }
    });
  }

  public async getCurrentNetworkStatus(): Promise<boolean> {
    const status = await Network.getStatus();
    return status.connected;
  }

  public getWasDisconnected(): boolean {
    return this._wasDisconnected;
  }
}
