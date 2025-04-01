export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  ubicacion: string;
  esServicio?: boolean;
}

export interface Service {
  id: string;
  nombre: string;
  tipoServicio: "Lugares" | "Comidas" | "Otros";
  descripcion: string;
  ubicacion: string;
  imagen: string | null;
  items: Product[];
}

export interface CardProps {
  item: Product | Service;
  category?: string;
  isService?: boolean;
  onPress: (id: string, quantity?: number) => void;
}
