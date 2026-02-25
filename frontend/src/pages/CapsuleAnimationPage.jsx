import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Model } from "../components/Model";
import { Sparkles } from "@react-three/drei";

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
          gl={{ alpha: true }}
          onFinished={() => setAnimationFinished(true)}
        >
        {playAnimation && !animationFinished && (
         <Sparkles
            count={40}
            scale={[3, 3, 3]}
            size={4}
            speed={0.4}
            color="#ffffff"
          />
        )}
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />

          <Model
            position={[0, -2, 0]}
            play={playAnimation}
            onFinished={() => setAnimationFinished(true)}
          />

          <OrbitControls enableZoom={false} />
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
