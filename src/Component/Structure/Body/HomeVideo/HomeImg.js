import { makeStyles } from '@mui/styles';
import { Grid} from '@mui/material';

const useStyles = makeStyles(() => ({
  videoContainer: {
    left: 0,
    top: 0,
    width: '100vw',
    height: '45vh',
    objectFit: 'cover',
  },
}));

export default function HomeImg() {
  const classes = useStyles();
  
  return (
    <Grid container direction="column">
      <Grid item xs>
        <video id="myVideo" className={classes.videoContainer} autoPlay muted loop>
          <source src="https://res.cloudinary.com/dutk43ch5/video/upload/v1681110285/site/video_peqopx.mp4" type="video/mp4" />
        </video>
      </Grid>
    </Grid>
  );
}
