import React from 'react';
import DOMPurify from 'dompurify'; // Import DOMPurify

interface ParsedContentProps {
  content: string;
}

const ParsedContent: React.FC<ParsedContentProps> = ({ content }) => {
  const cleanHTML = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'u', 'br'], // Customize allowed tags as needed
    ALLOWED_ATTR: [], // Disallow all attributes for stricter security
  });

  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

export default ParsedContent;
