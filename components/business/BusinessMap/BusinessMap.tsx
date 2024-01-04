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
import useSupercluster from 'use-supercluster';
import { Business } from '../../../generated/graphql';
import s from './BusinessMap.module.css';
import {
  DEFAULT_USER_LOCATION,
  useCurrentLocationDynamic,
} from '../../../services/location';
import { Marker } from '../../map/Marker/Marker';
import {
  getFillColor,
  getMapColor,
  isPinBigger,
  MAP_OPTIONS,
} from '../../../services/map';
import { MapCard } from '../../map/MapCard/MapCard';
import { ChevronLeft } from '../../icons/ChevronLeft';
import { getImageLink, setDefaultImageOnError } from '../../../utils/image';
import { LocationMarker } from '../../map/LocationMarker/LocationMarker';
import { AnalyticsAction } from '../../../services/analytics';
import { FullScreen } from '../../icons/FullScreen';
import { Arrow } from '../../icons/Arrow';
import { LogoTitle } from '../../icons/LogoTitle';
import { List } from '../../icons/List';
import { Portal } from '../../common/Portal/Portal';
import { Close } from '../../icons/Close';
import { calculateDistanceBetweenMarkers } from '../../../utils/map';
import { MapSelect } from '../../icons/MapSelect';
import { MarkerGroup } from '../../map/MarkerGroup/MarkerGroup';
import { CheckBox } from '../../icons/CheckBox';
import { GOOGLE_MAPS_API_KEY } from '../../../config/Constants';

const defaultMapOptions = {
  ...MAP_OPTIONS,
  fullscreenControl: false,
};

export interface ProductMapProps {
  business?: Business;
  standalone?: boolean;
  showClaim?: boolean;
  selectedBusinessTypes?: string[];
}

export const BusinessMap = React.memo(
  ({
    business,
    standalone,
    showClaim,
    selectedBusinessTypes,
  }: ProductMapProps) => {
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
    const [bottomSheetOpened, setBottomSheetOpened] = useState<boolean>(false);
    const [fullScreenOpened, setFullScreenOpened] = useState<boolean>(false);
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
        ((business?.resellers || []) as Business[]).filter(
          item => item.contact?.bizLongitude && item.contact?.bizLatitude,
        ),
      [business?.resellers],
    );

    const markersData = useMemo(
      () =>
        (mapBusinesses || [])
          .map((businessItem: Business) => {
            let lat: number = 0;
            let lng: number = 0;
            if (
              businessItem?.contact?.bizLatitude &&
              businessItem?.contact?.bizLongitude
            ) {
              if (
                Math.abs(businessItem.contact?.bizLatitude) > 90 &&
                Math.abs(businessItem.contact?.bizLongitude) < 90
              ) {
                lat = businessItem.contact?.bizLongitude;
                lng = businessItem.contact?.bizLatitude;
              } else {
                lat = businessItem.contact?.bizLatitude;
                lng = businessItem.contact?.bizLongitude;
              }
            }
            if (lat && lng && businessItem) {
              return {
                type: 'Feature',
                properties: {
                  cluster: false,
                  businessId: businessItem.bizBusinessID,
                  name: businessItem.bizName,
                  type: businessItem.plType,
                  showImage: !!businessItem.bizHasMapPin,
                  image: getImageLink(businessItem.mdaLocalFileName, 72),
                  color: getMapColor(businessItem),
                  fillColor: getFillColor(businessItem),
                  bigger: isPinBigger(businessItem),
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

        if (locationCoords.lat && locationCoords.lng) {
          const coords = new maps.LatLng(
            locationCoords.lat,
            locationCoords.lng,
          );
          bounds.extend(coords);
        } else {
          const coords = new maps.LatLng(
            location.plLatitude,
            location.plLongitude,
          );
          bounds.extend(coords);
        }

        return bounds;
      },
      [location],
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
    }, [
      business?.bizBusinessID,
      getBounds,
      markersData,
      location,
      userLocation,
    ]);

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
      [markersData, location, userLocation, getBounds],
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

    const rootClass = useMemo(() => {
      if (standalone) {
        return s.rootStandAlone;
      }

      return cn(s.root, {
        [s.rootFullScreen]: fullScreenOpened,
      });
    }, [fullScreenOpened]);

    const headerContainerClass = useMemo(() => {
      return cn(s.headerContainer, {
        [s.headerContainerFullScreen]: fullScreenOpened,
      });
    }, [fullScreenOpened]);

    const sideWrapperClass = useMemo(() => {
      return cn(s.sideWrapper, {
        [s.sideWrapperClosed]: !sideBarOpened,
      });
    }, [sideBarOpened]);

    const handleClass = useMemo(() => {
      return cn(s.handle, {
        [s.handleClosed]: !sideBarOpened,
      });
    }, [sideBarOpened]);

    const chevronClass = cn(s.chevron, {
      [s.chevronClosed]: !sideBarOpened,
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
              src={getImageLink(business?.mdaLocalFileName)}
              onError={setDefaultImageOnError}
              className={cn(s.productImage, s.productImageContainer)}
              alt={business?.bizName}
            />
            <div className={s.productInfoContainer}>
              <div className={s.whereToBuy}>Where to Buy Our Products</div>
              <div className={s.productName}>{business?.bizName || ''}</div>
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
                    id={cluster.properties.businessId}
                    key={`marker-${cluster.properties.businessId}`}
                    lat={latitude || 0}
                    lng={longitude || 0}
                    type={cluster.properties.type}
                    showImage={cluster.properties.showImage}
                    image={cluster.properties.image}
                    color={cluster.properties.color}
                    fillColor={cluster.properties.fillColor}
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
                  {(mapBusinesses || []).map(businessItem => (
                    <MapCard
                      key={`business-listing-${businessItem.bizBusinessID}`}
                      business={businessItem}
                      openNewWindow
                      showClaim={showClaim}
                      analyticsAction={AnalyticsAction.ProductMapBusinessView}
                      setHoverBusiness={setHoverBusiness}
                      selected={
                        selectedBusinessId !== null &&
                        businessItem.bizBusinessID === selectedBusinessId
                      }
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
          {bottomSheetOpened ||
          fullScreenOpened ||
          (mapBusinesses || []).length === 0 ? null : (
            <div onClick={openBottomSheet} className={s.listScreenContainer}>
              <List className={s.listScreenIcon} />
              <div className={s.listScreenTextContainer}>
                <div className={s.listScreenText}>View as List</div>
              </div>
            </div>
          )}
        </div>
        {(mapBusinesses || []).length > 0 ? (
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
                <div className={s.itemsTitle}>
                  {(selectedBusinessTypes || []).length > 0
                    ? (selectedBusinessTypes || []).join(' & ')
                    : 'Delivery & Dispensary'}
                </div>
              </div>
              <div className={s.itemsContainer}>
                {(mapBusinesses || []).map(businessItem => (
                  <MapCard
                    mobile
                    key={`mobile-business-listing-${businessItem.bizBusinessID}`}
                    business={businessItem}
                    openNewWindow
                    showClaim={showClaim}
                    analyticsAction={AnalyticsAction.ProductMapBusinessView}
                    setHoverBusiness={setHoverBusiness}
                    selected={
                      selectedBusinessId !== null &&
                      businessItem.bizBusinessID === selectedBusinessId
                    }
                  />
                ))}
                <div className={s.fade} />
              </div>
            </div>
          </BottomSheet>
        ) : null}
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
