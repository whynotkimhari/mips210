export const REG = {
    "$zero" : "00000",
    "$at" : "00001",
    "$v0" : "00010",
    "$v1" : "00011",
    "$a0" : "00100",
    "$a1" : "00101",
    "$a2" : "00110",
    "$a3" : "00111",
    "$t0" : "01000",
    "$t1" : "01001",
    "$t2" : "01010",
    "$t3" : "01011",
    "$t4" : "01100",
    "$t5" : "01101",
    "$t6" : "01110",
    "$t7" : "01111",
    "$s0" : "10000",
    "$s1" : "10001",
    "$s2" : "10010",
    "$s3" : "10011",
    "$s4" : "10100",
    "$s5" : "10101",
    "$s6" : "10110",
    "$s7" : "10111",
    "$t8" : "11000",
    "$t9" : "11001",
    "$k0" : "11010",
    "$k1" : "11011",
    "$gp" : "11100",
    "$sp" : "11101",
    "$fp" : "11110",
    "$ra" : "11111",
}

export const TYPE = {
    "add" : "R",
    "addu" : "R",
    "and" : "R",
    "jr" : "R",
    "nor" : "R",
    "or" : "R",
    "slt" : "R",
    "sltu" : "R",
    "sll" : "R",
    "srl" : "R",
    "sub" : "R",
    "subu" : "R",

    "addi" : "I",
    "addiu" : "I",
    "andi" : "I",
    "beq" : "I",
    "bne" : "I",
    "lb" : "I",
    "lw" : "I",
    "ori" : "I",
    "sb" : "I",
    "sw" : "I",
}

export const OPCODE = {
    "add" : "000000",
    "addu" : "000000",
    "and" : "000000",
    "jr" : "000000",
    "nor" : "000000",
    "or" : "000000",
    "slt" : "000000",
    "sltu" : "000000",
    "sll" : "000000",
    "srl" : "000000",
    "sub" : "000000",
    "subu" : "000000",

    "addi" : "001000",
    "addiu" : "001001",
    "andi" : "001100",
    "beq" : "000100",
    "bne" : "000101",
    "lb" : "100000",
    "lw" : "100011",
    "ori" : "001101",
    "sb" : "101000",
    "sw" : "101011",
}

export const FUNC = {
    "add" : "100000",
    "addu" : "100001",
    "and" : "100100",
    "jr" : "001000",
    "nor" : "100111",
    "or" : "100101",
    "slt" : "101010",
    "sltu" : "101011",
    "sll" : "000000",
    "srl" : "000010",
    "sub" : "100010",
    "subu" : "100011",
}

export const HEX2BIN = {
    "0":"0000",
    "1":"0001",
    "2":"0010",
    "3":"0011",
    "4":"0100",
    "5":"0101",
    "6":"0110",
    "7":"0111",
    "8":"1000",
    "9":"1001",
    "A":"1010",
    "B":"1011",
    "C":"1100",
    "D":"1101",
    "E":"1110",
    "F":"1111",
}

export const ERROR_MSG = "Something went wrong in this line! Please check the format of your instruction"
export const ERROR_404_I = "Can not find instruction I"
export const ERROR_CONVERT_NEED = "Please convert before switch to other type!"
export const PLACEHOLDER_INPUT = "add $t1, $t2, $t1\naddi $t1, $a0, 0\nlw $a3, 4($t1)"
export const PLACEHOLDER_OUTPUT_BIN = "00000001010010010100100000100000\n00100000100010010000000000000000\n10001101001001110000000000000100"
export const PLACEHOLDER_OUTPUT_HEX = "0x01494820\n0x20890000\n0x8D270004"
export const TEXT_BIN = "The binary code of your code is here!"
export const TEXT_HEX = "The hexadecimal code of your code is here!"