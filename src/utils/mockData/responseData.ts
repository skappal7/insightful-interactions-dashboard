
import { ResponseData } from '../types/dashboardTypes';

// Mock Response Data
export const generateResponseData = (): ResponseData[] => [
  // AI Handled Responses
  {
    query: 'What is my current account balance?',
    frequency: 128,
    aiHandled: true,
    completionRate: 94.5,
  },
  {
    query: 'How do I reset my password?',
    frequency: 97,
    aiHandled: true,
    completionRate: 91.8,
  },
  {
    query: 'Show me my recent transactions',
    frequency: 85,
    aiHandled: true,
    completionRate: 89.3,
  },
  {
    query: 'What are your business hours?',
    frequency: 76,
    aiHandled: true,
    completionRate: 97.2,
  },
  {
    query: 'How do I update my payment method?',
    frequency: 64,
    aiHandled: true,
    completionRate: 88.6,
  },
  // Live Agent Handled Responses
  {
    query: 'Why was I charged twice?',
    frequency: 58,
    aiHandled: false,
    completionRate: 97.8,
  },
  {
    query: 'My service is down, when will it be fixed?',
    frequency: 51,
    aiHandled: false,
    completionRate: 95.2,
  },
  {
    query: 'I need a refund for my purchase',
    frequency: 47,
    aiHandled: false,
    completionRate: 94.3,
  },
  {
    query: 'The product I received is damaged',
    frequency: 42,
    aiHandled: false,
    completionRate: 98.1,
  },
  {
    query: 'I need to escalate my complaint',
    frequency: 39,
    aiHandled: false,
    completionRate: 96.5,
  },
];
