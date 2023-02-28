import React, { Component, useEffect, useState } from 'react';
import { Text, View, PanResponder, Dimensions, Button } from 'react-native';
import PieChart from 'react-native-pie-chart';

import { BOLD, MEDIUM, REGULAR } from '../../constants';

const ScreenWidth = Dimensions.get('screen').width - 40;

// @ts-ignore
const Row = ({ color, value, widthAndHeight, dotSize = 10, fontColor, textstyle }) => {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}>
      <View
        style={{
          height: dotSize,
          width: dotSize,
          borderRadius: dotSize,
          backgroundColor: color,
          marginLeft: 8,
        }}
      />

      <Text
        style={[
          {
            textAlignVertical: 'center',
            fontFamily: MEDIUM,
            fontSize: 11,
            paddingHorizontal: 4,
            marginLeft: 4,
            color: 'white',
          },
          {
            color: fontColor,
          },
          textstyle,
        ]}
        allowFontScaling={false}>
        {`${value}`}
      </Text>
    </View>
  );
};

const CircularProgress = ({
  valDocuments = '1 B',
  valMedia = '1 B',
  valOther = '1 B',
  valUnknown = '1 B',
  valTotal = '5 B',
  backgroundContainerStyle = {},
  textInsideBarStyle = {},
  colorDocuments = '#84429b',
  colorMedia = '#c25187',
  colorOther = '#147cab',
  colorUnknown = '#1b9f74',
  colorTotal = '#443a52',
  backgroundColor = '#322b3d',
  fontColor = 'white',

  storageUsedText = '0',
  storageTotalText = '',
  // @ts-ignore
  textstyle,
}) => {
  const seperator = ' ';
  const Units = { Byte: 'B', Kilobyte: 'KB', Megabyte: 'MB', Gigabyte: 'GB', Terabyte: 'TB' };

  const getBytes = (mag: number, unit: string) => {
    if (unit === Units.Byte) {
      return mag;
    } else {
      if (unit === Units.Kilobyte) {
        return mag * 1024;
      } else if (unit === Units.Megabyte) {
        return mag * 1024 * 1024;
      } else if (unit === Units.Gigabyte) {
        return mag * 1024 * 1024 * 1024;
      } else if (unit === Units.Terabyte) {
        return mag * 1024 * 1024 * 1024 * 1024;
      }
    }
  };

  const documentMag = parseFloat(valDocuments.split(seperator)[0]);
  const mediaMag = parseFloat(valMedia.split(seperator)[0]);
  const otherMag = parseFloat(valOther.split(seperator)[0]);
  const unknownMag = parseFloat(valUnknown.split(seperator)[0]);
  const totalMag = parseFloat(valTotal.split(seperator)[0]);

  const documentUnits = valDocuments.split(seperator)[1];
  const mediaUnits = valMedia.split(seperator)[1];
  const otherUnits = valOther.split(seperator)[1];
  const unknownUnits = valUnknown.split(seperator)[1];
  const totalUnits = valTotal.split(seperator)[1];

  let documentBytes = getBytes(documentMag, documentUnits)!;
  let mediaBytes = getBytes(mediaMag, mediaUnits)!;
  let otherBytes = getBytes(otherMag, otherUnits)!;
  let unknownBytes = getBytes(unknownMag, unknownUnits)!;
  let totalBytes = getBytes(totalMag, totalUnits)!;
  if (totalUnits === 'TB') {
    documentBytes = documentBytes / 10240000;
    mediaBytes = mediaBytes / 10240000;
    otherBytes = otherBytes / 10240000;
    unknownBytes = unknownBytes / 10240000;
    totalBytes = totalBytes / 10240000000;
  }
  if (totalUnits === 'GB' && totalMag > 1 && totalMag < 250) {
    documentBytes = documentBytes / 1024000;
    mediaBytes = mediaBytes / 1024000;
    otherBytes = otherBytes / 1024000;
    unknownBytes = unknownBytes / 1024000;
    totalBytes = totalBytes / 10240000;
  }
  if (totalUnits === 'GB' && totalMag > 1 && totalMag >= 250) {
    documentBytes = documentBytes / 1024000;
    mediaBytes = mediaBytes / 1024000;
    otherBytes = otherBytes / 1024000;
    unknownBytes = unknownBytes / 1024000;
    totalBytes = totalBytes / 102400000;
  }
  if (totalUnits === 'GB' && totalMag <= 1) {
    documentBytes = documentBytes / 10240000;
    mediaBytes = mediaBytes / 10240000;
    otherBytes = otherBytes / 10240000;
    unknownBytes = unknownBytes / 10240000;
    totalBytes = totalBytes / 10240000;
  }
  console.log('totalBytes', totalBytes);
  const widthAndHeight = ScreenWidth * 0.3;
  const remaining = totalBytes - documentBytes - mediaBytes - otherBytes - unknownBytes;
  const fifth = remaining >= 0 ? remaining : 0;
  const series = [
    documentBytes === 0 ? 0.01 : documentBytes,
    mediaBytes === 0 ? 0.01 : mediaBytes,
    otherBytes === 0 ? 0.01 : otherBytes,
    unknownBytes === 0 ? 0.01 : unknownBytes,
    fifth === 0 ? 0.01 : fifth,
  ];
  console.log('rem', series);
  const sliceColor = [colorDocuments, colorMedia, colorOther, colorUnknown, colorTotal];

  // for (let index = 0; index < series.length; index++) {
  //     series[index] = (series[index] === 0) ? 0.001 : series[index]
  // }

  return storageTotalText !== '' ? (
    <View
      style={[
        {
          // paddingVertical: 16
        },
        backgroundContainerStyle,
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor,
        },
      ]}>
      <View
        style={{
          width: widthAndHeight + 8,
          height: widthAndHeight + 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut
          coverRadius={0.88}
          coverFill="#322A3D"
        />
        <View
          style={{
            // width: widthAndHeight,
            paddingVertical: 32,
            paddingHorizontal: 16,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                textAlign: 'center',
                textAlignVertical: 'center',
              },
              textInsideBarStyle,
              {
                color: fontColor,
              },
            ]}
            allowFontScaling={false}>
            {`${storageUsedText}\n`}
            <Text style={{ fontSize: 11 }}>{`Of ${storageTotalText}`}</Text>
            {/* {`${storageUsedText}\nOf ${storageTotalText}`} */}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: ScreenWidth - widthAndHeight - 16,
          height: widthAndHeight,
          paddingLeft: 4,
          justifyContent: 'space-evenly',
        }}>
        <Row
          color={colorDocuments}
          value={`Documents Files ${valDocuments}`}
          {...{ widthAndHeight, fontColor, textstyle }}
        />

        <Row
          color={colorMedia}
          value={`Media Files ${valMedia}`}
          {...{ widthAndHeight, fontColor, textstyle }}
        />

        <Row
          color={colorOther}
          value={`Other Files ${valOther}`}
          {...{ widthAndHeight, fontColor, textstyle }}
        />

        <Row
          color={colorUnknown}
          value={`Unknown Files ${valUnknown}`}
          {...{ widthAndHeight, fontColor, textstyle }}
        />
      </View>
    </View>
  ) : (
    <></>
  );
};

export default CircularProgress;
