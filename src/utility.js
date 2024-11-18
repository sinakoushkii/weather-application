export const getCurrentDate = () => {
  const today = new Date();
  const dateOnly = today.toISOString().split("T")[0];
  return dateOnly;
};
export const getLastFiveDates = () => {
  const dates = [];
  for (let i = 0; i < 5; i++) {
      const date = new Date();
    date.setDate(date.getDate() - i);
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
  }
  return dates
};
