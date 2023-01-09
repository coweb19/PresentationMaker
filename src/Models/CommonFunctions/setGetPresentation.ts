import {
  Programm,
  Slide,
  PictureObj,
  TextObj,
  ShapeObj,
  MainProg,
  ActionType
} from '../types';

import { jsPDF } from "jspdf";  //npm install jspdf --save      or      yarn add jspdf
import { store } from '../..';
import { getColorForJsPDF } from './SupportFunctions/CommonOperations';



export {
  saveProgramAsPDF,
  openProgramAsPDF,
  savePresentationAsJSON,
  re_getMainProg
}


const exportWidth = 1400
const exportHeight = 850

function savePresentationAsJSON() {
  const prog = store.getState().mainProg 
  const progName = prog.currentPresentation.title + '.json'
  let progFile = new Blob([JSON.stringify(prog)], {type: 'json'})
  if (window.navigator.msSaveOrOpenBlob)
    window.navigator.msSaveOrOpenBlob(progFile, progName)
  else {
    let a = document.createElement("a"),
    url = URL.createObjectURL(progFile)
    a.href = url
    a.download = progName
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}

export function loadPresentation(getMainProg: (prog: MainProg) => void) {
  let input = document.createElement("input")
  input.type = "file"
  input.id = "inputFile"
  document.body.appendChild(input)

  input.onchange = function() {
    let files = input.files as FileList
    let f:File = files[0] as File
    let reader = new FileReader()
    reader.onload = function(e) {
      let target: any = e.target
      let data: MainProg = JSON.parse(target.result) as MainProg
      getMainProg(data)
    }
    reader.onerror = function (e) {
        alert("Error loading")
    }
    reader.readAsText(f);
  }

  input.click();

  setTimeout(function () {
      document.body.removeChild(input)
  }, 0);  
}


function re_getMainProg(action: ActionType): Programm {
  let selectedSlide = action.payload.currentPresentation.slides[0].id
  return {
    mainProg: {
      ...action.payload,
      selectedSlides: [selectedSlide]
    },
    commonDeps: {    
      canDeleteSlides: true,
      elemsMoveCount: 0,
      saveToArch: true,
      slideBorderLight: {
          borderLightPlace: 'unset',
          slideId: ''
      },
      copyElemsArr: [],
      copySlidesArr: [],
      playerIsOpen: false    
    }    
  }
}

async function openDocPDF(prog: MainProg, Path:string, doc:jsPDF){
  await setPDF(prog, doc)
  doc.setProperties({ title: prog.currentPresentation.title })
  doc.output('dataurlnewwindow')
}

async function saveDocPDF(prog: MainProg, Path:string, doc:jsPDF){
  await setPDF(prog, doc)
  doc.save(Path + "/" + prog.currentPresentation.title + ".pdf")
}

function saveProgramAsPDF() {
  const prog = store.getState().mainProg
  const Path: string = ''
  let doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [exportWidth, exportHeight]
    })  
  saveDocPDF(prog, Path, doc)
}

function openProgramAsPDF() {
  const prog = store.getState().mainProg
  const Path: string = ''
  let doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [exportWidth, exportHeight]
    })  
  openDocPDF(prog, Path, doc)
}

function setPDF(prog: MainProg , doc: jsPDF) {
  for (var i = 0; i < prog.currentPresentation.slides.length; i++){
    doc = setPagePDF(prog.currentPresentation.slides[i], doc)
    if (i + 1 < prog.currentPresentation.slides.length) {
        doc.addPage([exportWidth, exportHeight], "landscape")
    }
  }
}

function setPagePDF(progSlide: Slide, doc:jsPDF) {   
  if (progSlide.background.type == "picture") {
    let imgData2 = progSlide.background.imgB64
      doc.addImage(imgData2, 'PNG', +0, +0, +exportWidth, +exportHeight)
  }
  if (progSlide.background.type == "color") {
    const backColor = getColorForJsPDF(progSlide.background.hexColor)
    doc.setFillColor(backColor[0], backColor[1], backColor[2])
    doc.rect(0, 0, exportWidth, exportHeight, "F")
  }
  for (var i = 0; i < progSlide.elements.length; i++) {
    doc = setElementToPagePDF(progSlide.elements[i], doc)
  }
  return doc
}

function setElementToPagePDF(progSlide:(PictureObj|ShapeObj|TextObj), doc:jsPDF) {
  if (progSlide.type === "picture")
    doc = setPictureToPagePDF(progSlide, doc)
  else if (progSlide.type === "text")
    doc = setTextToPagePDF(progSlide, doc)
  else
    doc = setShapeToPagePDF(progSlide, doc)
  return doc
}

