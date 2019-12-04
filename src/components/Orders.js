import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Title from './Title';
import Axios from 'axios';
import Button from '@material-ui/core/Button';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    flexShrink: 0,
  },
}));

export default function Orders(props) {
  const classes = useStyles();
  const {mode} = props;
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{mode == 'team' ? 'No' : 'Date'}</TableCell>
            <TableCell>{mode == 'voice' ? 'File' : mode == 'team' ? 'Category' : 'Name'}</TableCell>
            <TableCell>{mode == 'voice' ? 'Download' : mode == 'team' ? 'Name' : 'Rating'}</TableCell>
            {mode == 'team' && <TableCell>Action</TableCell>}
            {/* <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows && props.rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{mode == '' ? index + 1 : row.created_at.split('T')[0]}</TableCell>
              <TableCell>{mode == 'voice' ? 
                <Link color="primary" href={'http://3.90.7.176:8080/' + row.uri}>
                  {row.uri.split('/')[1]}
                </Link> : row.category}</TableCell>
              <TableCell>{mode == 'voice' ? 
                <Button variant="contained" color="secondary" href={'http://3.90.7.176:8080/' + row.uri}>
                  Download
                </Button> : row.rating}
              </TableCell>
              {mode == 'team' && <TableCell>
                <Button variant="contained" color="secondary">
                  Add
                </Button> : row.rating}
                <Button variant="contained" color="secondary">
                  Edit
                </Button> : row.rating}
                <Button variant="contained" color="secondary">
                  Delete
                </Button> : row.rating}
              </TableCell>}
              {/* <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <div className={classes.root}>
          {'Page ' + props.page + ' of ' + Math.max(0, Math.ceil(props.total / 10))}
          <IconButton onClick={() => props.setPage(1)} disabled={props.page === 1} aria-label="first page">
            <FirstPageIcon />
          </IconButton>
          <IconButton onClick={() => props.setPage(props.page - 1)} disabled={props.page === 1} aria-label="previous page">
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton onClick={() => props.setPage(props.page + 1)} disabled={props.page >= Math.ceil(props.total / 10)} aria-label="next page">
            <KeyboardArrowRight />
          </IconButton>
          <IconButton onClick={() => props.setPage(Math.max(0, Math.ceil(props.total / 10)))} disabled={props.page >= Math.ceil(props.total / 10)} aria-label="last page">
            <LastPageIcon />
          </IconButton>
        </div>
        {/*<Link color="primary" to='survey'>
          See more surveys
        </Link>*/}
      </div>
    </React.Fragment>
  );
}
