import { Color, Picture } from "../Models/types"


export {
  loadPicFromComp,
  loadPicFromInet
}


function toDataURL(url: string) {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  return fetch(proxyUrl + url)
    .then((response)=> {
      return response.blob();
    })
    .then(blob=> {
      return URL.createObjectURL(blob);
    })
    .catch(() => {
      console.log('ошибка загрузки картинки')
      return '333'
    })
}


function getBase64 (file: any, callback: any) {

  const reader = new FileReader();

  reader.addEventListener('load', () => callback(reader.result))

  reader.readAsDataURL(file);
}



interface loadPicFromInetProps {
  addPictureObj: ((imgData: {width: number, height: number, imgB64: string}) => void) | null,
  setSlideBackground: ((newBackground: Picture | Color) => void) | null,  
  isBackground: boolean,
  url: string
}

async function loadPicFromInet(props: loadPicFromInetProps) {
    const b64 = await toDataURL(props.url)
    const img = new Image()
    img.onload = () => {
      if (props.isBackground && props.setSlideBackground !== null) {
        props.setSlideBackground({imgB64: b64, fillColor: 'none', borderColor: 'unset', borderWidth: 0, type: 'picture'})
      } else if (props.addPictureObj !== null){
        props.addPictureObj({width: img.width, height: img.height, imgB64: b64})
      }
    }
    img.src = b64
}



interface loadPictureProps {
  addPictureObj: ((imgData: {width: number, height: number, imgB64: string}) => void) | null,
  setSlideBackground: ((newBackground: Picture | Color) => void) | null,  
  isBackground: boolean
}

function loadPicFromComp(props: loadPictureProps) {
  let input = document.createElement("input")
  input.type = "file"
  input.id = "inputFile"
  input.style.position = "absolute";
  input.style.top = "10px";
  input.style.left = "10px";
  input.style.transform = "scale(0)";
  input.style.visibility = "hidden";
  document.body.appendChild(input)
  input.click()
  input.onchange = () => {
    if (input.files?.item(0)?.type && input.files?.item(0)?.type.indexOf('image') === -1) {
      console.log('File is not an image.')
    } else {
        const src = URL.createObjectURL(input.files?.item(0))
        const img = new Image()
        img.onload = () => {
          getBase64(input.files?.item(0), 
          (base64Data: string) => {
            if (props.isBackground && props.setSlideBackground !== null) {
              props.setSlideBackground({imgB64: base64Data, fillColor: 'none', borderColor: 'unset', borderWidth: 0, type: 'picture'})
            } else if (props.addPictureObj !== null){
              props.addPictureObj({width: img.width, height: img.height, imgB64: base64Data})
            }
          })
        }
        img.src = src
    }
  }
}