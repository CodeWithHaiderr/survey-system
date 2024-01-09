const Employees = require('../models/employee');
const { generateToken, hashPwd } = require('../auth');
const { comparePassword } = require('../auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class EmployeeController {
    static async empLogin(ctx) {
        const { employee_username, employee_password } = ctx.request.body;
        console.log('Recieved credentials', employee_username, employee_password);
        try {
            const employee = await Employees.findOne({ where: { employee_username } });
            console.log('found emp----->', employee);
            if (employee) {
                console.log('Stored hashed password:', employee.dataValues.employee_password);
                const isPasswordMatch = await comparePassword(employee_password, employee.dataValues.employee_password);
                console.log('Is password match?', isPasswordMatch);
                console.log('Entered password:', employee_password.trim());
                console.log('Stored hashed password:', employee.dataValues.employee_password.trim());
                console.log('Comparison result:', await comparePassword(
                    employee_password.trim(),
                    employee.dataValues.employee_password.trim()
                  ));

                if (isPasswordMatch) {
                    const token = generateToken(employee);
                    // console.log('found token----->', token);
                    await Employees.update({ token }, { where: { employee_username } });

                    ctx.body = { token, user: { employee_id: employee.employee_id, employee_name: employee.employee_name } };
                    // ctx.body = { token };
                } else {
                    ctx.status = 401;
                    ctx.body = { error: 'Invalid username and password' };
                }
            } else {
                ctx.status = 401;
                ctx.body = { error: 'Invalid username and password' };
            }
        } catch (error) {
            console.error('Error during login:', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }

    static async empData(ctx) {
        const token = ctx.headers.authorization?.split(' ')[1];
        console.log('Recieved Token:', token);
        if (!token) {
            console.log('token in if tab', token);
            ctx.body = 401;
            ctx.body = { error: 'Unauthorized' };
            return;
        }
        try {
            //Verify the token
            const decodeToken = jwt.verify(token, 'yourSecretKey');
            console.log('Decoded Token:', decodeToken);

            //fetch employee data based on TOKEN 
            const employee = await Employees.findOne(decodeToken.employee_id);

            if (employee) {
                //return data accessible to employee
                ctx.body = { employee_id: employee.employee_id, employee_name: employee.employee_name };
            }
            else {
                ctx.status = 401;
                ctx.body = { error: 'Unauthorized' };
            }
        }
        catch (error) {
            console.error('Token Verification Error:', error);
            if (error.name === 'TokenExpiredError') {
                console.log('Token has expired')
            }
            ctx.status = 401;
            ctx.body = { error: 'Unauthorized' };
        }
    }
    static async registerEmployee(ctx) {
        const { employee_name, employee_username, employee_password, employee_area } = ctx.request.body;
        try {
            const existingEmployee = await Employees.findOne({
                where: { employee_username },
            });

            if (existingEmployee) {
                ctx.status = 400;
                ctx.body = { error: "Username is already taken" };
            } else {
                const hashedPassword = hashPwd(employee_password.trim());

                const newEmployee = await Employees.create({
                    employee_name,
                    employee_username,
                    employee_password: hashedPassword,
                    employee_area,
                    no_of_surveys: 0,
                    token: generateToken({ employee_id: 0 }),
                });
                const token = generateToken({ employee_id: newEmployee.employee_id });
                // await Employees.query().patch({ token }).where('employee_id', newEmployee.employee_id);
                await newEmployee.update({ token });
                ctx.status = 201;
                ctx.body = { message: 'Employee registered successfully', employee: newEmployee };
            }
        } catch (error) {
            console.error('Error during employee registration:', error);
            ctx.status = 500;
            ctx.body = { error: 'Internal server error' };
        }
    }
    static async empRegister(ctx) {
        await EmployeeController.registerEmployee(ctx);
    }
}

module.exports = EmployeeController;
