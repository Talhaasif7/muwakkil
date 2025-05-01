
import { v4 as uuidv4 } from 'uuid';
import { Message, ActionLogStep, KnowledgeItem } from '../types/chat';
import { getKnowledgeItems, getFollowUpResponse } from '../utils/chatUtils';

export const simulateAIResponse = (
  message: string,
  userIntent: string,
  messages: Message[],
  setActionLogSteps: (steps: ActionLogStep[]) => void,
  setLoading: (loading: boolean) => void,
  onComplete: (aiResponse: Message, finalLogs: ActionLogStep[]) => void
): void => {
  const knowledgeItems = getKnowledgeItems();
  setLoading(true);
  setActionLogSteps([{ text: 'Analyzing your query...' }]);
  
  // Simulate AI response process with knowledge document analysis
  setTimeout(() => {
    // First update - analyzing
    setActionLogSteps([
      { text: 'Analyzing your query...' },
      { text: 'Analyzing conversation history...', source: 'Chat History' },
      { text: 'Searching knowledge base...', source: 'User Knowledge Base' }
    ]);
    
    // Second update after a bit - found documents
    setTimeout(() => {
      const documentLogs: ActionLogStep[] = [
        { text: 'Analyzed query', source: 'Knowledge Base' },
        { text: 'Analyzed conversation context', source: 'Chat History' },
      ];
      
      // Add each knowledge document to the action log
      if (knowledgeItems.length > 0) {
        knowledgeItems.forEach(item => {
          documentLogs.push({ 
            text: 'Found relevant document', 
            document: item.name 
          });
        });
        
        documentLogs.push({ 
          text: 'Analyzing document contents...', 
          document: knowledgeItems.map(item => item.name).join(', ') 
        });
      } else {
        documentLogs.push({ 
          text: 'Found relevant documents', 
          document: 'UAE Corporate Tax Law 2023.pdf' 
        });
        documentLogs.push({ 
          text: 'Analyzing document contents...', 
          document: 'UAE Corporate Tax Law 2023.pdf' 
        });
      }
      
      setActionLogSteps(documentLogs);
      
      // Final update - generating response
      setTimeout(() => {
        const finalLogs: ActionLogStep[] = [
          { text: 'Analyzed query', source: 'Knowledge Base' },
          { text: 'Analyzed conversation context', source: 'Chat History' },
        ];
        
        // Add each knowledge document to the final action log
        if (knowledgeItems.length > 0) {
          knowledgeItems.forEach(item => {
            finalLogs.push({ 
              text: 'Found relevant document', 
              document: item.name 
            });
          });
          
          finalLogs.push({ 
            text: 'Analyzed document contents', 
            document: knowledgeItems.map(item => item.name).join(', ') 
          });
        } else {
          finalLogs.push({ 
            text: 'Found relevant documents', 
            document: 'UAE Corporate Tax Law 2023.pdf' 
          });
          finalLogs.push({ 
            text: 'Analyzed document contents', 
            document: 'UAE Corporate Tax Law 2023.pdf' 
          });
        }
        
        finalLogs.push({ 
          text: 'Generating response based on documents, knowledge base, and conversation history...', 
        });
        
        setActionLogSteps(finalLogs);
        
        // Finally, add the AI message
        setTimeout(() => {
          let responseContent = generateResponseContent(userIntent, message, messages, knowledgeItems);
          
          const aiResponse: Message = {
            id: uuidv4(),
            content: responseContent,
            sender: 'ai',
            timestamp: new Date(),
          };

          // Final action log
          const completeLogs = [...finalLogs];
          completeLogs.push({ 
            text: 'Generated response based on document analysis and conversation history', 
            source: knowledgeItems.length > 0 ? 'User Knowledge Base' : 'Legal Database'
          });
          
          onComplete(aiResponse, completeLogs);
        }, 800);
      }, 1000);
    }, 1500);
  }, 800);
};

const generateResponseContent = (
  userIntent: string, 
  message: string, 
  messages: Message[], 
  knowledgeItems: KnowledgeItem[]
): string => {
  let responseContent = '';
  
  // Generate response based on user intent and knowledge items
  if (userIntent === 'follow-up' && messages.length > 0) {
    // This is a follow-up question, reference previous content
    responseContent = `Based on our previous conversation and your follow-up question, I can provide more details. ${getFollowUpResponse(message, knowledgeItems)}`;
  } else if (userIntent === 'tax') {
    if (knowledgeItems.length > 0) {
      responseContent = `Based on the analysis of your uploaded documents (${knowledgeItems.map(item => item.name).join(', ')}) and our conversation history, businesses with taxable income over AED 375,000 are subject to a 9% corporate tax rate in UAE. Businesses with income below this threshold are subject to a 0% rate.`;
    } else {
      responseContent = `Based on the UAE Corporate Tax Law of 2023, businesses with taxable income over AED 375,000 are subject to a 9% corporate tax rate. Businesses with income below this threshold are subject to a 0% rate. Your previous questions help me understand you're interested in specific tax implications.`;
    }
  } else if (userIntent === 'tax-rate') {
    responseContent = `Following up on our previous tax discussion, the standard corporate tax rate in the UAE is 9% for businesses with taxable income above AED 375,000. Small businesses and startups with income below this threshold benefit from a 0% rate. There are also specific provisions for free zone businesses that meet certain conditions.`;
  } else if (userIntent === 'document') {
    if (knowledgeItems.length > 0) {
      responseContent = `I've analyzed your uploaded documents (${knowledgeItems.map(item => item.name).join(', ')}) in the context of our ongoing conversation. These documents contain information about ${knowledgeItems.length > 1 ? 'various topics' : 'the topic you mentioned'}. Would you like me to elaborate on any specific aspect from these documents?`;
    } else {
      responseContent = `Based on our conversation history, I understand you're interested in document analysis. To provide you with the most accurate information, I recommend uploading the relevant documents to your knowledge base. This will allow me to analyze them directly.`;
    }
  } else {
    // Default response for general queries
    if (knowledgeItems.length > 0) {
      responseContent = `I've analyzed your query against your uploaded knowledge documents (${knowledgeItems.map(item => item.name).join(', ')}) and considered our previous conversation. Based on this comprehensive analysis, I can provide you with information relevant to your question. What specific aspects would you like me to elaborate on?`;
    } else {
      responseContent = `Based on our conversation history and available information, ${message.toLowerCase().includes('tax') ? 'businesses with taxable income over AED 375,000 are subject to a 9% corporate tax rate. Businesses with income below this threshold are subject to a 0% rate.' : 'I found some information that might be relevant to your query. How can I provide more specific assistance?'}`;
    }
  }
  
  return responseContent;
};
