import {
  FormControl,
  FormLabel,
  Select,
  Box,
} from '@chakra-ui/react';

export const selectCafe = (
  <Box padding="5%">
    <FormControl>
      <FormLabel>Cafe</FormLabel>
      <Select placeholder="Select cafe">
        <option>Starbucks</option>
        <option>Macs</option>
      </Select>
    </FormControl>
  </Box>
);
