ServerEvents.recipes(event => {
//兔子皮→皮革
event.remove({ type: 'minecraft:crafting_shaped', output: 'minecraft:leather' })
event.remove({id: 'gtceu:shaped/chest'})
event.remove({id: 'gtceu:shaped/mortar_grind_bronze'})
event.remove({ output: '#kaleidoscope_cookery:chair' })
event.remove({ output: '#kaleidoscope_cookery:table' })
event.remove({ output: 'sns:straw_basket' })
})