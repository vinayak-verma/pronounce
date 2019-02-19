import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = theme => ({
  card: {
    display: 'flex',
    maxWidth: 270,
    width: 'auto',
    margin: 13,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 300,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginLeft: 16,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function MediaControlCard(props) {
  const { classes, } = props;
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.Name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.Language}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="Play/pause">
            <PlayArrowIcon className={classes.playIcon} onClick={() => {new Audio(props.NamePronounciation).play()}} />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={props.UserImage}
        title="Live from space album cover"
      />
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);