export interface Interface_Bottom_sheet {
  icon?: string;                  // Icono de Hoja inferior
  title: string;                  // Título de Hoja inferior
  line: string;                   // Mensaje de ayuda Hoja inferior
  handler?: (item: any) => void;  // Función que se ejecuta al hacer clic
}
