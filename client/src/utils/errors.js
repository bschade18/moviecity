export const applyErrorStyle = (inputField, alerts) =>
  alerts.filter((alert) => alert.param === inputField).length > 0;
