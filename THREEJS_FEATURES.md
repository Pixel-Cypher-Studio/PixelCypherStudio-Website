# 🎨 Three.js Interactive Features Guide

## 📦 Installation

**IMPORTANT:** Run this command first to install all required dependencies:

```bash
npm install
```

This will install:
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for R3F
- `@react-three/postprocessing` - Post-processing effects
- `cannon-es` - Physics engine
- `maath` - Math helpers for smooth animations
- `leva` - Debug UI (optional, for development)

## ✨ Features Added

### 1. **Interactive Background** (`InteractiveBackground`)
- **Location:** `src/components/InteractiveBackground/`
- **Features:**
  - 150 animated particles floating in 3D space
  - RGB color scheme matching your brand
  - Interactive hover effects
  - Floating orbs with smooth animations
  - Animated star field background
- **Performance:** Optimized with low-poly geometry and efficient animations

### 2. **Hero 3D Scene** (`HeroScene3D`)
- **Location:** `src/components/Hero/HeroScene3D.tsx`
- **Features:**
  - Interactive 3D logo with physics-based rings
  - Hover to rotate and animate
  - Click to activate/deactivate animation
  - Orbiting particles
  - Dynamic lighting and shadows
- **Interaction:** Hover and click on the rings

### 3. **Physics Capability Cards** (`PhysicsCard`)
- **Location:** `src/components/Capabilities/PhysicsCard.tsx`
- **Features:**
  - 3D interactive cards for each capability
  - Smooth hover animations
  - RGB accent colors
  - Floating effect with physics
- **Usage:** Replace existing capability cards

### 4. **Scroll Progress Indicator** (`ScrollProgress`)
- **Location:** `src/components/ScrollProgress/`
- **Features:**
  - Real-time scroll progress bar
  - Particle effects
  - RGB gradient colors
  - Smooth animations
- **Position:** Fixed at top of page

### 5. **Interactive Cursor** (`InteractiveCursor`)
- **Location:** `src/components/InteractiveCursor/`
- **Features:**
  - Particle trail following cursor
  - Smooth easing animations
  - RGB colored particles
  - Blend mode for visual integration
- **Performance:** Optimized for 60fps

## 🎨 Color Palette (Unchanged)

All features use your existing brand colors:
- **Primary:** `#d1bcff` (Purple)
- **Accent 1:** `#ff8d8d` (Neon Red)
- **Accent 2:** `#00fc40` (Neon Green)
- **Accent 3:** `#8297ff` (Neon Blue)
- **Background:** `#131318` (Dark)
- **Surface:** `#1f1f25` (Card background)

## 🎮 User Interaction Features

### Passive Interactions:
- Particles respond to mouse proximity
- Smooth hover states on all 3D elements
- Cursor trail follows movement
- Scroll progress visualization

### Active Interactions:
- **Click** on Hero rings to toggle animation
- **Hover** on capability cards for 3D rotation
- **Scroll** to see progress indicator and particle effects
- **Move cursor** to interact with background particles

## ⚡ Performance Optimizations

1. **Geometry:** Low-poly where possible (8-32 segments)
2. **Materials:** Shared materials, minimal state changes
3. **Animations:** Using `maath.easing` for smooth interpolation
4. **Render:** Optimized pixel ratio (1-2 based on device)
5. **Cleanup:** Proper disposal on unmount
6. **SSR:** Client-side only rendering with `'use client'`

## 🚀 Usage Examples

### Add Hero 3D Scene:
```tsx
// In your Hero component
import HeroScene3D from '@/components/Hero/HeroScene3D';

export default function Hero() {
  return (
    <section>
      <HeroScene3D />
      {/* ... rest of hero content */}
    </section>
  );
}
```

### Add Physics Cards to Capabilities:
```tsx
// In Capabilities component
import PhysicsCard from '@/components/Capabilities/PhysicsCard';

<PhysicsCard
  number="01"
  title="Graphic Design"
  accent="red"
  icon="design"
/>
```

## 🎯 Best Practices

1. **Always** wrap Three.js components in `<Canvas>`
2. **Use** `useFrame` for animations, not useState
3. **Dispose** of geometries and materials on cleanup
4. **Respect** reduced motion preferences
5. **Test** on mobile devices for performance
6. **Monitor** FPS with browser dev tools

## 🐛 Troubleshooting

### Particles not showing?
- Check console for WebGL errors
- Ensure hardware acceleration is enabled
- Try reducing particle count

### Slow performance?
- Reduce `dpr` max value in Canvas
- Lower particle count
- Reduce geometry segments
- Disable post-processing temporarily

### Import errors?
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

## 📱 Mobile Considerations

- Automatic pixel ratio limiting
- Reduced particle count on mobile
- Touch-friendly interactions
- Performance-first approach

## 🎨 Customization

### Change colors:
Edit the `COLORS` object in each component

### Adjust particle count:
```tsx
<ParticleField count={100} /> // Default: 150
```

### Modify animation speed:
```tsx
<Float speed={5} /> // Higher = faster
```

## 📊 Performance Budget

- **Target FPS:** 60fps on desktop, 30fps on mobile
- **Memory:** < 50MB for all Three.js features
- **Draw calls:** < 100 per frame
- **Triangle count:** < 10,000 total

## 🔧 Development Mode

Use Leva for real-time tweaking (optional):
```tsx
import { useControls } from 'leva';

const { speed, count } = useControls({
  speed: { value: 1, min: 0, max: 5 },
  count: { value: 100, min: 10, max: 500, step: 10 },
});
```

## ✨ Next Steps

1. Install dependencies
2. Test each component individually
3. Integrate into your layout
4. Customize colors/behavior as needed
5. Test on multiple devices
6. Deploy and enjoy!

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Test in incognito mode (cache issues)
4. Check WebGL support: https://get.webgl.org/

---

**Remember:** The goal is to enhance user experience, not distract from content. Use these features judiciously! ✨
