export interface GameStatePayload {
    slot_number: number;
    user_id: string;
    score: number;
    level: number;
    next_piece_type: string;
    active_piece_type: string;
    active_piece_x: number;
    active_piece_y: number;
    active_piece_rotation: number;
    board: (string | null)[][];
}

export interface SaveSlotInfo {
    slot_number: number;
    is_empty: boolean;
    score?: number;
    level?: number;
}