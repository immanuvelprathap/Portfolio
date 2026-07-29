import { createGlobalStyle } from 'styled-components';
import RobotoMonoRegular from '../assets/fonts/RobotoMono-Regular.ttf';
import MontserratSemiBold from '../assets/fonts/Montserrat-SemiBold.ttf';
import MontserratBold from '../assets/fonts/Montserrat-Bold.ttf';

const Typography = createGlobalStyle`
  @font-face {
    font-family: 'RobotoMono Regular';
    src: url(${RobotoMonoRegular}) format('truetype');
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat SemiBold';
    src: url(${MontserratSemiBold}) format('truetype');
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Montserrat Bold';
    src: url(${MontserratBold}) format('truetype');
    font-style: normal;
    font-display: swap;
  }
`;

export default Typography;
