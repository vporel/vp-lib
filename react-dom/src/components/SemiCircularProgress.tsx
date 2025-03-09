'use client'
import CircularProgress, {CircularProgressProps} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function SemiCircularProgress({value, size, ...props}: CircularProgressProps & { value: number }) {

  const sizeParsed = size ? parseInt(size+"") : 40 //px

  return <Box sx={{
    position: "relative",
    display: "inline-flex",
    width: sizeParsed,
    height: (sizeParsed / 2) + "px",
    overflow: "hidden",
  }}>
    <Box sx={{
      position: "absolute",
      display: "inline-flex",
      top: 0,
      left: 0,
      transform: "rotate(-90deg)"
    }}>
      <CircularProgress variant="determinate" value={value/2} size={size} {...props}/>
    </Box>
  </Box>
}