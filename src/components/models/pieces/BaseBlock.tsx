import * as THREE from "three";

interface BaseBlockProps {
    position: [number, number, number];
    color: string;
}

export const BaseBlock = ({ position, color }: BaseBlockProps) => {
    const length = 0.85, width = 0.85;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);
    return (
        <mesh position={position}>
            <extrudeGeometry args={[shape, { depth: 1, bevelSegments: 2 }]} />
            {/* <boxGeometry args={[0.95, 0.95, 0.95]} /> */}
            <meshPhongMaterial color={color} />
        </mesh>
    );
};
