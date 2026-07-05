ClientEvents.lang('zh_cn', event => {
    event.add('material.gtceu.low_tin_bronze', '低锡青铜')
    event.add('material.gtceu.divanadium_pentoxide', '五氧化二钒')
    event.add('metal.tfc.low_tin_bronze', '液态低锡青铜')
    event.add('material.gtceu.oxygen_gas', '氧气')
    event.add('material.gtceu.chlorine_gas', '氯气')
    event.add('material.gtceu.disulfuric_acid', '焦硫酸')
})
ClientEvents.lang('zh_cn', event => {
    const materialName = '低锡青铜'
    const modid = 'co4tech'

    const tools = [
        { id: 'pickaxe', name: '镐', suffix: '头' },
        { id: 'axe',     name: '斧', suffix: '头' },
        { id: 'shovel',  name: '铲', suffix: '头' },
        { id: 'hoe',     name: '锄', suffix: '头' },
        { id: 'sword',   name: '长剑', suffix: '剑刃' }
    ]

    tools.forEach(tool => {
        // 1. 翻译工具成品 (例如: 低锡青铜镐)
        event.add(`item.${modid}.low_tin_bronze_${tool.id}`, `${materialName}${tool.name}`)
        
        // 2. 翻译工具头 (例如: 低锡青铜镐头)
        let suffixType = (tool.id === 'sword') ? 'blade' : 'head'
        event.add(`item.${modid}.low_tin_bronze_${tool.id}_${suffixType}`, `${materialName}${tool.name}${tool.suffix}`)
    })
})
// priority: 0
// priority: 0