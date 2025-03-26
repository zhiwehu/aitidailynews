// 添加全局样式和动画效果
const globalAnimations = `
@keyframes shine {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes fireMove {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes holographicScan {
  0% {
    transform: translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateY(100%) rotate(45deg);
  }
}

@keyframes matrixGlow {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.9;
  }
}

@keyframes neonPulse {
  0%, 100% {
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(6, 182, 212, 1), 0 0 30px rgba(6, 182, 212, 0.5);
  }
}

@keyframes floatEffect {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes laserScan {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}
`;

module.exports = {
  globalAnimations
}; 