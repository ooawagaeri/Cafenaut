import React from 'react';
import { Text, Tooltip } from '@chakra-ui/react';

function getEmoji(value: number): { emoji: string, label: string } {
  if (value < -0.5) {
    return {emoji: '😠', label: 'Very negative response!'};
  } else if (value < -0.19) {
    return {emoji: '😔', label: 'Somewhat negative response!'};
  } else if (value < 0.19) {
    return {emoji: '🫤', label: 'Okay okay response!'};
  } else if (value < 0.5) {
    return {emoji: '😁', label: 'Somewhat positive response!'};
  } else {
    return {emoji: '😍', label: 'Very positive response!'};
  }
}

export default function Sentiment(props: { value: number | undefined }) {
  const senti = props.value === undefined ? 0 : props.value;
  return (
    <Tooltip label={getEmoji(senti).label} placement='right'>
      <Text fontWeight={600} size='sm'>Sentiment: {getEmoji(senti).emoji}</Text>
    </Tooltip>
  );
}
