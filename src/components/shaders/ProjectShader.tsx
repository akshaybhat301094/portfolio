"use client";

import dynamic from 'next/dynamic';

const ShaderGradientAny = dynamic<any>(
  () => import('shadergradient').then((mod) => mod.ShaderGradient as any),
  { ssr: false }
);

const ShaderGradientCanvasAny = dynamic<any>(
  () => import('shadergradient').then((mod) => mod.ShaderGradientCanvas as any),
  { ssr: false }
);

interface ProjectShaderProps {
  variant?: 'card' | 'page';
}

export function ProjectShader({ variant = 'card' }: ProjectShaderProps) {
  const wrapperClass = variant === 'card' 
    ? "absolute inset-0 z-0 opacity-60 pointer-events-none mix-blend-screen"
    : "fixed inset-0 z-0 pointer-events-none";

  return (
    <div className={wrapperClass}>
      <ShaderGradientCanvasAny style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <ShaderGradientAny
          animate="on"
          axesHelper="off"
          bgColor1="#000000"
          bgColor2="#000000"
          brightness={1}
          cAzimuthAngle={180}
          cDistance={5.29}
          cPolarAngle={80}
          cameraZoom={9.1}
          color1="#606080"
          color2="#8d7dca"
          color3="#212121"
          destination="onCanvas"
          embedMode="off"
          envPreset="lobby"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="on"
          lightType="3d"
          pixelDensity={1.5}
          positionX={0}
          positionY={0}
          positionZ={0}
          range="enabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={1.2}
          uFrequency={0}
          uSpeed={0.2}
          uStrength={1.4}
          uTime={8}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvasAny>
    </div>
  );
}
