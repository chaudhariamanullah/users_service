import UsersModel from "../model/model.users.js";
import type { AddUserInput } from "../schemas/addUser.schema.js";
import type { EditUserInput } from "../schemas/editUser.schema.js";
import type { AddGUserInput } from "../schemas/addGUser.schema.js";
const UsersService = {

    async getOne(user_public_id:string){
        return await UsersModel.fetchOne(user_public_id);
    },

    async getAll(){
        return await UsersModel.fetchAll();
    },

    async add(user:AddUserInput){
        return await UsersModel.insert(user);
    },

    async googleAdd(user:AddGUserInput){
        return await UsersModel.googleInsert(user);
    },

    async edit(user:EditUserInput,user_public_id:string){
        return await UsersModel.update(user,user_public_id);
    },

    async remove(user_public_id:string){
        return await UsersModel.delete(user_public_id);
    },

    async phoneExists(phone:string){
        return await UsersModel.checkPhoneExists(phone);
    }
}

export default UsersService;