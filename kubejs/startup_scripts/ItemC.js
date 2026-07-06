GTCEuStartupEvents.materialModification(event => {
    const modifications = [
        { 
            id: "rocksalt", 
            color: 0xE0E0E0 
        },
        { 
            id: 'sulfuric_copper_solution', 
            formula: 'CuSO4', 
            components: ['1x copper', '1x sulfur', '4x oxygen'] 
        },
        { 
            id: 'diluted_sulfuric_acid', 
            formula: '(H2SO4)(H2O)', 
            components: ['1x sulfuric_acid', '1x water'] 
        },
        { 
            id: 'brass', 
            formula: 'Cu13Zn7', 
            components: ['13x copper', '7x zinc'] 
        },
        { 
            id: 'steel', 
            formula: 'Fe150C',
            components: ['150x iron', '1x carbon'] 
        },
        { 
            id: "redstone", 
            formula: 'Rd', 
            components: [] 
        },
        { 
            id: "trona", 
            components: ["1x soda_ash", "1x sodium_bicarbonate", "2x water"] 
        },
        { 
            id: "alunite", 
            components: ["1x potassium", "1x aluminium", "2x sulfur", "8x oxygen", "12x water"] 
        },
        { 
            id: "gypsum", 
            components: ["1x calcium", "1x sulfur", "4x oxygen", "2x water"] 
        },
        {
            id: 'bronze',
            formula: 'Cu9Sn',
            components: ['9x copper', '1x zinc']
        }
    ];

    // 遍历执行修改
    modifications.forEach(global.modifyGTMaterial);
});

Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey')
Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.ToolProperty')

GTCEuStartupEvents.registry('gtceu:material', event => {
    const copper = GTMaterials.get('copper')

    copper.setProperty(
        PropertyKey.TOOL,
        ToolProperty.Builder.of(
            5.0,
            5.0,
            172,
            2,
            [
                GTToolType.SWORD,
                GTToolType.MINING_HAMMER,
                GTToolType.HOE,
                GTToolType.AXE,
                GTToolType.WRENCH,
                GTToolType.SHOVEL,
                GTToolType.KNIFE
            ]
        ).build()
    )
})
