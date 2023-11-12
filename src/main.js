import { ERROR_MSG, FUNC, OPCODE, REG, TYPE } from "./constant"
import { checkValid, instructI, instructR } from "./logic"
import { restructure } from "./tools"

export function compileMIPS(input) {
    if(input.length === 1 && input[0] === '') return ERROR_MSG

    let lines = []
    let labelsAddress = new Map()
    let PC = 0
    let isWrong = false
    let binCode = ""

    input.forEach(line => {
        let newLine = restructure(line)
        let size = newLine.length

        if(size !== 0) {
            if(size > 1) {
                if(!checkValid(newLine[0], OPCODE)) {
                    let words = newLine.slice(1, size)
                    lines.push([PC,words])
                    labelsAddress.set(newLine[0].replace(/:/g, ''), PC)
                }
                else lines.push([PC, newLine])
                PC += 4
            }
            else if(size === 1) {
                if(newLine[0].endsWith(":")) labelsAddress.set(newLine[0].replace(/:/g, ''), PC)
                else if(newLine[0].startsWith(".")) console.log("a")
                else return ERROR_MSG
            }
            else isWrong = true
        }
    })
    
    lines.forEach(line => {
        if(line[1].length !== 1) {
            let output = ""
            let lineAddress = line[0]
            let words = line[1]

            if(TYPE[words[0]] === "R") {
                if (words[0] === "jr") {
                    if(checkValid(words[1], REG)) output = OPCODE[words[0]] + REG[words[1]] + REG["$zero"] + REG["$zero"] + "00000" + FUNC[words[0]];
                    else isWrong = true
                }
                
                else output = instructR(words[0], words[2], words[3], words[1]);
            }
            else if(TYPE[words[0]] === "I") output = instructI(words, Number(lineAddress), labelsAddress);
            else isWrong = true;
            binCode = binCode + output + "\n"
        }
        if(isWrong) return ERROR_MSG
    })
    if(isWrong) return ERROR_MSG

    return binCode ? binCode : ERROR_MSG
}