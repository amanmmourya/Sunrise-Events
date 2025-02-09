import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Button } from "../components/Button";

const Service = () => {
  const packages = [
    {
      name: "Basic",
      price: "₹XX,XXX",
      features: {
        "Venue Decoration": "Standard Floral & Fabric",
        "Stage Design": "Simple Backdrop",
        Lighting: "Standard Lights",
        "Seating Arrangement": "Normal Chairs & Tables",
        "Floral Arrangements": "Standard Flowers",
        Centerpieces: "Basic",
        "Entry Setup": "Basic Entry Gate",
        "Mandap (for weddings)": "Simple Mandap",
        "Photography & Videography": "No",
        "Sound & DJ": "No",
        Fireworks: "No",
        Catering: "No",
      },
    },
    {
      name: "Premium",
      price: "₹XX,XXX",
      features: {
        "Venue Decoration": "Themed Decoration",
        "Stage Design": "Custom Stage Design",
        Lighting: "LED & Fairy Lights",
        "Seating Arrangement": "Decorated Seating",
        "Floral Arrangements": "Premium Flowers",
        Centerpieces: "Customized",
        "Entry Setup": "Themed Entry",
        "Mandap (for weddings)": "Themed Mandap",
        "Photography & Videography": "HD Photography",
        "Sound & DJ": "Basic DJ",
        Fireworks: "Yes",
        Catering: "Standard Buffet",
      },
    },
    {
      name: "Luxury",
      price: "₹XX,XXX",
      features: {
        "Venue Decoration": "Customized 3D Decor & Luxury Elements",
        "Stage Design": "Grand Stage with LED, Floral & Unique Props",
        Lighting: "Intelligent Lighting & Special Effects",
        "Seating Arrangement": "VIP Lounge & Premium Seating",
        "Floral Arrangements": "Exotic & Imported Flowers",
        Centerpieces: "Luxury",
        "Entry Setup": "Royal Entry with Fireworks/Effects",
        "Mandap (for weddings)": "Grand Mandap with Designer Props",
        "Photography & Videography": "4K Cinematic Videography",
        "Sound & DJ": "Professional DJ & Live Band",
        Fireworks: "Luxury Fireworks",
        Catering: "Customized Multi-Cuisine Menu",
      },
    },
  ];

  return (
    <Wrapper>
      <div className="imgdiv">
        <div className="blackdiv">
          <h2>
            <span className="writeup">
              {" "}
              Wedding : Stage Decor Setup &nbsp;
              <br />{" "}
            </span>
            <span className="subhead"> SunRise</span>
          </h2>
        </div>
      </div>
      <div className="container grid grid-three-column">
        {packages.map((pkg, index) => (
          <div key={index} className="package-card">
            <div className="text">
              <h3>Basic</h3>
            </div>
            <div className="card-content">
              <div className="leftside">
                <div className="top">
                  <span>
                    {" "}
                    <h3>SunRise Silver Package</h3>
                  </span>
                </div>
                <span>
                  {" "}
                  {Object.entries(pkg.features).map(([feature, value]) => (
                    <li key={feature} className="features">
                      <img
                        src="https://images.wedmegood.com/react-frontend-v4/static/media/TickIcon.54f3b9aa.png"
                        alt=""
                      />
                      <strong>{feature}:</strong> {value}
                    </li>
                  ))}
                </span>
              </div>

              <div className="rightside">
                <div className="rupees">
                  <span className="price-tag">
                    {" "}
                    <i class="fa fa-inr">
                      {" "}
                      &nbsp;<span className="price-val">7000</span>
                    </i>
                  </span>
                </div>
                <div className="addbtn">
                  <span className="btn">Add &nbsp;</span>
                  <span className="plusdiv">
                    <i class="fa fa-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .container {
    margin-top: 10rem;
  }
  .price-tag {
    padding: 0 1rem;
    font-size: 1.8rem;
    color: rgb(231, 46, 119);
  }

  .package-card {
    background-color: rgb(252, 240, 199);
    border: ${({ theme }) => theme.colors.border};
    box-sizing: border-box;
    box-shadow: ${({ theme }) => theme.colors.shadow};
    border-radius: 1rem;
    height: 100%;
  }
  .text {
    margin: 0.6rem;
    padding: 0 1rem;
    text-align: center;
    h3 {
      color: rgb(74 74 74);
    }
  }
  .card-content {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 20px 0px;
    height: max-content;
    height: 90%;
  }
  .top {
    h3 {
      font-size: 20px;
      font-weight: 600;
      color: rgb(74 74 74);
    }
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    .rupees {
      padding: 0 1rem;
      margin-right: 1rem;
    }
  }

  .leftside {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.6rem;
    .features {
      /* display: block; */
      font-size: 12px;
      font-weight: 500;
      color: rgb(74, 74, 74);
      margin-bottom: 2px;
      /* white-space: nowrap; */
      /* text-overflow: ellipsis; */
      /* overflow: hidden; */
      img {
        width: 9.7px;
        height: 8px;
        margin-right: 5px;
      }
    }
  }
  .rightside {
    width: 55%;
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    gap: 1rem;
    .addbtn {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0.5rem;
      font-size: 1.8rem;
      color: rgb(231 46 119);
      border: 0.1rem solid rgb(231 46 119);
      border-radius: 0.5rem;
      .btn {
        padding: 0.5rem;
      }
      .plusdiv {
        padding: 0.3rem;
        background-color: #ff000039;
      }
    }
  }

  .imgdiv {
    background-color: red;
    background-image: url("https://thumbs.dreamstime.com/z/indian-wedding-stage-indian-wedding-decoration-indian-beautiful-marriage-decoration-flowers-indian-wedding-stage-indian-325706457.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 50vh;
    position: relative; /* Needed for absolute positioning inside */
  }

  .blackdiv {
    position: absolute; /* Moves over the image */
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    z-index: 2;
    font-family: Gilroy;
    color: white;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.8) 49%,
      rgb(0, 0, 0)
    );

    h2 {
      color: white;

      .subhead {
        color: #f701ff;
      }
    }
  }
`;

export default Service;
