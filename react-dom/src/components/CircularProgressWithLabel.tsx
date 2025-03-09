'use client'
import CircularProgress, {CircularProgressProps} from '@mui/material/CircularProgress';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel({labelProps, ...props}: CircularProgressProps & { value: number, labelProps: TypographyProps }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          {...labelProps}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}