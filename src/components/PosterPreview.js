import React, { forwardRef } from 'react';
import styled from 'styled-components';
import {
    applyTemplateNewsContentStyles,
    applyTemplateNewsItemStyles,
    applyTemplateNewsTitleStyles,
    applyTemplateStyles,
    applyTemplateTitleStyles,
    getTemplateById
} from '../templates';

const PosterContainer = styled.div`
  width: 375px;
  min-height: 667px;
  height: auto;
  border: 1px solid #ddd;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  padding-bottom: 150px;
  margin-bottom: 20px;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  
  & > * {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    padding-bottom: 140px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: ${props => props.$position === 'top-center' ? '50%' : '20px'};
  transform: ${props => props.$position === 'top-center' ? 'translateX(-50%)' : 'none'};
  max-width: 100px;
  max-height: 40px;
  z-index: 10;
`;

const LogoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PosterTitle = styled.h1`
  text-align: center;
  font-size: 28px;
  margin: 60px 0 30px;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin: 50px 0 20px;
  }
`;

const NewsList = styled.div`
  flex: 0 1 auto;
  margin-bottom: 140px;
  position: relative;
  overflow: visible;
`;

const NewsItem = styled.div`
  position: relative;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.7);
`;

const NewsTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NewsContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const QRCodeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
  position: absolute;
  bottom: 20px;
  left: 0;
  z-index: 10;
`;

const QRCodeImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
  padding: 5px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
`;

const QRCodeFooter = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: ${props => props.$color || '#666'};
  opacity: 0.9;
  text-align: center;
  font-style: italic;
  line-height: 1.5;
`;

const PlaceholderText = styled.p`
  color: #888;
  font-style: italic;
  text-align: center;
`;

const PosterDate = styled.div`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 14px;
  opacity: 0.8;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background: ${props => props.$color || '#eee'};
  background-image: ${props => props.$gradient || 'none'};
  margin: 20px 0;
  width: 100%;
`;

// Helper function to create CSS for pseudo elements
const createPseudoStyles = (styles) => {
  if (!styles) return {};
  
  // Extract pseudo-element styles
  const pseudoStyles = {};
  const normalStyles = {};
  
  Object.entries(styles).forEach(([key, value]) => {
    if (key.startsWith('&')) {
      pseudoStyles[key] = value;
    } else {
      normalStyles[key] = value;
    }
  });
  
  return { pseudoStyles, normalStyles };
};

const PosterPreview = forwardRef(({ logo, qrCode, title, newsItems, templateId }, ref) => {
  const template = getTemplateById(templateId);
  
  const formattedDate = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).format(new Date());
  
  // Apply template styles
  const containerStyle = applyTemplateStyles(template);
  const titleStyle = applyTemplateTitleStyles(template);
  
  // Extract pseudo-element styles
  const { pseudoStyles, normalStyles } = createPseudoStyles(containerStyle);
  
  // Create dynamic pseudo elements if needed
  const renderBackgroundElements = () => {
    const elements = [];
    
    if (pseudoStyles['&::before']) {
      elements.push(
        <div key="before" style={{
          ...pseudoStyles['&::before'],
          content: '""',
          position: 'absolute',
          top: pseudoStyles['&::before'].top || 0,
          left: pseudoStyles['&::before'].left || 0,
          width: pseudoStyles['&::before'].width || '100%',
          height: pseudoStyles['&::before'].height || '100%',
          zIndex: 0
        }} />
      );
    }
    
    if (pseudoStyles['&::after']) {
      elements.push(
        <div key="after" style={{
          ...pseudoStyles['&::after'],
          content: '""',
          position: 'absolute',
          top: pseudoStyles['&::after'].top || 0,
          left: pseudoStyles['&::after'].left || 0,
          width: pseudoStyles['&::after'].width || '100%',
          height: pseudoStyles['&::after'].height || '100%',
          zIndex: 0
        }} />
      );
    }
    
    return elements;
  };
  
  return (
    <PosterContainer 
      ref={ref}
      style={normalStyles}
      data-template={template.id}
    >
      {renderBackgroundElements()}
      
      {logo && (
        <LogoContainer $position={template.logoPosition || 'top-left'}>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
      )}
      
      <PosterTitle style={titleStyle} className="poster-title">
        {title}
      </PosterTitle>
      
      <PosterDate>
        {formattedDate}
      </PosterDate>
      
      {template.showDivider && (
        <Divider 
          $color={template.accentColor} 
          $gradient={template.dividerGradient} 
        />
      )}
      
      <NewsList>
        {newsItems.length > 0 ? (
          newsItems.map((item, index) => {
            const newsItemStyle = applyTemplateNewsItemStyles(template, index);
            const newsTitleStyle = applyTemplateNewsTitleStyles(template);
            
            // Extract pseudo-element styles for news items
            const { pseudoStyles: itemPseudoStyles, normalStyles: itemNormalStyles } = createPseudoStyles(newsItemStyle);
            
            return (
              <NewsItem key={index} style={itemNormalStyles} className="news-item">
                {itemPseudoStyles['&::before'] && (
                  <div style={{
                    ...itemPseudoStyles['&::before'],
                    content: '""',
                    position: 'absolute',
                    zIndex: 0
                  }} />
                )}
                {itemPseudoStyles['&::after'] && (
                  <div style={{
                    ...itemPseudoStyles['&::after'],
                    content: '""',
                    position: 'absolute',
                    zIndex: 0
                  }} />
                )}
                <NewsTitle 
                  style={newsTitleStyle} 
                  className="news-title" 
                  data-count={index + 1}
                >
                  {item.title}
                </NewsTitle>
                <NewsContent style={applyTemplateNewsContentStyles(template)}>
                  {item.content}
                </NewsContent>
              </NewsItem>
            );
          })
        ) : (
          <PlaceholderText>
            请添加新闻内容...
          </PlaceholderText>
        )}
      </NewsList>
      
      <QRCodeContainer>
        {qrCode ? (
          <QRCodeImage src={qrCode} alt="QR Code" />
        ) : (
          <PlaceholderText>
            请上传二维码...
          </PlaceholderText>
        )}
        <QRCodeFooter $color={template.textColor}>
          Made with ❤️ by AITi<br />
          https://getAITi.com
        </QRCodeFooter>
      </QRCodeContainer>
    </PosterContainer>
  );
});

export default PosterPreview; 