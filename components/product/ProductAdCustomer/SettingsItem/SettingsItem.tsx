import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import styles from './SettingsItem.module.css';

interface SettingsItemProps {
  title: string;
  value: number;
  totalImpressions?: number | null;
  updateValue: (val: number) => void;
  disabled?: boolean;
}

const CustomizedSlider = styled(Slider)({
  color: '#61AB62',
  height: 2,

  '& .MuiSlider-rail': {
    color: '#DADADA',
  },

  '& .MuiSlider-track': {
    border: 'none',
  },

  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    boxShadow: 'none',
    backgroundColor: '#61AB62',
  },
});

export const SettingsItem: FC<SettingsItemProps> = ({
  title,
  value,
  totalImpressions,
  updateValue,
  disabled,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.rightContainer}>
        <div className={styles.settingController}>
          <Box sx={{ width: 120 }}>
            <CustomizedSlider
              value={value}
              min={0}
              max={100}
              step={1}
              disabled={disabled}
              valueLabelDisplay="off"
              onChange={(_, newValue: any) => updateValue(newValue)}
            />
          </Box>
          <div className={styles.value}>{value}%</div>
        </div>
        <div className={styles.totalImpression}>{totalImpressions || 0}</div>
      </div>
    </div>
  );
};
