import React, { useState, useEffect } from 'react';
import '../doctor/doctorAppointments.css';
import PatientFormViewer from '../patientPortal/patientFormViewer';

const groupByDate = (appointments) => {
  return appointments.reduce((acc, appt) => {
    const dt = new Date(`${appt.appointmentDate}T${appt.appointmentTime}`);
    const dateStr = dt.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    acc[dateStr] = acc[dateStr] || [];
    acc[dateStr].push(appt);
    return acc;
  }, {});
};

const ClinicAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedPatientID, setSelectedPatientID] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const locationID = localStorage.getItem("userLocation"); 

  const handleCheckIn = async (appointmentID) => {
    try {
      const res = await fetch(`http://localhost:5001/api/appointments/checkin/${appointmentID}`, {
        method: "PATCH",
      });
  
      if (res.ok) {
     
        setAppointments(prev =>
          prev.map(appt =>
            appt.appointmentID === appointmentID
              ? { ...appt, status: "On Hold", checkInTime: new Date().toISOString() }
              : appt
          )
        );
      } else {
        console.error("Check-in failed");
      }
    } catch (err) {
      console.error("Check-in error:", err);
    }
  };
  

  useEffect(() => {
    if (!locationID) return;

    fetch(`http://localhost:5001/api/appointments/clinicAppointments/${locationID}`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(appt => {
          const dateObj = new Date(appt.appointmentDate);
          const yyyy = dateObj.getFullYear();
          const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
          const dd = String(dateObj.getDate()).padStart(2, '0');
          const rawDate = `${yyyy}-${mm}-${dd}`;
          const cleanTime = appt.appointmentTime?.slice(0, 5);

          return {
            appointmentID: appt.appointmentNumber,
            patientID: appt.patientID,
            patientName: `${appt.patientFirstName} ${appt.patientLastName}`.trim(),
            doctorName: `${appt.doctorFirstName} ${appt.doctorLastName}`,
            appointmentDate: rawDate,
            appointmentTime: cleanTime,
            status: appt.status
          };
        });

        setAppointments(formatted);
      })
      .catch(err => {
        console.error("Failed to fetch clinic-specific appointments:", err);
      });
  }, [locationID]);

  const filtered = appointments.filter(appt =>
    appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appt.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const scheduledOnly = filtered.filter(appt => appt.status === "Scheduled");
  const grouped = groupByDate(scheduledOnly);


  return (
    <div className="appointment-wrapper">
      <div className="appointment-left">
        <h2 className="appointments-title">Clinic Appointments</h2>

        <input
          type="text"
          placeholder="Search by patient or doctor..."
          className="search-filter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        {Object.entries(grouped).map(([date, appts]) => (
          <div key={date} className="appointments-section">
            <h3 className="appointments-date">{date}</h3>
            {appts.map((appt) => {
              const dt = new Date(`${appt.appointmentDate}T${appt.appointmentTime}`);
              const timeStr = dt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });
              const monthShort = dt.toLocaleString('default', { month: 'short' });
              const day = dt.getDate();

              return (
                <div className="appointment-card" key={appt.appointmentID}>
                  <div className="appointment-date-box">
                    <div className="appointment-month">{monthShort}</div>
                    <div className="appointment-day">{day}</div>
                  </div>

                  <div className="appointment-info">
                    <div className="appointment-name">
                      {appt.patientName} - <span className="appointment-status">{appt.status}</span>
                    </div>
                    <div className="appointment-time">{timeStr}</div>
                    <div className="appointment-doctor">Doctor: {appt.doctorName}</div>
                  </div>
                  {appt.status === "Scheduled" && (
  <button
    className="appointment-button"
    style={{ backgroundColor: "#00796B" }}
    onClick={async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/appointments/update-status/${appt.appointmentID}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Checked In" }),
        });

        if (res.ok) {
          setAppointments(prev =>
            prev.map(a =>
              a.appointmentID === appt.appointmentID
                ? { ...a, status: "Checked In" }
                : a
            )
          );
        } else {
          alert("Failed to update status");
        }
      } catch (err) {
        console.error("Update error:", err);
        alert("Something went wrong");
      }
    }}
  >
    Check In
  </button>
)}

                  <button
                    className="appointment-button"
                    onClick={() => setSelectedPatientID(appt.patientID)}
                  >
                    View Form
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="appointment-right">
        {selectedPatientID ? (
          <PatientFormViewer patientID={selectedPatientID} />
        ) : (
          <div className="mock-placeholder">Select an appointment to view the form</div>
        )}
      </div>
      
    </div>
  );
};

export default ClinicAppointments;
