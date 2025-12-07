interface BaseBlockProps {
    color?: string;
    filled?: boolean;
}

export const BaseBlock = ({ color, filled = false }: BaseBlockProps) => {
    return (
        <div
            style={{
                boxSizing: "border-box",
                width: "20px",
                height: "20px",
                backgroundColor: filled && color ? color : "transparent",
                border: filled ? "1px solid rgba(0, 0, 0, 0.2)" : "none",
            }}
        />
    );
};
