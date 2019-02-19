import React, { Component } from 'react';
import CircularProgressBar from './CircularProgress'
import { firestore } from '../../firebase';
import '../../Styles/Database.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FolderIcon from '@material-ui/icons/Folder';
import Button from '@material-ui/core/Button';
import UserCard from './UserCard';
import SchoolListCard from './SchoolListCard';

class App extends Component {
    constructor() {
        super();
        this.state = {
            dataContainer: [],
        }

        this.dataLayer = {
            SchoolsList: [],
            YearLevelsList: [],
            FormClassList: [],
        }
    }
    
    componentDidMount() {
        this.loadingIcon = [];
        this.dataLayer.SchoolsList = [];
        this.loadingIcon.push(
          <div>
            <div style={{height: 200}}></div>
            <CircularProgressBar />
          </div>
        );
        this.setState({dataContainer: this.loadingIcon,});
          
        firestore.collection('Schools').onSnapshot(snapshot => {
          snapshot.forEach((doc) => {
            firestore.doc(`Schools/${doc.id}`).onSnapshot(doc => {
              if(doc && doc.exists) {
                this.dataLayer.SchoolsList.push(
                  <SchoolListCard name={doc.data().name} image={doc.data().imageURL} moto={doc.data} LoadLayer2={() => 
                    {this.renderDataLayer2(doc.data().name)}} />
                );
                this.formatSchoolList();
              }
            });
          });
        });
        this.formatSchoolList = () => {
          this.formattedSchoolsList = [];
          this.formattedSchoolsList.push(
            <div className='drawerOpenResponse'>
              <p className='dataHeading'>Schools</p>
              <div className="database">
                {this.dataLayer.SchoolsList}
              </div>
             </div>
           );
            this.setState({dataContainer: this.formattedSchoolsList,});
          }  
      }

      renderDataLayer2 = (currentSchoolname) => {
        this.setState({dataContainer: this.loadingIcon,});
        this.YearLevelsList = [];
        this.dataLayer.YearLevelsList = [];
        firestore.collection(`Schools/${currentSchoolname}/studentData`).onSnapshot(snapshot => {
          snapshot.forEach((doc) => {
            this.YearLevelsList.push(
              <div className='folders'>
                <ListItem button onClick={() => {this.DisplayFormClasses(doc.id, currentSchoolname)}}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={doc.id} />
                </ListItem>
                <Divider />
              </div>
            );
          });
          this.formatYearLevelsList();
        });
    
        this.formatYearLevelsList = () => {
          this.dataLayer.YearLevelsList.push(
            <div>
              <div className='drawerOpenResponse'>
                <div className='dataHeading'>
                <Button onClick={() => {
                  this.setState({dataContainer: this.formattedSchoolsList,});
                }}
                 variant="contained"  style={{margin: 'theme.spacing.unit', marginBottom: 5,borderRadius: 5}}>
                  Schools
                 </Button>
                &nbsp; > &nbsp;
                <Button variant="contained" disabled  style={{margin: 'theme.spacing.unit', marginBottom: 5,borderRadius: 5}}>
                  <p style={{color: '#5c5c5c', margin: 0}}>{currentSchoolname}</p>
                </Button>
                <br/>
                <hr />
                </div>
                <p className='dataHeading'>Year Levels</p>
                {this.YearLevelsList}
              </div>
            </div>
          );
          this.setState({
            dataContainer: this.dataLayer.YearLevelsList,
          });
        }
      }

