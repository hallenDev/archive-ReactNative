import React from 'react'
import EmptyContentPopup from '~/ui/EmptyContentPopup'

const EmptyChats = ({ username = '' }) => (
  <EmptyContentPopup
    title="No messages, yet"
    description={`Don’t be shy!${'\n'}Say “Hello” to ${username} to start chatting`}
  />
)

export default EmptyChats
