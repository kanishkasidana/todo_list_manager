export const isEmpty = (obj) => {

  for (var prop in obj) {

    if (obj[prop] !== '')
      return false;
  }

  return true;
}