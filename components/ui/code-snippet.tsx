import React from 'react';
import { motion } from 'framer-motion';

interface CodeSnippetProps {
  language: string;
  code: string;
  fileName?: string;
  theme?: 'dark' | 'light';
  showLineNumbers?: boolean;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  language,
  code,
  fileName,
  theme = 'dark',
  showLineNumbers = true,
}) => {
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const commentColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-500';
  const keywordColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
  const stringColor = theme === 'dark' ? 'text-green-400' : 'text-green-600';
  const functionColor = theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600';
  const numberColor = theme === 'dark' ? 'text-purple-400' : 'text-purple-600';
  const headerBgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
  
  // Format the code by adding syntax highlighting
  const formatCode = (code: string): JSX.Element[] => {
    const lines = code.split('\n');
    
    return lines.map((line, i) => {
      // This is a basic implementation - a real syntax highlighter would be more complex
      let formattedLine = line;
      
      // Replace common keywords based on language
      if (language === 'javascript' || language === 'typescript') {
        formattedLine = formattedLine
          .replace(/(const|let|var|function|return|if|else|for|while|import|export|from|class|interface|extends|implements)/g, 
            `<span class="${keywordColor}">$1</span>`)
          .replace(/(\/\/.*)/g, 
            `<span class="${commentColor}">$1</span>`)
          .replace(/(['"`])(.*?)(['"`])/g, 
            `<span class="${stringColor}">$1$2$3</span>`)
          .replace(/\b([A-Za-z]+)(?=\()/g, 
            `<span class="${functionColor}">$1</span>`)
          .replace(/\b(\d+)\b/g, 
            `<span class="${numberColor}">$1</span>`);
      } else if (language === 'html') {
        formattedLine = formattedLine
          .replace(/(&lt;[\/]?[a-zA-Z0-9]+(&gt;)?)/g, 
            `<span class="${keywordColor}">$1</span>`)
          .replace(/(["'].*?["'])/g, 
            `<span class="${stringColor}">$1</span>`);
      } else if (language === 'css') {
        formattedLine = formattedLine
          .replace(/([a-zA-Z\-]+)(?=:)/g, 
            `<span class="${keywordColor}">$1</span>`)
          .replace(/(#[a-fA-F0-9]{3,6}|\d+px|\d+%|\d+rem|\d+em)/g, 
            `<span class="${numberColor}">$1</span>`)
          .replace(/(\{|\})/g, 
            `<span class="${functionColor}">$1</span>`);
      } else if (language === 'python') {
        formattedLine = formattedLine
          .replace(/(def|class|if|else|elif|for|while|import|from|return|and|or|not)/g, 
            `<span class="${keywordColor}">$1</span>`)
          .replace(/(#.*)/g, 
            `<span class="${commentColor}">$1</span>`)
          .replace(/(['"`])(.*?)(['"`])/g, 
            `<span class="${stringColor}">$1$2$3</span>`)
          .replace(/\b([A-Za-z]+)(?=\()/g, 
            `<span class="${functionColor}">$1</span>`)
          .replace(/\b(\d+)\b/g, 
            `<span class="${numberColor}">$1</span>`);
      }

      return (
        <div key={i} className="flex">
          {showLineNumbers && (
            <div className={`${commentColor} w-8 text-right pr-4 select-none`}>
              {i + 1}
            </div>
          )}
          <div 
            className="flex-1"
            dangerouslySetInnerHTML={{ __html: formattedLine || '&nbsp;' }} 
          />
        </div>
      );
    });
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-md">
      {fileName && (
        <div className={`${headerBgColor} px-4 py-2 flex items-center justify-between border-b border-gray-700`}>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs font-medium text-gray-400">{fileName}</span>
          </div>
          <span className="text-xs text-gray-500">{language}</span>
        </div>
      )}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`${bgColor} ${textColor} p-4 overflow-x-auto font-mono text-sm`}
      >
        {formatCode(code)}
      </motion.div>
    </div>
  );
};

export default CodeSnippet;
