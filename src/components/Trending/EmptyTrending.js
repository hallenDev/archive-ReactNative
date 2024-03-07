import React from 'react'
import EmptyContentPopup from '~/ui/EmptyContentPopup'

export default function EmptyTrending({ onResetFilterType = () => {} }) {
  return (
    <EmptyContentPopup
      title="No data found."
      description="You can check back later."
      buttonText="Reset the filter"
      onPress={onResetFilterType}
    />
  )
}
