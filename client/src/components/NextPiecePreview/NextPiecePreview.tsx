import { useGameStateStore } from "../../store/store";
import { PieceMap } from "./PieceMap";

export const NextPiecePreview = () => {
    const nextPieceType = useGameStateStore((state) => state.nextPieceType);

    return <>
        <h2>Next Piece</h2>
        <PieceMap pieceType={nextPieceType} />
    </>
}