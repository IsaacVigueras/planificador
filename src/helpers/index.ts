export const formatQuantity = (quantity: number): string => {
  return quantity.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const generateId = (): string => {
  const random: string = Math.random().toString(36).substring(2, 11);
  const date = Date.now().toString(36);

  return random + date;
};

export const formatDate = (date: number) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return newDate.toLocaleDateString('es-ES', options);
};
