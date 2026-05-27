# 3D Illustration Library

Reusable WebGL illustrations for the Almond AI site.

**Stack:** `three`, `@react-three/fiber`, `@react-three/drei`.

## Rules

Every illustration in this folder MUST follow these without exception:

1. **One illustration per `.tsx`** in `src/components/illustrations/`.
2. **Props:** accept `width`, `height`, `className`, `style`, and `colors` (hex string array with sensible defaults).
3. **Self-contained.** `<Canvas>` lives inside the component, droppable anywhere.
4. **Wrap `<Canvas>` in `<Suspense>`** with a transparent fallback.
5. **Animate via `useFrame` only.** Never `setInterval` / `setTimeout`.
6. **Dispose all geometries + materials on unmount** (explicit `useEffect` cleanup calling `.dispose()`).
7. **Top-level `"use client"`** directive on every illustration file.
8. **Exported from `index.ts`** barrel.
9. **Consume via `Lazy3D.tsx`** (`next/dynamic` with `ssr: false`). Keeps server bundles thin (Cloudflare/OpenNext).

## Adding a new illustration

```tsx
// src/components/illustrations/Foo.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

const DEFAULT_COLORS = ["#7b4019", "#ffffff"];

export type FooProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
};

function FooScene({ colors }: { colors: string[] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (meshRef.current) meshRef.current.rotation.y += dt * 0.2;
  });

  // dispose on unmount
  useEffect(() => {
    const m = meshRef.current;
    return () => {
      m?.geometry?.dispose?.();
      const mat = m?.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((mm) => mm.dispose());
      else mat?.dispose?.();
    };
  }, []);

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color={colors[0]} wireframe />
    </mesh>
  );
}

export function Foo({
  width = "100%",
  height = "100%",
  className,
  style,
  colors = DEFAULT_COLORS,
}: FooProps) {
  return (
    <div className={className} style={{ width, height, ...style }}>
      <Suspense fallback={<div style={{ width: "100%", height: "100%" }} />}>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={0.6} />
          <FooScene colors={colors} />
        </Canvas>
      </Suspense>
    </div>
  );
}
```

Then in `index.ts`:

```ts
export { Foo } from "./Foo";
```

## Lazy consumption

Always import via `Lazy3D`:

```tsx
import { Lazy3D } from "@/components/illustrations/Lazy3D";

<Lazy3D name="MemoryGraph" height={520} colors={["#7b4019", "#ffffff"]} />
```

This ensures the Canvas is `ssr: false` and the three.js bundle is split out of the initial page JS.
