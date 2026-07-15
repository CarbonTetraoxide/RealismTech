ServerEvents.recipes(event => {

    event.remove({id: 'gtceu:chemical_reactor/sulfur_dioxide_from_sulfur'})

    event.remove({id: 'gtceu:chemical_reactor/sulfur_trioxide'})
    event.remove({id: 'gtceu:chemical_reactor/sulfuric_acid_from_trioxide'})
    event.remove({id: 'gtceu:large_chemical_reactor/sulfuric_acid_from_trioxide'})

    event.remove({ type: 'gtceu:chemical_reactor',  input: 'gtceu:sulfur_trioxide'})
    event.remove({ type: 'gtceu:electrolyzer',  input: 'gtceu:sulfur_trioxide'})

    event.recipes.gtceu.chemical_reactor('sulfur_dioxide')
        .itemInputs('4x gtceu:sulfur_dust')
        .inputFluids('gtceu:oxygen_gas 4000')
        .outputFluids('gtceu:sulfur_dioxide 4000')
        .duration(60)
        .EUt(8)

    //三氧化硫（小化反）
    event.recipes.gtceu.chemical_reactor('sulfur_trioxide')
        .notConsumable('gtceu:divanadium_pentoxide_dust')
        .inputFluids('gtceu:sulfur_dioxide 4000')
        .inputFluids('gtceu:oxygen_gas 2000')
        .outputFluids('gtceu:sulfur_trioxide 4000')
        .duration(100)
        .EUt(30)

    //三氧化硫（大化反）
    event.recipes.gtceu.large_chemical_reactor('sulfur_trioxide')
        .notConsumable('gtceu:divanadium_pentoxide_dust')
        .inputFluids('gtceu:sulfur_dioxide 32000')
        .inputFluids('gtceu:oxygen_gas 16000')
        .outputFluidsRanged('gtceu:sulfur_trioxide', 28800, 32000)
        .duration(100)
        .EUt(128)

    //硫酸吸收三氧化硫
    event.recipes.gtceu.chemical_reactor('disulfuric_acid')
        .inputFluids('gtceu:sulfur_trioxide 4000')
        .inputFluids('gtceu:sulfuric_acid 4000')
        .outputFluids('gtceu:disulfuric_acid 4000')
        .duration(100)
        .EUt(20)

    //焦硫酸稀释为硫酸
    event.recipes.gtceu.chemical_reactor('sulfuric_acid_1')
        .inputFluids('gtceu:disulfuric_acid 4000')
        .inputFluids('gtceu:distilled_water 4000')
        .outputFluids('gtceu:sulfuric_acid 8000')
        .duration(200)
        .EUt(20)

    //TJ金产线第一步:贵金属锭变为金合金锭
    event.recipes.gtceu.alloy_smelter('gtceu:gold_alloy_ingot')
        .itemInputs(Ingredient.of('gtceu:precious_metal_ingot').or('gtceu:precious_metal_dust'),Ingredient.of('minecraft:copper_ingot').or('gtceu:copper_dust').withCount(3))
        .itemOutputs('4x gtceu:gold_alloy_ingot')
        .duration(100)
        .EUt(30)

    //TJ金产线第二步:硝酸浸泡金合金锭
    event.recipes.gtceu.chemical_reactor('gtceu:gold_leach_dust')
        .itemInputs('4x gtceu:gold_alloy_ingot')
        .inputFluids('gtceu:nitric_acid 1000')
        .itemOutputs('4x gtceu:gold_leach_dust')
        .outputFluids('gtceu:nitrogen_dioxide 1000')
        .duration(80)
        .EUt(30)

    //TJ金产线第三步(之一):电解浸出的金粉
    event.recipes.gtceu.electrolyzer('gtceu:gold_dust')
        .itemInputs('4x gtceu:gold_leach_dust')
        .inputFluids('gtceu:hydrogen 1000')
        .chancedOutput("gtceu:gold_dust", 8888, 0)
        .outputFluids('minecraft:water 1000')
        .duration(300)
        .EUt(30)
})
