import { Schema, model, Document } from "mongoose";

export interface IProject extends Document{
    projectID: string;
    createdAt: Date;
    updatedAt: Date;
    ownerID: string;
    isPublic: boolean;
}