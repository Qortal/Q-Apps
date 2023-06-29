import { styled } from '@mui/system'
import { Box, Typography } from '@mui/material'

export const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: 1.25,
  color: theme.palette.text.primary
}))
