/**
 * 
 * @param {string} txt - The text to be sliced
 * @param {number} [max=100] - The maximum length of the text
 * @returns {string} - The sliced text + "..." if the text is longer than the max length
 */
export function textSlicer(txt: string , max : number = 100){
  if(txt.length >= max){
    return txt.slice(0,max) + "...";
  }
  return txt;
}