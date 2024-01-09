const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'yourSecretKey';

const generateToken = (employee) => {
    const token = jwt.sign({ emp_id: employee.emp_id }, jwtSecretKey, {
        expiresIn: '2h',
    });
    return token;
};
const comparePassword = async (password, hashedPassword) => {
     return await bcrypt.compare(password, hashedPassword); 
};
const hashPwd = (pwd) => {
   const hashedPassword = bcrypt.hashSync(pwd,10);
   return hashedPassword;
};
module.exports =  { 
    generateToken,
    comparePassword,
    hashPwd,
};
