const Router = require('koa-router');
const EmployeeController = require('../controllers/employeeController');

const router = new Router();

router.post('/empLogin',EmployeeController.empLogin);
router.get('/getEmpData',EmployeeController.empData);
router.post('/regEmp',EmployeeController.registerEmployee);

module.exports = router;