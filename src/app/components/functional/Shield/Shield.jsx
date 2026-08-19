const Shield = ({ radius, shieldOffset }) => {
  return (
    <mesh position={[0, 0.2, radius - shieldOffset]} onClick={(e) => e.stopPropagation()}>
      <planeGeometry args={[6, 5]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} />
    </mesh>
  );
};

export default Shield;
