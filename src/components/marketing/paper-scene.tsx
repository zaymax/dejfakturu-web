"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Ambient hero backdrop: a slow drift of paperwork sheets — the "účetnické
 * peklo" that DejFakturu clears away. Sheets rise, tumble gently, and respond
 * to the cursor with a light parallax. Renders nothing (and costs nothing) when
 * the visitor prefers reduced motion.
 */
export function PaperScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const COLORS = [0xffffff, 0xece6ff, 0xede9ff, 0xfff0ea];
    const SHEET_COUNT = reduceMotion ? 7 : 16;
    const geometry = new THREE.PlaneGeometry(2.4, 3.1, 1, 1);

    type Sheet = {
      mesh: THREE.Mesh;
      speed: number;
      spin: THREE.Vector3;
      sway: number;
      swaySpeed: number;
    };

    const sheets: Sheet[] = [];

    for (let i = 0; i < SHEET_COUNT; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: COLORS[i % COLORS.length],
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 2,
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      const scale = 0.45 + Math.random() * 0.7;
      mesh.scale.setScalar(scale);

      // a thin coral "rule" so each sheet reads as a document, not a blank card
      const accent = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 0.12),
        new THREE.MeshBasicMaterial({
          color: i % 5 === 0 ? 0xff6a3d : 0x6d4aff,
          transparent: true,
          opacity: 0.5,
        }),
      );
      accent.position.set(0, 0.9, 0.01);
      mesh.add(accent);

      group.add(mesh);
      sheets.push({
        mesh,
        speed: 0.004 + Math.random() * 0.01,
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.004,
        ),
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.3 + Math.random() * 0.5,
      });
    }

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    function onPointerMove(event: PointerEvent) {
      const rect = mount!.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    const start = performance.now();
    let frame = 0;

    function renderOnce() {
      renderer.render(scene, camera);
    }

    function animate() {
      frame = requestAnimationFrame(animate);
      const t = (performance.now() - start) / 1000;

      pointer.x += (target.x - pointer.x) * 0.04;
      pointer.y += (target.y - pointer.y) * 0.04;
      group.rotation.y = pointer.x * 0.18;
      group.rotation.x = pointer.y * 0.12;

      for (const sheet of sheets) {
        const { mesh, speed, spin, sway, swaySpeed } = sheet;
        mesh.position.y += speed;
        mesh.position.x += Math.sin(t * swaySpeed + sway) * 0.004;
        mesh.rotation.x += spin.x;
        mesh.rotation.y += spin.y;
        mesh.rotation.z += spin.z;
        if (mesh.position.y > 11) {
          mesh.position.y = -11;
          mesh.position.x = (Math.random() - 0.5) * 22;
        }
      }
      renderOnce();
    }

    if (reduceMotion) {
      group.rotation.y = -0.12;
      renderOnce();
    } else {
      animate();
    }

    function onResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderOnce();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      geometry.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="lp-hero-canvas" aria-hidden="true" />;
}
