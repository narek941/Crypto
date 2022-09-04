export const hideLetters = (email: string) => {
  const [name, domain] = email.split('@');
  return `${name[0]}${name[1]}${new Array(name.length - 1).join('*')}@${domain}`;
};
