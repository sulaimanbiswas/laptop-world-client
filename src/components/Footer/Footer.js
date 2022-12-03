import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content mt-10">
      <div>
        <h3 className="font-bold normal-case text-xl">
          Laptop <span className="text-primary">World</span>
        </h3>
        <p>
          Laptop World Ltd.
          <br />
          Providing reliable tech since 2022
        </p>
      </div>
      <div>
        <span className="footer-title">QUICK LINKS</span>
        <Link className="link link-hover">Home</Link>
        <Link className="link link-hover">Terms & Conditions</Link>
        <Link className="link link-hover">Privacy Policy</Link>
        <Link className="link link-hover">Blog Grid Style</Link>
      </div>
      <div>
        <span className="footer-title">HELPFUL LINKS</span>
        <Link className="link link-hover">About us</Link>
        <Link className="link link-hover">Product</Link>
        <Link className="link link-hover">Blog</Link>
        <Link className="link link-hover">Contact</Link>
      </div>
      <div>
        <span className="footer-title">STORE INFO</span>
        <Link className="link link-hover">Dhaka, Bangladesh</Link>
        <Link className="link link-hover">01737515185</Link>
        <Link className="link link-hover">Support@laptopworld.com</Link>
      </div>
    </footer>
  );
};

export default Footer;
