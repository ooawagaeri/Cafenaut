import { Box, Heading, IconButton, Slide, useDisclosure } from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons';
import React from 'react';

export default function Instructions() {
  const {isOpen, onToggle} = useDisclosure()

  return (
    <Box style={{
      position: 'absolute',
      right: '30px',
      top: '80px',
      zIndex: 'sticky',
    }}>
      <IconButton aria-label='How to use Maps?' onClick={onToggle} icon={<QuestionIcon/>}/>
      <Slide direction='bottom' in={isOpen} style={{zIndex: 10}}>
        <Box
          p='40px'
          color='black'
          mt='4'
          bg='whitesmoke'
          rounded='md'
          shadow='md'
        >
          <Heading as='h1' size='md'><u>How to use Maps:</u></Heading>
          <br/>
          <ol>
            <li><b>Dropping a pin:</b> To drop a pin on the map, tap or click anywhere on the map.
              You can click around to adjust its location if needed.
            </li>
            <li><b>Adding the pin to a middle-ground finder:</b> Once you've dropped a pin,
              right-click on the pin to bring up the options menu. From there, select 'Add finder
              pin' This will add the pin to a list of saved locations that you can access later.
            </li>
            <li><b>Accessing middle-ground finder:</b> Select 'Open finder' and execute 'Calculate'
              when you have at least 2 pins dropped!
            </li>
            <li><b>Viewing cafe details:</b> To view details about a cafe, look for the cafe icon on
              the map. Click or tap on the icon to bring up a popup window with information about
              the cafe, such as its name, authenticity, and number of reviews.
            </li>
            <li><b>Interpreting cafe icon colors:</b> The color of the cafe icon indicates the
              degree of authenticity. Generally, green indicate that the cafe is highly authentic,
              while yellow or orange icons may indicate that the authenticity is questionable. Red
              icons may indicate that the cafe is known to be inauthentic or unreliable.
            </li>
          </ol>
        </Box>
      </Slide>
    </Box>
  )
}
