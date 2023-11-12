import { FUNC, OPCODE, REG, TYPE } from "./constant"
import { checkValid, instructI, instructR } from "./logic"
import { restructure } from "./tools"

export function compileMIPS(input) {
    if(input.length === 1 && input[0] === '') {
        alert("Please type something in the box!")
        return ""
    }

    let lines = []
    let labelsAddress = new Map()
    let PC = 0
    let isWrong = false
    let binCode = ""

    input.forEach(line => {
        let newLine = restructure(line)
        let size = newLine.length

        if(newLine) {
            if(size > 1) {
                if(!checkValid(newLine[0], OPCODE)) {
                    let words = newLine.slice(1, size)
                    lines.push([PC,words])
                    labelsAddress.set(newLine[0], PC)
                }
                else lines.push([PC, newLine])
                PC += 4
            }
            else labelsAddress.set(newLine[0], PC) 
        }
    })


    lines.forEach(line => {
        if(line[1].length !== 1) {
            let output = ""
            let lineAddress = line[0]
            let words = line[1]

            if(TYPE[words[0]] === "R") {
                if (words[0] === "jr") {
                    try {
                        output = OPCODE[words[0]] + REG[words[1]] + REG["$zero"] + REG["$zero"] + "00000" + FUNC[words[0]];
                    } catch (error) {
                        isWrong = true
                    }
                }
                
                else {
                    try {
                        output = instructR(words[0], words[2], words[3], words[1]);
                    } catch (error) {
                        isWrong = true
                    }
                }
            }
            else output = instructI(words, Number(lineAddress), labelsAddress);
            binCode = binCode + output + "\n"
        }

        if(isWrong) {
            alert("Something went wrong!")
            return ""
        }
    })
    return binCode
}