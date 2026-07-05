GTCEuStartupEvents.registry('gtceu:material', event => {
    const materialsToRegister = [
        //硫酸铜溶液
        {
            name: 'copper_sulfate_solution',
            color: 0x00C1E8,
            liquid: true,
            components: ["1x copper", "1x sulfur", "4x oxygen", "4x water"]
        },
        //五水合硫酸铜
        {
            name: 'copper_sulfate_pentahyrate',
            color: 0x3953FF,
            secondaryColor: 0x0D26C9,
            gem: true,
            iconSet: 'opal',
            components: ["1x copper", "1x sulfur", "4x oxygen", "5x water"]
        },
        // 海盐
        {
            name: 'sea_salt',
            color: 0xFFFFEF,
            formula: 'NaCl?',
            dust: true
        },
        // 粗盐
        {
            name: 'crude_salt',
            color: 0xD8D2AB,
            formula: 'NaCl?',
            dust: true
        }
    ];
    // 遍历
    materialsToRegister.forEach(config => global.defineGTMaterial(event, config));
});
