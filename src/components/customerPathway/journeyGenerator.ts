
import { TreeNode } from './types';
import { serviceOutageJourney } from './serviceOutageJourney';
import { accountBalanceJourney } from './accountBalanceJourney';

// Main function that combines all journey data
export const generateCustomerPathwayTreeData = (): TreeNode[] => [
  serviceOutageJourney,
  accountBalanceJourney
];
