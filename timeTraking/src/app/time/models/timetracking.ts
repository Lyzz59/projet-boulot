import { User } from './../../admin/models/User';
import { Project } from './project';
import { Type_project } from './type_project';

export interface TimeTracking{
    id: number;
    valeur: number;
    project: Project;
    projectId: number,
    typology: Type_project;
    user: User;
    createdAt: Date;
    description: string;  
}