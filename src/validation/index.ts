/**
 * Validates a product object for required fields and constraints.
 *
 * @param {Object} product - The product to be validated.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product's image.
 * @param {string} product.price - The price of the product.
 *
 * @returns {Object} - An object containing error messages for invalid fields.
 * @property {string} title - Error message for the title field.
 * @property {string} description - Error message for the description field.
 * @property {string} imageURL - Error message for the imageURL field.
 * @property {string} price - Error message for the price field.
 */
export const productValidation = (product: {title: string, description: string, imageURL: string, price:string, colors:string}) => {
  const errors :{title: string, description: string, imageURL: string, price:string ,colors:string} = {
    title: "",
    description: "",
    imageURL: "",
    price:"",
    colors:""
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if(!product.title.trim() || product.title.length < 8 || product.title.length > 50){
    errors.title = "Title must be between 8 and 50 characters";
  }

  if(!product.description.trim() || product.description.length < 10 || product.description.length > 900){
    errors.description = "Description must be between 10 and 900 characters";
  }

  if(!product.imageURL.trim() || !validUrl){
    errors.imageURL = "Valid Image URL is required";
  }

  if(!product.price.trim() || isNaN(Number(product.price))){
    errors.price = "Valid Price is required";
  }

  if (product.colors === "") {
    errors.colors = "";
  } else if (!product.colors) {
    errors.colors = "At least one color is required";
  }


  return errors;
}