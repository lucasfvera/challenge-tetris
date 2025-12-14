export interface GameStatePayload {
    id?: string;
    score: number;
    level: number;
    next_piece_type: string;
    active_piece_type: string;
    active_piece_x: number;
    active_piece_y: number;
    active_piece_rotation: number;
    board: (string | null)[][];
}