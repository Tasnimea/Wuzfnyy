import { useState, useEffect } from "react";
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { AiFillHeart} from 'react-icons/ai';
import {HiArrowCircleUp} from 'react-icons/hi';
import '../Footer/footer.css';

const Footer = () => {

    return (
        <>

<footer class="site-footer">

<a href="#top" class="smoothscroll scroll-top d-flex align-items-center justify-content-center">
  <HiArrowCircleUp size={66} color="#fff"/>
</a>

<div class="container">
  <div class="row mb-5">
    <div class="col-6 col-md-3 mb-4 mb-md-0">
      <h3>Search Trending</h3>
      <ul class="list-unstyled">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">Web Developers</a></li>
        <li><a href="#">Python</a></li>
        <li><a href="#">HTML5</a></li>
        <li><a href="#">CSS3</a></li>
      </ul>
    </div>
    <div class="col-6 col-md-3 mb-4 mb-md-0">
      <h3>Company</h3>
      <ul class="list-unstyled">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Career</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Resources</a></li>
      </ul>
    </div>
    <div class="col-6 col-md-3 mb-4 mb-md-0">
      <h3>Support</h3>
      <ul class="list-unstyled">
        <li><a href="#">Support</a></li>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>
    <div class="col-6 col-md-3 mb-4 mb-md-0">
      <h3>Contact Us</h3>
      <div class="">
        <a href="#"><AiFillTwitterCircle className="mx-2" size={32} color="#33CABB"/></a>
        <a href="#"><BsFacebook  size={29}   color="#33CABB"/> </a>
      </div>
    </div>
  </div>

  <div class="row text-center">
    <div class="col-12">
      <p class="copyright"><small>
      Copyright  All rights reserved |made by Must Students <AiFillHeart color="red"  />
      </small></p>
    </div>
  </div>
</div>
</footer>


        </>
    );
}

export default Footer;