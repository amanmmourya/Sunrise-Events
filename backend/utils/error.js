export const createError = (status, message) => {
  console.log("inside the error.js file")
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};