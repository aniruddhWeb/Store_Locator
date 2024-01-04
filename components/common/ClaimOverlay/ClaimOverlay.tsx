import React, { useState } from 'react';
import { useMediaQueries } from '@react-hook/media-query';
import s from './ClaimOverlay.module.css';
import { Button } from '../Button/Button';
import { ClaimModal } from '../ClaimModal/ClaimModal';

export const ClaimOverlay = () => {
  const [claimModalVisible, setClaimModalVisible] = useState<boolean>(false);

  const { matches } = useMediaQueries({
    isMobile: 'only screen and (max-width: 860px)',
  });

  return (
    <>
      <div className={s.root}>
        <div className={s.claimText}>Is this your business?</div>
        <Button
          buttonText="Click here to claim this listing"
          buttonStyle={
            matches.isMobile ? buttonGreenMobileStyle : buttonGreenStyle
          }
          onPress={() => setClaimModalVisible(true)}
        />
      </div>
      <ClaimModal isOpen={claimModalVisible} setIsOpen={setClaimModalVisible} />
    </>
  );
};

const buttonGreenMobileStyle = {
  padding: '0 16px',
  height: 38,
  minHeight: 38,
  marginBottom: '32px',
  background: '#61AB62',
  width: '100%',
  maxWidth: '320px',
};

const buttonGreenStyle = {
  padding: '0 40px',
  height: 38,
  marginBottom: '32px',
  background: '#61AB62',
  maxWidth: 'unset',
  width: 'unset',
};
