import { type PieceType, pieceTypeMap } from "../utils/tetrominoes"
import IPiece from "./models/pieces/IPiece";
import JPiece from "./models/pieces/JPiece";
import LPiece from "./models/pieces/LPiece";
import OPiece from "./models/pieces/OPiece";
import SPiece from "./models/pieces/SPiece";
import TPiece from "./models/pieces/TPiece";
import ZPiece from "./models/pieces/ZPiece";

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
