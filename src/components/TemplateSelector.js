import React from 'react';
import styled from 'styled-components';
import { templateList } from '../templates';
import MiniTemplatePreview from './MiniTemplatePreview';

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
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

const TemplateItem = styled.div`
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${props => props.$isSelected ? '#4caf50' : 'transparent'};
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    border-width: 2px;
    border-radius: 6px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const TemplateTitle = styled.p`
  margin-top: 6px;
  margin-bottom: 6px;
  font-size: 12px;
  text-align: center;
  color: #333;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 4px;
  
  @media (max-width: 768px) {
    margin-top: 4px;
    font-size: 11px;
  }
`;

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }) => {
  return (
    <TemplateSelectorContainer>
      <Title>选择模板</Title>
      <TemplatesGrid>
        {templateList.map((template, index) => (
          <TemplateItem 
            key={index} 
            $isSelected={selectedTemplate === template.id}
            onClick={() => onTemplateSelect(template.id)}
          >
            <MiniTemplatePreview templateData={template} />
            <TemplateTitle>{template.name}</TemplateTitle>
          </TemplateItem>
        ))}
      </TemplatesGrid>
    </TemplateSelectorContainer>
  );
};

export default TemplateSelector; 