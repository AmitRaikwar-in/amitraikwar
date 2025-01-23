import {
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MediumIcon,
  RobotIcon,
} from '@assets';
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCursor } from '@components';
import { RefObject, useRef } from 'react';
import { CharacterType } from '../scene';
import { CONTACT } from '@data';

const IconProps = {
  variant: 'ghost',
  color: 'white',
  transition: 'transform 0.3s',
  transform: 'scale(1.5)',
  _hover: {
    transform: 'scale(2.2)',
  },
  _active: {
    bg: 'transparent',
  },
};

const SocialNavigation = ({
  handleCharacterClick: handlerCharacterClick,
}: {
  handleCharacterClick: (type: CharacterType) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const { setCursorInsets } = useCursor();
  const onMouseEnter =
    (ref: RefObject<HTMLDivElement>, radius: string) => () => {
      const { width, height, top, left } =
        ref.current?.getBoundingClientRect() || {
          width: 56,
          height: 56,
          top: 0,
          left: 0,
        };
      setCursorInsets(undefined);
      setTimeout(() => {
        setCursorInsets({ height, width, top, left, borderRadius: radius });
      }, 0);
    };
  const onMouseLeave = () => {
    setCursorInsets(undefined);
  };

  return (
    <VStack position={'fixed'} bottom={20} right={14} rowGap={10} zIndex={1}>
      <Box
        ref={menuButtonRef}
        zIndex={1}
        onMouseEnter={onMouseEnter(menuButtonRef, '6px')}
        onMouseLeave={onMouseLeave}
      >
        <Menu isLazy placement="top-start" closeOnBlur closeOnSelect={true}>
          <MenuButton
            borderColor={'gray'}
            boxShadow={'0px 0px 10px 3px gray'}
            bg={'rgba(255, 255, 255, 0.1)'}
            backdropFilter={'blur(20px)'}
            transition={'background-color 0.3s'}
            aria-label="Options"
            padding={2}
            borderRadius={'10px'}
          >
            <RobotIcon height={'2em'} width={'2em'} />
          </MenuButton>
          <MenuList
            style={{
              backgroundColor: 'transparent',
              color: 'violet',
              padding: '0px',
              boxShadow: '0px 0px 10px 4px gray',
            }}
          >
            {(['adam', 'lieutenant', 'copernicus'] as CharacterType[]).map(
              (character: CharacterType) => (
                <MenuItem
                  key={character}
                  onClick={() => handlerCharacterClick(character)}
                >
                  <Text fontSize={'xl'}>{character.toUpperCase()}</Text>
                </MenuItem>
              ),
            )}
          </MenuList>
        </Menu>
      </Box>
      <VStack
        ref={ref}
        px={2}
        py={5}
        border={'1px solid gray'}
        boxShadow={'0px 0px 10px 4px gray'}
        borderRadius={'30px'}
        onMouseEnter={onMouseEnter(ref, '30px')}
        onMouseLeave={onMouseLeave}
        bg={'rgba(255, 255, 255, 0.1)'}
        backdropFilter={'blur(20px)'}
        transition={'background-color 0.3s'}
      >
        <IconButton
          icon={<GithubIcon />}
          aria-label="github icon"
          as={'a'}
          href={CONTACT.github}
          target={'_blank'}
          {...IconProps}
        />
        <IconButton
          icon={<LinkedInIcon />}
          aria-label="linkedin icon"
          as={'a'}
          href={CONTACT.linkedIn}
          target={'_blank'}
          {...IconProps}
        />
        <IconButton
          icon={<MediumIcon />}
          aria-label="medium icon"
          as={'a'}
          href={CONTACT.medium}
          target={'_blank'}
          {...IconProps}
        />
        <IconButton
          icon={<InstagramIcon />}
          aria-label="instagram icon"
          as={'a'}
          href={CONTACT.instagram}
          target={'_blank'}
          {...IconProps}
        />
      </VStack>
    </VStack>
  );
};

export default SocialNavigation;
