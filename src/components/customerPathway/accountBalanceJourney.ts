
import { TreeNode } from './types';

// Account balance customer journey
export const accountBalanceJourney: TreeNode = {
  id: 'journey-2',
  name: 'Customer Inquiry: Account Balance',
  type: 'system',
  data: {
    time: '11:15 AM'
  },
  children: [
    {
      id: 'journey-2-1',
      name: 'Initial Customer Contact',
      type: 'customer',
      data: {
        sentiment: 'neutral',
        time: '11:15 AM',
        message: 'What is my current account balance?'
      },
      children: [
        {
          id: 'journey-2-1-1',
          name: 'Chatbot: Authentication',
          type: 'ai',
          data: {
            sentiment: 'neutral',
            time: '11:15 AM',
            duration: '0.3s',
            message: 'I\'ll be happy to help you check your account balance. For your security, I\'ll need to verify your identity. Can you please provide your account number or username?'
          }
        },
        {
          id: 'journey-2-1-2',
          name: 'Customer Response',
          type: 'customer',
          data: {
            sentiment: 'neutral',
            time: '11:16 AM',
            message: 'My username is JDoe454'
          }
        },
        {
          id: 'journey-2-1-3',
          name: 'Chatbot: Security Question',
          type: 'ai',
          data: {
            sentiment: 'neutral',
            time: '11:16 AM',
            duration: '0.5s',
            message: 'Thank you. For additional security, please answer your security question: What was the name of your first pet?'
          }
        },
        {
          id: 'journey-2-1-4',
          name: 'Customer Response',
          type: 'customer',
          data: {
            sentiment: 'neutral',
            time: '11:17 AM',
            message: 'Fluffy'
          }
        },
        {
          id: 'journey-2-1-5',
          name: 'Chatbot: Balance Information',
          type: 'ai',
          data: {
            sentiment: 'positive',
            time: '11:17 AM',
            duration: '0.8s',
            message: 'Thank you for verifying your identity. Your current account balance is $2,543.87. Your next statement will be available on the 15th. Is there anything else you would like to know about your account?'
          }
        },
        {
          id: 'journey-2-1-6',
          name: 'Customer Response',
          type: 'customer',
          data: {
            sentiment: 'positive',
            time: '11:18 AM',
            message: 'No, that\'s all I needed. Thanks!'
          }
        },
        {
          id: 'journey-2-1-7',
          name: 'Chatbot: Closing',
          type: 'ai',
          data: {
            sentiment: 'positive',
            time: '11:18 AM',
            duration: '0.4s',
            message: 'You\'re welcome! Thank you for using our service. Have a great day!'
          }
        }
      ]
    }
  ]
};
