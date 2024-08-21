import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

const STLViewer = ({ url }) => {
  const mountRef = useRef(null);
  const [mesh, setMesh] = useState(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // Configura la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x808080)); // Color de fondo en gris
    mountNode.appendChild(renderer.domElement);

    // Añade luz a la escena
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Configura los controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);

    // Configura los controles de transformación
    const transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);

    // Configura la visibilidad de los ejes
    transformControls.showX = false; // Oculta el eje X
    transformControls.showY = false; // Oculta el eje Y
    transformControls.showZ = false; // Oculta el eje Z

    // Carga el archivo STL
    const loader = new STLLoader();
    loader.load(
      url,
      (geometry) => {
        const material = new THREE.MeshStandardMaterial({ color: 0x606060 });
        const newMesh = new THREE.Mesh(geometry, material);
        scene.add(newMesh);
        setMesh(newMesh);

        // Ajusta la posición del objeto y la cámara
        const box = new THREE.Box3().setFromObject(newMesh);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());

        newMesh.position.sub(center);

        camera.position.z = size * 2; // Ajusta la distancia de la cámara basado en el tamaño del objeto
        controls.update(); // Actualiza los controles
        transformControls.attach(newMesh); // Adjunta los controles de transformación al modelo
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the STL file:', error);
      }
    );

    // Configura la animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update(); // Actualiza los controles de órbita
      transformControls.updateMatrix(); // Actualiza los controles de transformación
    };
    animate();

    // Manejo del redimensionamiento de la ventana
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Limpieza del componente
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [url]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default STLViewer;
