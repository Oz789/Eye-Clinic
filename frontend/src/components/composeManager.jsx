import React, { useEffect, useState } from 'react';
import './replyManager.css';
import EmailBox from './emailBox';
import axios from 'axios';

const ComposeManager = ({ senderId, senderType, onCancel, goBack }) => {
  const [senderInfo, setSenderInfo] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchSenderInfo = async () => {
      try {
        const endpoint =
          senderType === 'employee'
            ? `${process.env.REACT_APP_API_URL}/api/employees/${senderId}`
            : `${process.env.REACT_APP_API_URL}/api/patients/${senderId}`;

        const res = await axios.get(endpoint);

        if (res.data) {
          setSenderInfo({
            name: `${res.data.firstName} ${res.data.lastName}`,
            email: res.data.email,
          });
        }
      } catch (err) {
        console.error('Error fetching sender info:', err);
      }
    };

    if (senderId && senderType) {
      fetchSenderInfo();
    }
  }, [senderId, senderType]);

  return (
    <div className="container">
      <div className="wrapper-vertical">
        <div className="wrapper-header">
          Compose New Message
          {onCancel && (
            <button
              onClick={onCancel}
              style={{
                float: 'right',
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="notareply">
          <EmailBox senderInfo={senderInfo} />

          <div style={{ padding: '1rem' }}>
  <button onClick={goBack} className="back-button">
    ← Back to Inbox
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default ComposeManager; 