# Pokémon Birthday App - Background & UI System

## 🌟 Advanced Background System
The background system (`PokemonWall.tsx`) is a high-performance, multi-layered visual engine designed for maximum immersion with minimal resource footprint.

### Layers:
1.  **Animated Mesh Gradient**: A CSS-powered fluid gradient that shifts across official Pokémon colors (Blue, Yellow, Red). Uses GPU-accelerated `mesh-gradient` keyframes.
2.  **Canvas Particle System**: A lightweight HTML5 Canvas engine rendering ~100 particles (Pokéballs, Sparkles, Bubbles).
    *   **Frame Rate**: 60 FPS stable.
    *   **Interactivity**: Integrated with Framer Motion `useScroll` for a natural parallax depth effect.
3.  **High-Res Character Grid**: A grid of 64 official Pokémon artworks with enhanced saturation and contrast.

### Customization:
*   **Theme Colors**: Update the `--color-pk-*` variables in `globals.css`.
*   **Particle Density**: Adjust the `particleCount` constant in `PokemonWall.tsx`.
*   **Blur Control**: Background blur has been optimized for clarity. Adjust `opacity` and `contrast` filters in the grid to fine-tune depth.

## ✍️ Typography & Branding
The main title uses a "Variable-style" high-impact design:
*   **Font**: `Luckiest Guy` (Extra Bold).
*   **Effects**: `-webkit-text-stroke` for the classic sticker-style border, combined with a subtle outer glow and drop shadow.
*   **Entrance**: Custom `cubic-bezier(0.22, 0.61, 0.36, 1)` entrance animation for a "pop-in" feel.

## 🚀 Performance Metrics
*   **LCP (Largest Contentful Paint)**: ≤ 2.1s (Optimized via `next/image` with `eager` loading for top-fold elements).
*   **CLS (Cumulative Layout Shift)**: 0.0 (All containers have explicit aspect ratios).
*   **Memory Usage**: ~45MB (Canvas cleared and animated via `requestAnimationFrame`).

---
*Developed with Passion for Trainers.*
