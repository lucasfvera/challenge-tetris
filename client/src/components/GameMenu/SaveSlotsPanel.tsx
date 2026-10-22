import { useEffect, useState } from 'react';
import { useGameStateStore } from '../../store/store';
import GameServiceApi from '../../api/gameService/gameService';
import './styles/SaveSlotsPanel.css';

export const SaveSlotsPanel = () => {
    const [loading, setLoading] = useState<number | null>(null);

    const saveSlots = useGameStateStore((state) => state.saveSlots);
    const currentSlot = useGameStateStore((state) => state.currentSlot);
    const score = useGameStateStore((state) => state.score);
    const level = useGameStateStore((state) => state.level);
    const setSaveSlots = useGameStateStore((state) => state.setSaveSlots);
    const loadGameState = useGameStateStore((state) => state.loadGameState);
    const updateSlotInfo = useGameStateStore((state) => state.updateSlotInfo);
    const clearSlot = useGameStateStore((state) => state.clearSlot);

    // Fetch save slots on mount
    useEffect(() => {
        GameServiceApi.getSaveSlots().then((slots) => {
            setSaveSlots(slots);
        });
    }, [setSaveSlots]);

    const handleSave = async (slotNumber: number) => {
        setLoading(slotNumber);
        try {
            await GameServiceApi.saveGameState(slotNumber);
            // Update local slot info
            updateSlotInfo(slotNumber, {
                is_empty: false,
                score: score,
                level: level
            });
        } finally {
            setLoading(null);
        }
    };

    const handleLoad = async (slotNumber: number) => {
        setLoading(slotNumber);
        try {
            const state = await GameServiceApi.loadGameState(slotNumber);
            if (state) {
                loadGameState(state);
            }
        } finally {
            setLoading(null);
        }
    };

    const handleDelete = async (slotNumber: number) => {
        if (!confirm(`Delete save in slot ${slotNumber}?`)) return;

        setLoading(slotNumber);
        try {
            const success = await GameServiceApi.deleteSlot(slotNumber);
            if (success) {
                clearSlot(slotNumber);
            }
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="save-slots-panel">
            <div className="save-slots-title">Save Slots</div>
            {saveSlots.map((slot) => (
                <div
                    key={slot.slot_number}
                    className={`save-slot ${currentSlot === slot.slot_number ? 'active' : ''}`}
                >
                    <div className="slot-number">{slot.slot_number}</div>
                    <div className="slot-info">
                        {slot.is_empty ? (
                            <span className="slot-empty">Empty</span>
                        ) : (
                            <div className="slot-data">
                                <span>Score: <strong>{slot.score}</strong></span>
                                <span>Level: <strong>{slot.level}</strong></span>
                            </div>
                        )}
                    </div>
                    <div className="slot-actions">
                        <button
                            className="slot-button save"
                            onClick={() => handleSave(slot.slot_number)}
                            disabled={loading === slot.slot_number}
                        >
                            {loading === slot.slot_number ? '...' : 'Save'}
                        </button>
                        {!slot.is_empty && (
                            <>
                                <button
                                    className="slot-button load"
                                    onClick={() => handleLoad(slot.slot_number)}
                                    disabled={loading === slot.slot_number}
                                >
                                    {loading === slot.slot_number ? '...' : 'Load'}
                                </button>
                                <button
                                    className="slot-button delete"
                                    onClick={() => handleDelete(slot.slot_number)}
                                    disabled={loading === slot.slot_number}
                                >
                                    ✕
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
