import { GithubIcon, NpmIcon, Redirect } from '@assets';
import { IconButton, Link } from '@chakra-ui/react';
const LinkIcon = (type: string) => {
  if (type.includes('github')) {
    return <GithubIcon width={'4em'} />;
  } else if (type.includes('npmjs')) {
    return <NpmIcon width={'4em'} />;
  } else {
    return <Redirect width={'4em'} />;
  }
};

const CustomIconButton = ({ link }: { link: string }) => {
  return (
    <IconButton
      aria-label={link}
      variant="outline"
      color={'white'}
      width={10}
      icon={LinkIcon(link)}
      as={Link}
      href={link}
      isExternal
    />
  );
};

export default CustomIconButton;
