import '../sty.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const IvInput=()=>{
   const [report,setreport]=useState({
      "mode_of_transport":"" ,
      "year_of_students_visited":0, 
      "sem_of_students_visited":0 ,
      "total_class_strength":0, 
      "no_of_students_visited":0 , 
      "students_visited_list":"",
      "place_of_visit":"", 
      "date_of_leaving":"",
      "leaving_time":"",
      "reaching_place":"",
      "day_1_reaching_time":"", 
      "day_1_FN_time":"" ,
      "day_1_FN_place":"",
      "day_1_AN_time":"" , 
      "day_1_AN_place":"" , 
      "day_1_night_time":"", 
      "day_1_night_place":"", 
      "day_2_FN_time":"" , 
      "day_2_FN_place":"" , 
      "day_2_AN_time":"",
      "day_2_AN_place":"", 
      "day_2_night_time":"" ,
      "day_2_night_place":"" ,
      "day_3_FN_time":"" ,
      "day_3_FN_place":"", 
      "day_3_AN_time":"" ,
      "day_3_AN_place":"" ,
      "day_3_night_time":"" , 
      "day_3_night_place":"" ,
      "date_of_arriving":"",
      "time_of_arriving":"" ,
      "completion_date":""

})


const [selectedFile1, setSelectedFile1] = useState(null);
const [selectedFile2, setSelectedFile2] = useState(null);
const [selectedFile3, setSelectedFile3] = useState(null);
const [selectedFile4, setSelectedFile4] = useState(null);
const [selectedFile5, setSelectedFile5] = useState(null);
const [newFileName, setNewFileName] = useState('');

   const navigate=useNavigate()
   const handlechange=(e)=>{
      setreport((old)=>{
         const date= new Date();
         const currentDate=format(date,'dd-MM-yyyy');
         return{
            ...old,
            completion_date:currentDate
         }
      })
      setreport((prev)=>({...prev,[e.target.name]:e.target.value}))
    
   }
   console.log(report)
const handleClick = async (e)=>{
   e.preventDefault()
   try{
      // alert(JSON.stringify(report))
      await axios.put("http://localhost:1234/iv/update/RPT5059",report)
      // alert(JSON.stringify(t.data.records))

      navigate("/")
   }catch (err) {
      console.log(err.response); // Log the response for more details
      console.error(err);
  }
}

const handleFileChange1 =(e)=>{
    if(File&& File.size >2*1024*1024){
      alert("Please choose an image with a size below 2MB.");
      e.target.value=null;
      return;
    }
    else{
      if(newFileName.length<=1){
         const report=JSON.parse(sessionStorage.getItem("report_id"))
         setNewFileName(report.event_title);
      }

      const currentDate=new Date();

      const dd = String(currentDate.getDate()).padStart(2,'0');
    }
}




