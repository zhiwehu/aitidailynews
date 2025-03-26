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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 10px;
  overflow: visible;
  
  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background-image: radial-gradient(circle, rgba(79, 70, 229, 0.03) 1px, transparent 1px);
    background-size: 10px 10px;
    bottom: -30px;
    right: -30px;
    border-radius: 50%;
    opacity: 0.5;
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    &::after {
      width: 100px;
      height: 100px;
      bottom: -20px;
      right: -20px;
    }
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
        
        const canvas = await html2canvas(posterRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          height: posterRef.current.offsetHeight,
          windowHeight: posterRef.current.offsetHeight,
          onclone: (document, element) => {
            // Ensure the cloned element has proper height and positioning
            element.style.height = `${posterRef.current.offsetHeight}px`;
            element.style.position = 'relative';
            element.style.transform = 'none';
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