      DisplayFormClasses = (id, currentSchoolname) => {
        this.setState({dataContainer: this.loadingIcon,});
        this.FormClassList = [];
        this.dataLayer.FormClassList = [];
        this.dataLayer.FormClassList = [];
        firestore.collection(`Schools/${currentSchoolname}/studentData/${id}/Form Classes`).onSnapshot(snapshot => {
          snapshot.forEach((doc) => {
            this.FormClassList.push(
              <div className='folders'>
                <ListItem button onClick={() => {this.DisplayStudents(doc.id, id, currentSchoolname)}}>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={doc.id} />
                </ListItem>
                <Divider />
              </div>
            );
          });
          this.formatFormClassList();
        });
    
        this.formatFormClassList = () => {
          this.dataLayer.FormClassList.push(
            <div>
              <div className='drawerOpenResponse'>
              <div className='dataHeading'>
                <Button onClick={() => {
                  this.setState({dataContainer: this.formattedSchoolsList,});
                }}
                 variant="contained"  style={{margin: 'theme.spacing.unit', marginBottom: 5,borderRadius: 5}}>
                  Schools
                 </Button>
                &nbsp; > &nbsp;
                <Button onClick={() => {
                  this.setState({
                    dataContainer: this.dataLayer.YearLevelsList,
                  });
                }}
                 variant="contained"  style={{margin: 'theme.spacing.unit', marginBottom: 5,borderRadius: 5}}>
                  {currentSchoolname}
                 </Button>
                &nbsp; > &nbsp;
                <Button variant="contained" disabled  style={{margin: 'theme.spacing.unit', marginBottom: 5,borderRadius: 5}}>
                  <p style={{color: '#5c5c5c', margin: 0}}>{id}</p>
                </Button>
                <hr />
                </div>
                <p className='dataHeading'>Form Classes</p>
                {this.FormClassList}
              </div>
            </div>
          );
          this.setState({
            dataContainer: this.dataLayer.FormClassList,
          });
        }
      }

      DisplayStudents = (formClass, yearLevel, currentSchoolname) => {
        this.setState({dataContainer: this.loadingIcon,});
        this.dataLayer.StudentsList = [];
        this.formattedList = [];
        firestore.collection(`Schools/${currentSchoolname}/studentData/${yearLevel}/${formClass}`).onSnapshot(snapshot => {
          snapshot.forEach((doc) => {
            firestore.doc(`Schools/${currentSchoolname}/studentData/${yearLevel}/${formClass}/${doc.id}`).onSnapshot(doc => {
              if(doc && doc.exists) {
                this.dataLayer.StudentsList.push(
                  <UserCard Name={doc.data().name} Language={doc.data().MotherTongue} UserImage={doc.data().userImage} NamePronounciation={doc.data().namePronounciation} />
                );
                this.formatStudentList();
              }
            });
          });
        });
        this.formatStudentList = () => {
          this.formattedList = [];
          this.formattedList.push(
            <div className='drawerOpenResponse'>
              <div className='dataHeading'>
                <Button onClick={() => {
                  this.setState({dataContainer: this.formattedSchoolsList,});
                }}
                 variant="contained"  style={{margin: 'theme.spacing.unit', marginBottom: 5,borderRadius: 5}}>
                  Schools
                 </Button>
                &nbsp; > &nbsp;
                <Button onClick={() => {
                  this.setState({
                    dataContainer: this.dataLayer.YearLevelsList,
                  });
                }}
                 variant="contained"  style={{margin: 'theme.spacing.unit', marginBottom: 5,borderRadius: 5}}>
                  {currentSchoolname}
                 </Button>
                 &nbsp; > &nbsp;
                 <Button onClick={() => {
                  this.setState({
                    dataContainer: this.dataLayer.FormClassList,
                  });
                }}
                 variant="contained"  style={{margin: 'theme.spacing.unit', marginBottom: 5,borderRadius: 5}}>
                  {yearLevel}
                 </Button>
                &nbsp; > &nbsp;
                <Button variant="contained" disabled  style={{margin: 'theme.spacing.unit', marginBottom: 5,borderRadius: 5}}>
                  <p style={{color: '#5c5c5c', margin: 0}}>{formClass}</p>
                </Button>
                <hr />
                </div>
              <p className='dataHeading'>Students</p>
              <div className="database">
                {this.dataLayer.StudentsList}
              </div>
             </div>
           );
            this.setState({dataContainer: this.formattedList,});
        }  
      }

  render() {
    return (
        <div>
            {this.state.dataContainer}
        </div>
    );
  }
}

export default App;
