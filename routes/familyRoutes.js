const Router = require('koa-router');
const FamilyController = require('../controllers/familyController');

const router = new Router();

router.get('/getFamilies/:employee_id', FamilyController.getFamilyMemberbyEmpId);
router.post('/addFamily',FamilyController.addFamily);
router.post('/addFamily/:employee_id',FamilyController.addFamily);
router.put('/updateFamilyById/:family_id',FamilyController.updateFamily);

module.exports = router;