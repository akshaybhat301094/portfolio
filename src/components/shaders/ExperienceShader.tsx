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

interface ExperienceShaderProps {
  variant?: 'card' | 'page';
}

export function ExperienceShader({ variant = 'card' }: ExperienceShaderProps) {
  const wrapperClass = variant === 'card'
    ? "absolute inset-0 z-0 opacity-60 pointer-events-none mix-blend-screen"
    : "fixed inset-0 z-0 pointer-events-none";

  return (
    <div className={wrapperClass}>
      <ShaderGradientCanvasAny style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <ShaderGradientAny
          animate="on"
          axesHelper="on"
          bgColor1="#000000"
          bgColor2="#000000"
          brightness={1.2}
          cAzimuthAngle={150}
          cDistance={2.4}
          cPolarAngle={179}
          cameraZoom={4.16}
          color1="#f87b38ff"
          color2="#c73c00"
          color3="#FD4912"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={0.9}
          positionX={0}
          positionY={-2.1}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={0}
          rotationZ={225}
          shader="defaults"
          type="sphere"
          uAmplitude={0}
          uDensity={0.9}
          uFrequency={5.5}
          uSpeed={0.2}
          uStrength={0.8}
          uTime={0.2}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvasAny>
    </div>
  );
}
