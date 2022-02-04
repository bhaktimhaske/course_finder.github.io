//import Carddata from './Carddata.json'
import React, { useState,useEffect} from "react";
import Axios from "axios"
import './data.css'
import ReactPaginate from 'react-paginate';

export function Data() {
  const [input,setInput] = useState("");
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

const [pageNumber,setPageNumber] = useState(0);

/*
useEffect(() => {
    Axios.get("https://nut-case.s3.amazonaws.com/coursessc.json")
    .then((response) => {   
   //  console.log(response.data)
    const detail = response.data;
    const newdetail = detail.slice(0,100) //limit the response to 100
      setInfo(newdetail)
      setOutput(newdetail)
      
    })
   }, []) 
*/




const cardsperpage = 6
const pagesvisited = pageNumber * cardsperpage


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


const pageCount = Math.ceil(info.length / cardsperpage);

const changePage = ({selected}) => {
  setPageNumber(selected); 
};


const displayusers = output.users && output.users.slice(pagesvisited,pagesvisited+cardsperpage).map((output) => {
  return (
       
    <div className="d">
      
    <h3>{output['Course Id']} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{output['Next Session Date']}</h3> 
   
    <h5>Provider</h5>
    <h4>{output['Provider']}</h4>
    <h5>Course Name</h5>
    <i><h4>{output['Course Name']}</h4></i>
    <h5>Universities/Institutions</h5>
    <h4>{output['Universities/Institutions']}</h4>
    <h5>Parent Subject</h5>
    <h4>{output['Parent Subject']}</h4>
    <h5>Child Subject</h5>
    <h4>{output['Child Subject']}</h4>
   
    </div>
   

  )
})

  return (
    <div className="data"> 
    <div className="head">
    
       <input onChange={(e) => handleCourse(e) }  id="course" type="text"  placeholder="Course Name" value={coursename}></input> 
       <input onChange={(e) => handleChild(e) }  id="child" type="text"   placeholder="Child Subject" value={childsubject} ></input> &nbsp;
        <input onChange={(e) => handleDate(e) }   type="date" id="date"  name="date" value={sessiondate} ></input> &nbsp;
        <input onChange={(e) => handleCheckbox(e) }  value="Self paced" type="checkbox" id="mycheckbox" value={ischeck}></input>
        <label><b>Self Paced</b></label> &nbsp;&nbsp;
       

        <button  onClick={() => handleAll() }   type="button">Search</button> &nbsp;
         <button onClick={handleReset} type="button">Reset</button>
        
</div>
  
    
      <ReactPaginate
       previousLabel={"Previous"}
       nextLabel={"Next"}
       pageCount={pageCount}
       onPageChange={changePage}
       containerClassName={"paginationBttns"}
       previousLinkClassName={"previousBttn"}
       nextLinkClassName={"nextBttn"}
       disabledClassName={"paginationDisabled"}
       activeClassName={"paginationActive"}
      />
    </div>
  );
}
      

export default Data;