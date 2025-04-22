export default interface ICreateEventPayload {
  nombreEvento: string;
  ubicacion: string;
  imagen: string;
  editable: boolean;
  fechaHoraInicio: Date;
  fechaHoraFinalizacion: Date;
  numeroInvitados: number;
  presupuestoFinal: number;
  usuario: {
    id: number;
  };
  ordenes: {
    fecha1: Date;
    fecha2: Date;
    itemsDeOrden: {
      cantidad: number;
      precioTotal: number;
      item: {
        id: number;
      };
    }[];
  }[];
}
