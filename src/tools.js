import { HEX2BIN } from "./constant"

export function binToHex(bin) {
    let hex = "0x"
    for(let i = 0; i < bin.length; i+=4) {
        let v = (bin[i] - '0') * 8 + (bin[i + 1] - '0') * 4 + (bin[i + 2] - '0') * 2 + (bin[i + 3] - '0') * 1
        if (v < 10) hex += v.toString()
        else hex += (v - 10 + 'a').toString()
    }
    return hex !== "0x" ? hex : ""
}

export function hexToBin(hex) {
    let bin = ""
    for(let i = 2; i < hex.length; i++) {
        bin += HEX2BIN[hex[i]]
    }
    return bin
}

export function binConvertN(str, n) {
    let dec = Number(str)
    let bin = ""
    for (let i = 0; i < n; i++) {
        bin = (dec % 2).toString() + bin
        dec /= 2
        dec = Math.floor(dec)
    }
    return bin
}

export function binToDec(bin) {
    let dec = 0, pow = 0, len = bin.length
    for(let i = len - 1; i >= 0; i--) {
        if(bin[i] === '1') dec += Math.pow(2, pow)
        ++pow
    }
    return dec
}

export function toTwoComplement(bin) {
    let found1 = false
    let result = ""
    let start = bin.length - 1
    while(start > -1) {
        if (!found1) {
            result = bin[start] + result
            if (bin[start] === '1') found1 = true
        }
        else result = (bin[start] === '1' ? '1' : '0') + result
        start--
    }
    return result
}

export function restructure(line) {
    let fmtStr = []
    let vector = line.split(/[, \t():]/)
    
    for(let i = 0; i < vector.length; i++) {
        if(vector[i].indexOf('#') !== -1) break
        if(vector[i] !== '.') 
            fmtStr.push(vector[i])
    }
    return fmtStr.filter(v => v !== '')
}