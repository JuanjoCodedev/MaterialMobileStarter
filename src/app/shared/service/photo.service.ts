import { Injectable } from '@angular/core';

/* Capacitor */
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';

/* Interface */
import { Interface_Photo } from '../interface/photo.interface';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  public photos: Interface_Photo[] = [];

  public async addNewToGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      direction: CameraDirection.Rear,
    });

    this.photos.unshift({
      filepath: 'soon...',
      webviewPath: image.webPath!,
    });
  }

  /**
   * ?Convierte una URL de datos (data URL) en un objeto File.
   *
   * ?Este método toma una cadena que representa una URL de datos y un nombre de archivo,
   * ?realiza una solicitud para obtener el contenido de la URL, convierte el contenido
   * ?en un objeto Blob, y finalmente lo empaqueta en un objeto File que puede ser
   * ?utilizado para subir o manipular archivos en el sistema.
   *
   * *@param dataUrl - La URL de datos que contiene la representación de la imagen en
   * *formato Base64.
   * *@param filename - El nombre que se asignará al archivo resultante.
   *
   * *@returns Una promesa que se resuelve con un objeto File, que representa la imagen
   * *convertida a partir de la URL de datos.
   */

  async dataURLtoFile(dataUrl: string): Promise<File> {
    const now = new Date();
    const filename = `photo_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.jpeg`;

    const response = await fetch(dataUrl);
    const blob = await response.blob();

    return new File([blob], filename, { type: 'image/jpeg' });
  }

  removePhoto(index: number) {
    this.photos.splice(index, 1);
  }
}
