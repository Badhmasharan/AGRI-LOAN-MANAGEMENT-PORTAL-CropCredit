import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_bfq0gp1';
const TEMPLATE_ID = 'template_o5gounm';
const USER_ID = 'uJpOHpsKkfwV-VckQ';

export const sendEmail = (userEmail, subject, message) => {
  const templateParams = {
    to_email: userEmail,
    subject: subject,
    message: message
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
    .then(response => {
      console.log('Email sent successfully:', response);
      return response;
    })
    .catch(error => {
      console.error('Error sending email:', error);
      throw error;
    });
};
