import get from 'lodash/get';

export const getServingCardData = (titles: { [key: string]: string }) => {
  return [
    {
      hasText: false,
      marginButton: '40px auto 0',
      backgroundColor: '#EB815A',
      title: get(titles, 'mainCardWest', ''),
      color: 'white',
      width: '371px',
      height: '584px',
      marginTop: '357px',
      url: 'on/toronto-west',
    },
    {
      hasText: false,
      marginButton: '40px auto 0',
      backgroundColor: '#61AB62',
      title: get(titles, 'mainCardEast', ''),
      color: 'white',
      width: '371px',
      height: '584px',
      marginTop: '357px',
      url: 'on/toronto-east',
    },
  ];
};

export const getDeliveryCardCarousel = (
  titles: { [key: string]: string },
  text: { [key: string]: string },
  etobicoke: { url: string; __typename: string },
  scarborough: { url: string; __typename: string },
  northYork: { url: string; __typename: string },
  mississauga: { url: string; __typename: string },
) => {
  return [
    {
      image: {
        url: etobicoke.url,
        height: 298,
        width: 312,
      },
      buttonText: 'Find Weed Now',
      title: get(titles, 'cardEtobicoke', ''),
      shortDescription: get(text, 'etobicoke', ''),
    },
    {
      image: {
        url: scarborough.url,
        height: 298,
        width: 312,
      },
      buttonText: 'Find Weed Now',
      title: get(titles, 'cardScarborough', ''),
      shortDescription: get(text, 'scarborough', ''),
    },
    {
      image: {
        url: northYork.url,
        height: 298,
        width: 312,
      },
      buttonText: 'Find Weed Now',
      title: get(titles, 'cardNorthYork', ''),
      shortDescription: get(text, 'northYork', ''),
    },
    {
      image: {
        url: mississauga.url,
        height: 298,
        width: 312,
      },
      buttonText: 'Find Weed Now',
      title: get(titles, 'cardMississauga', ''),
      shortDescription: get(text, 'mississauga', ''),
    },
  ];
};

export const getDeliveryCardData = (
  titles: { [key: string]: string },
  text: { [key: string]: string },
  etobicoke: { url: string; __typename: string },
  scarborough: { url: string; __typename: string },
  northYork: { url: string; __typename: string },
  mississauga: { url: string; __typename: string },
) => {
  return [
    {
      marginButton: '8px 16px 24px',
      backgroundImage: etobicoke.url,
      title: get(titles, 'cardEtobicoke', ''),
      paddingText: '24px 16px 0 16px',
      color: '#2B5A52',
      marginTop: '232px',
      text: get(text, 'etobicoke', ''),
      url: 'on/etobicoke',
      headerLink: true,
    },
    {
      marginButton: '8px 16px 24px',
      backgroundImage: scarborough.url,
      title: get(titles, 'cardScarborough', ''),
      paddingText: '24px 16px 0 16px',
      color: '#2B5A52',
      marginTop: '232px',
      text: get(text, 'scarborough', ''),
      url: 'on/scarborough',
      headerLink: true,
    },
    {
      marginButton: '8px 16px 24px',
      backgroundImage: northYork.url,
      title: get(titles, 'cardNorthYork', ''),
      paddingText: '24px 16px 0 16px',
      color: '#2B5A52',
      marginTop: '232px',
      text: get(text, 'northYork', ''),
      url: 'on/north-york',
      headerLink: true,
    },
    {
      marginButton: '8px 16px 24px',
      backgroundImage: mississauga.url,
      title: get(titles, 'cardMississauga', ' '),
      paddingText: '24px 16px 0 16px',
      color: '#2B5A52',
      marginTop: '232px',
      text: get(text, 'mississauga', ''),
      url: 'on/mississauga',
      headerLink: true,
    },
  ];
};

export const getInfoCardData = (
  titles: { [key: string]: string },
  text: { [key: string]: string },
  flower: { url: string; __typename: string },
  extractsConcentrates: { url: string; __typename: string },
  edibles: { url: string; __typename: string },
) => {
  return [
    {
      smallTitle: true,
      titleHeight: '64px',
      titleWidth: '210px',
      backgroundBlendMode: 'initial',
      backgroundColor: '#61AB62',
      backgroundSize: 'auto',
      backgroundPosition: 'center 50px',
      hasButton: false,
      backgroundImage: `${flower.url}`,
      title: get(titles, 'flower', ''),
      paddingText: '0 16px',
      marginText: '16px 0 0 0',
      color: 'white',
      width: '312px',
      height: '636px',
      marginTop: '148px',
      text: get(text, 'flower', ''),
    },
    {
      smallTitle: true,
      titleHeight: '64px',
      titleWidth: '210px',
      backgroundBlendMode: 'initial',
      backgroundSize: 'auto',
      backgroundPosition: 'center 50px',
      backgroundColor: '#61AB62',
      hasButton: false,
      backgroundImage: `${extractsConcentrates.url}`,
      title: get(titles, 'extractsConcentrates', ''),
      paddingText: '0 16px',
      marginText: '16px 0 0 0',
      color: 'white',
      width: '312px',
      height: '636px',
      marginTop: '148px',
      text: get(text, 'extractsConcentrates', ''),
    },
    {
      smallTitle: true,
      titleHeight: '64px',
      titleWidth: '210px',
      backgroundBlendMode: 'initial',
      backgroundSize: 'auto',
      backgroundPosition: 'center 50px',
      backgroundColor: '#61AB62',
      hasButton: false,
      backgroundImage: `${edibles.url}`,
      title: get(titles, 'edibles', ''),
      paddingText: '0 16px',
      marginText: '16px 0 0 0',
      color: 'white',
      width: '312px',
      height: '636px',
      marginTop: '148px',
      text: get(text, 'edibles', ''),
    },
  ];
};
