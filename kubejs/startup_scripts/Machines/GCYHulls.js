//迁移自GCY的一些方块
const motorTiers = [
    { id: 'lv_motor',  hardness: 3.0 },
    { id: 'mv_motor',  hardness: 3.5 },
    { id: 'hv_motor',  hardness: 4.0 },
    { id: 'ev_motor',  hardness: 4.5 },
    { id: 'iv_motor',  hardness: 5.0 },
    { id: 'luv_motor', hardness: 5.5 },
    { id: 'zpm_motor', hardness: 6.0 },
    { id: 'uv_motor',  hardness: 6.5 },
    { id: 'uhv_motor', hardness: 7.0 },
    { id: 'uev_motor', hardness: 7.5 },
    { id: 'uiv_motor', hardness: 8.0 },
    { id: 'umv_motor', hardness: 8.5 },
    { id: 'uxv_motor', hardness: 9.0 },
    { id: 'max_motor', hardness: 10.0 }
]

const casingTiers = [
    { id: 'lv_integral_casing', tex:'lv', hardness: 3.0 },
    { id: 'mv_integral_casing', tex:'mv', hardness: 3.5 },
    { id: 'hv_integral_casing', tex:'hv', hardness: 4.0 },
    { id: 'ev_integral_casing', tex:'ev', hardness: 4.5 },
    { id: 'iv_integral_casing', tex:'iv', hardness: 5.0 },
    { id: 'luv_integral_casing', tex:'luv', hardness: 5.5 },
    { id: 'zpm_integral_casing', tex:'zpm', hardness: 6.0 },
    { id: 'uv_integral_casing', tex:'uv', hardness: 6.5 },
    { id: 'uhv_integral_casing', tex:'uhv', hardness: 7.0 },
    { id: 'uev_integral_casing', tex:'uev', hardness: 7.5 },
    { id: 'uiv_integral_casing', tex:'uiv', hardness: 8.0 },
    { id: 'umv_integral_casing', tex:'umv', hardness: 8.5 },
    { id: 'uxv_integral_casing', tex:'uxv', hardness: 9.0 },
    { id: 'max_integral_casing', tex:'max', hardness: 10.0 }
]

StartupEvents.registry('block', event => {
    motorTiers.forEach(tier => {
        event.create(tier.id)
            .soundType(SoundType.METAL)
            .hardness(tier.hardness)
            .resistance(tier.hardness * 2)
            .requiresTool()
            .model('kubejs:block/hulls/tiers/'+tier.id)
            .tag('kubejs:electric_motors')
            .opaque(false)
            .fullBlock(false)
            .box(2, 0, 1, 14, 16, 15)
            .renderType("cutout")
    })
    casingTiers.forEach(tier => {
        event.create(tier.id)
            .soundType(SoundType.METAL)
            .hardness(tier.hardness)
            .resistance(tier.hardness * 2)
            .requiresTool()
            .tag('kubejs:integral_casing')
            .textureAll('kubejs:block/integral/machine_casing_tiered_hull_'+tier.tex)
    })
})
