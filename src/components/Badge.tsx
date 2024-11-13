'use client';

import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ThreeElement,
} from '@react-three/fiber';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RigidBodyAutoCollider,
  type RigidBodyTypeString,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useRef, useState } from 'react';
import {
  CatmullRomCurve3,
  RepeatWrapping,
  Vector2,
  Vector3,
  type Mesh,
  type MeshBasicMaterial,
} from 'three';

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload('/tag.glb');
useTexture.preload('/band.jpg');

const lightformers: {
  intensity: number;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}[] = [
  {
    intensity: 2,
    color: 'white',
    position: [0, -1, 5],
    rotation: [0, 0, Math.PI / 3],
    scale: [100, 0.1, 1],
  },
  {
    intensity: 3,
    color: 'white',
    position: [-1, -1, 1],
    rotation: [0, 0, Math.PI / 3],
    scale: [100, 0.1, 1],
  },
  {
    intensity: 3,
    color: 'white',
    position: [1, 1, 1],
    rotation: [0, 0, Math.PI / 3],
    scale: [100, 0.1, 1],
  },
  {
    intensity: 10,
    color: 'white',
    position: [-10, 0, 14],
    rotation: [0, Math.PI / 2, Math.PI / 3],
    scale: [100, 10, 1],
  },
];

export default function Badge() {
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
      <Environment background blur={0.75}>
        <color attach="background" args={['black']} />
        {lightformers.map((props, index) => (
          <Lightformer key={index} {...props} />
        ))}
      </Environment>
    </Canvas>
  );
}

const segmentProps = {
  type: 'dynamic' as RigidBodyTypeString,
  canSleep: true,
  colliders: false as RigidBodyAutoCollider,
  angularDamping: 2,
  linearDamping: 2,
};

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const { nodes, materials } = useGLTF('/tag.glb');
  const texture = useTexture('/band.jpg');

  const band = useRef<Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);

  const { width, height } = useThree((state) => state.size);

  const [curve] = useState(
    () =>
      new CatmullRomCurve3([
        new Vector3(),
        new Vector3(),
        new Vector3(),
        new Vector3(),
      ]),
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

  const card = useRef<RapierRigidBody>(null);
  const vec = new Vector3();
  const ang = new Vector3();
  const rot = new Vector3();
  const dir = new Vector3();
  const [dragged, drag] = useState<false | Vector3>(false);

  const lerped = useRef<(Vector3 | null)[]>([null, null]);

  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current
    ) {
      // Fix the jitter when over-pulling the card
      [j1, j2].forEach((ref, i) => {
        if (ref.current === null) return;

        if (lerped.current[i] === null) {
          lerped.current[i] = new Vector3().copy(
            ref.current.translation() ?? new Vector3(),
          );
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, lerped.current[i].distanceTo(ref.current.translation())),
        );
        lerped.current[i].lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(lerped.current[1]!);
      curve.points[2].copy(lerped.current[0]!);
      curve.points[3].copy(fixed.current.translation());
      (band.current?.geometry as MeshLineGeometry).setPoints(
        curve.getPoints(32),
      );

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        true,
      );
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = RepeatWrapping;

  return (
    <>
      <group position={[1.5, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerUp={(e) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              drag(
                new Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current?.translation() ?? new Vector3())),
              );
            }}
          >
            <mesh geometry={(nodes.card as Mesh).geometry}>
              <meshPhysicalMaterial
                map={(materials.base as MeshBasicMaterial).map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh
              geometry={(nodes.clip as Mesh).geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh
              geometry={(nodes.clamp as Mesh).geometry}
              material={materials.metal}
            />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          args={[
            {
              color: 'white',
              resolution: new Vector2(width, height),
              useMap: 1,
              map: texture,
              repeat: new Vector2(-3, 1),
              lineWidth: 1,
            },
          ]}
          depthTest={false}
        />
      </mesh>
    </>
  );
}
