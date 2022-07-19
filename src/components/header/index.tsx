import { Heading, HStack, IconButton, StyledProps, useNativeBase, useTheme } from 'native-base';
import {MaterialIcons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

type Props = StyledProps & {
  title: string;
}

export function Header({
  title,
  ...rest
}: Props) {
  
  const {colors} = useTheme();
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }

  return (
    <HStack
      w='full'
      justifyContent='space-between'
      alignItems='center'
      bg='gray.600'
      pb={6}
      pt={12}
    >
      <IconButton icon={<MaterialIcons name='keyboard-arrow-left' color={colors.gray[200]} size={30}/>} onPress={()=>handleGoBack()}/>
      <Heading
        color='gray.100'
        alignItems='center'
        fontSize='lg'
        flex={1}
        ml={6}
      >
        {title}
      </Heading>
    </HStack>
  );
}