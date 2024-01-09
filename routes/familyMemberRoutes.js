const Router = require('koa-router');
const FamilyMemberController = require('../controllers/familyMemberController');

const router = new Router();

router.get('/getAllFamilyMembers', FamilyMemberController.getAllFamilyMembers);
router.get('/getFamilyMemberbyFamilyId/:family_id',FamilyMemberController.getFamilyMemberById);
router.post('/addFamilyMember',FamilyMemberController.addFamilyMember);
router.post('/addFamilyMemberOfFamily/:family_id',FamilyMemberController.addFamilyMemberOfFamily);
router.put('/updateFamilyMember/:member_id',FamilyMemberController.updateFamilyMember);

module.exports = router;