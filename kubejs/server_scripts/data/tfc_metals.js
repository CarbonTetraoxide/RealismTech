ServerEvents.recipes(event => {

    
    //移除
    event.remove({ input: /.*(blue_steel|red_steel).*/ });
    event.remove({ output: /.*(blue_steel|red_steel).*/ });

    event.forEachRecipe({}, recipe => {
        let recipeId = recipe.getId();
        if (!recipeId) return;

        let jsonStr = recipe.json.toString();
        if (jsonStr.includes('blue_steel') || jsonStr.includes('red_steel')) {
            event.remove({ id: recipeId });
        }
    });

    const metalConfigs = {
        'copper': {
            temp: 1085,
            fluids: ['tfc:metal/copper', 'gtceu:copper'],
            correctFluid: 'tfc:metal/copper',
            gtName: 'copper'
        },
        'steel': {
            temp: 1425,
            fluids: ['tfc:metal/steel', 'gtceu:steel'],
            correctFluid: 'tfc:metal/steel',
            gtName: 'steel'
        },
        'high_carbon_steel': {
            temp: 1540,
            fluids: ['tfc:metal/high_carbon_steel', 'gtceu:high_carbon_steel'],
            correctFluid: 'tfc:metal/high_carbon_steel',
            gtName: 'high_carbon_steel'
        }
    };

    function isSteelItem(str) {
        let s = str.toLowerCase();
        return s.includes('steel') && !s.includes('cast_iron') && !s.includes('pig_iron') && !s.includes('wrought_iron');
    }

    function getIngredientString(input) {
        if (typeof input === 'string') return input;
        if (Array.isArray(input)) {
            let first = input[0];
            if (first) {
                return first.item ? first.item : (first.tag ? '#' + first.tag : "");
            }
        }
        if (input.item) return input.item;
        if (input.tag) return '#' + input.tag;
        return "";
    }

    // GTCEU 常见部件
    const gtParts = [
        { suffix: 'ingot', amount: 100 },
        { suffix: 'double_ingot', amount: 200 },
        { suffix: 'nugget', amount: 11 },
        { suffix: 'dust', amount: 100 },
        { suffix: 'tiny_dust', amount: 11 },
        { suffix: 'small_dust', amount: 25 },
        { suffix: 'plate', amount: 100 },
        { suffix: 'double_plate', amount: 200 },
        { suffix: 'dense_plate', amount: 900 },
        { suffix: 'rod', amount: 50 },
        { suffix: 'bolt', amount: 12 },
        { suffix: 'screw', amount: 12 },
        { suffix: 'ring', amount: 25 },
        { suffix: 'rotor', amount: 400 },
        { suffix: 'gear', amount: 400 },
        { suffix: 'small_gear', amount: 100 },
        { suffix: 'spring', amount: 100 },
        { suffix: 'fine_wire', amount: 12 },
        { suffix: 'foil', amount: 25 }
    ];

    let recipesToReplace = [];

    //动态扫描修正金属配方
    event.forEachRecipe({ type: 'tfc:heating' }, recipe => {
        let recipeJson = JSON.parse(recipe.json.toString());
        if (!recipeJson || !recipeJson.result_fluid) return;

        let fluidName = recipeJson.result_fluid.fluid;
        let inputStr = getIngredientString(recipeJson.ingredient);
        if (!inputStr) return;

        let matchedConfig = null;
        let targetFluid = fluidName;

        if (isSteelItem(inputStr) && (fluidName.includes('cast_iron') || fluidName.includes('pig_iron'))) {
            matchedConfig = metalConfigs['steel'];
            targetFluid = 'tfc:metal/steel';
        } else {
            for (let key in metalConfigs) {
                if (metalConfigs[key].fluids.includes(fluidName)) {
                    matchedConfig = metalConfigs[key];
                    targetFluid = matchedConfig.correctFluid;
                    break;
                }
            }
        }

        if (matchedConfig) {
            recipesToReplace.push({
                input: inputStr,
                temp: matchedConfig.temp,
                fluid: targetFluid,
                amount: recipeJson.result_fluid.amount,
                resultItem: recipeJson.result_item,
                useDurability: recipeJson.use_durability || false,
                chance: recipeJson.chance !== undefined ? recipeJson.chance : 1.0
            });
        }
    });

    recipesToReplace.forEach(r => {
        event.remove({ type: 'tfc:heating', input: r.input });

        let newRecipe = event.recipes.tfc.heating(r.input, r.temp)
            .resultFluid(Fluid.of(r.fluid, r.amount));

        if (r.resultItem) {
            let itemStr = typeof r.resultItem === 'string' ? r.resultItem : r.resultItem.item;
            let count = r.resultItem.count || 1;
            newRecipe.resultItem(Item.of(itemStr, count));
        }
        if (r.useDurability) {
            newRecipe.useDurability(true);
        }
        if (r.chance < 1.0) {
            newRecipe.chance(r.chance);
        }
    });

    //GTCEU 铜、钢、高碳钢部件生成配方
    Object.keys(metalConfigs).forEach(metalKey => {
        const config = metalConfigs[metalKey];
        const outputFluid = config.correctFluid;

        gtParts.forEach(part => {
            const itemId = `gtceu:${config.gtName}_${part.suffix}`;
            if (Item.of(itemId).isEmpty()) return;

            event.remove({ type: 'tfc:heating', input: itemId });
            event.recipes.tfc.heating(itemId, config.temp)
                .resultFluid(Fluid.of(outputFluid, part.amount));
        });
    });
});
