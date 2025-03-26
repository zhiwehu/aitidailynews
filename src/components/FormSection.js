import React from 'react';
import NewsForm from './NewsForm';
import { SectionContainer, SectionHeading } from './styles/CommonStyles';
import TemplateSelector from './TemplateSelector';

const FormSection = ({ 
  templateId, 
  onTemplateSelect, 
  handleLogoChange, 
  handleQRCodeChange, 
  title, 
  setTitle, 
  newsJson, 
  handleNewsJsonChange
}) => {
  return (
    <SectionContainer className="glass-card">
      <SectionHeading>海报设置</SectionHeading>
      
      <TemplateSelector 
        selectedTemplate={templateId}
        onTemplateSelect={onTemplateSelect}
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
    </SectionContainer>
  );
};

export default FormSection; 