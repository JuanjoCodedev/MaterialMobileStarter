export interface Interface_Dialog_Data {
  title: string;                    // Título del diálogo
  message: string;                  // Mensaje del diálogo
  btnAction: string;                // Texto del botón de acción (ej. "Aceptar")
  btnClose?: string;                // Texto del botón de cierre (opcional)
  onAccept?: (item?: any) => void;  // Función que se ejecuta al hacer clic en el botón "Aceptar"
  onClose?: (item?: any) => void    // Función que se ejecuta al hacer clic en el botón "Cerrar"
}
