ServerEvents.highPriorityData(event => {

    // 物品属性 (重量与尺寸)
    const toolTypes = ['pickaxe', 'axe', 'shovel', 'hoe', 'sword', 'hammer', 'saw', 'file', 'wrench', 'crowbar', 'screwdriver', 'wire_cutter', 'knife']
    
    toolTypes.forEach(type => {
        event.addJson(`tfc:tfc/item_settings/low_tin_bronze_${type}.json`, {
            "ingredient": { "item": `gtceu:low_tin_bronze_${type}` },
            "size": "huge",    // 非常大
            "weight": "heavy"  // 非常重
        })
    })
})
ServerEvents.highPriorityData(event => {
    //添加 TFC 物品属性
    event.addJson('tfc:tfc/item_settings/malachite_rocky_char.json', {
        "ingredient": {
            "item": "co4tech:malachite_rocky_char"
        },
        "size": "medium",   // 中等体积
        "weight": "medium"  // 中等重量
    })
})
