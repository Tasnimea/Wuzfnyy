import "./home.css";
import team from "./../image/team.svg";
import svgdiv from "./../image/right-arrow-black-triangle.svg";
import { Link, useHistory } from 'react-router-dom'

const Home = () => {

    return (
        <>
            <section class="wrapper" style={{clipPath: "polygon(100% 0, 100% 78%, 39% 100%, 0 92%, 0 0)", backgroundColor:"#999"}}>
                <div class="container">
                    <div class="grid-cols-2">
                        <div class="grid-item-1 order-0">
                            <h1 class="main-heading">
                                Welcome To <span>Wazaffny</span>
                                <br />
                                Hiring Community.
                            </h1>
                            <p class="info-text">
                                Searching for vacancies & career opportunities? WAZAFFNY helps you in your job search in Egypt.
                            </p>

                            <div class="btn_wrapper">
                            <Link to="/Job" className="nav-link "  >

                                <button class="btn view_more_btn">
                                    View All Jobs <i class="ri-arrow-right-line"></i>
                                </button>
                                </Link>

                                <button class="btn documentation_btn" style={{backgroundColor:"lightgray", color:"white "}}>
                                <Link to="/FindPeople" className="nav-link "  >
                                Search Users<i class="ri-arrow-right-line"></i>
                                </Link>
                                </button>
                            </div>
                        </div>
                        <div class="grid-item-2 order-1">
                            <div class="team_img_wrapper">
                                <img src={require("./../image/hire.png")} alt="team-img" />

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="wrapper" style={{ backgroundImage:`url(${svgdiv})`, backgroundRepeat:"no-repeat", backgroundSize:"auto"}}>
                <div class="container" data-aos="fade-up" data-aos-duration="1000">
                    <div className="row">
                        <div className="col-12 d-flex flex-column justify-content-center align-items-center pb-4 mb-5">
                            <h2>ABOUT US</h2>
                            <p className="info-text" style={{textAlign:"center",height:"20rem"}}>On This Site, We Are Within You To Find The Appropriate Job For Your Field Also, We Guarantee You To Find The Complete Privacy Of Your Information And There Are More Than 1,000 Opportunities To Work In All Fields Here Your Dream Will Start To Investigate. You Will Find The Right Job For You To Be Rich In Information And Money. Here, The Challenge Between You And Yourself Will Start To Find The Job That You Dreamed Of Throughout Your Life Here In Wazafnny
                                Join now with us !!
                                Don't miss the opportunity and join our family .</p>
                        </div>
                    </div>
                </div>
            </section>




        </>
    );
}

export default Home;