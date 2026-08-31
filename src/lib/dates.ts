const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function getDemoDates(count = 4) {
  const dates: { id: string; label: string; value: string }[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);

  while (dates.length < count) {
    if (cursor.getDay() !== 0) {
      const value = cursor.toISOString().slice(0, 10);
      dates.push({
        id: `date:${value}`,
        label: `${days[cursor.getDay()]} ${cursor.getDate()} de ${months[cursor.getMonth()]}`,
        value,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

export const demoTimes = ["09:00", "11:30", "15:00", "17:30"] as const;
