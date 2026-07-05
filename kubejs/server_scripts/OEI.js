ServerEvents.highPriorityData(function (event) {
  // 物品替换
  var mappings = [
    ['tfc:powder/sylvite', 'gtceu:rock_salt_dust'],
    ['tfc:powder/salt', 'gtceu:salt_dust'],
    ['tfc:powder/malachite', 'gtceu:malachite_dust'],
    ['tfc:metal/ingot/copper', 'minecraft:copper_ingot'],
    ['tfc:metal/ingot/bronze', 'gtceu:bronze_ingot'],
    ['tfc:metal/sheet/bronze', 'gtceu:bronze_plate'],
    ['tfc:metal/double_sheet/bronze', 'gtceu:double_bronze_plate'],
    ['tfc:metal/ingot/high_carbon_steel', 'gtceu:hc_steel_ingot'],
    ['tfc:metal/ingot/steel', 'gtceu:steel_ingot'],
    ['tfc:powder/flux', 'gtceu:calcite_dust'],
    ['tfc:powder/lime', 'gtceu:quicklime_dust'],
    ['tfc:powder/saltpeter', 'gtceu:saltpeter_dust'],
    ['tfc:powder/sulfur', 'gtceu:sulfur_dust'],
    ['tfc:powder/graphite', 'gtceu:graphite_dust'],
    ['tfc:powder/native_copper', 'gtceu:copper_dust'],
    ['tfc:powder/native_silver', 'gtceu:silver_dust'],
    ['tfc:powder/native_gold', 'gtceu:gold_dust'],
    ['tfc:powder/cassiterite', 'gtceu:pure_cassiterite_dust'],
    ['tfc:powder/magnetite', 'gtceu:pure_magnetite_dust'],
    ['tfc:powder/limonite', 'gtceu:pure_yellow_limonite_dust'],
    ['tfc:powder/sphalerite', 'gtceu:pure_sphalerite_dust'],
    ['tfc:powder/charcoal', 'gtceu:charcoal_dust'],
    ['tfc:powder/coke', 'gtceu:coke_dust'],
    ['tfc:powder/tetrahedrite', 'gtceu:pure_tetrahedrite_dust'],
    ['kaleidoscope_chinesefood:salt', 'gtceu:salt_dust'],
    ['minecraft:potatoes', 'tfc:food/potato'],
    ['tfc:metal/ingot/wrought_iron', 'gtceu:wrought_iron_ingot'],
    ['tfc:metal/sheet/wrought_iron', 'gtceu:wrought_iron_plate'],
    ['tfc:metal/double_sheet/wrought_iron', 'gtceu:double_wrought_iron_plate'],
    ['tfc:metal/sheet/steel', 'gtceu:steel_plate'],
    ['tfc:metal/double_sheet/steel', 'gtceu:double_steel_plate'],
    ['tfc:metal/sheet/copper', 'gtceu:copper_plate'],
    ['tfc:metal/double_sheet/copper', 'gtceu:double_copper_plate'],
    ['ad_astra:steel_ingot', 'gtceu:steel_ingot'],
    ['ad_astra:steel_plate', 'gtceu:steel_plate'],
    ['adastra:steel_nugget', 'gtceu:steel_nugget'],
    ['adastra:steel_rod', 'gtceu:steel_rod'],
    ['kaleidoscope_cookery:tomato', 'tfc:food/tomato'],
    ['kaleidoscope_cookery:red_chili', 'tfc:food/red_bell_pepper'],
    ['kaleidoscope_cookery:green_chili', 'tfc:food/green_bell_pepper'],
    ['minecraft:apple', 'tfc:food/red_apple'],
    ['corn_delight:corn', 'tfc:food/maize'],
    ['tfc:metal/ingot/bismuth', 'gtceu:bismuth_ingot']
  ]

  var data1 = []
  for (var i = 0; i < mappings.length; i++) {
    data1.push({
      matchItems: [mappings[i][0]],
      resultItems: mappings[i][1]
    })
  }

  event.addJson('oei:replacements/oei.json', data1)

// 金属部件替换
var metals = [
  'copper', 'bronze', 'steel', 'wrought_iron', 'stainless_steel',
  'brass', 'aluminum', 'tin', 'uranium', 'silver', 'chromium',
  'lead', 'gold', 'rose_gold', 'bismuth', 'nickel', 'zinc'
]

var rules = [
  { from: 'nail', to: 'screw' },
  { from: 'rivet', to: 'screw' },
  { from: 'screw', to: 'screw' },
  { from: 'foil', to: 'foil' },
  { from: 'rod', to: 'rod' },
  { from: 'gear', to: 'gear' },
  { from: 'ring', to: 'ring' },
  { from: 'stamen', to: 'stick' }
]

var data2 = []
for (var m = 0; m < metals.length; m++) {
  for (var r = 0; r < rules.length; r++) {
    data2.push({
      matchItems: ['tfc:metal/' + rules[r].from + '/' + metals[m]],
      resultItems: 'gtceu:' + metals[m] + '_' + rules[r].to
    })
  }
}

event.addJson('oei:replacements/metal_items.json', data2)

  // 物品替换
  var mappingsFluid = [
    ['gtceu:oxygen', 'gtceu:oxygen_gas'],
    ['gtceu:chlorine', 'gtceu:chlorine_gas'],
    ['tfc:metal/tin', 'gtceu:tin'],
    ['tfc:metal/steel', 'gtceu:steel'],
    ['tfc:metal/copper', 'gtceu:copper'],
    ['tfc:metal/bronze', 'gtceu:bronze'],
    ['tfc:metal/brass', 'gtceu:brass'],
    ['tfc:metal/gold', 'gtceu:gold'],
    ['tfc:metal/bismuth', 'gtceu:bismuth'],
    ['tfc:metal/silver', 'gtceu:silver'],
    ['tfc:metal/nickel', 'gtceu:nickel'],
    ['tfc:metal/zinc', 'gtceu:zinc'],
    ['tfc:metal/wrought_iron', 'gtceu:wrought_iron']
  ]

  var data3 = []
  for (var i = 0; i < mappingsFluid.length; i++) {
    data3.push({
      matchFluid: [mappingsFluid[i][0]],
      resultFluid: mappingsFluid[i][1]
    })
  }

  event.addJson('oef:replacements/oef.json', data3)
})