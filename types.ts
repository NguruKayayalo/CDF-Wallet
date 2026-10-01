
export interface TokenData {
  name: string;
  symbol: string;
  network: string;
  supply: string;
  decimals: number;
  contractType: string;
  adminAddress: string;
}

export interface DistributionItem {
  name: string;
  value: number;
  color: string;
  description: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  items: string[];
  status: 'completed' | 'in-progress' | 'planned';
}

export interface ContactInfo {
  platform: string;
  value: string;
  link: string;
  icon: string;
}

// Nebula Types
export enum AppMode {
  Chat = 'chat',
  Vision = 'vision',
  Imagine = 'imagine',
}

export enum MessageRole {
  User = 'user',
  Model = 'model',
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  isError?: boolean;
}
