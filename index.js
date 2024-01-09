const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require('@koa/cors');
const EmployeeRoutes = require('./routes/employeeRoutes');
const FamilyRoutes = require('./routes/familyRoutes');
const FamilyMemberRoutes = require('./routes/familyMemberRoutes');
const Employees = require("./models/employee");
const Family = require("./models/family");
const FamilyMember = require('./models/family_members');
const app = new Koa();

app.use(cors());
app.use(bodyParser());

app.use(EmployeeRoutes.routes());
app.use(EmployeeRoutes.allowedMethods());

app.use(FamilyRoutes.routes());
app.use(FamilyRoutes.allowedMethods());

app.use(FamilyMemberRoutes.routes());
app.use(FamilyMemberRoutes.allowedMethods());

Employees.sync();
Family.sync();
FamilyMember.sync();

const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port 3000');
});


