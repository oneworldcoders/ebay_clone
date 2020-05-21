import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(() => ({
  root: {
    width: '18%',
    borderRadius: '5%',
    margin: '1%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
}));

export default function Item(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.title}
        subheader={props.subheader}
      />
      <CardMedia
        className={classes.media}
        image={props.imageUrl}
        title={props.imageTitle}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

Item.defaultProps = {
  title: '',
  subheader: '',
  imageUrl: "https://res.cloudinary.com/opix/image/upload/v1553531583/samples/cloudinary-icon.png",
  imageTitle: '',
  description: ''
};
