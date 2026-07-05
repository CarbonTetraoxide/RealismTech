global.defineGTMaterial = (event, config) => {
    const builder = event.create(config.name)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .color(config.color)
        .iconSet(config.iconSet || 'dull');

    //次要颜色
    if (config.secondaryColor !== undefined) {
        builder.secondaryColor(config.secondaryColor);
    }

    //形态注册
    if (config.dust === true) builder.dust();
    if (config.gem === true)  builder.gem();
    if (config.ingot === true) builder.ingot();
    if (config.liquid === true) builder.liquid(); // 支持液体注册

    //注册矿石属性
    if (config.ore) {
        const oreData = config.ore;
        const harvestLevel = oreData[0];
        const amount = oreData[1];
        const isByproduct = oreData.length > 2 ? oreData[2] : false;
        builder.ore(harvestLevel, amount, isByproduct);
    }

    // 化学式
    if (config.components) {
        builder.components(config.components);
    } else if (config.formula) {
        builder.formula(config.formula);
    }
};

//材料修改函数
global.modifyGTMaterial = (config) => {

    let mat = typeof config.id === 'string' ? GTMaterials.get(config.id) : config.id;
    if (!mat) return;

    // 修改颜色 (ARGB)
    if (config.color !== undefined) {
        mat.setMaterialARGB(config.color);
    }

    // 修改化学式
    if (config.formula !== undefined) {
        mat.setFormula(config.formula, true);
    }

    // 修改化学成分
    if (config.components !== undefined) {
        mat.setComponents(config.components);
    }
};