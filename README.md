# mips210
A website for compiling ASM code in MIPS structure to machine code

* I type and R type instructions
* Intructions:
```bash
R:
add | addu | and
jr  | nor  | or
slt | sltu | sll
srl | sub  | subu

I:
addi | addiu | andi | beq | bne
lb   | lw    | ori  | sb  | sw
```

# Preconditions
+ Please no logic wrong
+ Please no syntax error like this
```bash
add
$t1
$t2
$t3
```
+ Intructions can be write in short-hand as: `lw $s1, ($s2)` instead of `lw $s1, 0($s2)`,... BUT PLEASE TYPE ENOUGH ARGUMENTS
+ Add with number -> Please use `addi` instead of `add`
+ `.data`, `syscall`,... is not supported

*Author: [whynotkimhari](https://github.com/whynotkimhari)* <br>
*C++ version: [mips-instruction-to-binary](https://github.com/Aph3li0s/mips-instruction-to-binary) by me and my friends*
