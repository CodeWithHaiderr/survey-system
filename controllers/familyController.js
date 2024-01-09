const Family = require('../models/family');

class FamilyController {
    static async getFamilyMemberbyEmpId(ctx) {
        const employee_id = ctx.params.employee_id;
        try{
            const family = await Family.findAll({
                where: {employee_id: employee_id}
            });
            ctx.body = {family};
        }catch(error){
            console.error('Error fetching families',error);
            ctx.status = 500;
            ctx.body = {error: 'Internal server erorr'};
        }
    }
    static async addFamily(ctx){
        const employee_id = ctx.params.employee_id;
        const { house_address, total_income, total_expense, city, area} = ctx.request.body;
        try{
            const newFamily = await Family.create({
                employee_id,
                house_address,
                total_income,
                total_expense,
                city,
                area
            });
            ctx.body = {newFamily};
        } catch (error) {
            console.error('Error adding families',error);
            ctx.status = 500;
            ctx.body = {error: 'Internal server erorr'};
        }
    }
    static async updateFamily(ctx){
        const family_id = ctx.params.family_id;
        const {house_address,total_income,total_expense,city,area} = ctx.request.body;
        try {
            const updatefamily = await Family.findByPk(family_id);
            if(updatefamily){
                await updatefamily.update({
                    house_address,total_income,total_expense,city,area
                });
                ctx.body = {updatefamily};
            } else {
                ctx.status = 404;
                ctx.body = {error: 'Family not found'};
            }
        } catch (error) {
            onsole.error('Error updating family',error);
            ctx.status = 500;
            ctx.body = {error: 'Internal server erorr'};
        }
    }
}
module.exports = FamilyController;