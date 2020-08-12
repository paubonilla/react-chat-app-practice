import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CTX } from './Store'
import styled from 'styled-components';

export const DashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

export const Inner = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`


const useStyles = makeStyles(theme => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px'
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey'
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px'
  },
  chatBox: {
    width: '85%'
  },
  button: {
    width: '15%'
  },
}))

export default function Dashboard() {
  const classes = useStyles();

  // CTX store
  const { allChats, sendChatAction, user } = useContext(CTX);
  console.log({ allChats })
  const topics = Object.keys(allChats);

  // local state 
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [textValue, setTextValue] = useState('');
  return (
    <DashContainer>
      <Inner>
        <Paper className={classes.root}>
          <Typography variant="h4" component="h4">
            Usapp
      </Typography>
          <Typography variant="h5" component="h5">
            {activeTopic}
          </Typography>
          <div className={classes.flex}>
            <div className={classes.topicsWindow} >
              <List>
                {
                  topics.map(topic => (
                    <ListItem
                      onClick={e => setActiveTopic(e.target.innerText)}
                      key={topic} button
                    >
                      <ListItemText primary={topic} />
                    </ListItem>
                  ))
                }
              </List>
            </div>
            <div className={classes.chatWindow} >
              {
                allChats[activeTopic].map((chat, i) => (
                  <div className={classes.flex} key={i}>
                    <Chip label={chat.from} className={classes.chip} />
                    <Typography variant="body1" gutterBottom >{chat.msg}</Typography>
                  </div>
                ))
              }
            </div>
          </div>
          <div className={classes.flex}>
            <TextField
              label="Send a message"
              className={classes.chatBox}
              value={textValue}
              onChange={e => setTextValue(e.target.value)}
              margin="normal"
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                sendChatAction({ from: user, msg: textValue, topic: activeTopic });
                setTextValue('');
              }}
            >
              Send
        </Button>
          </div>
        </Paper>
      </Inner>
    </DashContainer>
  )
}
