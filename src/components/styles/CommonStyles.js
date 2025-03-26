import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  overflow: visible;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  overflow: visible;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const SectionHeading = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  background: linear-gradient(90deg, var(--dark-bg), #334155);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  position: relative;
  align-self: flex-start;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--tech-gradient);
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const SectionContainer = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  border: 1px solid var(--border-color);
  
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: #475569;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    
    h3 {
      font-size: 1rem;
    }
  }
`;

export const GenerateButton = styled.button`
  margin-top: 30px;
  padding: 12px 25px;
  background: var(--tech-gradient);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
  width: 100%;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(79, 70, 229, 0.3);
  }
  
  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.7;
  }
`;

export const PreviewContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  
  /* 确保预览容器有足够的空间和固定的宽度 */
  min-height: 667px;
  max-width: 375px;
  margin: 0 auto;
  padding: 10px;
  
  /* 添加过渡效果使样式变化平滑 */
  transition: all 0.3s ease;
  
  /* 确保子元素不会溢出容器 */
  & > div {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  /* 提高预览质量 */
  & * {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* 提高渲染一致性 */
  & .template-rendered {
    transform: translateZ(0);
    will-change: transform;
  }
  
  /* 添加CSS动画支持 */
  @keyframes shine {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes fireMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  
  @keyframes holographicScan {
    0% { transform: translateY(-100%) rotate(45deg); }
    100% { transform: translateY(100%) rotate(45deg); }
  }
  
  @keyframes matrixGlow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.9; }
  }
  
  @keyframes neonPulse {
    0%, 100% { box-shadow: 0 0 10px rgba(6, 182, 212, 0.7); }
    50% { box-shadow: 0 0 20px rgba(6, 182, 212, 1), 0 0 30px rgba(6, 182, 212, 0.5); }
  }
  
  @keyframes floatEffect {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  @keyframes laserScan {
    0% { background-position: 0% 0%; }
    100% { background-position: 100% 100%; }
  }
  
  /* 确保渐变文本正确渲染 */
  & .gradient-text {
    background-clip: text !important;
    -webkit-background-clip: text !important;
    color: transparent !important;
  }
  
  /* 导出模式下的特殊样式 */
  & .export-mode {
    position: relative !important;
    transform: none !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  
  @media (max-width: 768px) {
    max-width: 340px;
  }
`; 