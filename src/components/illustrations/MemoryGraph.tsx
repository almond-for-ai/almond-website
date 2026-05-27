/**
 * MemoryGraph: animated 3D node graph (the company's compiled memory).
 *
 * Rules (see ./README.md):
 *  1. One illustration per file
 *  2. Props: width, height, className, style, colors
 *  3. Canvas inside, droppable anywhere
 *  4. Canvas wrapped in Suspense (transparent fallback)
 *  5. Animation via useFrame only
 *  6. Geometries + materials disposed on unmount
 *  7. "use client"
 *  8. Exported from index.ts
 *  9. Consumed via Lazy3D
 */
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const DEFAULT_COLORS = ["#7b4019", "#ffffff", "#a36740"]; // node, edge, accent

export type MemoryGraphProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  /** Number of nodes in the graph. Default 14. */
  nodeCount?: number;
  /** Soft sphere radius for node distribution. Default 2.2. */
  radius?: number;
};

type NodePoint = { pos: THREE.Vector3; phase: number };

function deterministic(i: number, seed = 1): number {
  // Simple deterministic pseudo-random in [0,1)
  const s = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

function distributeNodes(count: number, radius: number): NodePoint[] {
  const pts: NodePoint[] = [];
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere-ish distribution + jitter
    const k = i + 0.5;
    const phi = Math.acos(1 - (2 * k) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    const jitter = 0.85 + deterministic(i, 7) * 0.3;
    const r = radius * jitter;
    const x = r * Math.cos(theta) * Math.sin(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(phi);
    pts.push({
      pos: new THREE.Vector3(x, y, z),
      phase: deterministic(i, 13) * Math.PI * 2,
    });
  }
  return pts;
}

function buildEdges(
  nodes: NodePoint[],
  maxDist: number,
): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = nodes[i].pos.distanceTo(nodes[j].pos);
      if (d < maxDist) edges.push([i, j]);
    }
  }
  return edges;
}

function GraphScene({
  colors,
  nodeCount,
  radius,
}: {
  colors: string[];
  nodeCount: number;
  radius: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesMeshRef = useRef<THREE.InstancedMesh>(null);
  const edgesGeomRef = useRef<THREE.BufferGeometry>(null);
  const edgesMatRef = useRef<THREE.LineBasicMaterial>(null);
  const nodeMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const nodes = useMemo(
    () => distributeNodes(nodeCount, radius),
    [nodeCount, radius],
  );
  const edges = useMemo(
    () => buildEdges(nodes, radius * 1.05),
    [nodes, radius],
  );

  // Build line segments geometry once
  const edgePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], idx) => {
      const pa = nodes[a].pos;
      const pb = nodes[b].pos;
      const o = idx * 6;
      arr[o] = pa.x;
      arr[o + 1] = pa.y;
      arr[o + 2] = pa.z;
      arr[o + 3] = pb.x;
      arr[o + 4] = pb.y;
      arr[o + 5] = pb.z;
    });
    return arr;
  }, [edges, nodes]);

  // Initial instance transforms
  useEffect(() => {
    const mesh = nodesMeshRef.current;
    if (!mesh) return;
    const tmp = new THREE.Object3D();
    nodes.forEach((n, i) => {
      tmp.position.copy(n.pos);
      tmp.scale.setScalar(0.11);
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [nodes]);

  // Set initial draw-in progress (controls how much of each edge is visible)
  const drawProgress = useRef(reducedMotion ? 1 : 0);
  const tmpObj = useRef(new THREE.Object3D());

  useFrame((_, dt) => {
    // gentle group rotation
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += dt * 0.08;
      groupRef.current.rotation.x =
        Math.sin(performance.now() * 0.0001) * 0.08;
    }

    // Progress edges drawing in
    if (drawProgress.current < 1) {
      drawProgress.current = Math.min(1, drawProgress.current + dt * 0.35);
      if (edgesMatRef.current) {
        edgesMatRef.current.opacity = 0.35 * drawProgress.current;
      }
    } else {
      // idle: subtle edge pulse
      if (edgesMatRef.current) {
        const t = performance.now() * 0.001;
        edgesMatRef.current.opacity = 0.28 + Math.sin(t * 0.8) * 0.06;
      }
    }

    // Node pulses (size oscillation)
    const mesh = nodesMeshRef.current;
    if (mesh && !reducedMotion) {
      const t = performance.now() * 0.001;
      const obj = tmpObj.current;
      nodes.forEach((n, i) => {
        const s = 0.10 + 0.025 * Math.sin(t * 1.3 + n.phase);
        obj.position.copy(n.pos);
        obj.scale.setScalar(s);
        obj.updateMatrix();
        mesh.setMatrixAt(i, obj.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  // Dispose on unmount
  useEffect(() => {
    return () => {
      nodesMeshRef.current?.geometry?.dispose?.();
      const nm = nodeMatRef.current;
      nm?.dispose?.();
      edgesGeomRef.current?.dispose?.();
      edgesMatRef.current?.dispose?.();
    };
  }, []);

  const [nodeColor, edgeColor] = colors;

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments>
        <bufferGeometry ref={edgesGeomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={edgesMatRef}
          color={edgeColor}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes (instanced spheres) */}
      <instancedMesh
        ref={nodesMeshRef}
        args={[undefined, undefined, nodes.length]}
      >
        <sphereGeometry args={[1, 18, 18]} />
        <meshStandardMaterial
          ref={nodeMatRef}
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={0.35}
          metalness={0.1}
          roughness={0.55}
        />
      </instancedMesh>
    </group>
  );
}

export function MemoryGraph({
  width = "100%",
  height = "100%",
  className,
  style,
  colors = DEFAULT_COLORS,
  nodeCount = 14,
  radius = 2.2,
}: MemoryGraphProps) {
  return (
    <div className={className} style={{ width, height, ...style }}>
      <Suspense
        fallback={<div style={{ width: "100%", height: "100%" }} />}
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.45} />
          <pointLight position={[4, 4, 6]} intensity={0.85} />
          <pointLight position={[-4, -3, 2]} intensity={0.35} color={colors[2] ?? colors[0]} />
          <GraphScene colors={colors} nodeCount={nodeCount} radius={radius} />
        </Canvas>
      </Suspense>
    </div>
  );
}
