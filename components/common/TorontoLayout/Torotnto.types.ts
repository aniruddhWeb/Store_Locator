import { Product } from '../../../generated/graphql';

export interface IServingCard {
  marginButton: string;
  backgroundColor?: string;
  title: string;
  color: string;
  width: string;
  height: string;
  marginTop: string;
  hasText: boolean;
  url: string;
}

export interface IDeliveryCard {
  backgroundColor?: string;
  marginButton: string;
  backgroundImage: { url: string; __typename: string } | string;
  title: string;
  paddingText: string;
  color: string;
  width?: string;
  marginTop: string;
  text: string;
  height?: string;
  url: string;
  headerLink: boolean;
}
export interface IInfoCard {
  smallTitle: boolean;
  titleWidth: string;
  marginText: string;
  titleHeight: string;
  backgroundColor?: string;
  backgroundBlendMode: string;
  backgroundSize: string;
  backgroundPosition: string;
  hasButton: boolean;
  backgroundImage: string;
  title: string;
  paddingText: string;
  color: string;
  width: string;
  height: string;
  marginTop: string;
  text: string;
}

export interface IDeliveryCardCarousel {
  image: { url: string; height: number; width: number };
  buttonText: string;
  title: string;
  shortDescription: string;
}

export interface IImage {
  url: string;
  __typename: string;
}

export interface IProps {
  currentUrls: { apple: string; google: string };
  isMobile?: boolean;
  torontoLandingData: ITorontoLanding;
  torontoProducts: Product[];
}

export interface ITorontoLanding {
  torontoTexts: { [key: string]: string };
  landingTitles: { [key: string]: string };
  landingHighlights: { [key: string]: { texts: string[]; url?: string } };
  __typename: string;
  mainCardEast: IImage;
  mainCardWest: IImage;
  etobicokeMapBkg: IImage;
  scarboroughMapBkg: IImage;
  northYorkMapBkg: IImage;
  mississaugaMapBkg: IImage;
  aboutDeliveryBkg: IImage;
  orderDelivaryBkg: IImage;
  deliveryMapBkg: IImage;
  appleBlackButton: IImage;
  googleBlackButton: IImage;
  phoneBkg: IImage;
  phoneMobileBkg: IImage;
  downloadAppCannabisBkg: IImage;
  adviceProductBkg: IImage;
  orderMailBkg: IImage;
  footerBkg: IImage;
  unbeatableIcon: IImage;
  deliveryIcon: IImage;
  serviceIcon: IImage;
  flowerIcon: IImage;
  extractsConcentratesIcon: IImage;
  ediblesIcon: IImage;
}
