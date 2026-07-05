TFCEvents.data(event => {
    event.metal(
        'gtceu:low_tin_bronze',   // 对应的流体
        1050,                      // 熔点示例
        0.5,                      // heatCapacity 示例
        'gtceu:low_tin_bronze_ingot',
        null,
        'gtceu:low_tin_bronze_plate',
        2,
        'tfc:low_tin_bronze'
    )
})
ServerEvents.recipes(event => {
    //低锡青铜
    event.custom({ 
        type: "tfc:alloy", 
        result: "tfc:low_tin_bronze", 
        contents: [
            { metal: "tfc:copper", min: 0.93, max: 0.97 }, 
            { metal: "tfc:tin",   min: 0.03, max: 0.07 }
        ]}
    )
    //黄铜
    event.remove({ id: 'tfc:alloy/brass' });
    event.custom({ 
        type: "tfc:alloy", 
        result: "tfc:brass", 
        contents: [
            { metal: "tfc:copper", min: 0.6, max: 0.7 }, 
            { metal: "tfc:zinc",   min: 0.3, max: 0.4 }
        ] 
    });
});