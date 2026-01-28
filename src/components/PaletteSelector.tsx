import { useGameStore } from '../store/gameStore';
import { palettes, PaletteName } from '../config/palettes';
import { motion } from 'framer-motion';

export const PaletteSelector = () => {
    const { settings, updateSettings } = useGameStore();
    const currentPalette = settings.selectedPalette;

    const handleSelect = (paletteName: PaletteName) => {
        updateSettings({ selectedPalette: paletteName });
    };

    return (
        <div className="bg-husain-card p-6 rounded-lg shadow-lg w-full max-w-sm border border-husain-bg/20">
            <h2 className="text-xl font-bold text-husain-canvas mb-3">Color Palette</h2>
            <p className="text-xs text-husain-canvas/60 mb-4">Choose an artist-inspired theme</p>

            <div className="flex flex-col gap-2">
                {(Object.keys(palettes) as PaletteName[]).map((paletteName) => {
                    const palette = palettes[paletteName];
                    const isSelected = currentPalette === paletteName;

                    return (
                        <motion.button
                            key={paletteName}
                            onClick={() => handleSelect(paletteName)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-3 rounded-lg border-2 transition-all text-left ${isSelected
                                    ? 'border-husain-saffron bg-husain-bg shadow-lg'
                                    : 'border-husain-bg/30 bg-husain-bg/50 hover:border-husain-saffron/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Color Preview Swatches */}
                                <div className="flex gap-0.5">
                                    <div
                                        className="w-5 h-5 rounded-sm border border-black/20"
                                        style={{ backgroundColor: palette.colors.canvas }}
                                        title="Light Square"
                                    />
                                    <div
                                        className="w-5 h-5 rounded-sm border border-black/20"
                                        style={{ backgroundColor: palette.colors.earth }}
                                        title="Dark Square"
                                    />
                                    <div
                                        className="w-5 h-5 rounded-sm border border-black/20"
                                        style={{ backgroundColor: palette.colors.saffron }}
                                        title="Accent 1"
                                    />
                                    <div
                                        className="w-5 h-5 rounded-sm border border-black/20"
                                        style={{ backgroundColor: palette.colors.crimson }}
                                        title="Accent 2"
                                    />
                                </div>

                                {/* Palette Info */}
                                <div className="flex-1">
                                    <div className="font-bold text-husain-canvas">{palette.displayName}</div>
                                    <div className="text-[10px] text-husain-canvas/50 leading-tight">
                                        {palette.description}
                                    </div>
                                </div>

                                {/* Selected Indicator */}
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-6 h-6 rounded-full bg-husain-saffron flex items-center justify-center text-white text-xs font-bold"
                                    >
                                        ✓
                                    </motion.div>
                                )}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};
