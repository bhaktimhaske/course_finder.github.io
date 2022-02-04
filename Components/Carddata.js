import './data.css'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchcards } from './Reducer/Action';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
//import Select from 'react-select';


const Carddata = () => {
const [info,setInfo] = useState([]);
const [output,setOutput]  = useState([]);
const [coursename , setCoursename] = useState('');
const [childsubject , setChildsubject] = useState('');
const [sessiondate, setSessiondate] = useState('');
const [ischeck,setIscheck] = useState(false);
const [pageNumber,setPageNumber] = useState(0);


const dispatch = useDispatch();
const cards = useSelector((state) => state.reducer.data);
console.log(cards);
const loading = useSelector((state) => state.reducer.loading)


useEffect(() => {
    dispatch(fetchcards());
},[dispatch])




const cardsperpage = 6
const pagesvisited = pageNumber * cardsperpage


const handleDate = (e) => {
  const date = e.target.value;
  const moment = require("moment");
  setSessiondate(moment(date).format("Do MMM, YYYY"));
 
}

const handleCourse= (e) => {
  //console.log("coursename",e.target.value);
  /*if(coursename == " " )
  {
    alert("Coursename must be filled out");
  }
  else{
    setCoursename(e.target.value);
  }
 */
  setCoursename(e.target.value);
}

const handleChild= (e) => {
  // console.log("childsubject",e.target.value);
 /* if(childsubject == "" )
  {
    alert("Childsubject must be filled out");
  }
  else{
    setChildsubject(e.target.value)
  }
 */
  setChildsubject(e.target.value)
 
 }
const handleCheckbox = (e) => {
    const check = e.target.value;
    //console.log(check)
    const temp = !check;
   setIscheck(!temp)
   console.log("checkbox",ischeck)
  };
  
 
const handleReset = () => {
  setCoursename("");
  setChildsubject("");
  setSessiondate("");
  setIscheck(false);
  setOutput(alldata);
}
let alldata = cards.filter((item) => <p>{item}</p>)
//console.log("child",child)
 let filtereddata=cards.filter((item) => <p>{item}</p>);
const handleAll = () => {
   filtereddata = cards.filter((item) => {
    
      return item['Course Name'].toLowerCase().includes(coursename.toLowerCase())

    
    }).filter(item => {
        return item['Child Subject'].toLowerCase().includes(childsubject.toLowerCase())
      }).filter(item => {
        if(sessiondate === "")
        {
          return true;
        }
        else if(item['Next Session Date'] === sessiondate)
       {
         //const result = dateresult['Next Session Date'] === sessiondate
        return true;
       }
       return false;
      }).filter(item => {
        if(ischeck === false)
        {
          return true;
        }else if(item['Next Session Date'] === "Self paced" && ischeck === true)
        {
          return true;
        }
        return false;
      })
      setOutput(filtereddata)
    }
      //setInfo(filtereddata)
     // console.log("info",info)


const handlenotfound = () => {
  if(output == "" && loading == false)
  {
    return(
      <div className="notfound">
 <h2>No Course Found</h2>
      </div>
     
    )
  }
}
const pageCount = Math.ceil(cards.length / cardsperpage);

const changePage = ({selected}) => {
  setPageNumber(selected); 
};


const displayusers =  output.slice(pagesvisited,pagesvisited+cardsperpage).map((output) => {
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
  

  return <div className="main"> 

  
<nav className="main-nav">
            <div className="logo1">
                <h1>Course Finder</h1>
            </div>
            <div className="logo2">
                <h4>Courses Found:100</h4>   
            </div>
       
     <div className="head">
      <input onChange={(e) => handleCourse(e) }   id="course" type="text"  placeholder="Course Name" value={coursename}></input>
      
       <input onChange={(e) => handleChild(e) } id="child" type="text"   placeholder="Child Subject" value={childsubject} ></input> &nbsp;
      
        <input onChange={(e) => handleDate(e) }   type="date" id="date"  name="date" value={sessiondate} ></input> &nbsp;
        <input onChange={(e) => handleCheckbox(e) }  value="Self paced" type="checkbox" id="mycheckbox" value={ischeck}></input>
        <label><b>Self Paced</b></label> &nbsp;&nbsp;
        <button  onClick={() => handleAll() }   type="button">Search</button> &nbsp;
         <button  onClick={() => handleReset() }  type="button">Reset</button>
      </div>
      </nav>
     
      
         {displayusers}
        {handlenotfound()}

<div className="paginate">
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
      
 
       
  </div>
}

export default Carddata;



































