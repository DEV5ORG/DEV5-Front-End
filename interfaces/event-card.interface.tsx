/* // interfaces/event-card.interface.tsx

export interface FoodService {
  image: string;
  serviceName: string;
  order: string;
  price: string;
  location: string;
  requestedDeliveryDateTime: string;
  requestedDeliveryLocation: string;
  isEditable: boolean;
}

export interface Place {
  image: string;
  title: string;
  location: string;
  orderUnits: string;
  unitType: string;
  pricePerUnit: string;
  priceBeforeDiscount: string;
  discountPercentage: string;
  finalPrice: string;
  date: string;
  arrivalTime: string;
  finalizationTime: string;
  isEditable: boolean;
}

export interface Entertainment {
  image: string;
  title: string;
  location: string;
  orderUnits: string;
  unitType: string;
  pricePerUnit: string;
  priceBeforeDiscount: string;
  discountPercentage: string;
  finalPrice: string;
  date: string;
  arrivalTime: string;
  finalizationTime: string;
  isEditable: boolean;
}

export interface EventCardProps {
  imagen: string;
  title: string;
  date: string;
  location: string;
  onEdit: () => void;
  isEditable: boolean;
  totalPrice: string;
  food: FoodService;
  place: Place;
  entertainment: Entertainment;
}
 */