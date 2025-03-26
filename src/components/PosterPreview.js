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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  padding-bottom: 150px;
  margin-bottom: 20px;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  
  // 为"优雅格调"模板添加深色渐变背景
  &.template-elegant {
    background: linear-gradient(to right, #1e1b4b 0%, #312e81 100%);
    color: #ffffff;
    
    // 添加高质量的背景图案
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23c4b5fd' fill-opacity='0.2' d='M0 0h20v20H0zm40 40h20v20H40zm60 60h20v20h-20zM20 20h20v20H20zm40 40h20v20H60zM80 0h20v20H80zm-20 80h20v20H60zM20 60h20v20H20zm-20 0h20v20H0z'/%3E%3C/svg%3E");
      background-size: 100px 100px;
      background-repeat: repeat;
      opacity: 0.7;
      pointer-events: none;
      z-index: 0;
    }
    
    // 添加优雅的装饰边框
    &::after {
      content: '';
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      border: 1px solid rgba(196, 181, 253, 0.3);
      pointer-events: none;
      z-index: 0;
    }
  }
  
  & > * {
    position: relative;
    z-index: 1;
  }
  
  // Add improved template rendering consistency
  &.template-rendered {
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
  position: relative;
  z-index: 2;
  // Ensure title text is rendered with proper contrast
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  isolation: isolate; // Ensure title text is properly isolated from background effects
  
  // Improve gradient text rendering
  @supports (-webkit-background-clip: text) {
    &.gradient-text {
      background-clip: text;
      -webkit-background-clip: text;
      background-size: 100% 100%;
      background-position: center;
    }
  }
  
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
  background-color: rgba(255, 255, 255, 0.1); /* 降低透明度，在黑色背景上更好看 */
  margin-bottom: 20px;
  overflow: visible;
  border-radius: 8px; /* 添加圆角 */
  padding: 12px; /* 添加内边距 */
  backdrop-filter: blur(3px); /* 添加模糊效果增强可读性 */
  
  // 确保伪元素在正确位置
  & > .news-item-before,
  & > .news-item-after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    pointer-events: none;
    // Improve render consistency
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  
  & > * {
    position: relative;
    z-index: 1;
  }
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
  padding: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
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
  if (!styles) return { pseudoStyles: {}, normalStyles: {} };
  
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

// 确保SVG背景图案正确转换为CSS背景属性
const ensureProperBackgroundRendering = (style) => {
  // 处理背景以确保SVG正确渲染
  if (style && style.backgroundImage && style.backgroundImage.includes('data:image/svg+xml')) {
    return {
      ...style,
      backgroundRepeat: style.backgroundRepeat || 'repeat',
      backgroundSize: style.backgroundSize || 'auto',
      backgroundPosition: style.backgroundPosition || 'center',
      imageRendering: 'high-quality',
      // Improve SVG rendering consistency
      WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Fix Safari SVG rendering issue
      transform: 'translateZ(0)', // Promote to GPU layer for better rendering
    };
  }
  
  return style;
};

const PosterPreview = forwardRef(({ logo, qrCode, title, newsItems, templateId, onExport }, ref) => {
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
  
  // 确保应用正确的背景渲染
  const enhancedNormalStyles = ensureProperBackgroundRendering(normalStyles);

  // Add a class for gradient text if needed
  const titleHasGradient = titleStyle && (
    titleStyle.backgroundImage || 
    (titleStyle.background && titleStyle.background.includes('gradient'))
  );
  
  // 生成海报文件名（包含模板名称）
  const generatePosterFilename = () => {
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 格式
    const cleanTitle = title ? title.replace(/[^\w\u4e00-\u9fa5]/g, '_').substring(0, 20) : '海报';
    // 将模板名称添加到文件名中
    return `${cleanTitle}_${template.name}_${date}.png`;
  };
  
  // 创建导出函数，将文件名传递给父组件
  const handleExport = () => {
    if (onExport && typeof onExport === 'function') {
      onExport(generatePosterFilename());
    }
  };
  
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
          zIndex: 0,
          backgroundRepeat: pseudoStyles['&::before'].backgroundRepeat || 'repeat',
          backgroundSize: pseudoStyles['&::before'].backgroundSize || 'auto',
          backgroundPosition: pseudoStyles['&::before'].backgroundPosition || 'center',
          imageRendering: 'high-quality',
          transform: 'translateZ(0)' // Improve rendering consistency
        }} className="pseudo-before" />
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
          zIndex: 0,
          backgroundRepeat: pseudoStyles['&::after'].backgroundRepeat || 'repeat',
          backgroundSize: pseudoStyles['&::after'].backgroundSize || 'auto',
          backgroundPosition: pseudoStyles['&::after'].backgroundPosition || 'center',
          imageRendering: 'high-quality',
          transform: 'translateZ(0)' // Improve rendering consistency
        }} className="pseudo-after" />
      );
    }
    
    return elements;
  };
  
  return (
    <PosterContainer 
      ref={ref}
      style={{
        ...enhancedNormalStyles,
        // 确保背景完全应用，防止不一致
        backgroundColor: 'transparent', // 使用透明背景让background属性生效
        backgroundImage: template.backgroundImage ? `url(${template.backgroundImage})` : 'none',
        backgroundRepeat: enhancedNormalStyles.backgroundRepeat || 'repeat',
        backgroundSize: enhancedNormalStyles.backgroundSize || 'auto',
        backgroundPosition: enhancedNormalStyles.backgroundPosition || 'center',
        background: template.id !== 'elegant' ? template.backgroundColor : 'none', // 仅为非优雅模板设置背景色
      }}
      data-template={template.id}
      key={templateId} // 添加key确保组件在模板变化时完全重新渲染
      className={`template-${template.id} template-rendered`}
    >
      {renderBackgroundElements()}
      
      {logo && (
        <LogoContainer $position={template.logoPosition || 'top-left'}>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
      )}
      
      <PosterTitle 
        style={{
          ...titleStyle,
          color: '#ffffff', // 确保标题文字为白色
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)', // 增强阴影
          fontWeight: 700, // 更粗的字体
        }}
        className={`poster-title ${titleHasGradient ? 'gradient-text' : ''}`}
      >
        {title}
      </PosterTitle>
      
      <PosterDate style={{
        color: '#ffffff', // 确保日期文字为白色
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)', // 增强阴影
        fontWeight: 500, // 加粗字体
      }}>
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
                    zIndex: 0,
                    top: itemPseudoStyles['&::before'].top || 0,
                    left: itemPseudoStyles['&::before'].left || 0,
                    width: itemPseudoStyles['&::before'].width || '100%',
                    height: itemPseudoStyles['&::before'].height || '100%',
                    backgroundRepeat: itemPseudoStyles['&::before'].backgroundRepeat || 'repeat',
                    backgroundSize: itemPseudoStyles['&::before'].backgroundSize || 'auto',
                    backgroundPosition: itemPseudoStyles['&::before'].backgroundPosition || 'center',
                    opacity: itemPseudoStyles['&::before'].opacity || 1,
                    pointerEvents: 'none',
                    transform: 'translateZ(0)' // Improve rendering consistency
                  }} className="news-item-before" />
                )}
                {itemPseudoStyles['&::after'] && (
                  <div style={{
                    ...itemPseudoStyles['&::after'],
                    content: '""',
                    position: 'absolute',
                    zIndex: 0,
                    top: itemPseudoStyles['&::after'].top || 0,
                    left: itemPseudoStyles['&::after'].left || 0,
                    width: itemPseudoStyles['&::after'].width || '100%',
                    height: itemPseudoStyles['&::after'].height || '100%',
                    backgroundRepeat: itemPseudoStyles['&::after'].backgroundRepeat || 'repeat',
                    backgroundSize: itemPseudoStyles['&::after'].backgroundSize || 'auto',
                    backgroundPosition: itemPseudoStyles['&::after'].backgroundPosition || 'center',
                    opacity: itemPseudoStyles['&::after'].opacity || 1,
                    pointerEvents: 'none',
                    transform: 'translateZ(0)' // Improve rendering consistency
                  }} className="news-item-after" />
                )}
                <NewsTitle 
                  style={{
                    ...newsTitleStyle,
                    color: '#ffffff', // 确保标题为白色
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.9)', // 增强阴影
                    fontWeight: 600, // 更粗的字体
                  }}
                  className={`news-title ${newsTitleStyle && newsTitleStyle.backgroundImage ? 'gradient-text' : ''}`}
                  data-count={index + 1}
                >
                  {item.title}
                </NewsTitle>
                <NewsContent style={{
                  ...applyTemplateNewsContentStyles(template),
                  color: '#ffffff', // 确保内容文字为白色
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)', // 增强阴影
                  fontWeight: 400, // 适当加粗
                }}>
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
        <QRCodeFooter style={{
          color: '#ffffff', // 确保页脚文字为白色
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)', // 增强阴影
        }} $color={template.textColor}>
          Made with ❤️ by AITi<br />
          https://getAITi.com
        </QRCodeFooter>
      </QRCodeContainer>
    </PosterContainer>
  );
});

export default PosterPreview; 