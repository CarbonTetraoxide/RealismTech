GTCEuStartupEvents.registry('gtceu:material', event => {

    const materials = [
        {
            name: 'siderite',
            color: 0xD8CC9C,
            secondaryColor: 0xC9C3AC,
            iconSet: 'dull',
            dust: true,
            gem: true,
            ingot: false,
            ore: [2, 2],
            components: ["1x iron", "1x carbon", "3x oxygen"]
        },
        {
            name: 'phosphosiderite',
            color: 0xBAE968,
            secondaryColor: 0xFFFFDE,
            iconSet: 'opal',
            dust: true,
            gem: true,
            ingot: false,
            ore: [2, 4],
            components: ["1x iron", "1x phosphorus", "4x oxygen", "2x water"]
        },
        {
            name: 'azurite',
            color: 0x0091FF,
            secondaryColor: 0x005597,
            iconSet: 'opal',
            dust: true,
            gem: true,
            ingot: false,
            ore: [2, 4],
            formula: 'Cu3(OH)2(CO3)2'
        },
        {
            name: 'tenorite',
            color: 0x292929,
            iconSet: 'dull',
            dust: true,
            gem: false,
            ingot: false,
            ore: [2, 4],
            components: ["1x copper", "1x oxygen"]
        },
        {
            name: 'cuprite',
            color: 0x521B00,
            iconSet: 'dull',
            dust: true,
            gem: false,
            ingot: false,
            ore: [2, 4],
            components: ["2x copper", "1x oxygen"]
        },
        {
            name: 'green_fluorite',
            color: 0x1EC01E,
            iconSet: 'opal',
            dust: false,
            gem: true,
            ingot: false,
            ore: [2, 4],
            components: ["1x calcium", "2x fluorine"]
        },
        {
            name: 'blue_fluorite',
            color: 0x1E7AC0,
            iconSet: 'opal',
            dust: false,
            gem: true,
            ingot: false,
            ore: [2, 4],
            components: ["1x calcium", "2x fluorine"]
        },
        {
            name: 'pyromorphite',
            color: 0x24D11E,
            iconSet: 'opal',
            dust: false,
            gem: true,
            ingot: false,
            ore: [2, 4],
            components: ["5x lead", "3x phosphate", "1x chlorine"]
        }
    ];

    // 遍历并传入 event 执行全局函数
    materials.forEach(cfg => global.defineGTMaterial(event, cfg));
});