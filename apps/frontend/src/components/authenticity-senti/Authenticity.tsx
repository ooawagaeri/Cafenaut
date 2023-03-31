import { CircularProgress, CircularProgressLabel, Tooltip } from '@chakra-ui/react';
import React from 'react';

export default function Authenticity(props: { value: number | undefined }) {
  const percent = props.value === undefined ? 0 : props.value;
  const hue = `hue-rotate(${120 * percent}deg)`;
  return (
    <Tooltip label='Authenticity %' placement='right'>
      <CircularProgress value={percent * 100} color='red.400' filter={hue}>
        <CircularProgressLabel>{Math.round(percent * 100)}%</CircularProgressLabel>
      </CircularProgress>
    </Tooltip>
  );
}
