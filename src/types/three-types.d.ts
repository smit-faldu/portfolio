// Type definitions for Three.js and React Three Fiber components
// This file augments existing type definitions without redeclaring them

import { Object3D, Material } from 'three';

// Augment Three.js types
declare module 'three' {
  interface Object3D {
    // Add any missing properties that you need to access
    geometry?: any;
  }
}
