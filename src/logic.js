import { binConvertN, toTwoComplement } from './tools.js'
import { REG, OPCODE, FUNC } from './constant.js'

export function checkValid(opcode, set) {
    return opcode in set
}

export function formatR(op, rs, rt, rd, sham = "00000") {
    return OPCODE[op] + REG[rs] + REG[rt] + REG[rd] + sham + FUNC[op] 
}

export function instructR(op, rs, rt, rd) {
    let instruction = ""

    if(checkValid(op, OPCODE)) instruction = op

    if(!checkValid(rt, REG)) {
        if(instruction === "sll") {
            let sham = binConvertN(rt, 5)
            return formatR(op, "$zero", rs, rd, sham)
        }
        if(instruction === "srl") {
            let sham = binConvertN(rt, 5)
            return formatR(op, "$zero", rs, rd, sham)
        }
    }

    return formatR(op, rs, rt, rd)
}

export function instructI(words, PC, labelsAddress){
    let ins = ""
    if (checkValid(words[0], OPCODE)) ins = words[0]
    
    if(ins === "beq" || ins === "bne") {
        let opcode, rs, rt, label, labelAddr, immediate, immediate16Bit

        opcode = OPCODE[words[0]] 
        rs = REG[words[1]] 
        rt = REG[words[2]] 
        label = words[3]

        labelAddr = labelsAddress.get(label)
        
        immediate = (labelAddr - PC - 4) / 4

        if(immediate < 0) {
            immediate16Bit = binConvertN((Math.abs(immediate)).toString(), 16)
            let twoComplementImmediate16Bit = toTwoComplement(immediate16Bit)
            return opcode + rs + rt + twoComplementImmediate16Bit
        }
        else {
            immediate16Bit = binConvertN(immediate.toString(), 16)
            return opcode + rs + rt + immediate16Bit
        }
    }
    
    if(ins === "lw" || ins === "sw" || ins === "lb" || ins === "sb") {
        let len = words.length
        if(len === 4) { 
            // op: words[0], rt = words[1], imme = words[2], rs = words[3]
            let opcode, rs, rt, immediate, immediate16Bit
            opcode = OPCODE[words[0]] 
            rs = REG[words[3]] 
            rt = REG[words[1]] 
            immediate = words[2]

            if(Number(immediate) < 0) {
                immediate16Bit = binConvertN((Math.abs(Number(immediate))).toString(), 16)
                let twoComplementImmediate16Bit = toTwoComplement(immediate16Bit)
                return opcode + rs + rt + twoComplementImmediate16Bit
            }
            else {
                immediate16Bit = binConvertN(immediate, 16)
                return opcode + rs + rt + immediate16Bit
            }
        }
        
        else if(len === 3) {
            // default imme = 0
            let opcode, rs, rt, immediate = "0000000000000000"
            opcode = OPCODE[words[0]] 
            rs = REG[words[2]] 
            rt = REG[words[1]]
            return opcode + rs + rt + immediate
        }
    }
    
    if(ins === "addi" || ins === "addiu" || ins === "andi" || ins === "ori") {
        let opcode, rs, rt, immediate, immediate16Bit
        opcode = OPCODE[words[0]] 
        rs = REG[words[2]] 
        rt = REG[words[1]] 
        immediate = words[3]
        
        if(Number(immediate) < 0) {
            immediate16Bit = binConvertN((Math.abs(Number(immediate))).toString(), 16)
            let twoComplementImmediate16Bit = toTwoComplement(immediate16Bit)
            return opcode + rs + rt + twoComplementImmediate16Bit
        }
            
        else {
            immediate16Bit = binConvertN(immediate, 16)
            return opcode + rs + rt + immediate16Bit
        }
    }
    return alert("Can not find instruction I")
}
