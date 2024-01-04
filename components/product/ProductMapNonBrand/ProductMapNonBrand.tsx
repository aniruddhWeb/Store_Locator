import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import GoogleMapReact from 'google-map-react';
import cn from 'classnames';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import { useMediaQueries } from '@react-hook/media-query';
import { calculateDistanceBetweenMarkers } from 'utils/map';
import useSupercluster from 'use-supercluster';
import { Business, Product } from '../../../generated/graphql';
import s from './ProductMapNonBrand.module.css';
import {
  DEFAULT_USER_LOCATION,
  useCurrentLocationDynamic,
} from '../../../services/location';
import { Marker } from '../../map/Marker/Marker';
import { getFillColor, getMapColor, MAP_OPTIONS } from '../../../services/map';
import { MapCard } from '../../map/MapCard/MapCard';
import { ChevronLeft } from '../../icons/ChevronLeft';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { getProductMinPrice } from '../../../utils/product';
import { formatMapPrice } from '../../../utils/string';
import { LocationMarker } from '../../map/LocationMarker/LocationMarker';
import { AnalyticsAction } from '../../../services/analytics';
import { FullScreen } from '../../icons/FullScreen';
import { Arrow } from '../../icons/Arrow';
import { LogoTitle } from '../../icons/LogoTitle';
import { List } from '../../icons/List';
import { Close } from '../../icons/Close';
import { Portal } from '../../common/Portal/Portal';
import { GOOGLE_MAPS_API_KEY } from '../../../config/Constants';
import { MapSelect } from '../../icons/MapSelect';
import { CheckBox } from '../../icons/CheckBox';
import { MarkerGroup } from '../../map/MarkerGroup/MarkerGroup';

enum BusinessType {
  BrandType = 'Brand',
  MailOrderType = 'Mail Order',
  DeliveryType = 'Delivery',
  DispensaryType = 'Dispensary',
}

const defaultMapOptions = {
  ...MAP_OPTIONS,
  fullscreenControl: false,
};

export interface ProductMapProps {
  product?: Product;
  productBusinesses?: Business[];
}

