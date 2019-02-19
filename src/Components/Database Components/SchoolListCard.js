import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 270,
    margin: '20px',
  },
  media: {
    // object-fit is not supported by IE11.
    objectFit:'fit',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <div onClick={props.LoadLayer2}>
      <Card className={classes.card} raised='true'>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            height='auto'
            image= {props.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {props.name}
            </Typography>
            <Typography component="p">
              {props.moto}
            </Typography>
          </CardContent>
        </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Enter Database
            </Button>
          </CardActions>
      </Card>
    </div>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);