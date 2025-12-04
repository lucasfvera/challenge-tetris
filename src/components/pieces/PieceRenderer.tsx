import { type PieceType, pieceTypeMap } from "../../utils/tetrominoes"
import IPiece from "./IPiece";
import JPiece from "./JPiece";
import LPiece from "./LPiece";
import OPiece from "./OPiece";
import SPiece from "./SPiece";
import TPiece from "./TPiece";
import ZPiece from "./ZPiece";

export const PieceRenderer = ({ type, position, color }: { type: PieceType, position: [number, number, number], color: string }) => {
    switch (type) {
        case pieceTypeMap.I:
            return <IPiece position={position} color={color} />;
        case pieceTypeMap.J:
            return <JPiece position={position} color={color} />;
        case pieceTypeMap.L:
            return <LPiece position={position} color={color} />;
        case pieceTypeMap.O:
            return <OPiece position={position} color={color} />;
        case pieceTypeMap.S:
            return <SPiece position={position} color={color} />;
        case pieceTypeMap.T:
            return <TPiece position={position} color={color} />;
        case pieceTypeMap.Z:
            return <ZPiece position={position} color={color} />;
    }
}
