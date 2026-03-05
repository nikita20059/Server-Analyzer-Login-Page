
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Login.css";

import serverImg from "./se.png";
import logoLeft from "./logo2.png";
import logoRight from "./hp logo.png";
import logoRightt from "./logo.png";

const Login = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();

    const nodes = [];
    const nodeCount = 60;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 150})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.fillStyle = "#3b82f6";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className="page-wrapper">
      {/* DYNAMIC NETWORK CANVAS */}
      <canvas ref={canvasRef} className="network-canvas" />

      {/* LEFT LOGIN CARD */}
      <motion.div
        className="login-card"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="card-inner">
          <div className="left-brand">
            <img src={logoLeft} alt="Company Logo" className="left-logo" />
            <h1>DATABASE</h1>
            <h2>MANAGEMENT</h2>
            <p>
              Powerful, secure and scalable database management platform designed
              for modern enterprises.
            </p>
          </div>

          <div className="login-form">
            <h3>Employee Login</h3>
            <input type="text" placeholder="Employee Number" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </div>
        </div>
      </motion.div>

      {/* RIGHT HERO SECTION */}
      <div className="hero-curve">
        <div className="hero-inner">
          <nav className="navbar">
            <img src={logoRight} alt="Company Logo" className="nav-logoo" />
            <img src={logoRightt} alt="Company Logo" className="nav-logo" />
          </nav>

          <motion.div
            className="hero-image"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <img src={serverImg} alt="Server Illustration" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;