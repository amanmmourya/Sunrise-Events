import { createGlobalStyle } from "styled-components";
import "@fontsource/playfair-display"; // Normal weight
import "@fontsource/playfair-display/700.css"; // Bold weight
import "@fontsource/poppins"; // Normal weight
import "@fontsource/poppins/600.css"; 
import "@fontsource/poppins/200.css"; 
import '@fortawesome/fontawesome-free/css/all.min.css';



export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0; 
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif /* ✅ Capital P */
    }

    html {
        font-size: 62.5%;
        /* overflow-x: hidden; */
    }


    p {
        font-family: "Poppins", sans-serif;
        font-weight: 400; /* Normal weight */
    }
    html{
  font-size:62.5%;
  /* overflow-x:hidden; */
  }
  h1{
  font-size:6rem;
  font-weight: 500;
  color:${({theme})=>theme.colors.heading}

  }
  h2{
    color:${({theme})=>theme.colors.heading} ;
    font-size: 4.4rem;
    font-weight: 300;
    white-space: normal;
    text-align: center;
  }
  h3{
    font-size: 1.8rem;
    font-weight: 400;
    
  }
  p{
    color: ${({theme})=>theme.colors.heading};
    opacity: 0.7;
    font-size: 1.65rem;
    line-height: 1.5;
    margin-top: 1rem;
    font-weight: 400;
  }
  a{
    text-decoration: none;
  }
  li{
    list-style: none;
  }

  .container{
    max-width: 120rem;
    margin: 0 auto;
  }

  .grid{
    display: grid;
    gap: 9rem;
  }
  .grid-two-column{
    grid-template-columns: repeat(2,1fr);
  }
  .grid-three-column{
    grid-template-columns: repeat(3,1fr);
  }
  .grid-four-column{
    grid-template-columns: 1fr 1.2fr .5fr .8fr;
  }
  .common-heading{
    font-size: 3.8rem;
    font-weight: 600;
    margin-bottom: 6rem;
    text-transform: capitalize;
  }

  input,textarea{
    padding: 1.5rem 2.4rem;
    border: 1px solid ${({theme})=>theme.colors.border};
    box-shadow: ${({theme})=>theme.colors.shadowSupport};

  }
   input[type="submit"]{
    max-width: 16rem;
    margin-top: 2rem;
    text-align: center;
    background-color: ${({theme})=>theme.colors.btn};
    color:${({theme})=> theme.colors.white};
    padding: 1.4rem 2.2rem;
    border-style: solid;
    border-width: 1rem;
    text-transform: uppercase;
    font-size: 1.8rem;
    cursor: pointer;

   } 
      /* src/styles/global.css */

.header {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
}

.header .brand {
  font-size: 2.4rem;
  font-weight: bold;
}

.header .search input {
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
}

 @media (max-width:${({theme})=>theme.media.tab}) {
  .container{
    padding: 0 3.2rem;
  }
  .grid-three-column{
    grid-template-columns: 1fr 1fr;
  }
 }
@media (max-width : ${({theme})=>theme.media.mobile}){


html{
  font-size: 50%;
  overflow-x: hidden;
}
.grid{
  gap: 3.2rem;
}
.grid-two-column ,.grid-three-column,.grid-four-column{
  grid-template-columns: 1fr;
  padding: 2rem;

}
}
`;
