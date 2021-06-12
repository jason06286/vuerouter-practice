export function currency(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
export function date(time) {
  const localTime = new Date(time * 1000);
  return localTime.toLocaleDateString();
}
