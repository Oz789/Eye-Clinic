import React, { useState } from "react";
//import AdminFrames from "./frames/adminFrames";
import AdminFramesTab from "../admin/frames/adminFramesTab";
//import ManageStaffTab from "../admin/employee/manageStaffTab";
import AdminContactsTab from "../admin/contacts/adminContactsTab";
//import AdminServicesTab from "../admin/services/adminServicesTab";
import MsgManager from "../../components/msgManager";
//import AdminReportsPage from "../admin/reports/adminReportsPage";
import SchManager from "../../components/employee/schManager";
import TestManager from "../../components/employee/testManager";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const EmpTabContent = ({ activeTab }) => {

  const toggleMessager = () => {
    setMessager(!messager)
    console.log(messager)

  }
  const [messager, setMessager] = useState(false);
  const [ message, setMessage] = useState("null");
  const msgPasser = (m) => {
    setMessage(m);
  }
  switch (activeTab) {
  
    case 1:
      return <MsgManager
        bool={toggleMessager}
        pass={msgPasser}/>
    case 2:
       return <TestManager/>
    case 3:
      return <AdminFramesTab/>
    case 4:
      return <AdminContactsTab/>
    case 5:
     // return <ManageStaffTab/>
        return;
    case 6:
    //  return <AdminReportsPage/>
    return;
    default:
      return null;
  }
};

export default EmpTabContent;
