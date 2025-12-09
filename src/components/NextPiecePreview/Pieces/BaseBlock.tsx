interface BaseBlockProps {
    color?: string;
    filled?: boolean;
}

export const BLOCK_SIZE = 30;

export const BaseBlock = ({ color, filled = false }: BaseBlockProps) => {
    return (
        <div
            style={{
                boxSizing: "border-box",
                width: BLOCK_SIZE,
                height: BLOCK_SIZE,
                backgroundColor: filled && color ? color : "transparent",
                border: filled ? "1px solid rgba(0, 0, 0, 0.2)" : "none",
            }}
        />
    );
};
