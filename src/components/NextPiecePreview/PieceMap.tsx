import type { PieceType } from "../../utils/tetrominoes";
import { IPiece } from "./Pieces/IPiece";
import { JPiece } from "./Pieces/JPiece";
import { LPiece } from "./Pieces/LPiece";
import { OPiece } from "./Pieces/OPiece";
import { SPiece } from "./Pieces/SPiece";
import { TPiece } from "./Pieces/TPiece";
import { ZPiece } from "./Pieces/ZPiece";

interface PieceMapProps {
    pieceType: PieceType | null;
}

export const PieceMap = ({ pieceType }: PieceMapProps) => {
    if (!pieceType) return <>Loading...</>;

    switch (pieceType) {
        case "I":
            return <IPiece />;
        case "J":
            return <JPiece />;
        case "L":
            return <LPiece />;
        case "O":
            return <OPiece />;
        case "S":
            return <SPiece />;
        case "T":
            return <TPiece />;
        case "Z":
            return <ZPiece />;
    }
}