export const ProductMapNonBrand = React.memo(
  ({ productBusinesses, product }: ProductMapProps) => {
    const mapRef = useRef<any>();
    const mapsRef = useRef<any>();
    const itemsScrollViewRef = useRef<HTMLDivElement>();
    const sheetRef = useRef<BottomSheetRef>();

    const { selectedLocation: location, userLocation } =
      useCurrentLocationDynamic();

    const [clusteringEnabled, setClusteringEnabled] = useState<boolean>(true);
    const [mapBounds, setBounds] = useState<number[]>([-180, -85, 180, 85]);
    const [mapZoom, setMapZoom] = useState<number>(12);
    const [mapInitialMoved, setMapInitialMoved] = useState<boolean>(false);
    const [sideBarOpened, setSideBarOpened] = useState<boolean>(false);
    const [fullScreenOpened, setFullScreenOpened] = useState<boolean>(false);
    const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);
    const [selectedBusinessId, setSelectedBusinessId] = useState<
      number | string | null
    >(null);
    const [hoverBusiness, setHoverBusiness] = useState<{
      businessId: number | string;
      lat: number;
      lng: number;
    } | null>(null);

    const mapBusinesses = useMemo(
      () =>
        ((productBusinesses || []) as Business[])
          .filter(
            item =>
              item?.plType !== BusinessType.MailOrderType &&
              item?.plType !== BusinessType.BrandType,
          )
          .map(businessItem => {
            if (product) {
              return {
                business: businessItem,
                product,
              };
            }
            return {
              business: businessItem,
              product: undefined,
            };
          }),
      [product, productBusinesses],
    );

    const markersData = useMemo(
      () =>
        (mapBusinesses || [])
          .map(({ business, product: productItem }) => {
            let lat: number = 0;
            let lng: number = 0;
            if (
              business.contact?.bizLatitude &&
              business.contact?.bizLongitude
            ) {
              if (
                Math.abs(business.contact?.bizLatitude) > 90 &&
                Math.abs(business.contact?.bizLongitude) < 90
              ) {
                lat = business.contact?.bizLongitude;
                lng = business.contact?.bizLatitude;
              } else {
                lat = business.contact?.bizLatitude;
                lng = business.contact?.bizLongitude;
              }
            }
            if (lat && lng && productItem) {
              return {
                type: 'Feature',
                properties: {
                  cluster: false,
                  businessId: business.bizBusinessID,
                  productId: productItem.prdProductID,
                  name: productItem.prdName,
                  type: business.plType,
                  price:
                    business?.plType === BusinessType.BrandType ||
                    business?.bizClaim ||
                    business?.bizClaimUnblurred
                      ? null
                      : formatMapPrice(getProductMinPrice(productItem).value),
                  showImage: !!business.bizHasMapPin,
                  image: getImageLink(productItem.mdaLocalFileName, 72),
                  color: getMapColor(null),
                  fillColor: getFillColor(business),
                  bigger: false,
                },
                geometry: {
                  type: 'Point',
                  coordinates: [lng, lat],
                },
              };
            }
            return null;
          })
          .filter(item => item !== null),
      [mapBusinesses],
    );

    const getClosest10Markers = useCallback((markersList: any[], loc: any) => {
      const markersDistances: any[] = [];

      markersList.forEach((marker: any) => {
        const distance = calculateDistanceBetweenMarkers(
          {
            lat: marker.geometry.coordinates[1],
            lng: marker.geometry.coordinates[0],
          },
          loc,
        );
        markersDistances.push({ distance, marker });
      });

      return markersDistances
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10)
        .map(i => i.marker);
    }, []);

    const getBounds = useCallback(
      (maps: any, markers: any, locationCoords: any) => {
        const bounds = new maps.LatLngBounds();
        let targetMarkers: any[];

        if (locationCoords?.lat && locationCoords?.lng) {
          targetMarkers = getClosest10Markers(markers, locationCoords);
          bounds.extend(
            new maps.LatLng(locationCoords.lat, locationCoords.lng),
          );
        } else {
          targetMarkers = [...markers];
        }

        (targetMarkers || []).forEach((markerLocation: any) => {
          const [longitude, latitude] = markerLocation!.geometry.coordinates;

          bounds.extend(new maps.LatLng(latitude, longitude));
        });

        return bounds;
      },
      [location, getClosest10Markers],
    );

    useEffect(() => {
      setTimeout(() => {
        if (mapRef.current && mapsRef.current) {
          const bounds = getBounds(
            mapsRef.current,
            markersData,
            userLocation?.plLatitude && userLocation?.plLongitude
              ? {
                  lat: userLocation?.plLatitude,
                  lng: userLocation?.plLongitude,
                }
              : {
                  lat: location.plLatitude,
                  lng: location.plLongitude,
                },
          );
          mapRef.current?.fitBounds(bounds, {
            top: 80,
            left: 372,
            right: 24,
            bottom: 24,
          });
        }
      }, 1600);
    }, [product?.prdProductID, getBounds, markersData, userLocation, location]);

    const onMapLoaded = useCallback(
      ({ map, maps }) => {
        mapRef.current = map;
        mapsRef.current = maps;
        setTimeout(() => {
          if (map) {
            const bounds = getBounds(
              maps,
              markersData,
              userLocation?.plLatitude && userLocation?.plLongitude
                ? {
                    lat: userLocation?.plLatitude,
                    lng: userLocation?.plLongitude,
                  }
                : {
                    lat: location.plLatitude,
                    lng: location.plLongitude,
                  },
            );

            mapRef.current?.fitBounds(bounds, {
              top: 80,
              left: 372,
              right: 24,
              bottom: 24,
            });
          }
        }, 600);
      },
      [markersData, getBounds, location, userLocation],
    );

    const { matches } = useMediaQueries({
      isMobile: 'only screen and (max-width: 860px)',
    });

    const onDrag = useCallback(() => {
      if (selectedBusinessId) {
        setSelectedBusinessId(null);
        itemsScrollViewRef.current?.scrollTo({
          left: 0,
          top: 0,
          behavior: 'smooth',
        });
        if (matches.isMobile) {
          const itemsScrollMobileView = document
            .querySelectorAll('[data-rsbs-scroll="true"]')
            ?.item(0);
          itemsScrollMobileView?.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
          });
        }
      }
      if (!mapInitialMoved) {
        setMapInitialMoved(true);
      }
    }, [selectedBusinessId, mapInitialMoved]);

    const defaultCenter = useRef<{ lat: number; lng: number }>({
      lat: location?.plLatitude || DEFAULT_USER_LOCATION.plLatitude,
      lng: location?.plLongitude || DEFAULT_USER_LOCATION.plLongitude,
    });

    const toggleCluster = useCallback(
      () => setClusteringEnabled(!clusteringEnabled),
      [clusteringEnabled],
    );

    const onMapChange = useCallback(
      ({
        zoom: zoomParam,
        bounds: boundsParam,
      }: {
        zoom: number;
        bounds: any;
      }) => {
        setMapZoom(zoomParam);
        setBounds([
          boundsParam.nw.lng,
          boundsParam.se.lat,
          boundsParam.se.lng,
          boundsParam.nw.lat,
        ]);
      },
      [],
    );

    const { clusters, supercluster } = useSupercluster({
      points: markersData,
      bounds: mapBounds,
      zoom: mapZoom,
      options: { radius: 50, maxZoom: 19, minPoints: 4 },
    });

    const onClusterClick = useCallback(
      (clusterId: number, latitude: number, longitude: number) => {
        const expansionZoom = Math.min(
          supercluster.getClusterExpansionZoom(clusterId),
          20,
        );
        mapRef.current?.setZoom(expansionZoom);
        mapRef.current?.panTo({ lat: latitude, lng: longitude });
      },
      [supercluster],
    );

    const onMarkerClick = useCallback(
      (businessId: number | string, latitude: number, longitude: number) => {
        if (!fullScreenOpened && matches.isMobile) {
          setFullScreenOpened(true);
        }
        setSideBarOpened(true);
        setSelectedBusinessId(businessId);
        mapRef.current?.panTo({ lat: latitude, lng: longitude });
        const businessItem = document.getElementById(
          `${matches.isMobile ? 'mobile-' : ''}business-${businessId}`,
        );
        if (businessItem) {
          setTimeout(() => {
            sheetRef.current?.snapTo(({ snapPoints }) => snapPoints[0]);
          }, 500);
          itemsScrollViewRef.current?.scrollTo({
            left: 0,
            top: (businessItem.offsetTop || 0) - 116,
            behavior: 'smooth',
          });
          if (matches.isMobile) {
            const itemsScrollMobileView = document
              .querySelectorAll('[data-rsbs-scroll="true"]')
              ?.item(0);
            itemsScrollMobileView?.scrollTo({
              left: 0,
              top: (businessItem.offsetTop || 0) - 116,
            });
          }
        }
      },
      [matches, fullScreenOpened],
    );

    const toggleSideBar = useCallback(
      () => setSideBarOpened(!sideBarOpened),
      [sideBarOpened],
    );

    const openFullScreen = useCallback(() => setFullScreenOpened(true), []);

    const closeFullScreen = useCallback(() => setFullScreenOpened(false), []);

    const openBottomSheet = useCallback(() => setBottomSheetOpened(true), []);

    const closeBottomSheet = useCallback(() => {
      setBottomSheetOpened(false);
    }, []);

    useEffect(() => {
      if (fullScreenOpened || bottomSheetOpened) {
        setTimeout(() => {
          document.body.style.overflow = 'hidden';
        }, 500);
      } else {
        setTimeout(() => {
          document.body.style.overflow = 'scroll';
        }, 500);
      }
    }, [fullScreenOpened, bottomSheetOpened]);

    useEffect(() => {
      if (!matches?.isMobile) {
        setSideBarOpened(true);
      } else {
        setClusteringEnabled(true);
      }
    }, [matches]);

    const rootClass = cn(s.root, {
      [s.rootFullScreen]: fullScreenOpened,
    });

    const headerContainerClass = cn(s.headerContainer, {
      [s.headerContainerFullScreen]: fullScreenOpened,
    });

    const sideWrapperClass = cn(s.sideWrapper, {
      [s.sideWrapperClosed]: !sideBarOpened,
    });

    const handleClass = cn(s.handle, {
      [s.handleClosed]: !sideBarOpened,
    });

    const chevronClass = cn(s.chevron, {
      [s.chevronClosed]: !sideBarOpened,
    });

    const productImageClass = cn(s.productImage, {
      [s.productImageContainer]: true,
    });

    const mapOptions = useMemo(
      () => ({
        ...defaultMapOptions,
        gestureHandling: fullScreenOpened ? 'greedy' : undefined,
      }),
      [fullScreenOpened],
    );

    return (
      <div className={rootClass}>
        <div className={headerContainerClass}>
          <div className={s.buttonContainer}>
            <Arrow onClick={closeFullScreen} className={s.button} />
            <LogoTitle className={s.logo} />
            <div className={s.button} />
          </div>
          <div className={s.productContainer}>
            <img
              src={getImageLink(product?.mdaLocalFileName)}
              onError={setDefaultImageOnError}
              className={productImageClass}
              alt={product?.prdName}
            />
            <div className={s.productInfoContainer}>
              <div className={s.whereToBuy}>Where to buy</div>
              <div className={s.productName}>{product?.prdName || ''}</div>
            </div>
          </div>
        </div>
        <div className={s.mapContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
            yesIWantToUseGoogleMapApiInternals
            options={mapOptions}
            onGoogleApiLoaded={onMapLoaded}
            onDrag={onDrag}
            onChange={onMapChange}
            defaultCenter={defaultCenter.current}
            defaultZoom={12}>
            {userLocation?.plLatitude && userLocation?.plLongitude ? (
              <LocationMarker
                lat={userLocation.plLatitude || 0}
                lng={userLocation.plLongitude || 0}
              />
            ) : null}
            {(clusteringEnabled && mapZoom < 16 ? clusters : markersData).map(
              (cluster: any) => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const {
                  cluster: isCluster,
                  point_count: pointCount,
                  businessId,
                  bigger,
                } = cluster.properties;

                if (isCluster) {
                  return (
                    <MarkerGroup
                      id={cluster.id}
                      key={`cluster-${cluster.id}`}
                      markerCount={pointCount}
                      lat={latitude || 0}
                      lng={longitude || 0}
                      onClick={onClusterClick}
                    />
                  );
                }
                return (
                  <Marker
                    id={cluster!.properties.businessId}
                    key={`cluster-${cluster!.properties.businessId}`}
                    lat={latitude || 0}
                    lng={longitude || 0}
                    markerText={cluster!.properties.price}
                    type={cluster!.properties.type}
                    showImage={cluster!.properties.showImage}
                    image={cluster!.properties.image}
                    color={cluster!.properties.color}
                    fillColor={cluster!.properties.fillColor}
                    onClick={onMarkerClick}
                    bigger={bigger}
                    selected={
                      (selectedBusinessId !== null &&
                        businessId === selectedBusinessId) ||
                      (hoverBusiness !== null &&
                        businessId === hoverBusiness.businessId)
                    }
                  />
                );
              },
            )}
          </GoogleMapReact>
          <div onClick={toggleCluster} className={s.groupContainer}>
            <div className={s.checkBoxText}>Group locations</div>
            {clusteringEnabled ? (
              <div className={s.checkBox}>
                <CheckBox />
              </div>
            ) : (
              <div className={s.checkBoxDisabled} />
            )}
          </div>
          {(mapBusinesses || []).length === 0 ? null : (
            <div className={sideWrapperClass}>
              <div className={s.sideContainer}>
                <div
                  ref={itemsScrollViewRef as MutableRefObject<HTMLDivElement>}
                  className={s.itemsContainer}>
                  {(mapBusinesses || []).map(business => (
                    <MapCard
                      key={`business-listing-${business.business.bizBusinessID}`}
                      onClick={closeFullScreen}
                      business={business.business}
                      product={business.product}
                      analyticsAction={AnalyticsAction.ProductMapBusinessView}
                      setHoverBusiness={setHoverBusiness}
                      selected={
                        selectedBusinessId !== null &&
                        business.business.bizBusinessID === selectedBusinessId
                      }
                      sendGTMAction="whereto_buy_clicks"
                    />
                  ))}
                  <div className={s.fade} />
                </div>
              </div>
              <div onClick={toggleSideBar} className={handleClass}>
                <ChevronLeft className={chevronClass} />
              </div>
            </div>
          )}
          <div onClick={openFullScreen} className={s.fullScreenContainer}>
            <div className={s.locationTextContainer}>
              <LocationMarker useWithoutLatLng />
              <div className={s.locationText}>Your Location</div>
            </div>
            {fullScreenOpened ? null : (
              <div className={s.fullScreenRowContainer}>
                <div className={s.fullScreenText}>Tap to expand</div>
                <FullScreen className={s.fullScreenIcon} />
              </div>
            )}
          </div>
          {bottomSheetOpened || fullScreenOpened ? null : (
            <div onClick={openBottomSheet} className={s.listScreenContainer}>
              <List className={s.listScreenIcon} />
              <div className={s.listScreenTextContainer}>
                <div className={s.listScreenText}>View as List</div>
              </div>
            </div>
          )}
        </div>
        <BottomSheet
          ref={sheetRef as any}
          blocking={false}
          className={s.bottomSheetMobile}
          skipInitialTransition={false}
          defaultSnap={({ snapPoints }) => snapPoints[1]}
          snapPoints={({ maxHeight }) => [
            maxHeight - 164,
            maxHeight * 0.5,
            160,
          ]}
          open={fullScreenOpened || bottomSheetOpened}
          expandOnContentDrag>
          <div className={s.sideContainer}>
            <div className={s.itemsTitleContainer}>
              <MapSelect className={s.itemsIcon} />
              <div className={s.itemsTitle}>Delivery & Dispensary</div>
            </div>
            <div className={s.itemsContainer}>
              {(mapBusinesses || []).map(business => (
                <MapCard
                  mobile
                  key={`mobile-business-listing-${business.business.bizBusinessID}`}
                  onClick={closeFullScreen}
                  business={business.business}
                  product={business.product}
                  analyticsAction={AnalyticsAction.ProductMapBusinessView}
                  setHoverBusiness={setHoverBusiness}
                  selected={
                    selectedBusinessId !== null &&
                    business.business.bizBusinessID === selectedBusinessId
                  }
                  sendGTMAction="whereto_buy_clicks"
                />
              ))}
              <div className={s.fade} />
            </div>
          </div>
        </BottomSheet>
        {!bottomSheetOpened ? null : (
          <Portal>
            <div className={s.closeListWrapper}>
              <div onClick={closeBottomSheet} className={s.closeListContainer}>
                <Close fill="#FFFFFF" className={s.listScreenIcon} />
                <div className={s.closeListScreenTextContainer}>
                  <div className={s.closeListScreenText}>Close</div>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </div>
    );
  },
);
