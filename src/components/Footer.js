import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  margin-top: 60px;
  padding: 30px 0 20px;
  background: var(--dark-bg);
  color: #e2e8f0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--accent-color);
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 25px 0 15px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  img {
    height: 40px;
    margin-right: 15px;
    filter: drop-shadow(0 0 5px rgba(99, 102, 241, 0.3));
  }
  
  h2 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 700;
    background: linear-gradient(90deg, #6366f1, #10b981);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.5px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
    
    img {
      height: 35px;
      margin-right: 10px;
    }
    
    h2 {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    
    img {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`;

const FooterLink = styled.a`
  color: #a5b4fc;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  font-size: 1rem;
  margin-bottom: 15px;
  display: inline-block;
  
  &:hover {
    color: #ffffff;
    text-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

const Copyright = styled.p`
  margin: 15px 0 0;
  font-size: 0.9rem;
  color: #94a3b8;
  position: relative;
  padding: 10px 0;
  
  @media (max-width: 768px) {
    margin: 10px 0 0;
    font-size: 0.8rem;
    padding: 8px 0;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          <img src="/logo.svg" alt="AITi Logo" />
          <h2>AITi新闻海报生成器</h2>
        </FooterLogo>
        
        <FooterLink href="https://hb.getAITi.com" target="_blank" rel="noopener noreferrer">
          官网：hb.getAITi.com
        </FooterLink>
        
        <Copyright>
          © 2025 All rights reserved. Made with <span style={{ color: '#10b981' }}>❤️</span> by AITi.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 