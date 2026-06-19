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

export function HeroShader() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <ShaderGradientCanvasAny style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <ShaderGradientAny
          animate="on"
          axesHelper="on"
          bgColor1="#000000"
          bgColor2="#000000"
          brightness={1.1}
          cAzimuthAngle={180}
          cDistance={3.9}
          cPolarAngle={115}
          cameraZoom={1}
          color1="#5606ff"
          color2="#fe8989"
          color3="#000000"
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
          positionX={-0.5}
          positionY={0.1}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={0}
          rotationZ={235}
          shader="defaults"
          type="waterPlane"
          uAmplitude={0}
          uDensity={1.1}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={2.4}
          uTime={0.2}
          wireframe={false}
          zoomOut={false}
        />
      </ShaderGradientCanvasAny>
    </div>
  );
}
