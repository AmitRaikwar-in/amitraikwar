import { StreakIcon } from '@assets';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
  Tooltip,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Noise } from '@components';
import { range } from 'lodash';
import { useRef } from 'react';
import { MONTH_NUMBER_NAME_MAP, MonthDaysMap } from './constants';

const StreakStalker = ({ dates }: { dates: string[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const dateMap = dates.reduce(
    (acc, dateFromOutside) => {
      const date = new Date(dateFromOutside);
      const month = date.getMonth() + 1;
      const day = date.getDate();

      acc[month] = acc[month] || [];
      acc[month].push(day);

      return acc;
    },
    {} as Record<string, number[]>,
  );

  return (
    <>
      <Tooltip label="Activity" placement="top" hasArrow>
        <IconButton
          variant={'ghost'}
          ref={btnRef}
          onClick={onOpen}
          aria-label={''}
          color={'gray.300'}
          _hover={{ color: 'white' }}
          _active={{ color: 'white' }}
          icon={<StreakIcon width={32} height={32} />}
        >
          Streak Stalker
        </IconButton>
      </Tooltip>
      <Drawer
        size={'xl'}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={'black'}
          color={'white'}
          border={'1px solid gray'}
          borderRadius={10}
        >
          <Noise />
          <DrawerCloseButton />
          <DrawerHeader>Activity Tracker, 2025</DrawerHeader>
          <DrawerBody p={0} m={2}>
            <Box
              display={'grid'}
              flexDirection={'row'}
              p={5}
              gridAutoFlow={'column'}
            >
              {Object.entries(MonthDaysMap).map(([month, daysInMonth]) => (
                <VStack key={month} spacing={0}>
                  <Text fontSize={10} textAlign={'center'}>
                    {MONTH_NUMBER_NAME_MAP[month]}
                  </Text>
                  <Box
                    display={'grid'}
                    gridTemplateRows={'repeat(7, 2fr)'}
                    flexDirection={'row'}
                    p={5}
                    gridAutoFlow={'column'}
                  >
                    {range(1, daysInMonth + 1).map((dayOfMonth) => (
                      <Tooltip
                        key={dayOfMonth + 1}
                        label={`${dayOfMonth + 1} ${MONTH_NUMBER_NAME_MAP[month]}`}
                        hasArrow
                      >
                        <Box
                          m={'1px'}
                          borderRadius={3}
                          color={'white'}
                          fontSize={10}
                          border={'1px solid gray'}
                          bg={
                            dateMap?.[month]?.includes(dayOfMonth)
                              ? 'green.600'
                              : 'gray.900'
                          }
                          textAlign={'center'}
                          h={5}
                          w={5}
                          onClick={() => console.log('clicked')}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </VStack>
              ))}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default StreakStalker;
