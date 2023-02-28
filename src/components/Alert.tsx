import { showMessage } from 'react-native-flash-message';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// @ts-ignore
export const AlertMessage = (message, description, color) => {
  showMessage({
    message,
    description,
    type: 'default',
    backgroundColor: color,
    color: '#fff',
    duration: message == 'Success' ? 3000 : 10000,
    titleStyle: {
      fontWeight: 'bold',
      fontSize: heightPercentageToDP('2%'),
      paddingTop: hp('0.5%'),
    },
    style: { height: hp('15%') },
    textStyle: { fontSize: heightPercentageToDP('2%') },
  });
};
