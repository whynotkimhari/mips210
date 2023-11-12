import './App.css'
import { compileMIPS } from './main.js'
import { binToHex, hexToBin } from './tools.js'

const PlaceholderInput = "add $t1, $t2, $t1\naddi $t1, $a0, 0\nlw $a3, 4($t1)"
const PlaceholderOutputBin = "00000001010010010100100000100000\n00100000100010010000000000000000\n10001101001001110000000000000100"
const PlaceholderOutputHex = "0x01494820\n0x20890000\n0x8D270004"
const textBin = "The binary code of your code is here!"
const textHex = "The hexadecimal code of your code is here!"
let isBin = true


const handleClickEvent = (e) => {
  switch(e.target.dataset.key) {
    case "clear":
      document.getElementById("input").value = ""
      break
    case "convert":
      document.getElementById("output").value = compileMIPS(document.getElementById("input").value.split("\n"))
      break
    case "sw-bin":
      if(!isBin) {
        isBin = true
        let content = document.getElementById("output").value.split("\n")
        let newContent = ""
        content.forEach(line => newContent += hexToBin(line) + "\n")
        document.getElementById("output").value = newContent
      }
      break
    case "sw-hex":
      if(isBin) {
        isBin = false
        let content = document.getElementById("output").value.split("\n")
        let newContent = ""
        content.forEach(line => newContent += binToHex(line) + "\n")
        document.getElementById("output").value = newContent
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
        <p className="text-center"><a href="https://github.com/whynotkimhari">Build by whynotkimhari <box-icon type='logo' name='github' size='16px'></box-icon></a></p>
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
            placeholder={PlaceholderInput}
          >
          </textarea>
          <div className="flex self-center">
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="clear" onClick={handleClickEvent}>ClearAll</button>
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="convert" onClick={handleClickEvent}>Convert</button>
          </div>
        </div>
        <div className="w-full pl-2 pr-4 flex flex-col">
          <h2 className="text-center font-bold mb-2">{isBin ? textBin : textHex}</h2>
          <textarea 
            className="w-full h-96 mb-2 border border-black rounded-lg p-2" 
            style={{resize: "none"}} 
            id="output" 
            disabled
            placeholder={isBin ? PlaceholderOutputBin : PlaceholderOutputHex}
          ></textarea>
          <div className="flex self-center">
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="sw-bin" onClick={handleClickEvent}>Binary Version</button>
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="sw-hex" onClick={handleClickEvent}>Hexadecimal Version</button>
            <button className="mx-2 p-1 border border-black rounded-lg" data-key="copy" onClick={handleClickEvent} disabled>Copy Value</button>
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
