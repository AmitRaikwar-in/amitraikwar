import { Box, Button, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { HEADING_TYPE_REGEX } from './constants';
import { useLikeArticleData } from '@services';

const SideViewer = ({ mdString }: { mdString: string }) => {
  const { mutate } = useLikeArticleData();
  // Extract headings from the markdown string and remove dots.
  const headings = useMemo(
    () =>
      Array.from(mdString.matchAll(HEADING_TYPE_REGEX), (m) => {
        const length = (m[0].match(/#/g)?.length ?? 1) - 1;
        return {
          itemName:
            Array(length)
              .fill('  ')
              .reduce((acc, it) => {
                acc += it;
                return acc;
              }, '') + m[1].replace(/#/g, '').trim(),
          marginStart: length * 2,
          link: `#${m[1].replace(/#/g, '').trim().toLowerCase().replace(/\./g, '').replace(/\?/g, '').replace(/ /g, '-').replace('+', 'p')}`,
        };
      }),
    [mdString],
  );

  const scrollToComponent = (target: string) => {
    const element = document.getElementById(target.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  return (
    <Box
      pos={'sticky'}
      top={'12vh'}
      maxH={'88vh'}
      width={'20%'}
      overflowY={'scroll'}
      scrollSnapType={'y mandatory'}
      display={'flex'}
      px={2}
      rowGap={1}
      flexDir={'column'}
    >
      <Button size={'sm'} onClick={mutate}>
        Like 👍
      </Button>
      <Button
        size={'sm'}
        as={'a'}
        href={'#comments'}
        onClick={() =>
          document.getElementById('comments')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      >
        Comments 💬
      </Button>
      {headings.map(({ marginStart, itemName, link }, index) => (
        <>
          <Text
            key={index + itemName}
            color={'primary'}
            _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
            style={{
              padding: 2,
              width: '100%',
              fontSize: 'medium',
            }}
            marginStart={marginStart}
            onClick={() => scrollToComponent(link)}
          >
            {itemName}
          </Text>
        </>
      ))}
    </Box>
  );
};

export default SideViewer;
