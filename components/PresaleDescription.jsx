import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default function PresaleDescription({ description_md }) {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await axios.get(description_md);
        setMarkdownContent(response.data);
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchMarkdown();
  }, [description_md]);

  return (
    <div className="markdown-content">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
}
