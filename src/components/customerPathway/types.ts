
// Define tree node structure
export interface TreeNode {
  id: string;
  name: string;
  type: 'ai' | 'agent' | 'customer' | 'system';
  children?: TreeNode[];
  data?: {
    duration?: string;
    sentiment?: 'positive' | 'neutral' | 'negative';
    time?: string;
    message?: string;
  };
}
