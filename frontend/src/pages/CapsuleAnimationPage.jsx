import { Canvas } from "@react-three/fiber";
import { useParams, useNavigate } from "react-router-dom";
import { useState, Suspense } from "react"; 
import { Model } from "../components/Model";
import { OrbitControls, Sparkles, Environment } from "@react-three/drei";
import * as THREE from "three";

const CapsuleAnimationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playAnimation, setPlayAnimation] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  return (
   <div className="capsule3d-page">
      <div className="canvas-wrapper">
        <Canvas
          camera={{ position: [0, 5, 6], fov: 55 }} 
          gl={{ 
            alpha: true, 
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping, 
            outputColorSpace: THREE.SRGBColorSpace 
          }}
          onFinished={() => setAnimationFinished(true)}
        >
        <Suspense fallback={null}>
        {playAnimation && !animationFinished && (
         <Sparkles
            count={40}
            scale={[3, 3, 3]}
            size={4}
            speed={0.4}
            color="#ffffff"
          />
        )}
          <Environment preset="city" /> 
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 1, 5]} intensity={1.5} castShadow />
          <pointLight position={[-5, 2, -5]} intensity={1} color="#44aaff" />

          <Model
            position={[0, -2, 0]}
            play={playAnimation}
            onFinished={() => setAnimationFinished(true)}
          />

          <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      <button className="capsule-action-btn"
        onClick={() => {
          if (!playAnimation) {
            setPlayAnimation(true);
          } else if (animationFinished) {
            navigate(`/capsule/${id}`);
          }
        }}
      >
        {!playAnimation ? "Відкрити капсулу" : "Прочитати лист"}
      </button>
    </div>
  );
};

export default CapsuleAnimationPage;
