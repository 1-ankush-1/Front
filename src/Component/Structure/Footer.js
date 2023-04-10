import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.footer.primary,
        padding: theme.spacing(6),
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Grid container spacing={4} justify="space-evenly">
                <Grid item xs={12} md={3}>
                    <img
                        src="https://res.cloudinary.com/dutk43ch5/image/upload/v1681110456/site/VCA_Footer_tjavbx.png"
                        alt="VCA"
                        className={classes.logo}
                        width="200px"
                        height="200px"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom color="secondary">
                        Services
                    </Typography>
                    <ul>
                        <li>
                            <Link href="/" variant="subtitle1" color="secondary">
                                Gst 
                            </Link>
                        </li>
                        <li>
                            <Link href="/" variant="subtitle1" color="secondary">
                                Tax Calculator
                            </Link>
                        </li>
                        <li>
                            <Link href="/" variant="subtitle1" color="secondary">
                                Expenditure
                            </Link>
                        </li>
                        <li>
                            <Link href="/" variant="subtitle1" color="secondary">
                                Talk to Expert
                            </Link>
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom color="secondary">
                        Useful links
                    </Typography>
                    <ul>
                        <li>
                            <Link href="/" variant="subtitle1" color="secondary" >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/About" variant="subtitle1" color="secondary" >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href='#' variant="subtitle1" color="secondary">
                                Career
                            </Link>
                        </li>
                        <li>
                            <Link href="/Contact" variant="subtitle1" color="secondary">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom color="secondary">
                        Contact
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="subtitle1" color="secondary">
                                <i className="fa fa-map-marker"></i>Second Floor, Nandgiri Tower, Phoolbag, near GDA office,Gwalior
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle1" color="secondary">
                                <i className="fa fa-envelope"></i> praedicoglobalresearch@gmail.com
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle1" color="secondary">
                                <i className="fa fa-phone"></i> +91 8319335916
                            </Typography>
                        </li>
                        
                    </ul>
                </Grid>
                
            </Grid>
            <div className='text-center p-4' >
               <p style={{ color:"white" }}>©  Copyright <b>Praedico Global Research</b>  All Rights Reserved</p>
            </div>
            
        </footer>
    );
}
