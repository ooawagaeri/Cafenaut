import { CircularProgress, CircularProgressLabel, Tooltip } from '@chakra-ui/react';
import React from 'react';

export default function Authenticity(props: { value: number | undefined }) {
  const percent = props.value === undefined ? 0 : props.value;
  const hue = `hue-rotate(${120 * percent}deg)`;
  const labelValue = Math.round(percent * 100);
  const realValue = labelValue === 0 ? "processing..." : labelValue;
  return (
    <Tooltip label='Authenticity %' placement='right'>
      <CircularProgress value={percent * 100} color='red.400' filter={hue}>
        <CircularProgressLabel>{realValue}%</CircularProgressLabel>
      </CircularProgress>
    </Tooltip>
  );
}
