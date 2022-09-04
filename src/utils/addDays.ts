export const addDays = function (str: any, days: any) {
  const myDate = new Date(str);
  myDate.setDate(myDate.getDate() + parseInt(days));
  return myDate;
};
