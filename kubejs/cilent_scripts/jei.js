JEIEvents.hideItems(event => {
    event.hide('/^tfc:ore\\/(?!small_).*/');
    event.hide('/^firmalife:ore.*/');
});
"use strict";

EmiPlusPlusEvents.registerGroups(event => {
    const GT_GROUPS_TO_REGISTER = [
        '#forge:ores',
        '#forge:raw_materials',
        '#forge:crushed_ores',
        '#forge:purified_ores',
        '#forge:refined_ores',
        '#forge:dusts',
        '#forge:pure_dusts',
        '#forge:impure_dusts',
        '#forge:tiny_dusts',
        '#forge:small_dusts',
        '#forge:storage_blocks'
    ]

    GT_GROUPS_TO_REGISTER.forEach(x => {
        const [mod, item] = x.split(":");
        const safeItem = item.split("/").join("_");
        event.register(`co4tech:gt_${safeItem}`, x)
    })
})

let itemsToHide = [];
try {
    Ingredient.of(/.*(blue_steel|red_steel).*/).getItemIds().forEach(id => {
        itemsToHide.push(id);
    });
} catch (e) {
    console.error("获取隐藏物品列表失败: " + e);
}

//隐藏的流体 ID
const fluidsToHide = [
    'tfc:metal/blue_steel',
    'tfc:metal/red_steel',
    'tfc:metal/weak_blue_steel',
    'tfc:metal/weak_red_steel',
    'tfc:metal/high_carbon_blue_steel',
    'tfc:metal/high_carbon_red_steel',
    'gtceu:blue_steel',
    'gtceu:red_steel'
];

try {
    if (typeof EMIEvents !== 'undefined') {
        EMIEvents.hideIngredients(event => {
            // 隐藏物品
            itemsToHide.forEach(id => {
                event.hide(id);
            });
            // 隐藏流体
            fluidsToHide.forEach(fluidId => {
                event.hide(`fluid:${fluidId}`);
            });
        });
    }
} catch (err) {
    console.warn("未检测到 EMI 或 EMIEvents 执行失败: " + err);
}
