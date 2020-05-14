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
    // order: 3,
    margin: '1%',
    // flexGrow: 3
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function Item(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.title || 'Title'}
        subheader={props.subheader || 'Sub-header'}
      />
      <CardMedia
        className={classes.media}
        image={props.imageUrl || "https://res.cloudinary.com/opix/image/upload/v1553531583/samples/cloudinary-icon.png"}
        title={props.imageTitle || 'Image Title'}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description || 'Item description'}
        </Typography>
      </CardContent>
    </Card>
  );
}
