import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: var(--tech-gradient);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const HeaderLogo = styled.img`
  height: 45px;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    height: 40px;
  }
`;

const Title = styled.h1`
  color: var(--dark-bg);
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 2.5rem;
  background: linear-gradient(90deg, #0f172a, #4f46e5, #6366f1, #10b981);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
`;

const Description = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 10px;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLogo src="/logo.svg" alt="AITi Logo" className="float-element" />
      <Title className="gradient-shift">AITi新闻海报生成器</Title>
      <Description>制作精美科技风的新闻海报，一键分享传播你的资讯</Description>
    </HeaderContainer>
  );
};

export default Header; 