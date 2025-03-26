import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import Footer from '../src/components/Footer';
import NewsForm from '../src/components/NewsForm';
import PosterPreview from '../src/components/PosterPreview';
import TemplateSelector from '../src/components/TemplateSelector';
import { templateList } from '../src/templates';

const Container = styled.div`
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

const Header = styled.header`
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

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  overflow: visible;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FormSection = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  border: 1px solid var(--border-color);
  
  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    background: linear-gradient(90deg, var(--dark-bg), #334155);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    position: relative;
    align-self: flex-start;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--tech-gradient);
    border-radius: 3px;
  }
  
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: #475569;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    
    h2 {
      font-size: 1.3rem;
    }
    
    h3 {
      font-size: 1rem;
    }
  }
`;

const PreviewSection = styled.div`
  flex: 1;
  min-width: 300px;
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    background: linear-gradient(90deg, var(--dark-bg), #334155);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    position: relative;
    align-self: flex-start;
  }
  
  h2::after {
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
    padding: 20px;
    
    h2 {
      font-size: 1.3rem;
    }
  }
`;

const PreviewContainer = styled.div`
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
  
  @media (max-width: 768px) {
    max-width: 340px;
  }
`;

const GenerateButton = styled.button`
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

const defaultNews = [
  { title: "重要新闻一", content: "这是重要新闻一的详细内容，可以有更多的描述..." },
  { title: "重要新闻二", content: "这是重要新闻二的详细内容，可以有更多的描述..." },
  { title: "重要新闻三", content: "这是重要新闻三的详细内容，可以有更多的描述..." },
  { title: "重要新闻四", content: "这是重要新闻四的详细内容，可以有更多的描述..." },
  { title: "重要新闻五", content: "这是重要新闻五的详细内容，可以有更多的描述..." }
];

const ConnectingElement = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 50px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, var(--primary-color) 0%, transparent 100%);
    opacity: 0.2;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-image: 
      linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
      linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.3;
  }
