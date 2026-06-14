import { Box, Heading, HStack, Text, Wrap } from '@chakra-ui/react';
import { Noise, Timeline } from '@components';
import { WORK_DATA } from '@data';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CustomHeading = ({ title }: { title: string }) => {
  return (
    <Text
      my={1}
      width={'fit-content'}
      fontWeight="bold"
      color="brand.500"
      marginTop={2}
      borderBottom={'1px solid'}
      fontSize={{ base: 'xs', md: 'sm' }}
    >
      {title}
    </Text>
  );
};

const WorkUIData = () => {
  return Object.entries(WORK_DATA)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, data]) => {
      const { title, description, keyPoints, tags, links } = data;
      return {
        title: year,
        content: (() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isOpen, setIsOpen] = useState(false);
          return (
            <Box
              w={'full'}
              padding={{ base: 3, md: 4 }}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              onClick={() => setIsOpen(!isOpen)}
              cursor="pointer"
            >
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="bold"
                color="brand.500"
                marginBottom={2}
              >
                {title}
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{description}</Text>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.section
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    {keyPoints && keyPoints.length > 0 && (
                      <CustomHeading title="Key points:" />
                    )}
                    {keyPoints.map((point, index) => (
                      <Text
                        marginStart={{ base: 4, md: 10 }}
                        key={index}
                        marginTop={2}
                        fontWeight="500"
                        color="brand.500"
                        fontSize={{ base: 'xs', md: 'sm' }}
                      >
                        {point}
                      </Text>
                    ))}
                    {tags && tags.length > 0 && (
                      <CustomHeading title="Skills acquired:" />
                    )}
                    <Wrap spacingX={2} spacingY={1.5}>
                      {tags.map((tag, index) => (
                        <Text
                          px={1.5}
                          py={0.5}
                          _hover={{
                            transform: 'scale(1.05)',
                            cursor: 'pointer',
                          }}
                          transition={'transform 0.4s'}
                          outline={'1px solid'}
                          key={index}
                          marginTop={1.5}
                          fontWeight="500"
                          color="brand.500"
                          fontSize={{ base: 'xs', md: 'sm' }}
                        >
                          {tag}
                        </Text>
                      ))}
                    </Wrap>
                    <HStack>
                      <CustomHeading title="Important Links:" />
                      <Wrap spacingX={4} spacingY={1.5}>
                        {links.map(({ title, link }, index) => (
                          <Text
                            key={index}
                            as="a"
                            href={link}
                            target="_blank"
                            marginTop={1.5}
                            color="brand.500"
                            fontWeight="bold"
                            fontSize={{ base: 'xs', md: 'md' }}
                          >
                            {title}
                          </Text>
                        ))}
                      </Wrap>
                    </HStack>
                  </motion.section>
                )}
              </AnimatePresence>
            </Box>
          );
        })(),
      };
    });
};

const Work = () => {
  const { t } = useTranslation();
  return (
    <Box
      zIndex={0}
      minH={'100vh'}
      width={'100%'}
      id="work"
      paddingX={{ base: 4, md: 8, lg: 20, xl: 32 }}
      overflow={'clip'}
    >
      <Heading position={'sticky'} top={'10vh'} zIndex={3}>
        {t('work.title')}
      </Heading>
      <Noise type="fg" />
      <Timeline title={t('work.description')} data={WorkUIData()} />
    </Box>
  );
};

export default Work;
