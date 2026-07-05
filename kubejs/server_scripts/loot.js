LootJS.modifiers((event) => {

    const tfcAnimalsRegex = /^tfc:entities\/(cow|pig|sheep|goat|yak|musk_ox|bighorn_sheep|deer|grizzly_bear|polar_bear|alpaca)$/;

    event.addLootTableModifier(tfcAnimalsRegex)
        .randomChance(0.8) // 80% 概率
        .addLoot(LootEntry.of('co4tech:blubber').limitCount(1, 2)); // 掉落 1~2 个脂肪
});