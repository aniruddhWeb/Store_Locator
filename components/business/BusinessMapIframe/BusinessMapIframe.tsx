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
import s from './BusinessMapIframe.module.css';
import { getBrowserUserLocation } from '../../../services/location';
import { Marker } from '../../map/Marker/Marker';
import {
  getFillColor,
  getMapColor,
  isPinBigger,
  MAP_OPTIONS,
} from '../../../services/map';
import { MapCard } from '../../map/MapCard/MapCard';
import { ChevronLeft } from '../../icons/ChevronLeft';
import { getImageLink } from '../../../utils/image';
import { LocationMarker } from '../../map/LocationMarker/LocationMarker';
import { AnalyticsAction } from '../../../services/analytics';
import { CheckBox } from '../../icons/CheckBox';
import { MarkerGroup } from '../../map/MarkerGroup/MarkerGroup';
import { GOOGLE_MAPS_API_KEY } from '../../../config/Constants';

const defaultMapOptions = {
  ...MAP_OPTIONS,
  fullscreenControl: false,
  gestureHandling: 'greedy',
};

export interface ProductMapProps {
  business?: Business;
}

export const BusinessMapIframe = React.memo(({ business }: ProductMapProps) => {
  const mapRef = useRef<any>();
  const mapsRef = useRef<any>();

  const itemsScrollViewRef = useRef<HTMLDivElement>();
  const sheetRef = useRef<BottomSheetRef>();

  const [clusteringEnabled, setClusteringEnabled] = useState<boolean>(true);
  const [mapBounds, setBounds] = useState<number[]>([-180, -85, 180, 85]);
  const [mapZoom, setMapZoom] = useState<number>(7);
  const [mapInitialMoved, setMapInitialMoved] = useState<boolean>(false);
  const [sideBarOpened, setSideBarOpened] = useState<boolean>(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<
    number | string | null
  >(null);
  const [hoverBusiness, setHoverBusiness] = useState<{
    businessId: number | string;
    lat: number;
    lng: number;
  } | null>(null);
  const [userLocation, setUserLocation] = useState<{
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

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);

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

  const setMapBounds = useCallback((bounds, maps) => {
    [
      {
        lng: -126.144262,
        lat: 48.431149,
      },
      {
        lng: -59.698649,
        lat: 46.15607,
      },
    ].forEach((markerLocation: any) => {
      const { lat, lng } = markerLocation;
      bounds.extend(new maps.LatLng(lat, lng));
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (mapRef.current && mapsRef.current) {
        const bounds = new mapsRef.current.LatLngBounds();
        setMapBounds(bounds, mapsRef.current);
        mapRef.current?.fitBounds(bounds, {
          top: 24,
          left: matches.isMobile ? 24 : 372,
          right: 24,
          bottom: matches.isMobile ? 188 : 24,
        });
      }
    }, 1600);
  }, [setMapBounds, matches.isMobile]);

  const onMapLoaded = useCallback(
    ({ map, maps }) => {
      mapRef.current = map;
      mapsRef.current = maps;
      setTimeout(() => {
        if (map) {
          getBrowserUserLocation().then(locationCoords => {
            if (locationCoords.lat && locationCoords.lng) {
              setUserLocation(locationCoords);
            }
          });
          const bounds = new maps.LatLngBounds();
          setMapBounds(bounds, maps);
          mapRef.current?.fitBounds(bounds, {
            top: 24,
            left: matches.isMobile ? 24 : 372,
            right: 24,
            bottom: matches.isMobile ? 188 : 24,
          });
        }
      }, 600);
    },
    [setMapBounds, matches.isMobile],
  );

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
    lat: 49.7715,
    lng: -96.8165,
  });

  const onMarkerClick = useCallback(
    (businessId: number | string, latitude: number, longitude: number) => {
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
    [matches],
  );

  const toggleSideBar = useCallback(
    () => setSideBarOpened(!sideBarOpened),
    [sideBarOpened],
  );

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

  useEffect(() => {
    if (!matches?.isMobile) {
      setSideBarOpened(true);
    } else {
      setClusteringEnabled(true);
    }
  }, [matches]);

  const sideWrapperClass = cn(s.sideWrapper, {
    [s.sideWrapperClosed]: !sideBarOpened,
  });

  const handleClass = cn(s.handle, {
    [s.handleClosed]: !sideBarOpened,
  });

  const chevronClass = cn(s.chevron, {
    [s.chevronClosed]: !sideBarOpened,
  });

  return (
    <div className={s.root}>
      <div className={s.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
          yesIWantToUseGoogleMapApiInternals
          options={defaultMapOptions}
          onGoogleApiLoaded={onMapLoaded}
          onDrag={onDrag}
          onChange={onMapChange}
          defaultCenter={defaultCenter.current}
          defaultZoom={7}>
          {userLocation ? (
            <LocationMarker
              lat={userLocation.lat || 0}
              lng={userLocation.lng || 0}
            />
          ) : null}
          {(clusteringEnabled ? clusters : markersData).map((cluster: any) => {
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
          })}
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
        {markersData.length > 0 ? (
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
                    showClaim
                    analyticsAction={AnalyticsAction.ProductMapBusinessView}
                    setHoverBusiness={setHoverBusiness}
                    selected={
                      selectedBusinessId !== null &&
                      businessItem.bizBusinessID === selectedBusinessId
                    }
                    linkQueryParams={`?search=${encodeURIComponent(
                      business?.bizName || '',
                    )}#products`}
                  />
                ))}
                <div className={s.fade} />
              </div>
            </div>
            <div onClick={toggleSideBar} className={handleClass}>
              <ChevronLeft className={chevronClass} />
            </div>
          </div>
        ) : null}
      </div>
      {markersData.length > 0 && matches.isMobile ? (
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
          open={matches.isMobile}
          expandOnContentDrag>
          <div className={s.sideContainer}>
            <div className={s.itemsContainer}>
              {(mapBusinesses || []).map(businessItem => (
                <MapCard
                  mobile
                  key={`mobile-business-listing-${businessItem.bizBusinessID}`}
                  business={businessItem}
                  openNewWindow
                  showClaim
                  analyticsAction={AnalyticsAction.ProductMapBusinessView}
                  setHoverBusiness={setHoverBusiness}
                  selected={
                    selectedBusinessId !== null &&
                    businessItem.bizBusinessID === selectedBusinessId
                  }
                  linkQueryParams={`?search=${encodeURIComponent(
                    business?.bizName || '',
                  )}#products`}
                />
              ))}
              <div className={s.fade} />
            </div>
          </div>
        </BottomSheet>
      ) : null}
    </div>
  );
});
