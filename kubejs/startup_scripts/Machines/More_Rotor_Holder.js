const $RotorHolderPartMachine = Java.loadClass("com.gregtechceu.gtceu.common.machine.multiblock.part.RotorHolderPartMachine")
const $GTValues = Java.loadClass("com.gregtechceu.gtceu.api.GTValues")
const $RotationState = Java.loadClass("com.gregtechceu.gtceu.api.data.RotationState")
const $PartAbility = Java.loadClass("com.gregtechceu.gtceu.api.machine.multiblock.PartAbility")
const $GTMachineModelProperties = Java.loadClass("com.gregtechceu.gtceu.api.machine.property.GTMachineModelProperties")
GTCEuStartupEvents.registry('gtceu:machine', event => {
    event.create('rotor_holder', 'custom')
        .machine((holder, tier) => new $RotorHolderPartMachine(holder, tier))
        //目前仅增加LV和MV级别的转子
        .tiers(
            $GTValues.LV,
            $GTValues.MV,
        )
        .definition((tier, builder) => {
            builder
                .langValue(`${$GTValues.VNF[tier]} 转子支架`)
                .rotationState($RotationState.ALL)
                .abilities($PartAbility.ROTOR_HOLDER)
                .modelPropertyBool($GTMachineModelProperties.IS_FORMED, false)
                .modelPropertyBool($GTMachineModelProperties.HAS_ROTOR, false)
                .modelPropertyBool($GTMachineModelProperties.IS_ROTOR_SPINNING, false)
                .modelPropertyBool($GTMachineModelProperties.IS_EMISSIVE_ROTOR, false)
                .model(
                GTMachineModels.createRotorHolderModel()[
                    "andThen(com.gregtechceu.gtceu.api.registry.registrate.MachineBuilder$ModelInitializer)"
                    ]((ctx, prov, model) => {
                  model.addReplaceableTextures("bottom", "top", "side");
                })
            )
        })
})
