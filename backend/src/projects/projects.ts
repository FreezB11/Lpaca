import {Request, Response, Router} from "express";
import { projectSchema, validate } from "./validate";

// i will use redis

export const ProjectRouter = Router();

ProjectRouter.get("/:userID", validate(projectSchema) ,async (req: Request, res: Response) => {
    // make a call to the db with the userid
    // fetch all the projects for the specific userid 
})

ProjectRouter.post("/:userID", async(req: Request, res: Response)=>{
    // we gotta tell the queue to upload the code and run the instance
    // the code or repo link will be taken and sent to the MQ then the instance id will be return for the url
    // must return succes code in case of proper upload and instance running 

})

ProjectRouter.get("/:userID/:projectID", async(req: Request, res: Response)=>{

})

ProjectRouter.patch("/:userID/:projectID", async(req: Request, res: Response)=>{

})

ProjectRouter.delete("/:userID/:projectID", async(req: Request, res: Response)=>{

})