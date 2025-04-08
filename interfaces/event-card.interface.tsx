export interface EventCardOrderItem {
  itemName: string;
  itemDescription: string;
  itemPrice: string;
  itemLocation: string;
  itemImage: string;
  itemQuantity: number;
  itemTotalPrice: number;
}

export interface EventCardOrder {
  orderDate1: string;
  orderDate2: string;
  items: EventCardOrderItem[];
}

export interface EventCardProps {
  id: string;
  imagen: string; // Used in JSX props
  title: string;
  date: string;
  location: string;
  onEdit?: () => void; // Optional since it's not used in the current usage
  isEditable: boolean;
  totalPrice: string;
  orders: EventCardOrder[];
}