`;

export default function Home() {
  const [logo, setLogo] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [title, setTitle] = useState('每日要闻');
  const [newsItems, setNewsItems] = useState(defaultNews);
  const [newsJson, setNewsJson] = useState(JSON.stringify(defaultNews, null, 2));
  const [templateId, setTemplateId] = useState('classic');
  const [generating, setGenerating] = useState(false);
  const posterRef = useRef(null);

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQRCodeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrCode(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewsJsonChange = (e) => {
    setNewsJson(e.target.value);
    try {
      const parsedNews = JSON.parse(e.target.value);
      setNewsItems(parsedNews);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  const handleTemplateSelect = (id) => {
    setTemplateId(id);
  };

  const generatePoster = async () => {
    if (posterRef.current) {
      try {
        // Show loading state
        setGenerating(true);
        
        // 先将所有伪元素样式应用到真实DOM上，以确保图片生成包含这些效果
        const applyPseudoElementStyles = (element) => {
          const allElements = element.querySelectorAll('*');
          
          allElements.forEach(el => {
            const style = window.getComputedStyle(el);
            const beforeStyles = window.getComputedStyle(el, '::before');
            const afterStyles = window.getComputedStyle(el, '::after');
            
            // 处理背景渲染一致性问题
            if (style.backgroundImage && style.backgroundImage.includes('data:image/svg+xml')) {
              // 添加一个重叠层确保SVG被正确渲染
              const bgDiv = document.createElement('div');
              bgDiv.style.position = 'absolute';
              bgDiv.style.inset = '0';
              bgDiv.style.backgroundImage = style.backgroundImage;
              bgDiv.style.backgroundSize = style.backgroundSize || 'auto';
              bgDiv.style.backgroundPosition = style.backgroundPosition || 'center';
              bgDiv.style.backgroundRepeat = style.backgroundRepeat || 'repeat';
              bgDiv.style.zIndex = '0';
              bgDiv.className = 'bg-reinforcement';
              el.insertBefore(bgDiv, el.firstChild);
            }
            
            // 检查伪元素是否有内容
            if (beforeStyles.content !== 'none' && beforeStyles.content !== '') {
              const beforeEl = document.createElement('div');
              beforeEl.style.position = 'absolute';
              beforeEl.style.top = beforeStyles.top || '0';
              beforeEl.style.left = beforeStyles.left || '0';
              beforeEl.style.width = beforeStyles.width || '100%';
              beforeEl.style.height = beforeStyles.height || '100%';
              beforeEl.style.zIndex = '0';
              beforeEl.style.background = beforeStyles.background || 'none';
              beforeEl.style.backgroundImage = beforeStyles.backgroundImage || 'none';
              beforeEl.style.backgroundSize = beforeStyles.backgroundSize || 'auto';
              beforeEl.style.backgroundPosition = beforeStyles.backgroundPosition || 'center';
              beforeEl.style.backgroundRepeat = beforeStyles.backgroundRepeat || 'repeat';
              beforeEl.style.borderRadius = beforeStyles.borderRadius || '0';
              beforeEl.style.boxShadow = beforeStyles.boxShadow || 'none';
              beforeEl.style.opacity = beforeStyles.opacity || '1';
              beforeEl.className = 'pseudo-before';
              el.appendChild(beforeEl);
            }
            
            if (afterStyles.content !== 'none' && afterStyles.content !== '') {
              const afterEl = document.createElement('div');
              afterEl.style.position = 'absolute';
              afterEl.style.top = afterStyles.top || '0';
              afterEl.style.left = afterStyles.left || '0';
              afterEl.style.width = afterStyles.width || '100%';
              afterEl.style.height = afterStyles.height || '100%';
              afterEl.style.zIndex = '0';
              afterEl.style.background = afterStyles.background || 'none';
              afterEl.style.backgroundImage = afterStyles.backgroundImage || 'none';
              afterEl.style.backgroundSize = afterStyles.backgroundSize || 'auto';
              afterEl.style.backgroundPosition = afterStyles.backgroundPosition || 'center';
              afterEl.style.backgroundRepeat = afterStyles.backgroundRepeat || 'repeat';
              afterEl.style.borderRadius = afterStyles.borderRadius || '0';
              afterEl.style.boxShadow = afterStyles.boxShadow || 'none';
              afterEl.style.opacity = afterStyles.opacity || '1';
              afterEl.className = 'pseudo-after';
              el.appendChild(afterEl);
            }
          });
        };
        
        // 确保所有图像都已加载完成
        const waitForImagesLoaded = async (element) => {
          const images = element.querySelectorAll('img');
          const promises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve; // 即使错误也继续
            });
          });
          
          return Promise.all(promises);
        };
        
        // 等待所有样式和SVG加载完成
        await waitForImagesLoaded(posterRef.current);
        
        const canvas = await html2canvas(posterRef.current, {
          scale: 3,                // 提高清晰度
          useCORS: true,           // 允许跨域图片
          allowTaint: true,
          backgroundColor: null,   // 使用透明背景，避免背景色覆盖
          logging: true,           // 开启日志便于调试
          height: posterRef.current.offsetHeight,
          windowHeight: posterRef.current.offsetHeight,
          onclone: async (document, element) => {
            // 确保克隆元素有正确的高度和位置
            element.style.height = `${posterRef.current.offsetHeight}px`;
            element.style.position = 'relative';
            element.style.transform = 'none';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
            
            // 将伪元素的样式转换为真实DOM元素
            applyPseudoElementStyles(element);
            
            // 等待添加的DOM元素渲染完成
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // 先隐藏项目中可能干扰渲染的元素
            const pageElements = document.querySelectorAll('body > *:not(#poster-container-clone)');
            pageElements.forEach(el => {
              if (el !== element && !element.contains(el)) {
                el.style.display = 'none';
              }
            });
            
            // 添加克隆后的元素到body以确保完整渲染
            const container = document.createElement('div');
            container.id = 'poster-container-clone';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '9999';
            container.appendChild(element);
            document.body.appendChild(container);
            
            // 等待渲染完成
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        });
        
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        
        // 获取当前模板信息
        const template = templateList.find(t => t.id === templateId) || { name: '默认模板' };
        
        // 生成含有模板名称的文件名
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 格式
        const cleanTitle = title ? title.replace(/[^\w\u4e00-\u9fa5]/g, '_').substring(0, 20) : '海报';
        const fileName = `${cleanTitle}_${template.name}_${date}.png`;
        
        link.download = fileName;
        link.click();
      } catch (error) {
        console.error('Failed to generate poster:', error);
        alert('生成海报失败，请重试');
      } finally {
        setGenerating(false);
      }
    }
  };

  return (
    <Container>
      <div className="tech-dots tech-dots-1"></div>
      <div className="tech-dots tech-dots-2"></div>
      
      <Header>
        <HeaderLogo src="/logo.svg" alt="AITi Logo" className="float-element" />
        <Title className="gradient-shift">AITi新闻海报生成器</Title>
        <Description>制作精美科技风的新闻海报，一键分享传播你的资讯</Description>
      </Header>
      
      <Content>
        <FormSection className="glass-card">
          <h2>海报设置</h2>
          
          <TemplateSelector 
            selectedTemplate={templateId}
            onTemplateSelect={handleTemplateSelect}
          />
          
          <div className="hover-lift">
            <h3>上传Logo</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleLogoChange} 
            />
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <h3>上传二维码 (底部)</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleQRCodeChange} 
            />
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <h3>修改标题</h3>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              style={{ width: '100%' }}
            />
          </div>
          
          <NewsForm 
            newsJson={newsJson} 
            handleNewsJsonChange={handleNewsJsonChange} 
          />
          
          <GenerateButton 
            onClick={generatePoster}
            disabled={generating}
          >
            {generating ? '生成中...' : '生成海报'}
          </GenerateButton>
        </FormSection>
        
        <PreviewSection className="glass-card">
          <h2>海报预览</h2>
          <PreviewContainer className="preview-container">
            <PosterPreview 
              ref={posterRef}
              logo={logo} 
              qrCode={qrCode} 
              title={title} 
              newsItems={newsItems}
              templateId={templateId}
              className="poster-container"
            />
          </PreviewContainer>
        </PreviewSection>
      </Content>
      
      <Footer />
    </Container>
  );
} 