// 注册新材料
GTCEuStartupEvents.registry('gtceu:material', event => {
    //低锡青铜
    event.create('low_tin_bronze')
        .ingot()
        .fluid()
        .color(0xCD7F32)
        .iconSet(GTMaterialIconSet.METALLIC)
        .flags(
            GTMaterialFlags.GENERATE_RING, 
            GTMaterialFlags.GENERATE_PLATE, 
            GTMaterialFlags.GENERATE_ROD, 
            GTMaterialFlags.GENERATE_GEAR,
            GTMaterialFlags.GENERATE_BOLT_SCREW
        )
        .components('19x copper', '1x tin')
    .formula('Cu19Sn')

    //五氧化二钒
    global.defineGTMaterial(event, {
        name: 'divanadium_pentoxide',
        dust: true,
        color: 0xCC9900,
        components: ['2x vanadium', '5x oxygen']
    })
    //高碳钢锭
    event.create('hc_steel')
        .ingot()
        .fluid()
        .color(0x686868)
        .iconSet(GTMaterialIconSet.METALLIC)
        .flags(
            GTMaterialFlags.GENERATE_RING, 
            GTMaterialFlags.GENERATE_PLATE, 
            GTMaterialFlags.GENERATE_ROD, 
            GTMaterialFlags.GENERATE_GEAR,
            GTMaterialFlags.GENERATE_BOLT_SCREW,
            GTMaterialFlags.GENERATE_FOIL,
            GTMaterialFlags.GENERATE_DENSE,
            GTMaterialFlags.GENERATE_ROTOR,
            GTMaterialFlags.GENERATE_FRAME,
            GTMaterialFlags.GENERATE_LENS,
            GTMaterialFlags.GENERATE_FINE_WIRE,
            GTMaterialFlags.GENERATE_ROUND,
            GTMaterialFlags.GENERATE_SMALL_GEAR
        )
        .components('50x iron', '1x carbon')
})