import React from 'react';
import styled from 'styled-components';
import { templateList } from '../templates';

const TemplateSelectorContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    margin-top: 15px;
    margin-bottom: 25px;
  }
`;

const Title = styled.h3`
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
  }
`;

const TemplateItem = styled.div`
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid ${props => props.$isSelected ? '#4caf50' : 'transparent'};
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    border-width: 2px;
    border-radius: 8px;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const TemplateThumbnail = styled.div`
  width: 100%;
  aspect-ratio: 9 / 16;
  background-color: ${props => props.$bgColor || '#ffffff'};
  background-image: ${props => props.$backgroundImage ? `url(${props.$backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-size: 10px;
  color: ${props => props.$textColor || '#333333'};
  position: relative;
  
  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const TemplateTitle = styled.p`
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
  color: #333;
  font-weight: 600;
  
  @media (max-width: 768px) {
    margin-top: 6px;
    font-size: 12px;
  }
`;

const LogoPlaceholder = styled.div`
  align-self: ${props => props.$position === 'top-center' ? 'center' : 'flex-start'};
  width: 25px;
  height: 10px;
  background-color: ${props => props.$color || '#888'};
  border-radius: 2px;
`;

const HeadlinePlaceholder = styled.div`
  margin-top: 15px;
  width: 70%;
  height: 10px;
  background-color: ${props => props.$color || '#555'};
  margin-bottom: 5px;
  border-radius: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 30%;
    width: 40%;
    height: 2px;
    background-color: ${props => props.$accentColor || 'transparent'};
    display: ${props => props.$showLine ? 'block' : 'none'};
  }
`;

const TextPlaceholder = styled.div`
  width: ${props => props.$width || '90%'};
  height: 4px;
  background-color: ${props => props.$color || '#888'};
  margin: 3px 0;
  border-radius: 1px;
`;

const QrPlaceholder = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.$color || '#555'};
  align-self: center;
  margin-top: auto;
  border-radius: 2px;
`;

const NewsItemPlaceholder = styled.div`
  width: 100%;
  padding: 5px;
  margin-bottom: 6px;
  border-radius: 3px;
  background-color: ${props => props.$bgColor || 'transparent'};
  border-left: ${props => props.$borderLeft ? `2px solid ${props.$accentColor}` : 'none'};
  border-bottom: ${props => props.$borderBottom ? `1px solid ${props.$accentColor}30` : 'none'};
  border-top: ${props => props.$borderTop ? `2px solid ${props.$accentColor}` : 'none'};
  box-shadow: ${props => props.$shadow ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'};
`;

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }) => {
  return (
    <TemplateSelectorContainer>
      <Title>选择模板</Title>
      <TemplatesGrid>
        {templateList.map((template, index) => {
          // Custom rendering for template thumbnails
          const showShadow = template.newsItemStyle?.boxShadow;
          const showBorderLeft = template.newsItemStyle?.borderLeft;
          const showBorderBottom = template.newsItemStyle?.borderBottom;
          const showBorderTop = template.newsItemStyle?.borderTop;
          const showUnderline = template.titleStyle?.underline;
          
          // Dynamic background color for news items
          let bgColor = 'transparent';
          if (template.newsItemStyle?.backgroundColor) {
            bgColor = template.newsItemStyle.backgroundColor;
          }
            
          return (
            <TemplateItem 
              key={index} 
              $isSelected={selectedTemplate === template.id}
              onClick={() => onTemplateSelect(template.id)}
            >
              <TemplateThumbnail 
                $bgColor={template.backgroundColor}
                $backgroundImage={template.backgroundImage}
                $textColor={template.textColor}
              >
                <LogoPlaceholder 
                  $color={template.accentColor} 
                  $position={template.logoPosition}
                />
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <HeadlinePlaceholder 
                    $color={template.accentColor} 
                    $showLine={showUnderline}
                    $accentColor={template.accentColor}
                  />
                  
                  {[1, 2, 3].map(i => (
                    <NewsItemPlaceholder 
                      key={i}
                      $bgColor={bgColor}
                      $borderLeft={showBorderLeft}
                      $borderBottom={showBorderBottom}
                      $borderTop={showBorderTop && i === 1}
                      $shadow={showShadow}
                      $accentColor={template.accentColor}
                    >
                      <TextPlaceholder 
                        $color={template.accentColor} 
                        $width="50%" 
                      />
                      <TextPlaceholder 
                        $color={template.textColor} 
                        $width="80%" 
                      />
                    </NewsItemPlaceholder>
                  ))}
                </div>
                <QrPlaceholder $color={template.accentColor} />
              </TemplateThumbnail>
              <TemplateTitle>{template.name}</TemplateTitle>
            </TemplateItem>
          );
        })}
      </TemplatesGrid>
    </TemplateSelectorContainer>
  );
};

export default TemplateSelector; 