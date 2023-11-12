import './App.css'
import { ERROR_404_I, ERROR_MSG, ERROR_CONVERT_NEED, PLACEHOLDER_INPUT, PLACEHOLDER_OUTPUT_BIN, PLACEHOLDER_OUTPUT_HEX, TEXT_BIN, TEXT_HEX} from './constant.js'
import { compileMIPS } from './main.js'
import { binToHex, typing } from './tools.js'

let isBin = true
let resultBin = ""


const handleClickEvent = (e) => {
  const input = document.getElementById("input")
  const output = document.getElementById("output")
  switch(e.target.dataset.key) {
    case "clear":
      input.value = ""
      output.value = ""
      output.placeholder = PLACEHOLDER_OUTPUT_BIN
      break
    case "convert":
      isBin = true
      resultBin = compileMIPS(input.value.split("\n"))
      typing("output", resultBin)
      break
    case "sw-bin":
      if(!isBin) {
        isBin = true
        if(input.value && output.value) typing("output", resultBin)
        if(!input.value && !output.value) output.placeholder = PLACEHOLDER_OUTPUT_BIN

      }
      break
    case "sw-hex":
      if(isBin) {
        isBin = false
        if(input.value && output.value) {
          let content = (resultBin !== ERROR_MSG && resultBin !== ERROR_404_I) ? resultBin.split("\n") : ""
          let newContent = ""
          content.forEach(line => newContent += binToHex(line) + "\n")
          typing("output", newContent)
        }
        if(!input.value && !output.value) output.placeholder = PLACEHOLDER_OUTPUT_HEX
        else output.placeholder = ERROR_CONVERT_NEED
          
        
      }
      break
    case "copy":
      break
    default:
      break
  }
}

const Header = () => {
  return (
    <>
      <h1 className="text-center font-bold text-6xl mt-4 mb-4">MIPS210</h1>
    </>
  )
}

const Footer = () => {
  return (
    <>
      <div className="fixed bottom-0 mx-auto w-full mb-4">
        <p className="text-center"><a href="https://github.com/whynotkimhari">whynotkimhari <box-icon type='logo' name='github' size='16px'></box-icon></a></p>
      </div>
    </>
  )
}

const IOSection = () => {
  return (
    <>
      <div className="container mx-auto columns-2">
        <div className="w-full pr-2 pl-4 flex flex-col">
          <h2 className="text-center font-bold mb-2">Please paste your assembly (MIPS) code in below box!</h2>
          <textarea 
            className="w-full h-96 mb-2 border border-black rounded-lg p-2 focus:outline-none" 
            style={{resize: "none"}} 
            id="input" 
            autoFocus="autofocus"
            placeholder={PLACEHOLDER_INPUT}
          >
          </textarea>
          <div className="flex self-center">
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="clear" onClick={handleClickEvent}>ClearAll</button>
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="convert" onClick={handleClickEvent}>Convert</button>
          </div>
        </div>
        <div className="w-full pl-2 pr-4 flex flex-col">
          <h2 className="text-center font-bold mb-2">{isBin ? TEXT_BIN : TEXT_HEX}</h2>
          <textarea 
            className="w-full h-96 mb-2 border border-black rounded-lg p-2" 
            style={{resize: "none"}} 
            id="output" 
            disabled
            placeholder={PLACEHOLDER_OUTPUT_BIN}
          ></textarea>
          <div className="flex self-center">
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="sw-bin" onClick={handleClickEvent}>Binary Version</button>
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="sw-hex" onClick={handleClickEvent}>Hexadecimal Version</button>
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="copy" onClick={handleClickEvent}>Copy Value</button>
          </div>
        </div>
      </div>
    </>
  )
}

const App = () => {
  return (
    <div className="App">
      <Header />
      <IOSection />
      <Footer />
    </div>
  );
}

export default App;
