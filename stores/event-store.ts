import { makeAutoObservable } from "mobx";
import { RootStore } from "./root-store";
import { Product } from "@/interfaces/service-product.interface";
import ICreateEventPayload from "@/interfaces/requests/create-event.interface";
import { ServiceCategory } from "@/interfaces/service-category";

export interface IEvent {
  eventName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  guestCount: number;
  placeHourlyRate: number;
  totalCost: number;
  location: string;
  userId: number;
}

export interface IOrderItem extends Product {
  quantity?: number;
}

export interface IItemsRecord {
  category: ServiceCategory;
  serviceName: string;
  items: IOrderItem[];
}

const defaultEvent: IEvent = {
  eventName: "",
  date: new Date(new Date().setDate(new Date().getDate() + 1)) ,
  startTime: new Date(),
  endTime: new Date(),
  guestCount: 0,
  placeHourlyRate: 0,
  totalCost: 0,
  location: "",
  userId: 0,
};

export class EventStore {
  root: RootStore;
  event: IEvent = defaultEvent;
  items: Record<number, IItemsRecord> = {};

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  get hasItems() {
    return !!Object.keys(this.groupedByCategory).length;
  }

  get totalUniqueItems() {
    return Object.values(this.items).reduce((count, record) => {
      return count + record.items.length;
    }, 0);
  }

  get groupedByCategory() {
    const result: Record<
      string,
      {
        serviceId: number;
        serviceName: string;
        items: {
          id: string;
          nombre: string;
          precio: number;
          quantity?: number;
        }[];
      }[]
    > = {};

    Object.entries(this.items).forEach(
      ([serviceIdStr, { category, serviceName, items }]) => {
        const serviceId = parseInt(serviceIdStr, 10);

        if (!items || items.length === 0) return;

        if (!result[category]) {
          result[category] = [];
        }

        result[category].push({
          serviceId,
          serviceName,
          items,
        });
      }
    );

    return result;
  }

  getItemByItemId(itemId: string): IOrderItem | undefined {
    for (const serviceRecord of Object.values(this.items)) {
      const foundItem = serviceRecord.items.find((item) => item.id === itemId);
      if (foundItem) return foundItem;
    }
    return undefined;
  }

  setEvent(data: Partial<IEvent>) {
    this.event = {
      ...this.event,
      ...data,
    };
  }

  addItemToService(
    serviceId: number,
    product: Product,
    quantity: number = 1,
    category: ServiceCategory,
    serviceName: string
  ) {
    if (!this.items[serviceId]) {
      this.items[serviceId] = {
        category,
        serviceName,
        items: [],
      };
    }

    const existingItem = this.items[serviceId].items.find(
      (p) => p.id === product.id
    );

    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
      this.items[serviceId].items.push({
        ...product,
        quantity,
      });
    }
  }

  updateItemQuantity(serviceId: number, itemId: string, quantity: number) {
    const service = this.items[serviceId];
    if (!service) return;

    const itemIndex = service.items.findIndex((p) => p.id === itemId);
    if (itemIndex === -1) return;

    if (quantity <= 0) {
      service.items.splice(itemIndex, 1);

      if (service.items.length === 0) {
        const newItems = { ...this.items };
        delete newItems[serviceId];
        this.items = newItems;
      }
    } else {
      service.items[itemIndex].quantity = quantity;
    }
  }

  removeItemFromService(serviceId: number, productId: string) {
    if (this.items[serviceId]) {
      this.items[serviceId].items = this.items[serviceId].items.filter(
        (p) => p.id !== productId
      );
    }
  }

  buildCreateEventPayload(): ICreateEventPayload {
    const {
      eventName,
      date,
      startTime,
      endTime,
      guestCount,
      totalCost,
      location,
      userId,
    } = this.event;

    const startDate = new Date(date);
    startDate.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);

    const endDate = new Date(date);
    endDate.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

    const eventHoursDuration =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

    const orders = Object.entries(this.items).map(([_, serviceRecord]) => {
      const orderItems = serviceRecord.items.map((item) => {
        const quantity = item.quantity ?? 1;
        let totalPrice = 0;

        if (serviceRecord.category === "Comidas") {
          totalPrice = quantity * item.precio;
        } else if (serviceRecord.category === "Otros") {
          totalPrice = eventHoursDuration * item.precio;
        } else {
          totalPrice = item.precio;
        }

        return {
          cantidad: quantity,
          precioTotal: totalPrice,
          item: {
            id: Number(item.id),
          },
        };
      });

      // Comentario para recordar quitar esto, el
      // BE está pidiendo que esta fecha sea un past date, lo cual es incorrecto
      const pastDate = new Date();
      pastDate.setDate(startDate.getDate() - 5);

      return {
        fecha1: pastDate,
        fecha2: endDate,
        itemsDeOrden: orderItems,
      };
    });

    return {
      nombreEvento: eventName,
      ubicacion: location,
      // URL default, no vamos a meter la funcionalidad de agregar imagenes
      imagen:
        "https://res.cloudinary.com/difrw7gue/image/upload/v1745210595/pexels-photo-709552_rvz2xx.jpg",
      editable: false,
      fechaHoraInicio: startDate,
      fechaHoraFinalizacion: endDate,
      numeroInvitados: guestCount,
      presupuestoFinal: totalCost,
      usuario: {
        id: userId,
      },
      ordenes: orders,
    };
  }

  resetStore() {
    this.event = defaultEvent;
    this.items = {};
  }
}
