import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SafeAreaBackground = ({
  children = null,
  backgroundColorTop = '',
  backgroundColorBottom = '',
}) => {
  return (
    <>
      <SafeAreaView
        edges={['top']}
        style={{ flex: 0, backgroundColor: backgroundColorTop }}
      />
      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        style={{
          flex: 1,
          backgroundColor: backgroundColorBottom,
          position: 'relative',
        }}
      >
        {children}
      </SafeAreaView>
    </>
  )
}

export default SafeAreaBackground
