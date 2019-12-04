import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
//import Chart from './Chart';
import { Surveys, VoiceNotes } from './Deposits';
import Orders from './Orders';
import Axios from 'axios';
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Survey Layanan K5
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

function pagination (array, page_size, page_number) {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
};

const ascending = (a,b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0);
const descending = (a,b) => (a.created_at > b.created_at) ? -1 : ((b.created_at > a.created_at) ? 1 : 0);

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [totalSurveys, setTotalSurveys] = useState(0);
  const [totalVoiceNotes, setTotalVoiceNotes] = useState(0);
  const [totalTeams, setTotalTeams] = useState(0);
  const [allSurveys, setAllSurveys] = useState([]);
  const [allVoiceNotes, setAllVoiceNotes] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [surveysPage, setSurveysPage] = useState(1);
  const [voices, setVoices] = useState([]);
  const [voicesPage, setVoicesPage] = useState(1);
  const [teams, setTeams] = useState([]);
  const [teamsPage, setTeamsPage] = useState(1);
  const [headerText, setHeaderText] = useState('Dashboard');

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    Axios.get('//3.90.7.176:8080/survey')
    .then(r => {
      setAllSurveys(r.data.results.sort(descending));
      setTotalSurveys(r.data.results.length);
    })
    .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    Axios.get('//3.90.7.176:8080/voice')
    .then(r => {
      setAllVoiceNotes(r.data.results.sort(descending));
      setTotalVoiceNotes(r.data.results.length);
    })
    .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    Axios.get('//3.90.7.176:8080/team')
    .then(r => {
      setAllTeams(r.data.results.sort(descending));
      setTotalTeams(r.data.results.length);
    })
    .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    setSurveys(pagination(allSurveys, 10, surveysPage));
  }, [allSurveys, surveysPage]);

  useEffect(() => {
    setVoices(pagination(allVoiceNotes, 10, voicesPage));
  }, [allVoiceNotes, voicesPage]);

  useEffect(() => {
    setTeams(pagination(allTeams, 10, teamsPage));
  }, [allTeams, teamsPage]);
  console.log(surveysPage);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <Router>
              <Switch>
                <Route path="/survey" render={() => 'Surveys'}/>
                <Route path="/voice" render={() => 'Voice Notes'}/>
                <Route path="/team" render={() => 'Teams'}/>
                <Route path="/" render={() => 'Dashboard'}/>
              </Switch>
            </Router>
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Router>
          <Switch>
            <Route path="/survey">
              <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Orders total={totalSurveys} rows={surveys} mode='survey' page={surveysPage} setPage={(value) => setSurveysPage(value)}/>
                  </Paper>
                </Grid>
              </Container>
            </Route>
            <Route path="/voice">
              <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Orders total={totalVoiceNotes} rows={voices} mode='voice' page={voicesPage} setPage={(value) => setVoicesPage(value)}/>
                  </Paper>
                </Grid>
              </Container>
            </Route>
            {/* <Route path="/team">
              <Container maxWidth="lg" className={classes.container}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Orders rows={teams} mode='team'/>
                  </Paper>
                </Grid>
              </Container>
            </Route> */}
            <Route exact path="/">
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  {/* Chart 
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                      <Chart />
                    </Paper>
                  </Grid> */}
                  {/* Recent Deposits */}
                  <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                      <Surveys totalSurveys={totalSurveys}/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                      <VoiceNotes totalVoiceNotes={totalVoiceNotes}/>
                    </Paper>
                  </Grid>
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Orders rows={pagination(allSurveys, 5, surveysPage)} title='Recent Surveys'/>
                    </Paper>
                  </Grid>
                </Grid>
                <Box pt={4}>
                  <Copyright />
                </Box>
              </Container>
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}
