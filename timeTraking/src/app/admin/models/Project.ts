import { Client } from './Client';
export interface Project{
    id: number;
    name: string;
    timeSold: number;
    client: Client;
    timeConsumed: number;
    timeDifference: number;
    isActive: boolean;
}