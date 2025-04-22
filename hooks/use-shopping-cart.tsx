import { IEvent, IItemsRecord } from "@/stores/event-store";
import { useMemo } from "react";

interface IUseShoppingCartParams {
  items: Record<number, IItemsRecord>;
  event: IEvent;
}

const useShoppingCart = ({ event, items }: IUseShoppingCartParams) => {
  const { startTime, endTime, placeHourlyRate } = event;

  const eventDurationHours = useMemo(() => {
    const diffMs = endTime.getTime() - startTime.getTime();
    const hours = diffMs / (1000 * 60 * 60);
    return Math.max(Math.round(hours), 1);
  }, [startTime, endTime]);

  const placeTotal = useMemo(() => {
    // Se cobra por hora
    return placeHourlyRate * eventDurationHours;
  }, [placeHourlyRate, eventDurationHours]);

  const categoryTotals = useMemo(() => {
    const totals = {
      Lugar: placeTotal,
      Comida: 0,
      Otros: 0,
    };
    Object.values(items).forEach(({ category, items }) => {
      items.forEach(({ precio, quantity = 1 }) => {
        if (category === "Comidas") {
          // Se cobra por cantidad
          totals.Comida += precio * quantity;
        } else if (category === "Otros") {
          // Se cobra por hora, multiplicado por la cantidad de ítems
          totals.Otros += precio * eventDurationHours * quantity;
        }
      });
    });

    return totals;
  }, [items, placeTotal]);

  const total = useMemo(() => {
    return categoryTotals.Lugar + categoryTotals.Comida + categoryTotals.Otros;
  }, [categoryTotals]);

  const categoryPercentages = useMemo(() => {
    return {
      Lugar: (categoryTotals.Lugar / total) * 100,
      Comida: (categoryTotals.Comida / total) * 100,
      Otros: (categoryTotals.Otros / total) * 100,
    };
  }, [categoryTotals, total]);

  return { categoryPercentages, eventDurationHours, total };
};

export default useShoppingCart;
