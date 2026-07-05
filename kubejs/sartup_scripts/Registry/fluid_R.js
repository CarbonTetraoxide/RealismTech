GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('lye_water')
        .fluid() //这是一个流体材质
        .color(0x808080) // 设置颜色
        .formula('K2CO3?(H2O)')
})
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('oxygen_gas')
        .gas()
        .color(0x00DEFF)
        .components('2x oxygen') 
        .formula('O2') 
})
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('chlorine_gas')
        .gas()
        .color(0xD4FF7D)
        .components('2x chlorine') 
        .formula('Cl2') 
})
GTCEuStartupEvents.registry('gtceu:material', event => {
    event.create('disulfuric_acid')
        .fluid()
        .color(0x9C5900)
        .components('2x hydrogen','2x sulfur','7x oxygen') 
        .formula('H2S2O7')
})