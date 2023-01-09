export {
  createNewId,
  deepFreeze,
  getColorForJsPDF,
  calcElemsIterations
}

function createNewId(): string {
  const max = 300
  const min = 10
  const randomNum = Math.floor(Math.random() * (max - min)) + min
  const newId = String((new Date()).getTime() % 10 ** 8 + randomNum)
  return newId
}

function deepFreeze (o: any) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
    && o[prop] !== null
    && (typeof o[prop] === "object" || typeof o[prop] === "function")
    && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  
  return o;
};



function convertRGBAtoRGB(rgba: Array<number>): Array<number>{
	let r2 = 255
  let g2 = 255
  let b2 = 255
  let r = rgba[0]
  let g = rgba[1]
  let b = rgba[2]
  let a = rgba[3]
  var r3 = Math.round(((1 - a) * r2) + (a * r))
  var g3 = Math.round(((1 - a) * g2) + (a * g))
  var b3 = Math.round(((1 - a) * b2) + (a * b))
  return [r3,g3,b3]
} 


function getColorForJsPDF(str: string): Array<number> {
  console.log(str)
  let newStr = str.slice(str.indexOf('(')+1,str.indexOf(')'))
  console.log(newStr)
  const arr = newStr.split(',').map(Number)
  return convertRGBAtoRGB(arr)
} 

function calcElemsIterations(iterCount: number, elemsCount:number): number {
  let count: number = iterCount
  if (count == elemsCount || elemsCount == 1) {
    count = 0
  } 
  if (count < elemsCount) {
    count++
  }

  return count
}
