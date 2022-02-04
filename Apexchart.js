import Axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Apexchart = () => {
  const seriesArray = [
    {
      name: "Parent",
      data: []
    }
  ];

  const [series, setSeries] = useState(seriesArray);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      }
    },
    title: {
      text: "Bar chart"
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: []
    }
  });
  const parent = [];
  const uni = [];
 // const alldata = [];
  useEffect(() => {
     

    Axios.get("https://nut-case.s3.amazonaws.com/coursessc.json")
    .then(res => {
        console.log("api response",res)
        res.data.slice(0,50).map(item => {
            console.log("item",item)
           // alldata.push(item['Universities/Institutions']);
           // alldata.push(item['Parent Subject']);
            parent.push(item['Parent Subject']);
            uni.push(item['Universities/Institutions']);
           
        })


    const uniqueuni = [];
    const unicount = [];
    const len = uni.length;
    // console.log("len of uni array",len)
    let count = 0;

    for(let x=0;x<len;x++)
    {
        uniqueuni.push(uni[x]);
    }
const newunique = Array.from(new Set(uni));

console.log("newunique",newunique)
   //console.log("unique",uniqueuni)
   
   for(let i=0;i<newunique.length;i++)
   {
       //console.log("uni[i]",uni[i]);
       for(let j=0;j<len;j++)
       {
       // console.log("uni[j]",uni[j]);
           if(newunique[i] === uni[j])
           {
              count++;
           }
       }
       unicount.push(count);
       count = 0;
   }
   console.log("unicount array",unicount)



        setOptions({
            xaxis: {
              categories: newunique
            }
          })
          setSeries([
            {
              name: "University count",
              data: unicount
            }
          ])
        console.log("parent",parent)
        console.log("uni",uni)
        console.log("options",options)
        console.log("parent",parent)
        
    }).catch(e => {
        alert(e);
    })
  },[])

 



  return (
    <div id="chart">


 <div className="dropdown">
      <select>
      <option value="University">University</option>
      <option value="Parent Subject">Parent Subject</option>
      </select>
 </div>
         
     

      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Apexchart;