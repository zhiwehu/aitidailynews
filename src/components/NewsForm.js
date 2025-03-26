import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-top: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 10px;
  font-family: monospace;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

const HelpText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 8px;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background-color: #ffebee;
  border-radius: 4px;
  display: ${props => (props.$visible ? 'block' : 'none')};
`;

const EditorControls = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #e5e5e5;
  }
`;

const AddNewsButton = styled(Button)`
  background-color: #e3f2fd;
  border-color: #90caf9;
  
  &:hover {
    background-color: #bbdefb;
  }
`;

const SuccessMessage = styled.div`
  color: #388e3c;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background-color: #e8f5e9;
  border-radius: 4px;
  display: ${props => (props.$visible ? 'block' : 'none')};
`;

const NewsForm = ({ newsJson, handleNewsJsonChange }) => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateJson = (value) => {
    try {
      JSON.parse(value);
      setError('');
      return true;
    } catch (err) {
      setError(`JSON格式错误: ${err.message}`);
      return false;
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    handleNewsJsonChange(e);
    validateJson(value);
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(newsJson);
      const formatted = JSON.stringify(parsed, null, 2);
      const event = { target: { value: formatted } };
      handleNewsJsonChange(event);
      setSuccessMessage('格式化成功');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError(`无法格式化: ${err.message}`);
    }
  };

  const addNewsItem = () => {
    try {
      const parsed = JSON.parse(newsJson);
      const newItem = {
        title: `新闻标题 ${parsed.length + 1}`,
        content: "点击此处编辑新闻内容..."
      };
      parsed.push(newItem);
      const updated = JSON.stringify(parsed, null, 2);
      const event = { target: { value: updated } };
      handleNewsJsonChange(event);
      setSuccessMessage('已添加新闻项');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (err) {
      setError(`无法添加新闻: ${err.message}`);
    }
  };

  const removeLastItem = () => {
    try {
      const parsed = JSON.parse(newsJson);
      if (parsed.length > 0) {
        parsed.pop();
        const updated = JSON.stringify(parsed, null, 2);
        const event = { target: { value: updated } };
        handleNewsJsonChange(event);
        setSuccessMessage('已删除最后一项');
        setTimeout(() => setSuccessMessage(''), 2000);
      }
    } catch (err) {
      setError(`无法删除: ${err.message}`);
    }
  };

  return (
    <FormContainer>
      <Label htmlFor="newsJson">新闻内容 (JSON格式)</Label>
      <TextArea 
        id="newsJson"
        value={newsJson} 
        onChange={onChange}
        spellCheck="false"
      />
      <HelpText>
        修改上方JSON数据以更新新闻内容。每条新闻需要包含"title"和"content"字段。
        您可以添加任意数量的新闻条目，海报高度将自动调整以适应所有内容。
      </HelpText>
      
      <EditorControls>
        <Button onClick={formatJson}>格式化JSON</Button>
        <AddNewsButton onClick={addNewsItem}>添加新闻项</AddNewsButton>
        <Button onClick={removeLastItem}>删除最后一项</Button>
      </EditorControls>
      
      <ErrorMessage $visible={!!error}>
        {error}
      </ErrorMessage>
      
      <SuccessMessage $visible={!!successMessage}>
        {successMessage}
      </SuccessMessage>
    </FormContainer>
  );
};

export default NewsForm; 