return(
   <>
   <body>
    <div class="main">
   <div className='report-container' style={{justifyContent:'center',marginTop:"150px"}} >
   <div class="report-header">
    <h1 class="recent-Articles" style={{backgroundColor:"transparent"}}> IV REPORT</h1>
    </div> 
    <div className="addform"style={{justifyContent:'center'}}>
     
    <div className='form-group'>
        <label>Places of Visit</label>
        <input type='text' placeholder='Places of Visit' name='places_of_visit' onChange={handlechange}/>
       </div>
     


       <div className='form-group'>
                <label>Mode of Transport</label>
                <select>
                <option value="">Select the Mode of Transport</option>
                   <option value=""> Bus</option>
                   <option value=""> Train</option>
                </select>
             </div>
             {/* --------------------students details----------------- */}
        
        
             <div class="report-header">
    <h1 class="recent-Articles">Students Details</h1>
    </div>

       

       <div className='form-group'>
        <label>Total Class Strength</label>
        <input type='number' placeholder='Total Class Strength' name='total_class_strength' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>No of Students Visited</label>
        <input type='number' placeholder='No of Students Visited' name='no_of_students_visited' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>Students Visited List</label>
        <input type='text' placeholder='Students Visited List' name='students_visited_list' onChange={handlechange}/>
       </div>


              {/* ------------------whereabouts----------------- */}

             
 {/* ------------------------------------------------ */}
 <div class="report-header">
    <h1 class="recent-Articles"> Date and Time</h1>
    </div>


       <div class="report-header">
    <h1 class="recent-Articles" style={{color:"green"}}> Leaving</h1>
    </div>

 
       <div className='form-group'>
        <label>Date of Leaving from College</label>
        <input type='date' placeholder='Date of Leaving' name='Date_of_leaving' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>Time of Leaving from College</label>
        <input type='time' placeholder='Leaving Time' name='Leaving_time' onChange={handlechange}/>
       </div>

       <div class="report-header">
    <h1 class="recent-Articles" style={{color:"green"}}>Reaching</h1>
    </div>

       <div className='form-group'>
        <label>Reaching Time</label>
        <input type='time' placeholder='Day 1 Reaching Time' name='Day_1_Reaching_Time' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>Reaching Place</label>
        <input type='text' placeholder='Reaching Place' name='Day_1_Reaching_Place' onChange={handlechange}/>
       </div>

       

       <div class="report-header">
    <h1 class="recent-Articles" style={{color:"green"}}>Day 1 whereabouts</h1>
    </div>

    <div>
        <label style={{fontSize:"20px",color:"green"}}>FN</label>
        </div>
      
       <div className='form-group'>
        <label>Time</label>
        <input type='time' placeholder='Day 1 FN Time' name='Day_1_FN_time' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>whereabouts</label>
        <input type='text' placeholder='Day 1 FN Place' name='Day_1_FN_place' onChange={handlechange}/>
       </div>
 
       <div>
        <label style={{fontSize:"20px",color:"green"}}>AN</label>
        </div>

       <div className='form-group'>
        <label>Time</label>
        <input type='Time' placeholder='Day 1 AN Time' name='Day_1_AN_time' onChange={handlechange}/>
        <label >whereabouts</label>
        <input type='text' placeholder='Day 1 AN Place' name='Day_1_AN_place' onChange={handlechange} />
       </div>    
   
       <div>
        <label style={{fontSize:"20px",color:"green"}}>Night</label>
        </div>

       <div className='form-group'>
        <label>Time</label>
        <input type='Time' placeholder='Day 1 Night Time' name='Day_1_night_time' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>whereabouts</label>
        <input type='text' placeholder='Day 1 Night Place' name=' Day_1_night_place' onChange={handlechange}/>
       </div>

       <div class="report-header">
    <h1 class="recent-Articles" style={{color:"green"}}>Day 2 whereabouts</h1>
    </div>

    <div>
        <label style={{fontSize:"20px",color:"green"}}>FN</label>
        </div>
      
       <div className='form-group'>
        <label>Time</label>
        <input type='time' placeholder='Day 2 FN Time' name='Day_2_FN_time' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>whereabouts</label>
        <input type='text' placeholder='Day 2 FN Place' name='Day_2_FN_place' onChange={handlechange}/>
       </div>
 
       <div>
        <label style={{fontSize:"20px",color:"green"}}>AN</label>
        </div>

       <div className='form-group'>
        <label>Time</label>
        <input type='Time' placeholder='Day 2 AN Time' name='Day_2_AN_time' onChange={handlechange}/>
        <label >whereabouts</label>
        <input type='text' placeholder='Day 2 AN Place' name='Day_2_AN_place' onChange={handlechange} />
       </div>


       <div>
        <label style={{fontSize:"20px",color:"green"}}>Night</label>
        </div>

       <div className='form-group'>
        <label>Time</label>
        <input type='Time' placeholder='Day 2 Night Time' name='Day_2_Night_time' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>whereabouts</label>
        <input type='text' placeholder='Day 2 Night Place'name='Day_2_Night_place' onChange={handlechange}/>
       </div>

       <div class="report-header">
    <h1 class="recent-Articles" style={{color:"green"}}>Day 3 whereabouts</h1>
    </div>

    <div>
        <label style={{fontSize:"20px",color:"green"}}>FN</label>
        </div>
      
       <div className='form-group'>
        <label>Time</label>
        <input type='time' placeholder='Day 3 FN Time' name='Day_3_FN_time' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>whereabouts</label>
        <input type='text' placeholder='Day 3 FN Place' name='Day_3_FN_place' onChange={handlechange}/>
       </div>
 
       <div>
        <label style={{fontSize:"20px",color:"green"}}>AN</label>
        </div>

       <div className='form-group'>
        <label>Time</label>
        <input type='Time' placeholder='Day 3 AN Time' name='Day_3_AN_time' onChange={handlechange}/>
        <label >whereabouts</label>
        <input type='text' placeholder='Day 3 AN Place' name='Day_3_AN_place' onChange={handlechange} />
       </div>

       <div>
        <label style={{fontSize:"20px",color:"green"}}>Night</label>
        </div>

       <div className='form-group'>
        <label>Time</label>
        <input type='Time' placeholder='Day 3 Night Time' name='Day_3_Night_time' onChange={handlechange}/>
       </div>

       <div className='form-group'>
        <label>whereabouts</label>
        <input type='text' placeholder='Day 3 Night Place'name='Day_3_Night_place' onChange={handlechange}/>
       </div>
     
        
       <div class="report-header">
    <h1 class="recent-Articles">Arrival</h1>
    </div>

       <div className='form-group'>
        <label>Time of Arriving</label>
        <input type='Time' placeholder='Time of Arriving' name='Time_of_Arriving' onChange={handlechange}/>
       </div>
      
       <div className='form-group'>
        <label>Date of Arriving College</label>
        <input type='date' placeholder='Date of Arriving' name='Date_of_Arriving' onChange={handlechange}/>
       </div>

       
      <div class="report-header">
    <h1 class="recent-Articles">Files to be Uploaded</h1>
    </div>

    
             <div className='form-group'>
                <label htmlFor="event_photo_3">No of Students Visited (List)</label>
                <input type='file' id='event_photos' name='students_visited_list' accept='image/gif, image/jpeg' onChange={handlechange} required maxSize="2MB"/>
             </div>

             <div className='form-group'>
                <label>Visit/Tour Approval Form</label>
                <input type='file' onChange={handlechange}/>
             </div>

             <div className='form-group'>
                <label>Letter to the Company For Permission</label>
                <input type='file' onChange={handlechange}/>
             </div>

             <div className='form-group'>
                <label>Permission Letter from The Company</label>
                <input type='file' onCanPlay={handlechange}/>
             </div>

             <div className='form-group'>
                <label>Bus Permit Copy</label>
                <input type='file' onChange={handlechange}/>
             </div>
  
             
             <div className='form-group'>
                <label>Undertaking by Parents</label>
                <input type='file' onChange={handlechange}/>
             </div>
             <div className='form-group'>
                <label>Undertaking by Students (Sample 1)</label>
                <input type='file' onChange={handlechange}/>
             </div>

             <div className='form-group'>
                <label>Undertaking by Students (Sample 2)</label>
                <input type='file' onChange={handlechange}/>
             </div>
               

               <div className='form-group'>
                <label>Boarding and Lodging Arrangement Details</label>
                <input type='file' onChange={handlechange}/>
             </div>
  

           
             <div className='form-group'>
                <label>About Industry</label>
                <input type='file' onChange={handlechange}/>
             </div>
     
             <div>
        <label style={{fontSize:"20px",color:"green"}}>Feed Back From Students</label>
        </div>


             <div className='form-group'>
                <label>photo 1</label>
                <input type='file' onChange={handlechange}/>
             </div>

             <div className='form-group'>
                <label>photo 2</label>
                <input type='file' onChange={handlechange}/>
             </div>

             <div className='form-group'>
                <label>photo 3</label>
                <input type='file' onChange={handlechange}/>
             </div>

             <div className='form-group'>
                <label>photo 4</label>
                <input type='file' onChange={handlechange}/>
             </div>
            
            <div className='form-group'>
                <label>photo 5</label>
                <input type='file' onChange={handlechange}/>
             </div>
       
    </div>

    <h1 style={{color:'red',}}></h1>
      <div className='row mt-5 justify-content-around'>
      <input type='button' onClick={()=>{}} value="Clear" className='col-3 btn btn-danger' />
        <button onClick={handleClick} value="" className='col-3 btn btn-primary' >Submit</button>
      </div> 

      


</div>
</div>
</body>
   </>
)

}

export default IvInput