function setPictureToPagePDF(progSlide:PictureObj, doc:jsPDF) {  
  if (progSlide.fillColor === "none") {
    let imgData2 = progSlide.imgB64
    doc.addImage(imgData2, 'PNG', +progSlide.position.x, +progSlide.position.y, +progSlide.width, +progSlide.height)
  }
  else {
    const fillColor = getColorForJsPDF(progSlide.fillColor)
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2])
    doc.rect(+progSlide.position.x, +progSlide.position.y, +progSlide.width, +progSlide.height, "F")
  }
  if (progSlide.borderColor !== "unset"){
    const borderColor = getColorForJsPDF(progSlide.borderColor)
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2])
    doc.rect(+progSlide.position.x, +progSlide.position.y, +progSlide.width, +progSlide.height, "S")
  }
  return doc
}

function setShapeToPagePDF(progSlide:ShapeObj, doc:jsPDF) {
  const fillColor = getColorForJsPDF(progSlide.fillColor)
  const borderColor = getColorForJsPDF(progSlide.borderColor)
  doc.setLineWidth(progSlide.borderWidth)

  let drawType = ""

  if (progSlide.fillColor !== "unset" && progSlide.borderColor !== "unset") {
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2])
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2])
    drawType = "DF"
  }
  else {
    if (progSlide.fillColor !== "unset") {
      doc.setFillColor(fillColor[0], fillColor[1], fillColor[2])
      drawType = "F";
    }
    if (progSlide.borderColor !== "unset") {
      doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2])
      drawType = "S"
    }
  }
  if (drawType !== "") {
    if (progSlide.type ===  "circle")
      doc.ellipse(+(progSlide.position.x + progSlide.width / 2), +(progSlide.position.y + progSlide.height / 2), 
        +progSlide.width / 2, +progSlide.height / 2, drawType)
    else if (progSlide.type ===  "triangle")
      doc.triangle(+progSlide.position.x + +progSlide.width/2, +progSlide.position.y, 
        +progSlide.position.x, +progSlide.position.y + +progSlide.height, 
        +progSlide.position.x + +progSlide.width, +progSlide.position.y + +progSlide.height, drawType)
    else
      doc.rect(+progSlide.position.x, +progSlide.position.y, +progSlide.width, +progSlide.height, drawType)
  }
  return doc
}

function setTextToPagePDF(progSlide:TextObj, doc:jsPDF) {
  doc = setTextBackgrondToPagePDF(progSlide, doc)
  if (progSlide.text.length > 0) 
    doc = setTextLinesToPagePDF(progSlide, doc)
  return doc 
}

function setTextBackgrondToPagePDF(progSlide:TextObj, doc:jsPDF){
  let borderLag = 0 // при границах нужно корректировать размеры
  if (progSlide.borderWidth > 0)
    borderLag = progSlide.borderWidth / 2
  let drawType = ""
  const fillColor = getColorForJsPDF(progSlide.fillColor)
  const borderColor = getColorForJsPDF(progSlide.borderColor)
  doc.setLineWidth(progSlide.borderWidth);
  if (progSlide.fillColor !== "unset" && progSlide.borderColor !== "unset") {
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2])
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2])
    drawType = "DF"
  }
  else {
    if (progSlide.fillColor !== "unset") {
      doc.setFillColor(fillColor[0], fillColor[1], fillColor[2])
      drawType = "F"
    }
    if (progSlide.borderColor !== "unset") {
      doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
      drawType = "S"
    }
  }
  if (drawType !== "")
    doc.rect(+progSlide.position.x - borderLag, +progSlide.position.y - borderLag, +progSlide.width + borderLag * 2, +progSlide.height + borderLag * 2, drawType)
  return doc
}

function setTextLinesToPagePDF(progSlide:TextObj, doc:jsPDF) {
  let CanEl:HTMLCanvasElement = document.createElement('canvas')
  CanEl.id = 'picID'
  let ctx = CanEl.getContext("2d")
  let startPosition = 0
  let sLine = ""
  let lineNumber = 0
  CanEl.height = parseInt(progSlide.fontSize) * 0.9
  while (startPosition <= progSlide.text.length) {
    if (progSlide.text[startPosition] === '\n' || startPosition === progSlide.text.length) {
      CanEl.width = sLine.length * parseInt(progSlide.fontSize) * 0.6
      if (CanEl.width > progSlide.width)
        CanEl.width = +progSlide.width-parseInt(progSlide.fontSize) * 0.05
      if (ctx != null) {
        ctx.fillStyle = progSlide.textColor
        ctx.font = progSlide.fontSize + "px " + progSlide.fontFamily
        ctx.fillText(sLine, 0, parseInt(progSlide.fontSize)*0.75) 
      }
      let imgData2 = CanEl.toDataURL('image/png')
      doc.addImage(imgData2, 'PNG', +progSlide.position.x+parseInt(progSlide.fontSize) * 0.05, +progSlide.position.y + parseInt(progSlide.fontSize)*lineNumber+parseInt(progSlide.fontSize) * 0.15 * (lineNumber + 1), 
        +CanEl.width, +CanEl.height)
      lineNumber += 1
      sLine = ""
    } 
    else
      sLine += progSlide.text[startPosition]
    startPosition += 1
  }
  return doc
}