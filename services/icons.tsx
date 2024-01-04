import React from 'react';
import { Happy } from '../components/icons/Happy';
import { Sleepy } from '../components/icons/Sleepy';
import { Relaxed } from '../components/icons/Relaxed';
import { Sedated } from '../components/icons/Sedated';
import { Euphoria } from '../components/icons/Euphoria';
import { Creativity } from '../components/icons/Creativity';
import { Hungry } from '../components/icons/Hungry';
import { Focused } from '../components/icons/Focused';
import { Insomnia } from '../components/icons/Insomnia';
import { ADHD } from '../components/icons/ADHD';
import { Stress } from '../components/icons/Stress';
import { Depression } from '../components/icons/Depression';
import { AppetiteLoss } from '../components/icons/AppetiteLoss';
import { Pain } from '../components/icons/Pain';
import { Anxiety } from '../components/icons/Anxiety';
import { Migraines } from '../components/icons/Migraines';
import { Day } from '../components/icons/Day';
import { Dusk } from '../components/icons/Dusk';
import { Evening } from '../components/icons/Evening';

export const getProductPropertyIcon = (type: string, isMobile?: boolean) => {
  switch (type) {
    case 'Happy':
      return <Happy style={isMobile ? { height: 28, width: 28 } : undefined} />;
    case 'Sleepy':
      return (
        <Sleepy style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Relaxed':
      return (
        <Relaxed style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Sedated':
      return (
        <Sedated style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Euphoria':
      return (
        <Euphoria style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Creativity':
      return (
        <Creativity style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Hungry':
      return (
        <Hungry style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Focused':
      return (
        <Focused style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Insomnia':
      return (
        <Insomnia style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'ADHD':
      return <ADHD style={isMobile ? { height: 28, width: 28 } : undefined} />;
    case 'Stress':
      return (
        <Stress style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Depression':
      return (
        <Depression style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Appetite Loss':
      return (
        <AppetiteLoss
          style={isMobile ? { height: 28, width: 28 } : undefined}
        />
      );
    case 'Pain':
      return <Pain style={isMobile ? { height: 28, width: 28 } : undefined} />;
    case 'Anxiety':
      return (
        <Anxiety style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Migraines':
      return (
        <Migraines style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    case 'Day':
      return <Day style={isMobile ? { height: 28, width: 28 } : undefined} />;
    case 'Dusk':
      return <Dusk style={isMobile ? { height: 28, width: 28 } : undefined} />;
    case 'Evening':
      return (
        <Evening style={isMobile ? { height: 28, width: 28 } : undefined} />
      );
    default:
      return null;
  }
};
