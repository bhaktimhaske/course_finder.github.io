import React from 'react';
import { useEffect , useState} from 'react';
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate';
import { filtercourse } from './userActions';
import { fetchUsers } from './userActions'
import { useDispatch, useSelector } from 'react-redux';
function Usercontainer({userData,fetchUsers}) {

    const [info , setInfo] = useState([]);
const[output,setOutput]  = useState([]);
const [coursename , setCoursename] = useState('');
const [childsubject , setChildsubject] = useState('');
const [sessiondate, setSessiondate] = useState('');
const [ischeck,setIscheck] = useState(false);
const [courseresult,setCourseresult] = useState([]);
const [childresult ,setChildresult] = useState([]);
const [dateresult,setDateresult] = useState([]);
const [checkboxresult,setCheckboxresult] = useState([]);

    useEffect(() => {
        fetchUsers()
    },[])

    
    const handleCourse= (e) => {
        //console.log("coursename",e.target.value);
       setCoursename(e.target.value);
       
     }
     
     const handleChild= (e) => {
      // console.log("childsubject",e.target.value);
     setChildsubject(e.target.value)
     }
     
     
     const handleCheckbox = (e) => {
       const check = e.target.value;
       //console.log(check)
       const temp = !check;
      setIscheck(!temp)
     // console.log(ischeck)
     };
     
     
     const handleDate = (e) => {
       const date = e.target.value;
       const moment = require("moment");
       setSessiondate(moment(date).format("Do MMM, YYYY"));
       //const date = new Date();
       /*
      const x = new Date(date).toLocaleDateString("en-IN", {
         "year": "numeric",
         "month": "short",
         "day": "numeric"
         })
       setSessiondate(x)
      */
      
      
     }
     
     
      const handleReset = () => {
        window.location.reload();
      } 
     
     
     
     const handleAll =() => {
     
      const filtereddata =  info.filter(courseresult => {
         return courseresult['Course Name'].toLowerCase().includes(coursename.toLowerCase())
       }).filter(childresult => {
         return childresult['Child Subject'].toLowerCase().includes(childsubject.toLowerCase())
       }).filter(dateresult => {
         if(sessiondate === "")
         {
           return true;
         }
         else if(dateresult['Next Session Date'] === sessiondate)
        {
          //const result = dateresult['Next Session Date'] === sessiondate
         return true;
        }
        return false;
       }).filter(checkboxresult => {
         if(ischeck === false)
         {
           return true;
         }else if(checkboxresult['Next Session Date'] === "Self paced" && ischeck === true)
         {
           return true;
         }
         return false;
       })
       
       
       
       setOutput(filtereddata)
     }
     
   
  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData .error ? (
    <h2>{userData.error}</h2>
  ) : (
    
    
      <div>

<div className="head">
    
    <input onChange={(e) => handleCourse(e) }  id="course" type="text"  placeholder="Course Name" value={coursename}></input> 
    <input onChange={(e) => handleChild(e) }  id="child" type="text"   placeholder="Child Subject" value={childsubject} ></input> &nbsp;
     <input onChange={(e) => handleDate(e) }   type="date" id="date"  name="date" value={sessiondate} ></input> &nbsp;
     <input onChange={(e) => handleCheckbox(e) }  value="Self paced" type="checkbox" id="mycheckbox" value={ischeck}></input>
     <label><b>Self Paced</b></label> &nbsp;&nbsp;
    

     <button  onClick={() => handleAll() }   type="button">Search</button> &nbsp;
      <button onClick={handleReset} type="button">Reset</button>
     
</div> 

        {
          userData && userData.users && userData.users.map(user => 
            <div className="d">
      
          <h3>{user['Course Id']} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{user['Next Session Date']}</h3> 
   
          <h5>Provider</h5>
          <h4>{user['Provider']}</h4>
         <h5>Course Name</h5>
        <i><h4>{user['Course Name']}</h4></i>
        <h5>Universities/Institutions</h5>
       <h4>{user['Universities/Institutions']}</h4>
        <h5>Parent Subject</h5>
        <h4>{user['Parent Subject']}</h4>
        <h5>Child Subject</h5>
        <h4>{user['Child Subject']}</h4>
   
         </div>
   
            )
        }



      </div>




   
  )
 

  
}



const mapStateToProps = state => {
  return{
     userData:state.user,
      
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchUsers: () => dispatch(fetchUsers()),
      //filtercourse:() => dispatch(filtercourse())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Usercontainer);
