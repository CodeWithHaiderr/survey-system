const FamilyMember = require('../models/family_members');

class FamilyMemberController {
    static async getAllFamilyMembers(ctx) {
        try {
            const familyMembers = await FamilyMember.findAll();
            ctx.status = 200;
            ctx.body = { familyMembers };
        } catch (error) {
            console.error('Error fetching family members', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }
    static async getFamilyMemberById(ctx) {
        const family_id = ctx.params.family_id;
        try {
            const family = await FamilyMember.findAll({
                where: { family_id: family_id }
            });
            ctx.status = 200;
            ctx.body = { family };
        } catch (error) {
            console.error('Error fetching family member', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }
    static async addFamilyMember(ctx) {
        try {
            const {
                family_id,
                member_name,
                member_age,
                member_gender,
                house_address,
                isHead,
                member_occupation,
                member_office,
                office_emp_id,
                office_location,
                monthly_income,
                annual_income,
                monthly_expense,
                isStudent,
                student_name,
                student_roll_no,
                institute_name,
                institute_type,
                institute_location,
                institute_city,
                student_class,
                monthly_fee,
                annual_fee,
                remaining_fee,
                isEmployeed,
                isEmployeed_type,
                isEmployeed_office_name,
                isEmployeed_monthly_income,
                isEmployeed_monthly_expense
            } = ctx.request.body;
            const addNewFamilyMember = FamilyMember.create({
                family_id,
                member_name,
                member_age,
                member_gender,
                house_address,
                isHead,
                member_occupation: isHead ? member_occupation : null,
                member_office: isHead ? member_office : null,
                office_emp_id: isHead ? office_emp_id : null,
                office_location: isHead ? office_location : null,
                monthly_income: isHead ? monthly_income : null,
                annual_income: isHead ? annual_income : null,
                monthly_expense: isHead ? monthly_expense : null,
                isStudent,
                student_name: isStudent ? student_name : null,
                student_roll_no: isStudent ? student_roll_no : null,
                institute_name: isStudent ? institute_name : null,
                institute_type: isStudent ? institute_type : null,
                institute_location: isStudent ? institute_location : null,
                institute_city: isStudent ? institute_city : null,
                student_class: isStudent ? student_class : null,
                monthly_fee: isStudent ? monthly_fee : null,
                annual_fee: isStudent ? annual_fee : null,
                remaining_fee: isStudent ? remaining_fee : null,
                isEmployeed,
                isEmployeed_type: isEmployeed ? isEmployeed_type : null,
                isEmployeed_office_name: isEmployeed ? isEmployeed_office_name : null,
                isEmployeed_monthly_income: isEmployeed ? isEmployeed_monthly_income : null,
                isEmployeed_monthly_expense: isEmployeed ? isEmployeed_monthly_expense : null,
            });
            ctx.status = 200;
            ctx.body = { addNewFamilyMember };
        } catch (error) {
            console.error("Error adding family", error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }
    static async addFamilyMemberOfFamily(ctx) {
        try {
            const {
                family_id,
                member_name,
                member_age,
                member_gender,
                house_address,
                isHead,
                member_occupation,
                member_office,
                office_emp_id,
                office_location,
                monthly_income,
                annual_income,
                monthly_expense,
                isStudent,
                student_name,
                student_roll_no,
                institute_name,
                institute_type,
                institute_location,
                institute_city,
                student_class,
                monthly_fee,
                annual_fee,
                remaining_fee,
                isEmployeed,
                isEmployeed_type,
                isEmployeed_office_name,
                isEmployeed_monthly_income,
                isEmployeed_monthly_expense
            } = ctx.request.body;

            const existingFamily = await FamilyMember.findByPk(family_id);
            if (!existingFamily) {
                ctx.status = 404;
                ctx.body = { error: 'Family not found' };
                return;
            }
            const addNewFamilyMember = FamilyMember.create({
                family_id,
                member_name,
                member_age,
                member_gender,
                house_address,
                isHead,
                member_occupation: isHead ? member_occupation : null,
                member_office: isHead ? member_office : null,
                office_emp_id: isHead ? office_emp_id : null,
                office_location: isHead ? office_location : null,
                monthly_income: isHead ? monthly_income : null,
                annual_income: isHead ? annual_income : null,
                monthly_expense: isHead ? monthly_expense : null,
                isStudent,
                student_name: isStudent ? student_name : null,
                student_roll_no: isStudent ? student_roll_no : null,
                institute_name: isStudent ? institute_name : null,
                institute_type: isStudent ? institute_type : null,
                institute_location: isStudent ? institute_location : null,
                institute_city: isStudent ? institute_city : null,
                student_class: isStudent ? student_class : null,
                monthly_fee: isStudent ? monthly_fee : null,
                annual_fee: isStudent ? annual_fee : null,
                remaining_fee: isStudent ? remaining_fee : null,
                isEmployeed,
                isEmployeed_type: isEmployeed ? isEmployeed_type : null,
                isEmployeed_office_name: isEmployeed ? isEmployeed_office_name : null,
                isEmployeed_monthly_income: isEmployeed ? isEmployeed_monthly_income : null,
                isEmployeed_monthly_expense: isEmployeed ? isEmployeed_monthly_expense : null,
            });
            ctx.status = 200;
            ctx.body = { addNewFamilyMember };
        } catch (error) {
            console.error('Error adding family member for a specific family', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }

    static async updateFamilyMember(ctx) {
        try {
            const member_id = ctx.params.member_id;
            const {
                family_id,
                member_name,
                member_age,
                member_gender,
                house_address,
                isHead,
                member_occupation,
                member_office,
                office_emp_id,
                office_location,
                monthly_income,
                annual_income,
                monthly_expense,
                isStudent,
                student_name,
                student_roll_no,
                institute_name,
                institute_type,
                institute_location,
                institute_city,
                student_class,
                monthly_fee,
                annual_fee,
                remaining_fee,
                isEmployeed,
                isEmployeed_type,
                isEmployeed_office_name,
                isEmployeed_monthly_income,
                isEmployeed_monthly_expense
            } = ctx.request.body;

            const familyMember = await FamilyMember.findByPk(member_id);

            if (!familyMember) {
                ctx.status = 404;
                ctx.body = { error: 'Member not found' };
                return;
            }
            familyMember.family_id = family_id;
            familyMember.member_name = member_name;
            familyMember.member_age = member_age;
            familyMember.member_gender = member_gender;
            familyMember.house_address = house_address;
            if (isHead) {
                familyMember.member_occupation = member_occupation;
                familyMember.member_office = member_office;
                familyMember.office_emp_id = office_emp_id;
                familyMember.office_location = office_location;
                familyMember.monthly_income = monthly_income;
                familyMember.annual_income = annual_income;
                familyMember.monthly_expense = monthly_expense
            }
            else {
                familyMember.monthly_income = monthly_income;
                familyMember.monthly_expense = monthly_expense;
            }
            if (isStudent) {
                familyMember.student_name = student_name;
                familyMember.student_roll_no = student_roll_no;
                familyMember.institute_name = institute_name;
                familyMember.institute_type = institute_type;
                familyMember.institute_location = institute_location;
                familyMember.institute_city = institute_city;
                familyMember.student_class = student_class;
                familyMember.monthly_fee = monthly_fee;
                familyMember.annual_fee = annual_fee;
                familyMember.remaining_fee = remaining_fee;
            }
            if (isEmployeed) {
                familyMember.isEmployeed_type = isEmployeed_type;
                familyMember.isEmployeed_office_name = isEmployeed_office_name;
                familyMember.isEmployeed_monthly_income = isEmployeed_monthly_income;
                familyMember.isEmployeed_monthly_expense = isEmployeed_monthly_expense;
            }
            else {
                familyMember.monthly_income = monthly_income;
                familyMember.monthly_expense = monthly_expense;
            }

            await familyMember.save();
            ctx.status = 200;
            ctx.body = { familyMember };
        } catch (error) {
            console.error('Error updating family member', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }
}
module.exports = FamilyMemberController;