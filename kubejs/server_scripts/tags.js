ServerEvents.tags('item', event => {
  //群峦石器
  event.add('tfc:stone_axe_head', 'tfc:stone/axe_head/igneous_extrusive')
  event.add('tfc:stone_axe_head', 'tfc:stone/axe_head/igneous_intrusive')
  event.add('tfc:stone_axe_head', 'tfc:stone/axe_head/metamorphic')
  event.add('tfc:stone_axe_head', 'tfc:stone/axe_head/sedimentary')

  event.add('tfc:stone_axe', 'tfc:stone/axe/igneous_extrusive')
  event.add('tfc:stone_axe', 'tfc:stone/axe/igneous_intrusive')
  event.add('tfc:stone_axe', 'tfc:stone/axe/metamorphic')
  event.add('tfc:stone_axe', 'tfc:stone/axe/sedimentary')


  event.add('tfc:stone_knife_head', 'tfc:stone/knife_head/igneous_extrusive')
  event.add('tfc:stone_knife_head', 'tfc:stone/knife_head/igneous_intrusive')
  event.add('tfc:stone_knife_head', 'tfc:stone/knife_head/metamorphic')
  event.add('tfc:stone_knife_head', 'tfc:stone/knife_head/sedimentary')

  event.add('tfc:stone_knife', 'tfc:stone/knife/igneous_extrusive')
  event.add('tfc:stone_knife', 'tfc:stone/knife/igneous_intrusive')
  event.add('tfc:stone_knife', 'tfc:stone/knife/metamorphic')
  event.add('tfc:stone_knife', 'tfc:stone/knife/sedimentary')


  event.add('tfc:stone_shovel_head', 'tfc:stone/shovel_head/igneous_extrusive')
  event.add('tfc:stone_shovel_head', 'tfc:stone/shovel_head/igneous_intrusive')
  event.add('tfc:stone_shovel_head', 'tfc:stone/shovel_head/metamorphic')
  event.add('tfc:stone_shovel_head', 'tfc:stone/shovel_head/sedimentary')

  event.add('tfc:stone_shovel', 'tfc:stone/shovel/igneous_extrusive')
  event.add('tfc:stone_shovel', 'tfc:stone/shovel/igneous_intrusive')
  event.add('tfc:stone_shovel', 'tfc:stone/shovel/metamorphic')
  event.add('tfc:stone_shovel', 'tfc:stone/shovel/sedimentary')

  event.add('tfc:saws', 'kubejs:stone_saw')
  event.add('tfc:metal_saw', /^tfc:metal\/saw\/.+/)

  event.add('tfc:can_landslide', 'tfc:thatch')

  event.add('co4tech:stone_saw', 'tfc:saw')

  event.add('tfc:salt', 'gtceu:sea_salt_dust')
  event.add('tfc:salt', 'gtceu:salt_dust')
  
  event.add('tfc:coarse_flour', /^bsa:food\/coarse_.*_flour$/)
})

ServerEvents.tags('item', event => {
    const types = ['table', 'chair', 'cupboard', 'counter', 'drawer', 'desk'];
    
    types.forEach(type => {
        let regex;
        if (type === 'drawer') {
            regex = /^mcw_tfc_aio:(?!.*counter).*drawer.*/;
        } else {
            regex = new RegExp(`^mcw_tfc_aio:.*${type}.*`);
        }
        event.add(`forge:${type}`, regex);
    });
});

ServerEvents.tags('block', event => {
    const types = ['table', 'chair', 'cupboard', 'counter', 'drawer', 'desk'];
    
    types.forEach(type => {
        let regex;
        if (type === 'drawer') {
            regex = /^mcw_tfc_aio:(?!.*counter).*drawer.*/;
        } else {
            regex = new RegExp(`^mcw_tfc_aio:.*${type}.*`);
        }
        event.add(`forge:${type}`, regex);
    });
});

ServerEvents.tags('block', event => {

    event.add('minecraft:mineable/pickaxe', /gtceu:.*_ore/);

    //设置挖掘等级为石器级别
    event.add('minecraft:needs_stone_tool', /gtceu:.*_ore/);

    //格雷矿石标记为可勘探
    event.add('tfc:prospectable', /gtceu:.*_ore/);
});