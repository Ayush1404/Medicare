import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div className="container home-container" style={{ backgroundImage: 'url("your-background-image.jpg")' }}>
      <section className="jumbotron text-center">
        <h1 className="display-4">Welcome to Doctor's Appointments</h1>
        <p className="lead">Book your medical appointments with ease.</p>
        <Link to="/register" className="btn btn-primary btn-lg">Get Started</Link>
      </section>

      <section className="container">
        <h2 className="text-center">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-4">
            <h3>Convenient Booking</h3>
            <p>Book appointments online at your convenience.</p>
          </div>
          <div className="col-md-4">
            <h3>Wide Range of Specialists</h3>
            <p>Choose from a variety of healthcare providers.</p>
          </div>
          <div className="col-md-4">
            <h3>Secure and Reliable</h3>
            <p>Your health information is safe with us.</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-4">
        <p>&copy; {new Date().getFullYear()} Doctor's Appointments</p>
      </footer>
    </div>
  );
};

export default HomePage;
