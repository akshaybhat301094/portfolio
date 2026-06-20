import React from 'react';

export function CursorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flex: 'none', lineHeight: 1 }}
      {...props}
    >
      <title>Cursor</title>
      {/* Outer Hexagon (inherits brand color, e.g. black) */}
      <path
        d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726z"
        fill="currentColor"
      />
      {/* Inner Arrow (always black for dark mode contrast) */}
      <path
        d="M21.503 6.856L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"
        fill="#000000"
      />
    </svg>
  );
}


