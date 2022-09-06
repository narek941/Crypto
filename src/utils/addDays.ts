const addDays = function (str: string, days: number) {
  const myDate = new Date(str);
  myDate.setDate(myDate.getDate() + days);
  return myDate;
};
export default addDays;
