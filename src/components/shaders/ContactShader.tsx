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

interface ContactShaderProps {
  variant?: 'card' | 'page';
}

export function ContactShader({ variant = 'card' }: ContactShaderProps) {
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
          brightness={0}
          cAzimuthAngle={170}
          cDistance={14}
          cPolarAngle={70}
          cameraZoom={2.3}
          color1="#94ffd1"
          color2="#6bf5ff"
          color3="#ffffff"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={50}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="env"
          pixelDensity={0.9}
          positionX={0}
          positionY={0.9}
          positionZ={-0.3}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0}
          rotationX={45}
          rotationY={0}
          rotationZ={0}
          shader="defaults"
          type="sphere"
          uAmplitude={0}
          uDensity={0.4}
          uFrequency={0}
          uSpeed={0.1}
          uStrength={10}
          uTime={0}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvasAny>
    </div>
  );
}
