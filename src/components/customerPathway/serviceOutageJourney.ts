
import { TreeNode } from './types';

// Service outage customer journey
export const serviceOutageJourney: TreeNode = {
  id: 'journey-1',
  name: 'Customer Inquiry: Service Outage',
  type: 'system',
  data: {
    time: '10:32 AM'
  },
  children: [
    {
      id: 'journey-1-1',
      name: 'Initial Customer Contact',
      type: 'customer',
      data: {
        sentiment: 'negative',
        time: '10:32 AM',
        message: 'I can\'t access my account. Is there an outage? I need to make an urgent payment!'
      },
      children: [
        {
          id: 'journey-1-1-1',
          name: 'Chatbot: Initial Response',
          type: 'ai',
          data: {
            sentiment: 'neutral',
            time: '10:32 AM',
            duration: '0.4s',
            message: 'I apologize for the inconvenience. I\'d be happy to help you with your account access issue. We do have some reports of service disruption. Let me check the status for you.'
          }
        },
        {
          id: 'journey-1-1-2',
          name: 'Chatbot: Service Status Check',
          type: 'ai',
          data: {
            sentiment: 'neutral',
            time: '10:33 AM',
            duration: '1.2s',
            message: 'I can confirm that we\'re experiencing a technical issue affecting some accounts. Our technical team is aware and working to resolve it as quickly as possible.'
          }
        },
        {
          id: 'journey-1-1-3',
          name: 'Customer Response',
          type: 'customer',
          data: {
            sentiment: 'negative',
            time: '10:34 AM',
            message: 'That\'s not good enough. I need to make this payment today or I\'ll be charged a late fee. Can you help me make the payment another way?'
          }
        },
        {
          id: 'journey-1-1-4',
          name: 'Chatbot: Alternative Payment Option',
          type: 'ai',
          data: {
            sentiment: 'neutral',
            time: '10:35 AM',
            duration: '1.5s',
            message: 'I understand your concern about the late fee. Yes, I can help you make a payment through an alternative method. Would you like to make a payment by phone with an agent, or would you prefer to use our mobile app which is currently operational?'
          }
        },
        {
          id: 'journey-1-1-5',
          name: 'Customer Response',
          type: 'customer',
          data: {
            sentiment: 'neutral',
            time: '10:36 AM',
            message: 'I don\'t have the app. Can I just speak to someone to make the payment now?'
          }
        },
        {
          id: 'journey-1-1-6',
          name: 'Chatbot: Escalation to Agent',
          type: 'ai',
          data: {
            sentiment: 'positive',
            time: '10:37 AM',
            duration: '0.8s',
            message: 'Of course. I\'ll connect you with a payment specialist who can process your payment over the phone. Please hold while I transfer you.'
          },
          children: [
            {
              id: 'journey-1-1-6-1',
              name: 'Transfer to Live Agent',
              type: 'system',
              data: {
                time: '10:37 AM'
              },
              children: [
                {
                  id: 'journey-1-1-6-1-1',
                  name: 'Live Agent: Sarah',
                  type: 'agent',
                  data: {
                    sentiment: 'positive',
                    time: '10:39 AM',
                    message: 'Hello, this is Sarah from customer support. I understand you need to make a payment today. I\'d be happy to help you with that right now.'
                  }
                },
                {
                  id: 'journey-1-1-6-1-2',
                  name: 'Customer Response',
                  type: 'customer',
                  data: {
                    sentiment: 'neutral',
                    time: '10:40 AM',
                    message: 'Yes, I need to pay my bill before the due date today.'
                  }
                },
                {
                  id: 'journey-1-1-6-1-3',
                  name: 'Live Agent: Payment Process',
                  type: 'agent',
                  data: {
                    sentiment: 'positive',
                    time: '10:41 AM',
                    duration: '4.5 min',
                    message: 'I can definitely help you with that. Let me take your payment details...'
                  }
                },
                {
                  id: 'journey-1-1-6-1-4',
                  name: 'Live Agent: Confirmation',
                  type: 'agent',
                  data: {
                    sentiment: 'positive',
                    time: '10:46 AM',
                    message: 'Great news! Your payment has been successfully processed. You\'ll receive a confirmation email shortly. Is there anything else I can help you with today?'
                  }
                },
                {
                  id: 'journey-1-1-6-1-5',
                  name: 'Customer Response',
                  type: 'customer',
                  data: {
                    sentiment: 'positive',
                    time: '10:47 AM',
                    message: 'No, that\'s all I needed. Thank you for your help.'
                  }
                },
                {
                  id: 'journey-1-1-6-1-6',
                  name: 'Live Agent: Closing',
                  type: 'agent',
                  data: {
                    sentiment: 'positive',
                    time: '10:48 AM',
                    message: 'You\'re welcome. Thank you for your patience with our technical issues today. Have a great day!'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
