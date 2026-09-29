import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Img,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BorderGlow } from '@components';
import { Redirect } from '@assets';
import { CERTIFICATES_DATA } from '@data';

const VerifiedIcon = () => (
  <Icon viewBox="0 0 24 24" boxSize={3.5} fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </Icon>
);

const Certificates = () => {
  const { t } = useTranslation();

  return (
    <Box
      minH={{ base: 'auto', md: '60vh' }}
      width={'100%'}
      id="certificates"
      paddingX={{ base: 4, md: 8, lg: 20, xl: 32 }}
      paddingY={{ base: 10, md: 14 }}
      zIndex={0}
      position="relative"
    >
      <Heading
        width={'100%'}
        textAlign={'start'}
        position={'sticky'}
        top={'10vh'}
        zIndex={10}
      >
        {t('certificates.title')}
      </Heading>

      <Text
        color="gray.400"
        fontSize={{ base: 'sm', md: 'md' }}
        mt={2}
        mb={{ base: 6, md: 8 }}
        textAlign="start"
      >
        {t('certificates.subtitle')}
      </Text>

      <Flex
        justify="center"
        align="center"
        gap={{ base: 5, sm: 6, md: 8 }}
        width="100%"
        mt={{ base: 4, md: 6 }}
        wrap="wrap"
      >
        {CERTIFICATES_DATA.map(
          (
            { title, issuer, badgeImage, verificationUrl, glowColors },
            index,
          ) => (
            <Box
              key={index}
              w={{ base: '240px', sm: '265px', md: '285px' }}
              h={{ base: '240px', sm: '265px', md: '285px' }}
              maxWidth="100%"
              aspectRatio="1 / 1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{ width: '100%', height: '100%' }}
              >
                <BorderGlow
                  className="w-full h-full aspect-square"
                  borderRadius={20}
                  glowRadius={32}
                  glowIntensity={1.15}
                  colors={glowColors}
                  backgroundColor="rgba(14, 12, 18, 0.92)"
                  style={{
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 10px 28px 0 rgba(0, 0, 0, 0.45)',
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1 / 1',
                  }}
                >
                  <VStack
                    spacing={1.5}
                    align="center"
                    p={{ base: 4, sm: 5 }}
                    justify="space-between"
                    h="100%"
                    w="100%"
                  >
                    {/* Badge Image with hover scale & direct link */}
                    <Box
                      as="a"
                      href={verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${title} badge`}
                      cursor="pointer"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width="100%"
                      flex="1"
                    >
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                        }}
                      >
                        <Img
                          src={badgeImage}
                          alt={`${title} badge`}
                          w={{ base: '95px', sm: '108px', md: '118px' }}
                          h={{ base: '95px', sm: '108px', md: '118px' }}
                          objectFit="contain"
                          display="block"
                          mx="auto"
                          filter="drop-shadow(0 6px 14px rgba(0,0,0,0.6))"
                          loading="lazy"
                        />
                      </motion.div>
                    </Box>

                    {/* Title & Issuer Info */}
                    <VStack
                      spacing={0.5}
                      align="center"
                      textAlign="center"
                      w="full"
                      px={1}
                    >
                      <Text
                        fontSize={{ base: 'xs', sm: 'sm' }}
                        fontWeight="bold"
                        color="white"
                        lineHeight="1.25"
                        noOfLines={2}
                      >
                        {title}
                      </Text>

                      <HStack
                        spacing={1}
                        color="brand.500"
                        fontSize={{ base: '10px', sm: 'xs' }}
                        fontWeight="semibold"
                      >
                        <VerifiedIcon />
                        <Text>{issuer}</Text>
                      </HStack>
                    </VStack>

                    {/* Verification CTA */}
                    <Button
                      as="a"
                      href={verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="xs"
                      fontSize={{ base: '10px', sm: 'xs' }}
                      variant="outline"
                      borderColor="whiteAlpha.300"
                      color="white"
                      borderRadius="full"
                      px={{ base: 3, sm: 3.5 }}
                      py={1}
                      rightIcon={<Redirect width="11" height="11" />}
                      _hover={{
                        bg: 'brand.500',
                        borderColor: 'brand.500',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 16px rgba(128, 90, 213, 0.4)',
                      }}
                      transition="all 0.2s"
                    >
                      {t('certificates.verify')}
                    </Button>
                  </VStack>
                </BorderGlow>
              </motion.div>
            </Box>
          ),
        )}
      </Flex>
    </Box>
  );
};

export default Certificates;
