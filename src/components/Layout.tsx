import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

type Props = {}

export const Layout = (props: Props) => {
  return (
    <Box p={10}>
      <Outlet />
    </Box>
  )
}