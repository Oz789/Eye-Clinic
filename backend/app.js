require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require("./db"); 
const createContacts = require('./routes/patient/createContacts');
const employeeRoutes = require('./routes/employee/newEmployee'); 
const loginRoutes = require('./login/login');
const registerPatient = require("./login/register");
const createDoctorRoute = require('./routes/doctor/createDoctor');
const getDoctorRoute = require('./routes/doctor/getDoctor');
const patientRoutes = require('./routes/patientRoutes');
const messageRoutes = require('./routes/message/getMessage');
const insuranceRoutes = require('./routes/insuranceRoutes');
//const formRoutes = require('./routes/patients/createContacts');
const createFramesRoute = require('./routes/admin/createFrames');
const getFramesRoute = require('./routes/admin/getFrames');
const deleteFrameRoute = require('./routes/admin/deleteFrames');
const updateFrameRoute = require('./routes/admin/updateFrames');
const createContactRoute = require('./routes/admin/createContacts');
const getContactsRoute = require('./routes/admin/getContacts');
const deleteContactsRoute = require('./routes/admin/deleteContacts');
const createServiceRoute = require('./routes/admin/createService');
const getServicesRoute = require('./routes/admin/getService');
const deleteServiceRoute = require('./routes/admin/deleteService');
const deleteEmployeeRoute = require('./routes/employee/deleteEmployee');
const getEmployeeRoute = require('./routes/employee/getEmployee');
const updateContactsRoute = require('./routes/admin/updateContacts');
const updateServicesRoute = require('./routes/admin/updateServices');
const getInventoryRoute = require('./routes/reports/getInventory');
const appointmentRoutes = require('./routes/getAppointments');

const schRoute = require('./routes/employee/schManager');
const checkoutRoutes = require('./routes/checkoutRoutes');
const authenticateToken = require('./middleware/auth');
const updateEmployee = require('./routes/employee/updateEmployee');
const getDoctorAppointments = require('./routes/getAppointments');
const getAllAppointments = require('./routes/receptionist/getAllAppointments');
const locationRoutes = require('./routes/doctor/locations'); 
const scheduleRoutes = require('./routes/doctor/schedule');
const scheduledappointmentRoutes = require('./routes/appointmentRoutes');
const getClinicAppointments = require('./routes/receptionist/getClinicAppointments');
const updateStatus = require("./routes/receptionist/updateStatus");
const getNursePatient = require("./routes/nurse/nurseExam");
const updateMedicalForm = require('./routes/nurse/updateNurseForm');
const createExamReport = require('./routes/doctor/updateEyeExamForm');
const createReferralRoute = require('./routes/doctor/referral');
const endAppointmentRoute = require('./routes/doctor/endAppointment');
const getNotifications = require('./routes/notifications/getNotification');
const markReadNotification = require('./routes/notifications/readNotification');
const checkinRoute = require('./routes/receptionist/checkedin'); 
const patientReportRoutes = require('./routes/patientReportRoutes');
const billingRoutes = require('./routes/billing');
const contactRoutes = require('./routes/contact');








const updatePatientInfo = require('./routes/receptionist/getPatientInfo');



const checkoutReceptionistRoute = require('./routes/receptionist/checkoutRoute');
const checkoutReceptionistItemsRoute = require('./routes/receptionist/checkoutServices');
const checkoutUser= require('./routes/cart/userCheckout');
const referralAppointmentRoutes = require('./routes/receptionist/referral');







const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({
        message: "Access granted to protected route ",
        user: req.user
    });
});

app.use("/api/employees", employeeRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/doctor", createDoctorRoute);
app.use("/api", getDoctorRoute);
app.use("/api/patients", patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/", createContacts);
app.use("/", checkoutRoutes)
app.use('/api/employees', employeeRoutes); 
app.use('/api/login', loginRoutes);
app.use('/api/doctor', createDoctorRoute);
app.use('/api', getDoctorRoute);
app.use('/api/patients', patientRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/patients', updateMedicalForm);
//app.use('/api/submit-form', formRoutes);
app.use('/api/schedule', schRoute);
app.use('/', createContacts);
app.use('/api', createFramesRoute);
app.use('/api', getFramesRoute);
app.use('/api', deleteFrameRoute);
app.use('/api', updateFrameRoute);
app.use('/api', createContactRoute);
app.use('/api', getContactsRoute);
app.use('/api', updateContactsRoute);
app.use('/api', deleteContactsRoute);
app.use('/api', createServiceRoute);
app.use('/api', referralAppointmentRoutes);
app.use("/api/nursePatient", getNursePatient);
app.use('/api', getServicesRoute);
app.use('/api', deleteServiceRoute);
app.use('/api/employees', deleteEmployeeRoute)
app.use('/api', getEmployeeRoute)
app.use('/api/employees', updateEmployee);
app.use('/api', updateServicesRoute);
app.use('/api', getInventoryRoute);
app.use('/api/appointments', appointmentRoutes);
app.use('/api', getDoctorAppointments);
app.use('/api', getAllAppointments);
app.use('/api/register-patient', registerPatient);
app.use('/api/locations', locationRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/appointments', scheduledappointmentRoutes);
app.use('/api/appointments', getClinicAppointments);
app.use('/api/appointments', updateStatus);
app.use('/api/examReports', createExamReport);
app.use('/api/referrals', createReferralRoute);
app.use('/api/appointments', endAppointmentRoute);
app.use('/api/notifications', getNotifications);
app.use('/api/notifications/mark-read', markReadNotification);
app.use('/api/appointments', checkinRoute);


app.use('/api/checkout', checkoutReceptionistItemsRoute);
app.use('/api/checkout', checkoutReceptionistRoute);
app.use('/api', checkoutUser);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/patientReport', patientReportRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/contacts', contactRoutes);

app.use('/api/allPatients', updatePatientInfo);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

