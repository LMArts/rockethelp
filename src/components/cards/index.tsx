import { Box, HStack, Text, useTheme, VStack } from 'native-base';
import { ReactNode } from 'react';
import {IconProps} from 'phosphor-react-native';

type ICardsProps = {
  title: string;
  icon: React.ElementType<IconProps>; 
  description?: string;
  footer?: string;
  children?: ReactNode;
}

export function Cards({
  children,
  icon: Icon,
  title,
  description,
  footer = null
}: ICardsProps) {
  
  const {colors} = useTheme();
  
  return (
    <VStack 
      bg='gray.700'
      p={5}
      mt={5}
      rounded='sm'
    >
      <HStack
        alignItems='center'
        mb={4}
      >
        <Icon color={colors.primary[700]}/>
        <Text
          ml={2}
          color='gray.300'
          fontSize='sm'
          textTransform='uppercase'
        >
          {title}
        </Text>

        {
          !!description && 
          <Text color='gray.100' fontSize='md'>
            {description}
          </Text>
        }

        {children}

        {
          !!footer &&
          <Box
            borderTopWidth={1}
            borderTopColor='gray.400'
            mt={3}
          >
            <Text
              mt={3}
              color='gray.300'
              fontSize='sm'
            >
              {footer}
            </Text>
          </Box>
        }
      </HStack>

    </VStack>
  );
}