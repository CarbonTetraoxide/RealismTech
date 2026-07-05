
StartupEvents.registry('item', event => {
Platform.mods.kubejs.name = 'co4tech'
  event.create('co4tech:stone_saw', 'axe')
    .tier('stone')
    .displayName('楔形石头')
    .maxDamage(15)
    .unstackable()

  event.create('co4tech:soap', 'basic')
    .displayName('肥皂')
    .maxDamage(8)

//动物脂肪
  event.create('co4tech:blubber')
    .displayName('动物脂肪')
//热钢锭
  event.create('co4tech:hot_steel_ingot')
    .displayName('热钢锭')
})
// 低锡青铜工具等级
ItemEvents.toolTierRegistry(event => {
  event.add('low_tin_bronze', tier => {
    tier.uses = 1000                // 耐久度
    tier.speed = 6.0                // 挖掘速度
    tier.attackDamageBonus = 3.0    // 攻击力加成
    tier.level = 2                  // 采掘等级 (2 = 铁/青铜)
    tier.repairIngredient = 'gtceu:low_tin_bronze_ingot' // 修复材料
  })
})

// 低锡青铜工具
StartupEvents.registry('item', event => {
    const toolTypes = ['pickaxe', 'axe', 'shovel', 'hoe', 'sword']
    
    toolTypes.forEach(type => {
        // 注册工具
        event.create(`co4tech:low_tin_bronze_${type}`, type).tier('low_tin_bronze').color(0, 0xCD7F32)

        let suffix = (type === 'sword') ? 'blade' : 'head'
        event.create(`co4tech:low_tin_bronze_${type}_${suffix}`).color(0, 0xCD7F32)
    })
})