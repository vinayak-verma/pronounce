import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import '../Styles/Register.css';
import MenuItem from '@material-ui/core/MenuItem';
import SignInButton from '../Media/btn_google_signin_dark_pressed_web@2x.png';
import Button from '@material-ui/core/Button';
import { provider, firestore, storage, } from '../firebase';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import doneImage from '../Media/baseline-check_circle_outline-24px.svg';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 10,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#c4c4c4',
    width: 'auto',
    maxWidth: 450,
  },
});

const Schools = [
  {
    label: 'Carmel College',
    value: "Carmel College",
  },
  {
    label: 'Glenfield College',
    value: 'Glenfield College',
  },
  {
    label: 'Northcote College',
    value: 'Northcote College',
  },
  {
    label: 'Rosmini College',
    value: 'Rosmini College',
  },
  {
    label: 'Takapuna Grammar School',
    value: 'Takapuna Grammar School',
  },
  {
    label: 'Westlake Boys High School',
    value: 'Westlake Boys High School',
  },
  {
    label: 'Westlake Girls High School',
    value: 'Westlake Girls High School',
  },
];
const YearLevels = [
  {
    label: '9',
    value: '9',
  },
  {
    label: '10',
    value: '10',
  },
  {
    label: '11',
    value: '11',
  },
  {
    label: '12',
    value: '12',
  },
  {
    label: '13',
    value: '13',
  },
];

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      Language: '',
      School: '',
      YearLevel: '',
      FormClass: '',
      videoFile: [],
      recordButtonStatus: 'Record',
      username: '',
      email: '',
      userImage: [],
      uid: '',
      fileToUpload: [],
      dataContainer: '',
      isRegistered: false,
      Loading: false,
      LoadingProgress: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.formatVideoFile = this.formatVideoFile.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.videoFile = React.createRef();
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value.toUpperCase() });
  };
  handleSelect = name => event => {
    this.setState({ [name]: event.target.value });
  }
  componentDidMount() {
    
  }
  formatVideoFile = e => {
    e.preventDefault();
    this.formattedAudioElement = [];
    this.videoSRC = '';
    this.videoSRC = window.URL.createObjectURL(this.videoFile.current.files[0]);
    this.formattedAudioElement.push(
      <div key={this.videoSRC}>
        <h3 style={{fontSize:15}}>Recorded sounds:</h3>
        <audio 
          src={this.videoSRC} key='1'
          controls>
        </audio>
        <hr style={{marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2}} />
    </div>
    );
    this.setState({
      videoFile: this.formattedAudioElement,
      recordButtonStatus: 'Retry',
      fileToUpload: this.videoFile.current.files[0],
    });
    
  }
  registerUser = () => {
    this.setState({Loading: true,});
    firebase.auth().signInWithPopup(provider).then((result) => {
      // The signed-in user info.
      var user = result.user;
      this.setState({
        username: user.displayName,
        email: user.email,
        userImage: user.photoURL,
        uid: user.uid,
      });
    }).then(() => {this.uploadData()});
  }

  uploadData = () => {
    this.docRef = firestore.doc(`Schools/${this.state.School}/studentData/Year ${this.state.YearLevel}/${this.state.FormClass}/${this.state.username}`);
    var task = storage.ref(`Schools/UserNameRecordingsVideoFormat/${this.state.School}/Year ${this.state.YearLevel}/${this.state.FormClass}/${this.state.username}'s name recording`)
    .put(this.state.fileToUpload);
    task.on('state_changed',
      snapshot => {
          //Progress func...
          this.percentage = (snapshot.bytesTransferred / 
          snapshot.totalBytes) * 100;
          this.setState({LoadingProgress: this.percentage});
            console.log(this.percentage);
        },
      err => {
          this.setState({dataContainer: err.code.toString()});
          },
      () => {
        storage.ref(`Schools/UserNameRecordingsVideoFormat/${this.state.School}/Year ${this.state.YearLevel}/${this.state.FormClass}/${this.state.username}'s name recording`)
        .getDownloadURL().then(url => {
          console.log(url);
          this.docRef.set({
            name: this.state.username,
            email: this.state.email,
            userImage: this.state.userImage,
            Language: this.state.Language,
            School: this.state.School,
            YearLevel: this.state.YearLevel,
            FormClass: this.state.FormClass,
            userId: this.state.uid,
            namePronounciation: url,
          });
        }).then(() => {
          this.docRef = firestore.doc(`Schools/${this.state.School}/studentData/Year ${this.state.YearLevel}`);
          this.docRef.set({
            name: `year ${this.state.YearLevel}`,
          });
          this.docRef = firestore.doc(`Schools/${this.state.School}/studentData/Year ${this.state.YearLevel}/Form Classes/${this.state.FormClass}`);
          this.docRef.set({
            name: this.state.FormClass,
          });
          console.log(`Data uploaded!`);
          this.setState({
            isRegistered: true,
            Loading: false,
          });
        });
      },
    );
  }

  render() {
    const { classes } = this.props;
    const isRegistered = this.state.isRegistered;
    const Loading = this.state.Loading;
    if (!isRegistered && !Loading) {
      return(
        <div>
          <Paper className={classes.root} elevation={1}>
            <h1 className='logo'>Pronounce</h1>
            <Typography variant="h5" component="h3">
              Register for Pronounce
            </Typography>
            <TextField
              id="standard-name"
              label="Language"
              className={classes.textField}
              placeholder='eg- French'
              value={this.state.Language}
              onChange={this.handleChange('Language')}
              margin="normal"
              />
              <br/>
              <TextField
                id="standard-select-currency"
                select
                label="School"
                className={classes.textField}
                value={this.state.School}
                onChange={this.handleSelect('School')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your School"
                margin="normal"
              >
                {Schools.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br/>
              <TextField
                id="standard-select-currency"
                select
                label="Year Level"
                className={classes.textField}
                value={this.state.YearLevel}
                onChange={this.handleSelect('YearLevel')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your School"
                margin="normal"
              >
                {YearLevels.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br/>
              <TextField
              id="standard-name"
              label="Form Class"
              className={classes.textField}
              placeholder='eg- 10MN'
              value={this.state.FormClass}
              onChange={this.handleChange('FormClass')}
              margin="normal"
          />
          <br/>
          <br/>
          <Typography component="p">
            <span style={{color: '#00bc00'}}>Record a video of your name</span>
          </Typography>
          <input
            accept="video/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            ref={this.videoFile}
            onChange={this.formatVideoFile}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
              {this.state.recordButtonStatus}
            </Button>
          </label>        
          {this.state.videoFile}
          <br/>
          <br/>
          <img alt='singInButton' 
            style={{ width: 230, marginLeft: 'auto', 
            marginRight: 'auto', display: 'block',}} 
            src={SignInButton} onClick={this.registerUser}/>
        </Paper>
      </div>
      );
    }
    else if (!isRegistered && Loading) {
      return(
        <div>
         <Paper style={{marginTop: 150, marginLeft: 40, marginRight: 40}} className={classes.root} elevation={1}>
          <h1 style={{textAlign: 'center'}} className='logo'>Pronounce</h1>
          <Typography component="p" style={{textAlign: 'center',}}>
              <span style={{fontSize: 20, color: 'rgb(202, 195, 0)'}}>
                Registering...
               </span>
            </Typography>            <CircularProgress
              style={{marginLeft: '39%', width: 50}}
              className={classes.progress}
              variant="static"
              value={this.state.LoadingProgress}
            />
        </Paper>
        </div>
      );
    }
    else if (isRegistered && !Loading) {
      return(
        <div>
           <Paper style={{marginTop: 150, marginLeft: 40, marginRight: 40}} className={classes.root} elevation={1}>
            <h1 style={{textAlign: 'center'}} className='logo'>Pronounce</h1>
            <img alt='confirmation tick' style={{display: 'block', width: 50, marginRight: 'auto', marginLeft: 'auto',}} src={doneImage} />
            <br/>
            <Typography component="p" style={{textAlign: 'center',}}>
              <span style={{fontSize: 20, color: '#00bc00'}}>
                You have been registered.
               </span>
            </Typography>
          </Paper>
        </div>
      );
    }
  }
}

export default withStyles(styles)(Register);

/*


        
*/