import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export const Surveys = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Surveys</Title>
      <Typography component="p" variant="h4">
        {props.totalSurveys}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      </Typography>
      <div>
        <Link color="primary" href="/survey" onClick={preventDefault}>
          View All
        </Link>
      </div>
    </React.Fragment>
  );
}

export const VoiceNotes = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Voice Notes</Title>
      <Typography component="p" variant="h4">
        {props.totalVoiceNotes}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
      </Typography>
      <div>
        <Link color="primary" href="/voice" onClick={preventDefault}>
          View All
        </Link>
      </div>
    </React.Fragment>
  );
}
