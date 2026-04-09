import UsersService from "../service/service.users.js";
import { ZodError } from "zod";
import type { Request, Response } from "express";
import { AddUserSchema } from "../schemas/addUser.schema.js";
import { EditUserSchema } from "../schemas/editUser.schema.js";
import { AddGUserSchema } from "../schemas/addGUser.schema.js";


const UserController = {
    async getOne(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;
            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }
            const user = await UsersService.getOne(user_public_id);
            return res.status(200).json(user);
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async getAll(req:Request, res:Response){
        try{
            const users = await UsersService.getAll();
            return users;
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async add(req:Request, res:Response){
        try{
            const user = AddUserSchema.parse(req.body);
            const insert = await UsersService.add(user);

            if(insert)
                return res.status(201).json({message:"User Created"});
            else
                return res.status(201).json({message:"User Not Created"});

        }catch(err:any){
            return res.status(500).json({error:err.message});
        }
    },

    async googleAdd(req:Request, res:Response){
        try{
            const user = AddGUserSchema.parse(req.body);
            const insert = await UsersService.googleAdd(user);

            if(insert)
                return res.status(201).json({message:"User Created"});
            else
                return res.status(201).json({message:"User Not Created"});

        }catch(err:any){
            return res.status(500).json({error:err.message});
        }
    },

    async edit(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;

            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }
            const user = EditUserSchema.parse(req.body);
            await UsersService.edit(user,user_public_id);
            return res.status(201).json({message:"User created"});
        }catch(err){ 
            return res.status(500).json({error:err});
        }
    },

    async remove(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;
            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }
            await UsersService.remove(user_public_id);
            return res.status(200).json({message:"User Deleted"});
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async phoneExists(req:Request, res:Response){
        try{

            const phone = req.params.phone as string;

            if(!phone){
                return res.status(400).json({message:"Params Missing"});
            }

            const exists = await UsersService.phoneExists(phone);

            if(exists.phoneExists){
                return res.status(409).json(exists);
            }

            return res.status(200).json(exists);
        }catch(err){
            return res.status(500).json({error:err});
        }
    }
}

export default UserController;
