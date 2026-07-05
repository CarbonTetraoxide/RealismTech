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
})
