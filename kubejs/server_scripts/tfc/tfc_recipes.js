ServerEvents.recipes(event => {

    //注册皮革浸泡配方
    const registerHideSoaking = (size, amount) => {
        const fluids = ['limewater', 'lye'];
        
        fluids.forEach(fluidType => {
            event.recipes.tfc.barrel_sealed(4000)
                .outputItem(`tfc:${size}_soaked_hide`)
                .inputItem(`tfc:${size}_raw_hide`)
                .inputFluid(Fluid.of(`tfc:${fluidType}`, amount))
                .id(`co4tech:tfc/barrel/${fluidType}_${size}_hide`);
        });
    };

    //金属工具配方
    const registerMetalRecipes = (data) => {
        const { mold, fluid, temp, mB, fullToolID, headID } = data;
        
        //模具浇筑
        event.recipes.tfc.casting(headID, mold, fluid, mB)
            .break_chance(0.1);
        
        //部件熔融
        event.recipes.tfc.heating(headID, temp)
            .resultFluid(Fluid.of(fluid, mB));

        //工具熔融与组装
        if (fullToolID) {
            event.recipes.tfc.heating(fullToolID, temp)
                .resultFluid(Fluid.of(fluid, mB));

            event.shaped(fullToolID, [
                'H', 
                'S'
            ], { 
                H: headID, 
                S: '#forge:rods/wooden' 
            });
        }
    };

    //石锯头雕刻配方
    event.recipes.tfc.knapping(
        'co4tech:stone_saw', 
        'tfc:rock', 
        [
            '  XXX', 
            'X  XX', 
            'XX  X', 
            'XX   ', 
            'XXXX '
        ]
    ).outsideSlotRequired(false);
    //木质工作台配方修改
    const workbenchRegex = /^(tfc|afc):wood\/planks\/(.+)_workbench$/;
    Ingredient.of(workbenchRegex).getItemIds().forEach(tableId => {
        const match = tableId.match(workbenchRegex);
        if (match) {
            const mod = match[1];
            const wood = match[2];
            const planksId = `${mod}:wood/planks/${wood}`;

            event.remove({ output: tableId });
            event.shapeless(tableId, [
                '#tfc:metal_saw', 
                planksId, planksId, planksId, planksId
            ]);
        }
    });

   //皮革处理移除
    const hideConfigs = [
        { size: 'large',  amount: 500 },
        { size: 'medium', amount: 400 },
        { size: 'small',  amount: 300 }
    ];

    hideConfigs.forEach(hide => {
        event.remove({ output: `tfc:${hide.size}_soaked_hide` });
        registerHideSoaking(hide.size, hide.amount);
    });

    // 移除旧配方
    event.remove({ type: 'tfc:barrel_instant', input: 'tfc:powder/flux', output: 'tfc:limewater' });
    event.remove({ type: 'tfc:barrel_instant', input: 'tfc:powder/lime', output: 'tfc:limewater' });
    event.remove({ id: 'tfc:pot/lye' });
    event.remove({ id: /^bsa:crafting\/ceramic\/pot\/unfired\// });
    event.remove({ id: /^bsa:crafting\/ceramic\/jug\/unfired\// });
    event.remove({ id: 'tfc:alloy/weak_steel' });
    
    // 盐粉替换
    event.replaceInput({ not: { mod: 'gtceu' } }, 'tfc:powder/salt', 'gtceu:salt_dust');
    event.replaceOutput({}, 'tfc:powder/salt', 'gtceu:salt_dust');

    // 制作碱液 (木灰 + 水)
    event.recipes.tfc.barrel_instant()
        .inputItem('tfc:powder/wood_ash')
        .inputFluid(Fluid.of('minecraft:water', 500))
        .outputFluid(Fluid.of('tfc:lye', 500))
        .id('co4tech:barrel/instant/lye_from_ash');

    // 盐水蒸发
    event.recipes.tfc.pot([], Fluid.of('tfc:salt_water', 500), 2000, 100)
        .itemOutput([Item.of('gtceu:sea_salt_dust', 1)])
        .id('co4tech:pot/evapo_salt_water');

    const bronzeFluid = 'gtceu:low_tin_bronze';
    const bronzeTemp = 1050;

    // 工具定义列表
    const bronzeTools = [
        { id: 'pickaxe', mold: 'tfc:ceramic/pickaxe_head_mold', qty: 1 },
        { id: 'axe',     mold: 'tfc:ceramic/axe_head_mold',     qty: 1 },
        { id: 'shovel',  mold: 'tfc:ceramic/shovel_head_mold',  qty: 1 },
        { id: 'hoe',     mold: 'tfc:ceramic/hoe_head_mold',     qty: 1 },
        { id: 'sword',   mold: 'tfc:ceramic/sword_blade_mold',  qty: 2 }
    ];

    //注册工具配方
    bronzeTools.forEach(tool => {
        const suffix = (tool.id === 'sword') ? 'blade' : 'head';
        registerMetalRecipes({
            mold: tool.mold,
            fluid: bronzeFluid,
            temp: bronzeTemp,
            mB: tool.qty * 100,
            fullToolID: `co4tech:low_tin_bronze_${tool.id}`,
            headID: `co4tech:low_tin_bronze_${tool.id}_${suffix}`
        });
    });

    //基础锭配方
    event.recipes.tfc.casting('gtceu:low_tin_bronze_ingot', 'tfc:ceramic/ingot_mold', bronzeFluid, 100)
        .break_chance(0.1);

    event.recipes.tfc.heating('gtceu:low_tin_bronze_ingot', bronzeTemp)
        .resultFluid(Fluid.of(bronzeFluid, 100));

    //铜矿粒产出
    event.remove({ type: 'tfc:heating', input: [
        'tfc:ore/small_native_copper', 
        'tfc:ore/small_tetrahedrite', 
        'tfc:ore/small_malachite'
    ]});
    
    event.recipes.tfc.heating('tfc:ore/small_native_copper', 1085)
        .result_fluid(Fluid.of('tfc:metal/copper', 25));
    
    //火把 草篮
    event.remove({ type: 'tfc:heating', output: 'tfc_aol:flaming_stake' });
    event.recipes.tfc.heating('minecraft:stick', 230)
        .resultItem(Item.of('tfc_aol:flaming_stake'));

    event.recipes.tfc.heating('tfc:stick_bunch', 230)
        .resultItem(Item.of('tfc_aol:flaming_stake', 9));
        
    event.shaped(
        Item.of('sns:straw_basket'), 
        [
            'A  ', 
            'AA '
        ], 
        { A: 'tfc:straw' }
    );
});

ServerEvents.tags('item', event => {
    
    // 基础金属标签
    event.add('tfc:metal/low_tin_bronze', 'gtceu:low_tin_bronze_ingot');
    
    // 工具分类
    const toolTagMap = { 
        'tfc:pickaxes': 'pickaxe', 
        'tfc:axes':     'axe', 
        'tfc:shovels':  'shovel', 
        'tfc:hoes':      'hoe', 
        'tfc:swords':   'sword', 
        'tfc:hammers':  'hammer', 
        'tfc:knives':   'knife' 
    };
    
    Object.keys(toolTagMap).forEach(tag => {
        event.add(tag, `gtceu:low_tin_bronze_${toolTagMap[tag]}`);
    });
});
//肥皂制作
ServerEvents.recipes(event => {
    event.recipes.tfc.barrel_sealed(2000)
        .outputItem('2x co4tech:soap')
        .inputs(
            'co4tech:blubber', 
            TFC.fluidStackIngredient('tfc:lye', 500)
        )
        .sound('minecraft:block.brewing_stand.brew');
});

ServerEvents.recipes(event => {
    //删除
    event.remove({ id: 'firmalife:pot/cured_maize_5' });
    event.remove({ id: 'firmalife:vat/cured_maize' });
    event.remove({ id: 'tfc:barrel/fresh_to_salt_water' });
    event.remove({ id: 'kaleidoscope_chinesefood:smelting/salt' });
    event.remove({ id: 'kaleidoscope_chinesefood:salt' });

    //腌玉米
    event.recipes.tfc.barrel_sealed(4000)
        .inputItem('4x tfc:food/maize_grain')
        .inputFluid(Fluid.of('tfc:salt_water', 1000))
        .outputItem('4x firmalife:food/cured_maize')
        .id('co4tech:barrel/sealed/cured_maize')
});