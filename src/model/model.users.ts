import pool from "../config/db.js";
import type { RowDataPacket,ResultSetHeader } from "mysql2";
import type { AddUser } from "../types/addUser.type.js";
import type { EditUserInput } from "../schemas/editUser.schema.js";
import type { AddGUserInput } from "../schemas/addGUser.schema.js";

const UsersModel = {

    async fetchOne(user_public_id:string){
        const sql = `SELECT 
                     user_fname, user_lname, user_phone
                     FROM users WHERE user_public_id = ?`;
        const [row] = await pool.execute< RowDataPacket[] >(sql,[user_public_id]);
        return row[0] ?? null;
    },

    async fetchAll(){
         const sql = `SELECT 
                     user_fname, user_lname,user_phone
                     FROM users`;
        const [rows] = await pool.execute(sql);
        return rows ?? null;
    },

    async insert(userDetails:AddUser){
        const sql = `INSERT INTO 
                     users(user_public_id, user_fname, user_lname, user_country_code, user_phone)
                     VALUES(?,?,?,?,?)`;
        const [result] = await pool.execute<ResultSetHeader>(sql,[
            userDetails.user_public_id,
            userDetails.user_fname,
            userDetails.user_lname,
            userDetails.user_country_code,
            userDetails.user_phone
        ]);

        if(result.affectedRows > 0)
            return true
        else
            return false
    },

    async googleInsert(userDetails:AddGUserInput){
        const sql = `INSERT INTO 
                     users(user_public_id, user_fname, user_lname, user_country_code, user_phone)
                     VALUES(?,?,?,?,?)`;
        const [result] = await pool.execute<ResultSetHeader>(sql,[
            userDetails.user_public_id,
            userDetails.user_fname,
            userDetails.user_lname,
        ]);

        if(result.affectedRows > 0)
            return true
        else
            return false
    },

    async update(userDetails:EditUserInput, user_public_id:string){
        const keys = Object.keys(userDetails);
        const fields = keys.map( k => `${k} = ?`).join(",");
        const values = keys.map( k => (userDetails as any) [k]);

        const sql = `UPDATE 
                     users
                     SET ${fields}
                     WHERE user_public_id = ?`;
        
        return pool.execute(sql,[...values,user_public_id]);
    },

    async delete(user_public_id:string){
        const sql = `DELETE 
                     FROM users
                     WHERE user_public_id = ?`;

        return await pool.execute(sql,[user_public_id]);
    },

    async checkPhoneExists(phone:string){
        const sql = `SELECT 
                    user_phone 
                    FROM users 
                    WHERE user_phone = ?`;

        const [rows] = await pool.execute<RowDataPacket[]>(sql,[phone]);

        return {
            phoneExists: rows.length > 0
        }
    
    }
}

export default UsersModel;
