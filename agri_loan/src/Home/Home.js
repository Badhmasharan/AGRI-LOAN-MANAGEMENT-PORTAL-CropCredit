import React, { useState, useEffect } from 'react';
import Navbbar from '../Navbar/Navbbar';
import './Home.css';
import CountUp from 'react-countup';
import Footer from '../Footer/Footer';
import CropLoanDetailsCard from './CropLoanDetailsCard.js';
import DigitalGoldLoanDetailsCard from './DigitalGoldLoanDetailsCard';
import AgriCreditCardDetailsCard from './AgriCreditCardDetailsCard';
import FarmMechanisationLoanDetailsCard from './FarmMechanisationLoanDetailsCard';
import Contact from '../Contact/Contact.js';
import Chatbot from './Chatbot.jsx';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const [thirdSectionAnimated, setThirdSectionAnimated] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeBankOption, setActiveBankOption] = useState(null);
  const [showLoanDetails, setShowLoanDetails] = useState(false);

  const slides = [
    '/goldloan.png',
    '/tractor.png'
  ];

  useEffect(() => {
    if (!hasScrolled) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
        setHasScrolled(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasScrolled]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.querySelector('.second-section');
      const thirdSection = document.querySelector('.third-section');
      const fourthSection = document.querySelector('.fourth-section');
      const fifthSection = document.querySelector('.fifth-section');
      const viewportHeight = window.innerHeight;

      if (secondSection) {
        const secondSectionTop = secondSection.getBoundingClientRect().top;
        if (secondSectionTop < viewportHeight) {
          secondSection.classList.add('h1-animate');
          const bankOptions = secondSection.querySelectorAll('.bank-option');
          bankOptions.forEach((option, index) => {
            setTimeout(() => {
              option.classList.add('pop');
            }, 500 + index * 300);
          });
        }
      }

      if (thirdSection && !thirdSectionAnimated) {
        const thirdSectionTop = thirdSection.getBoundingClientRect().top;
        if (thirdSectionTop < viewportHeight) {
          thirdSection.classList.add('h1-animate');
          const ratesContainer = thirdSection.querySelector('.rates-container');
          setTimeout(() => {
            if (ratesContainer) {
              ratesContainer.classList.add('slide');
            }
          }, 1000);

          const rateOptions = thirdSection.querySelectorAll('.rate-option');
          rateOptions.forEach((option, index) => {
            setTimeout(() => {
              option.classList.add('pop');
            }, 1500 + index * 300);
          });

          setTimeout(() => {
            setThirdSectionAnimated(true);
          }, 1500 + rateOptions.length * 300);
        }
      }

      if (fourthSection) {
        const fourthSectionTop = fourthSection.getBoundingClientRect().top;
        if (fourthSectionTop < viewportHeight) {
          const statItems = fourthSection.querySelectorAll('.stat-item');
          statItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('pop');
            }, 300 * index);
          });

          const digitalLoanHeading = fourthSection.querySelector('.digital-loan-heading');
          setTimeout(() => {
            digitalLoanHeading.classList.add('pop');
            setStartCount(true);
          }, statItems.length * 300);
        }
      }

      if (fifthSection && thirdSectionAnimated) {
        const fifthSectionTop = fifthSection.getBoundingClientRect().top;
        if (fifthSectionTop < viewportHeight) {
          const flowSteps = fifthSection.querySelectorAll('.flow-step');
          flowSteps.forEach((step, index) => {
            setTimeout(() => {
              step.classList.add('animate');
            }, 200 * index); // Adjust timing for each step
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [thirdSectionAnimated]);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleBankOptionClick = (optionIndex) => {
    setActiveBankOption(optionIndex);
    setShowLoanDetails(true);
  };

  const handleCloseCard = () => {
    setShowLoanDetails(false);
  };

  const renderLoanDetailsCard = () => {
    switch (activeBankOption) {
      case 0:
        return <CropLoanDetailsCard onClose={handleCloseCard} />;
      case 1:
        return <DigitalGoldLoanDetailsCard onClose={handleCloseCard} />;
      case 2:
        return <AgriCreditCardDetailsCard onClose={handleCloseCard} />;
      case 3:
        return <FarmMechanisationLoanDetailsCard onClose={handleCloseCard} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='home-background'>
        <Navbbar />
        <div className='home-content'>
          <div className='caption'>
            <div><h1>Empowering Your Agricultural Dreams with <br />Tailored Financial Solutions</h1></div>
            <div><p>Need fast loan? Try CropCredit for your needs</p></div>
          </div>
          <div className='display-board'>
            <div className='slideshow-container'>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide1 ${index === currentSlide ? 'active' : ''}`}
                >
                  <img src={slide} alt={`Slide ${index + 1}`} />
                </div>
              ))}
              <button className='prev' onClick={goToPreviousSlide}>&#10094;</button>
              <button className='next' onClick={goToNextSlide}>&#10095;</button>
            </div>
            <img src='/money1.png' className='money-hand' alt='money hand' />
          </div>
        </div>
      </div>
      <div className="separation-line"></div>
      <div className='second-section'>
        <h1>Our Services</h1>
        <div className='bank-options'>
          {['Crop Loan', 'Digital Gold Loan', 'Agri Credit Card', 'Farm Mechanisation Loan'].map((service, index) => (
            <div
              key={index}
              className='bank-option'
              onClick={() => handleBankOptionClick(index)}
            >
              <img src={`W2B${index + 1}.svg`} alt={service} />
              <p>{service}</p>
            </div>
          ))}
        </div>
      </div>
      {showLoanDetails && renderLoanDetailsCard()}
      <div className='fourth-section'>

        <div className='fourth-container'>
        <div className='stats'>
          <div className='stat-item'>
            <h2 className='count-stat'>
              {startCount && <CountUp start={0} end={20} duration={2} />}<span className="plus-sign">+</span>
            </h2>
            <p>partner banks</p>
          </div>
          <div className='stat-item'>
            <h2 className='count-stat'>
              {startCount && <CountUp start={0} end={700000} duration={2} separator=',' />}<span className="plus-sign">+</span>
            </h2>
            <p>journeys completed</p>
          </div>
          <div className='stat-item'>
            <h2 className='count-stat'>
              {startCount && <CountUp start={0} end={74000} duration={2} suffix='cr.' separator=',' />}<span className="plus-sign">+</span>
            </h2>
            <p>loans disbursed</p>
          </div>
          <div className='stat-item'>
            <h2 className='count-stat'>
              {startCount && <CountUp start={0} end={6000} duration={2} separator=',' />}<span className="plus-sign">+</span>
            </h2>
            <p>video testimonials</p>
          </div>
        </div>
        <div className='seperationline1'></div>
        <div className='digital-loan-heading'>
          <h1>Get digital loan approval in 59 minutes</h1>
        </div>
        <div className='loan-features'>
          <div className='feature1'>
            <img src='simplest-home.svg' alt='simplest' />
            <p>simplest</p>
          </div>
          <div className='feature1'>
            <img src='fastest-home.svg' alt='fastest' />
            <p>fastest</p>
          </div>
          <div className='feature1'>
            <img src='safest-home.svg' alt='safest' />
            <p>safest</p>
          </div>
          <div className='feature1'>
            <img src='smartest.svg' alt='smartest' />
            <p>smartest</p>
          </div>
        </div>
        </div>
      </div>
      <div className='third-section'>
        <h1>Rates & Charges</h1>
        <div className='rates-container'>
          <div className='rate-option'>
            <img src='./r1.svg' className='rate-icon' alt='Tractor Loan Icon' />
            <div className='rate-value'>3.30% <span>P.A.*</span></div>
            <p>Farm Mechanisation Loan <br></br></p>
          </div>
          <div className='rate-option'>
            <img src='./r2.svg' className='rate-icon' alt='Kisan Credit Card Icon' />
            <div className='rate-value'>7.00% <span>P.A.*</span></div>
            <p>Agri Credit Card <br></br>(ACC Loan)</p>
          </div>
          <div className='rate-option'>
            <img src='./r3.svg' className='rate-icon' alt='SHG Loan Icon' />
            <div className='rate-value'>1.25% <span>P.A.*</span></div>
            <p>Gold Loan <br></br> (Low interest)</p>
          </div>
          <div className='rate-option'>
            <img src='./r4.svg' className='rate-icon' alt='AIF Loan Icon' />
            <div className='rate-value'>1.80% <span>P.A.*</span></div>
            <p>Crop Loan <br></br>(1 Year MCLR)</p>
          </div>
        </div>
      </div>
      <div className='fifth-section'>
      <div class="logo-container">
      <h1 id="page-logo">Application process</h1>
      </div>
  <div className='flowchart'>
    <div className='flow-step'>
      <div className='step-number'>1</div>
      <div className='step-content'>
        <h2>Step 1</h2>
        <p>Login/SignUp</p>
      </div>
      <div className='ripple-background'>
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>
      </div>
    </div>
    <div className='flow-step'>
      <div className='step-number'>2</div>
      <div className='step-content'>
        <h2>Step 2</h2>
        <p>Select Loan</p>
      </div>
      <div className='ripple-background'>
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>
      </div>
    </div>
    <div className='flow-step'>
      <div className='step-number'>3</div>
      <div className='step-content'>
        <h2>Step 3</h2>
        <p>Click Apply</p>
      </div>
      <div className='ripple-background'>
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>
      </div>
    </div>
    <div className='flow-step'>
      <div className='step-number'>4</div>
      <div className='step-content'>
        <h2>Step 4</h2>
        <p>Fill all the details correctly</p>
      </div>
      <div className='ripple-background'>
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>
      </div>
    </div>
    <div className='flow-step'>
      <div className='step-number'>5</div>
      <div className='step-content'>
        <h2>Step 5</h2>
        <p>Click submit</p>
      </div>
      <div className='ripple-background'>
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>
      </div>
    </div>
  </div>
</div>
<div className="separation-line1"></div>
<div className='Contact-section-bg' section id='contact' >
  <Contact />



</div>
<div className="separation-line2"></div>
<Chatbot/>

      <Footer />
    </div>
    
  );
}
