import { type PieceType, pieceTypeMap } from "../../utils/tetrominoes"
import IPiece from "./IPiece";
import JPiece from "./JPiece";
import LPiece from "./LPiece";
import OPiece from "./OPiece";
import SPiece from "./SPiece";
import TPiece from "./TPiece";
import ZPiece from "./ZPiece";

export const PieceRenderer = ({ type, position, color, rotationIndex }: { type: PieceType, position: [number, number, number], color: string, rotationIndex: number }) => {
    switch (type) {
        case pieceTypeMap.I:
            return <IPiece position={position} color={color} rotationIndex={rotationIndex} />;
        case pieceTypeMap.J:
            return <JPiece position={position} color={color} rotationIndex={rotationIndex} />;
        case pieceTypeMap.L:
            return <LPiece position={position} color={color} rotationIndex={rotationIndex} />;
        case pieceTypeMap.O:
            return <OPiece position={position} color={color} rotationIndex={rotationIndex} />;
        case pieceTypeMap.S:
            return <SPiece position={position} color={color} rotationIndex={rotationIndex} />;
        case pieceTypeMap.T:
            return <TPiece position={position} color={color} rotationIndex={rotationIndex} />;
        case pieceTypeMap.Z:
            return <ZPiece position={position} color={color} rotationIndex={rotationIndex} />;
    }
}
