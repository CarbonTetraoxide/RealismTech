const IGNEOUS_ROCKS = [
    'granite', 'diorite', 'andesite', 'basalt', 'rhyolite', 'dacite', 'gabbro'
];

const METAMORPHIC_ROCKS = [
    'quartzite', 'slate', 'phyllite', 'schist', 'gneiss', 'marble'
];

const SEDIMENTARY_ROCKS = [
    'shale', 'claystone', 'limestone', 'conglomerate', 'dolomite', 'chert', 'chalk'
];

ServerEvents.highPriorityData(event => {
    const SOLID_GROUND_FILTER = { 
        type: "minecraft:block_predicate_filter", 
        predicate: { 
            type: "minecraft:not", 
            predicate: { 
                type: "minecraft:matching_blocks", 
                offset: [0, 3, 0], 
                blocks: ["minecraft:air", "minecraft:cave_air", "minecraft:void_air"] 
            } 
        } 
    };

    const CLIMATE_TROPICAL_WET = { type: "tfc:climate", min_temperature: 15, min_rain: 300 };
    const CLIMATE_ARID = { type: "tfc:climate", max_rain: 180 };
    const CLIMATE_SEMI_ARID = { type: "tfc:climate", max_rain: 250 };
    const CLIMATE_HOT_VOLCANIC = { type: "tfc:climate", min_temperature: 20 };
    const CLIMATE_WET_BASIN = { type: "tfc:climate", min_rain: 250 }; 

    const FILTER_UNDERGROUND = { type: "tfc:underground" };
    const FILTER_VOLCANO_CENTER = { type: "tfc:volcano", center: true, distance: 0.0 };
    const FILTER_VOLCANO_NEAR = { type: "tfc:volcano", center: false, distance: 0.5 };
    const FILTER_VOLCANO_WIDE = { type: "tfc:volcano", center: false, distance: 0.9 };

    function registerGTVein(veinType, veinId, oresList, rarity, minY, maxY, typeParams, indicatorItem, allowedRocks, placementModifiers) {
        let blockReplacements = allowedRocks.map(rock => {
            return {
                replace: [`tfc:rock/raw/${rock}`],
                with: oresList.map(ore => {
                    let blockName = ore.block ? ore.block : `gtceu:${rock}_${ore.material}_ore`;
                    return {
                        weight: ore.weight,
                        block: { Name: blockName }
                    };
                })
            };
        });

        let calculatedDepth = Math.max(15, 120 - minY);

        let config = {
            rarity: rarity,
            min_y: minY,
            max_y: maxY,
            blocks: blockReplacements,
            random_name: veinId,
            indicator: {
                blocks: [{ weight: 1, block: { Name: indicatorItem } }],
                rarity: 32,
                underground_rarity: 12,
                underground_count: 2,
                depth: calculatedDepth
            }
        };

        Object.assign(config, typeParams);

        event.addJson(`kubejs:worldgen/configured_feature/${veinId}.json`, {
            type: veinType,
            config: config
        });

        event.addJson(`kubejs:worldgen/placed_feature/${veinId}.json`, { 
            feature: `kubejs:${veinId}`, 
            placement: placementModifiers || [] 
        });
    }

    registerGTVein(
        'tfc:disc_vein', 'gt_magnetite_vein',
        [
            { material: 'magnetite', weight: 45 },
            { material: 'chromite', weight: 25 },
            { material: 'ilmenite', weight: 15 },
            { material: 'rutile', weight: 5 },
            { material: 'vanadium_magnetite', weight: 5 },
            { material: 'pyrite', weight: 4 },
            { material: 'gold', weight: 1 }
        ],
        105, -50, -10,
        { radius: 14, height: 6, size: 35, density: 0.30 },
        'tfc:ore/small_magnetite', ['basalt', 'gabbro', 'gneiss'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_diamond_vein',
        [{ material: 'diamond', weight: 12 }, { material: 'graphite', weight: 88 }],
        351, -64, -30,
        { radius: 3, height: 90, size: 12, density: 0.45, min_skew: 0.0, max_skew: 0.1, min_slant: 0.0, max_slant: 0.1, sign: 1.0 },
        'tfc:ore/small_diamond', ['basalt', 'gabbro'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_platinum_vein',
        [{ material: 'cooperite', weight: 70 }, { material: 'palladium', weight: 20 }, { material: 'platinum', weight: 10 }],
        351, -60, -20,
        { radius: 25, height: 2, size: 30, density: 0.21 },
        'gtceu:cooperite_indicator', ['gabbro'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_pentlandite_vein',
        [{ material: 'pentlandite', weight: 60 }, { material: 'pyrrhotite', weight: 40 }],
        234, -60, -20,
        { radius: 16, height: 4, size: 35, density: 0.27 },
        'gtceu:pentlandite_indicator', ['gabbro', 'basalt'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:cluster_vein', 'gt_olivine_vein',
        [{ material: 'olivine', weight: 90 }, { material: 'bentonite', weight: 10 }],
        215, -55, -5,
        { size: 20, density: 0.18 },
        'gtceu:olivine_indicator', ['gabbro', 'basalt'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_chalcopyrite_vein',
        [{ material: 'chalcopyrite', weight: 60 }, { material: 'pyrite', weight: 38 }, { material: 'copper', weight: 2 }],
        127, -45, 20,
        { radius: 3, height: 65, size: 22, density: 0.27, min_skew: 0.1, max_skew: 0.5, min_slant: 0.2, max_slant: 0.5, sign: 1.0 },
        'tfc:ore/small_native_copper', IGNEOUS_ROCKS.concat(['schist', 'gneiss', 'quartzite']),
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_cassiterite_vein',
        [{ material: 'cassiterite', weight: 75 }, { material: 'tin', weight: 25 }],
        166, -20, 40,
        { radius: 3, height: 55, size: 20, density: 0.18, min_skew: 0.2, max_skew: 0.6, min_slant: 0.3, max_slant: 0.7, sign: 0.5 },
        'tfc:ore/small_cassiterite', ['granite', 'rhyolite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_tungsten_vein',
        [{ material: 'scheelite', weight: 70 }, { material: 'wolframite', weight: 30 }],
        200, -60, -10,
        { radius: 2, height: 75, size: 16, density: 0.33, min_skew: 0.1, max_skew: 0.3, min_slant: 0.1, max_slant: 0.3, sign: 1.0 },
        'gtceu:scheelite_indicator', ['granite', 'diorite', 'gneiss', 'marble'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_bornite_chalcocite_vein',
        [{ material: 'bornite', weight: 50 }, { material: 'chalcocite', weight: 35 }, { material: 'chalcopyrite', weight: 15 }],
        166, -30, 15,
        { radius: 4, height: 60, size: 26, density: 0.24, min_skew: 0.1, max_skew: 0.4, min_slant: 0.2, max_slant: 0.5, sign: 1.0 },
        'tfc:ore/small_native_copper', ['granite', 'diorite', 'dacite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_rutile_vein',
        [
            { material: 'rutile', weight: 50 },
            { material: 'ilmenite', weight: 30 },
            { material: 'almandine', weight: 15 },
            { material: 'hematite', weight: 5 }
        ],
        240, -30, 10,
        { radius: 3, height: 50, size: 18, density: 0.24, min_skew: 0.1, max_skew: 0.4, min_slant: 0.1, max_slant: 0.4, sign: 1.0 },
        'gtceu:rutile_indicator', ['schist', 'gneiss', 'granite', 'quartzite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_monazite_vein',
        [{ material: 'monazite', weight: 60 }, { material: 'thorium', weight: 40 }],
        254, -30, 10,
        { radius: 3, height: 45, size: 18, density: 0.24, min_skew: 0.1, max_skew: 0.3, min_slant: 0.1, max_slant: 0.3, sign: 1.0 },
        'gtceu:monazite_indicator', ['granite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:cluster_vein', 'gt_beryl_vein',
        [{ material: 'beryl', weight: 80 }, { material: 'emerald', weight: 20 }],
        273, -20, 30,
        { size: 12, density: 0.24 },
        'gtceu:beryl_indicator', ['granite', 'schist'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:cluster_vein', 'gt_cobaltite_vein',
        [{ material: 'cobaltite', weight: 100 }],
        254, -40, 0,
        { size: 14, density: 0.21 },
        'gtceu:cobaltite_indicator', ['gabbro', 'gneiss', 'schist'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_molybdenite_vein',
        [{ material: 'molybdenite', weight: 100 }],
        234, -50, 0,
        { radius: 4, height: 55, size: 22, density: 0.18, min_skew: 0.1, max_skew: 0.3, min_slant: 0.1, max_slant: 0.4, sign: 1.0 },
        'gtceu:molybdenite_indicator', ['granite', 'diorite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_bismuth_vein',
        [{ material: 'bismuthinite', weight: 80 }, { material: 'bismuth', weight: 20 }],
        176, -30, 20,
        { radius: 3, height: 50, size: 18, density: 0.24, min_skew: 0.1, max_skew: 0.4, min_slant: 0.1, max_slant: 0.4, sign: 1.0 },
        'tfc:ore/small_bismuthinite', ['granite', 'rhyolite', 'diorite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_pyrochlore_tantalite_vein',
        [{ material: 'pyrochlore', weight: 60 }, { material: 'tantalite', weight: 40 }],
        293, -40, 10,
        { radius: 3, height: 45, size: 16, density: 0.24, min_skew: 0.1, max_skew: 0.3, min_slant: 0.1, max_slant: 0.3, sign: 1.0 },
        'gtceu:pyrochlore_indicator', ['granite', 'rhyolite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:cluster_vein', 'gt_mica_vein',
        [{ material: 'mica', weight: 70 }, { material: 'feldspar', weight: 30 }],
        195, -10, 40,
        { size: 18, density: 0.21 },
        'gtceu:mica_indicator', ['granite', 'gneiss'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_pollucite_vein',
        [{ material: 'pollucite', weight: 70 }, { material: 'spodumene', weight: 30 }],
        332, -30, 15,
        { radius: 2, height: 45, size: 12, density: 0.33, min_skew: 0.1, max_skew: 0.3, min_slant: 0.1, max_slant: 0.3, sign: 1.0 },
        'gtceu:pollucite_indicator', ['granite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_apatite_vein',
        [
            { material: 'apatite', weight: 70 },
            { material: 'tricalcium_phosphate', weight: 40 },
            { material: 'pyromorphite', weight: 10 }
        ],
        180, 10, 60,
        { radius: 20, height: 4, size: 45, density: 0.20 },
        'gtceu:apatite_indicator', ['granite', 'diorite', 'gabbro', 'marble'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_graphite_vein',
        [
            { material: 'graphite', weight: 80 },
            { material: 'coal', weight: 20 }
        ],
        160, 0, 50,
        { radius: 22, height: 3, size: 45, density: 0.21 },
        'tfc:ore/small_graphite', ['slate', 'phyllite', 'schist', 'gneiss'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_galena_sphalerite_vein',
        [{ material: 'galena', weight: 60 }, { material: 'sphalerite', weight: 30 }, { material: 'silver', weight: 10 }],
        166, -40, 15,
        { radius: 4, height: 50, size: 24, density: 0.15, min_skew: 0.1, max_skew: 0.4, min_slant: 0.1, max_slant: 0.4, sign: 1.0 },
        'tfc:ore/small_galena', ['limestone', 'dolomite', 'marble'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_native_copper_vein',
        [{ material: 'copper', weight: 85 }, { material: 'silver', weight: 15 }],
        234, -10, 40,
        { radius: 18, height: 4, size: 40, density: 0.03 },
        'tfc:ore/small_native_copper', ['basalt', 'andesite', 'rhyolite', 'dacite'],
        [FILTER_UNDERGROUND, FILTER_VOLCANO_WIDE]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_mercury_vein',
        [{ material: 'cinnabar', weight: 100 }],
        215, -10, 40,
        { radius: 2, height: 40, size: 15, density: 0.36, min_skew: 0.2, max_skew: 0.5, min_slant: 0.2, max_slant: 0.5, sign: 1.0 },
        'gtceu:cinnabar_indicator', ['andesite', 'rhyolite'],
        [FILTER_UNDERGROUND, FILTER_VOLCANO_NEAR]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_uraninite_vein',
        [{ material: 'uraninite', weight: 80 }, { material: 'uranium', weight: 20 }],
        312, -30, 10,
        { radius: 2, height: 45, size: 14, density: 0.30, min_skew: 0.1, max_skew: 0.4, min_slant: 0.1, max_slant: 0.4, sign: 1.0 },
        'gtceu:uraninite_indicator', ['granite', 'schist', 'shale'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_stibnite_vein',
        [{ material: 'stibnite', weight: 100 }],
        215, -10, 40,
        { radius: 3, height: 50, size: 18, density: 0.27, min_skew: 0.2, max_skew: 0.6, min_slant: 0.2, max_slant: 0.6, sign: 1.0 },
        'gtceu:stibnite_indicator', ['shale', 'slate', 'quartzite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_green_fluorite_vein',
        [{ material: 'green_fluorite', weight: 100 }],
        176, -20, 30,
        { radius: 3, height: 45, size: 20, density: 0.24, min_skew: 0.1, max_skew: 0.4, min_slant: 0.1, max_slant: 0.3, sign: 1.0 },
        'gtceu:green_fluorite_indicator', ['limestone', 'granite', 'marble'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_blue_fluorite_vein',
        [{ material: 'blue_fluorite', weight: 100 }],
        230, -20, 30,
        { radius: 3, height: 45, size: 18, density: 0.20, min_skew: 0.1, max_skew: 0.4, min_slant: 0.1, max_slant: 0.3, sign: 1.0 },
        'gtceu:blue_fluorite_indicator', ['limestone', 'granite', 'marble'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_redstone_ruby_vein',
        [{ material: 'redstone', weight: 70 }, { material: 'ruby', weight: 20 }, { material: 'cinnabar', weight: 10 }],
        195, -50, -10,
        { radius: 4, height: 60, size: 24, density: 0.27, min_skew: 0.2, max_skew: 0.5, min_slant: 0.1, max_slant: 0.4, sign: 1.0 },
        'gtceu:ruby_indicator', ['schist', 'gneiss', 'marble'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:cluster_vein', 'gt_certus_quartz_vein',
        [{ material: 'certus_quartz', weight: 80 }, { material: 'quartzite', weight: 20 }],
        234, -10, 40,
        { size: 16, density: 0.18 },
        'gtceu:certus_quartz_indicator', ['granite', 'quartzite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_arsenic_vein',
        [{ material: 'realgar', weight: 50 }, { material: 'orpiment', weight: 50 }],
        254, -20, 20,
        { radius: 2, height: 40, size: 14, density: 0.30, min_skew: 0.2, max_skew: 0.5, min_slant: 0.2, max_slant: 0.5, sign: 1.0 },
        'gtceu:realgar_indicator', ['limestone', 'shale', 'slate'],
        [FILTER_UNDERGROUND, FILTER_VOLCANO_WIDE]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_tetrahedrite_vein',
        [
            { material: 'tetrahedrite', weight: 70 },
            { material: 'copper', weight: 20 },
            { material: 'stibnite', weight: 10 }
        ],
        140, -10, 30,
        { radius: 3, height: 50, size: 20, density: 0.24, min_skew: 0.1, max_skew: 0.4, min_slant: 0.1, max_slant: 0.4, sign: 1.0 },
        'tfc:ore/small_tetrahedrite', ['limestone', 'dolomite', 'slate', 'schist'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:pipe_vein', 'gt_sphalerite_vein',
        [
            { material: 'sphalerite', weight: 80 },
            { material: 'galena', weight: 20 }
        ],
        210, -40, 10,
        { radius: 3, height: 45, size: 18, density: 0.24, min_skew: 0.1, max_skew: 0.3, min_slant: 0.1, max_slant: 0.3, sign: 1.0 },
        'tfc:ore/small_sphalerite', ['limestone', 'dolomite', 'marble'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_hematite_vein',
        [{ material: 'hematite', weight: 72 }, { material: 'pyrite', weight: 8 }, { material: 'goethite', weight: 20 }],
        108, 10, 50,
        { radius: 30, height: 4, size: 60, density: 0.15 },
        'tfc:ore/small_hematite', SEDIMENTARY_ROCKS.concat(['quartzite']),
        [SOLID_GROUND_FILTER]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_salt_lithium_vein',
        [{ material: 'salt', weight: 96 }, { material: 'spodumene', weight: 2 }, { material: 'lepidolite', weight: 2 }],
        125, 35, 65,
        { radius: 25, height: 2, size: 95, density: 0.20 },
        'tfc:ore/small_halite', ['shale', 'claystone', 'limestone', 'dolomite'],
        [SOLID_GROUND_FILTER, CLIMATE_ARID]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_phosphosiderite_vein',
        [{ material: 'phosphosiderite', weight: 100 }],
        127, 30, 65,
        { radius: 24, height: 2, size: 35, density: 0.09 },
        'gtceu:phosphosiderite_indicator', ['shale', 'claystone', 'chalk'], 
        [SOLID_GROUND_FILTER, CLIMATE_WET_BASIN]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_siderite_vein',
        [{ material: 'siderite', weight: 100 }],
        293, 10, 55,
        { radius: 28, height: 4, size: 55, density: 0.06 },
        'gtceu:siderite_indicator', SEDIMENTARY_ROCKS,
        [SOLID_GROUND_FILTER, CLIMATE_WET_BASIN]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_manganese_vein',
        [{ material: 'pyrolusite', weight: 100 }],
        137, 40, 90,
        { radius: 25, height: 3, size: 50, density: 0.12 },
        'gtceu:pyrolusite_indicator', ['shale', 'claystone', 'limestone'],
        [SOLID_GROUND_FILTER]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_barite_vein',
        [{ material: 'barite', weight: 100 }],
        156, 10, 50,
        { radius: 22, height: 3, size: 45, density: 0.12 },
        'gtceu:barite_indicator', ['limestone', 'shale', 'dolomite'],
        [SOLID_GROUND_FILTER]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_lignite_coal_vein',
        [{ material: 'lignite', weight: 60 }, { material: 'coal', weight: 40 }],
        117, 20, 70,
        { radius: 35, height: 4, size: 80, density: 0.30 },
        'tfc:ore/small_coal', ['shale', 'claystone', 'conglomerate'],
        [SOLID_GROUND_FILTER, CLIMATE_WET_BASIN]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_sylvite_gypsum_vein',
        [{ material: 'rock_salt', weight: 50 }, { material: 'gypsum', weight: 50 }],
        147, 30, 60,
        { radius: 30, height: 3, size: 60, density: 0.18 },
        'gtceu:sylvite_indicator', ['shale', 'claystone', 'limestone', 'dolomite'],
        [SOLID_GROUND_FILTER, CLIMATE_ARID]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_trona_vein',
        [{ material: 'trona', weight: 100 }],
        156, 40, 75,
        { radius: 32, height: 2, size: 70, density: 0.24 },
        'gtceu:trona_indicator', ['shale', 'claystone'],
        [SOLID_GROUND_FILTER, { type: "tfc:climate", max_rain: 150 }]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_zeolite_vein',
        [
            { material: 'zeolite', weight: 50 },
            { material: 'diatomite', weight: 40 },
            { material: 'bentonite', weight: 10 }
        ],
        220, 30, 80,
        { radius: 24, height: 2, size: 40, density: 0.15 },
        'gtceu:zeolite_indicator', ['basalt', 'shale', 'claystone'],
        [SOLID_GROUND_FILTER]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_limonite_iron_cap',
        [{ material: 'yellow_limonite', weight: 85 }, { material: 'malachite', weight: 15 }],
        147, 60, 110,
        { radius: 20, height: 3, size: 45, density: 0.18 },
        'tfc:ore/small_limonite', ['schist', 'phyllite', 'slate', 'granite', 'diorite'], 
        [SOLID_GROUND_FILTER]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_nickel_vein',
        [{ material: 'garnierite', weight: 100 }],
        176, 45, 85,
        { radius: 20, height: 3, size: 45, density: 0.06 },
        'tfc:ore/small_garnierite', ['gabbro', 'basalt'],
        [SOLID_GROUND_FILTER, CLIMATE_TROPICAL_WET]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_bauxite_vein',
        [{ material: 'bauxite', weight: 100 }],
        117, 50, 95,
        { radius: 35, height: 3, size: 90, density: 0.27 },
        'gtceu:bauxite_indicator', ['limestone', 'claystone', 'shale', 'basalt'],
        [SOLID_GROUND_FILTER, CLIMATE_TROPICAL_WET]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_malachite_azurite_vein',
        [{ material: 'malachite', weight: 55 }, { material: 'azurite', weight: 45 }],
        147, 45, 80,
        { radius: 22, height: 3, size: 48, density: 0.09 },
        'tfc:ore/small_malachite', ['limestone', 'dolomite', 'marble'],
        [SOLID_GROUND_FILTER, CLIMATE_SEMI_ARID]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_cuprite_tenorite_vein',
        [{ material: 'cuprite', weight: 70 }, { material: 'tenorite', weight: 30 }],
        186, 50, 95,
        { radius: 30, height: 3, size: 42, density: 0.06 },
        'gtceu:tenorite_indicator', ['granite', 'diorite', 'schist', 'phyllite', 'slate', 'basalt'], 
        [SOLID_GROUND_FILTER]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_sulfur_vein',
        [{ material: 'sulfur', weight: 100 }],
        105, 45, 90,
        { radius: 28, height: 3, size: 48, density: 0.15 },
        'gtceu:sulfur_indicator', ['basalt', 'andesite', 'rhyolite', 'shale'],
        [SOLID_GROUND_FILTER, CLIMATE_HOT_VOLCANIC, FILTER_VOLCANO_CENTER]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_alunite_vein',
        [
            { material: 'alunite', weight: 70 },
            { material: 'sulfur', weight: 30 }
        ],
        200, 20, 70,
        { radius: 18, height: 3, size: 35, density: 0.24 },
        'gtceu:alunite_indicator', ['rhyolite', 'dacite', 'andesite', 'basalt'],
        [SOLID_GROUND_FILTER]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_kaolinite_vein',
        [
            { block: 'tfc:white_kaolin_clay', weight: 50 },
            { block: 'tfc:pink_kaolin_clay', weight: 30 },
            { block: 'tfc:red_kaolin_clay', weight: 20 }
        ],
        30, 20, 90,
        { radius: 15, height: 3, size: 50, density: 0.8 },
        'tfc:ore/small_kaolinite', ['granite', 'rhyolite', 'gneiss'],
        [SOLID_GROUND_FILTER]
    );

    registerGTVein(
        'tfc:cluster_vein', 'yellow_garnet_vein',
        [{ material: 'yellow_garnet', weight: 70 }, { material: 'red_garnet', weight: 30 }],
        156, -60, -10,
        { size: 16, density: 0.18 },
        'gtceu:yellow_garnet_indicator', ['schist', 'gneiss', 'quartzite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:disc_vein', 'gt_magnesite_vein',
        [{ material: 'magnesite', weight: 70 }, { material: 'talc', weight: 30 }],
        156, -20, 20,
        { radius: 20, height: 4, size: 40, density: 0.15 },
        'gtceu:magnesite_indicator', ['dolomite', 'marble'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:cluster_vein', 'gt_lapis_vein',
        [{ material: 'lapis', weight: 80 }, { material: 'lazurite', weight: 20 }],
        254, -20, 30,
        { size: 14, density: 0.21 },
        'tfc:ore/small_lapis', ['marble'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:cluster_vein', 'gt_bastnasite_vein',
        [{ material: 'bastnasite', weight: 100 }],
        312, -40, 10,
        { size: 15, density: 0.24 },
        'gtceu:bastnasite_indicator', ['marble', 'limestone', 'dolomite'],
        [FILTER_UNDERGROUND]
    );

    registerGTVein(
        'tfc:cluster_vein', 'gt_sapphire_vein',
        [{ material: 'sapphire', weight: 40 }, { material: 'green_sapphire', weight: 40 }, { material: 'almandine', weight: 20 }],
        273, -40, 0,
        { size: 14, density: 0.18 },
        'gtceu:sapphire_indicator', ['schist', 'marble'],
        [FILTER_UNDERGROUND]
    );

    event.addJson('tfc:tags/worldgen/placed_feature/in_biome/veins.json', {
        replace: true,
        values: [
            "kubejs:yellow_garnet_vein",
            "kubejs:gt_magnetite_vein", 
            "kubejs:gt_hematite_vein",
            "kubejs:gt_limonite_iron_cap",
            "kubejs:gt_chalcopyrite_vein",
            "kubejs:gt_cassiterite_vein",
            "kubejs:gt_galena_sphalerite_vein",
            "kubejs:gt_nickel_vein",
            "kubejs:gt_bauxite_vein",
            "kubejs:gt_salt_lithium_vein",
            "kubejs:gt_tungsten_vein",
            "kubejs:gt_diamond_vein",
            "kubejs:gt_native_copper_vein",
            "kubejs:gt_bornite_chalcocite_vein",
            "kubejs:gt_malachite_azurite_vein",
            "kubejs:gt_cuprite_tenorite_vein",
            "kubejs:gt_phosphosiderite_vein",
            "kubejs:gt_siderite_vein",
            "kubejs:gt_manganese_vein",
            "kubejs:gt_mercury_vein",
            "kubejs:gt_monazite_vein",
            "kubejs:gt_magnesite_vein",
            "kubejs:gt_uraninite_vein",
            "kubejs:gt_platinum_vein",
            "kubejs:gt_barite_vein",
            "kubejs:gt_beryl_vein",
            "kubejs:gt_stibnite_vein",
            "kubejs:gt_cobaltite_vein",
            "kubejs:gt_molybdenite_vein",
            "kubejs:gt_green_fluorite_vein",
            "kubejs:gt_blue_fluorite_vein",
            "kubejs:gt_sulfur_vein",
            "kubejs:gt_bismuth_vein",
            "kubejs:gt_lapis_vein",
            "kubejs:gt_redstone_ruby_vein",
            "kubejs:gt_certus_quartz_vein",
            "kubejs:gt_lignite_coal_vein",
            "kubejs:gt_pyrochlore_tantalite_vein",
            "kubejs:gt_sylvite_gypsum_vein",
            "kubejs:gt_mica_vein",
            "kubejs:gt_pentlandite_vein",
            "kubejs:gt_trona_vein",
            "kubejs:gt_olivine_vein",
            "kubejs:gt_arsenic_vein",
            "kubejs:gt_bastnasite_vein",
            "kubejs:gt_pollucite_vein",
            "kubejs:gt_sapphire_vein",
            "kubejs:gt_rutile_vein",
            "kubejs:gt_tetrahedrite_vein",
            "kubejs:gt_apatite_vein",
            "kubejs:gt_graphite_vein",
            "kubejs:gt_alunite_vein",
            "kubejs:gt_zeolite_vein",
            "kubejs:gt_sphalerite_vein",
            "kubejs:gt_kaolinite_vein"
        ]
    });
});
