import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function Model({ play, onFinished, ...props }) {
  const group = useRef();
  const hasPlayed = useRef(false);
  const { scene, animations } = useGLTF("/capsule.glb");
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || !play || hasPlayed.current) return;

    const action = actions.Open;
    if (!action) return;

    hasPlayed.current = true;
    action.reset();
    action.clampWhenFinished = true;
    action.setLoop(THREE.LoopOnce);
    action.play();

    const onComplete = () => {
      if (onFinished) onFinished();
    };

    mixer.addEventListener("finished", onComplete);
    return () => mixer.removeEventListener("finished", onComplete);
  }, [play, actions, mixer, onFinished]);

  return (
    <group ref={group} {...props}>
      <primitive object={scene} scale={1} />
    </group>
  );
}
useGLTF.preload("/capsule.glb");
