import React from 'react';
import './ScheduleModal.css';
import { FcPrint } from "react-icons/fc";

const ScheduleModal = ({ schedule, onClose }) => {

  const formattedSchedule = schedule.map((item) => ({
    ...item,
    amount: parseFloat(item.amount).toFixed(2) 
  }));

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const printContent = document.querySelector('.schedule-modal').innerHTML;
    printWindow.document.write('<html><head>');
   
   
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="schedule-modal-overlay">
      <div className="schedule-modal">
        <div className="schedule-modal-header">
          <h2>Repayment Schedule</h2>

          <div className='print-function'>
            <button onClick={handlePrint} className="print-btn"><FcPrint className='print-icon' />Print</button>
          </div>
          <button onClick={onClose} className="close-btn">&times;</button>
          
        </div>
        <div className="schedule-modal-body">
          <table>
            <thead>
              <tr>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Payement Status</th>
              </tr>
            </thead>
            <tbody>
              {formattedSchedule.length > 0 ? (
                formattedSchedule.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>₹{item.amount}</td>
                    <td>not paid</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No schedule available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
