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

interface SkillsShaderProps {
  variant?: 'card' | 'page';
}

export function SkillsShader({ variant = 'card' }: SkillsShaderProps) {
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
          brightness={1.1}
          cAzimuthAngle={0}
          cDistance={7.1}
          cPolarAngle={140}
          cameraZoom={17.3}
          color1="#ffffff"
          color2="#ffbb00"
          color3="#0700ff"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={1}
          positionX={0}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          shader="defaults"
          type="sphere"
          uAmplitude={1.4}
          uDensity={1.1}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={1}
          uTime={0}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvasAny>
    </div>
  );
}
