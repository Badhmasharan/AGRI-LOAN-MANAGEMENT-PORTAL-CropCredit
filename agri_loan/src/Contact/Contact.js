import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import './Contact.css';
import ModelLoader from './ModelLoader';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_bfq0gp1',
        'template_o5gounm',
        {
          from_name: form.name,
          to_name: 'Badhmasharan',
          from_email: form.email,
          to_email: '727722eucs027@skcet.ac.in',
          message: form.message,
        },
        'uJpOHpsKkfwV-VckQ'
      )
      .then(
        () => {
          setLoading(false);
          alert('Thank you. I will get back to you as soon as possible.');

          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert('Ahh, something went wrong. Please try again.');
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="contact-form-section">
        <p className="contact-subtext">Get in touch</p>
        <h3 className="contact-heading">Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="contact-form"
        >
          <label className="contact-form-label">
            <span className="contact-form-label-text">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="contact-form-input"
            />
          </label>
          <label className="contact-form-label">
            <span className="contact-form-label-text">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="contact-form-input"
            />
          </label>
          <label className="contact-form-label">
            <span className="contact-form-label-text">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              className="contact-form-textarea"
            />
          </label>

          <button
            type="submit"
            className="contact-form-button"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>

      
      
      {/* Add ModelLoader component */}
      <div className="contact-model-loader">
        <ModelLoader />
      </div>
    </div>
  );
};

export default Contact;
