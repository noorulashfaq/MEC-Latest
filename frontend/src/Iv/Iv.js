import axios from "axios"
import { useEffect, useState } from "react"
import { onTable } from "../connect"
import dateFormat, { masks } from "dateformat";
import { getDocument } from 'pdfjs-dist/webpack';
import Image from './Image.jpg';
import Image2 from './logo.jpg';
import Image3 from './logo3.jpg';
import Image4 from './logo4.jpg';
import jsPDF from 'jspdf';

const Iv=()=>{

    useEffect(()=>{
        fetchIvReports()
    },[])

    const [ivRecords,setIvRecords]=useState([])

    const fetchIvReports=async()=>{
        const res=await axios.get(`http://localhost:1234/iv/fetchIv`)
        // alert(JSON.stringify(res.data))
        if(res.data.error){
            console.log("No records")
        }
        else{
            console.log("iv data", res.data.records);
            const iv = res.data.records;
            for(let i of iv)
            {
                console.log("iv for", dateFormat(i.date_of_visit_from, "dd.mmm.yyyy"));

            }
          setIvRecords(res.data.records)
        }
    }

    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


    const [id, setId] = useState('');

    const viewPdf=async(id)=>{
     const report=JSON.parse(sessionStorage.getItem("report_id"))
     setId(report.report_id)
     // alert("view Working")
     handleGenerateAndDownload(id)
    // handleGenerateAndDownload(report.event_name)
     
 }
 const [id1, setId1] = useState('');
 const viewPdf1=async(report_id)=>{
   const report=JSON.parse(sessionStorage.getItem("report_id"))
   setId1(report.report_id)
   // alert("view Working")
   handleGenerateAndDownload(report.event_name)
   
 }

    const accept=async(report_id,table)=>{
        // const temp=await onTable(report_id,table)
    // if(temp.report_id){
    //     sessionStorage.setItem("report_id",JSON.stringify(temp))
        
    // }
    viewPdf();
    }
    const pdfAccept=async(report_id)=>{
    
    viewPdf(report_id);

    }

    const ecr=async(report_id,table)=>{
        const temp=await onTable(report_id,table)
    if(temp.report_id){
        sessionStorage.setItem("report_id",JSON.stringify(temp))
        
    }
    viewPdf1(temp.report_id);

    } 

    const handleGenerateAndDownload= async(id)=>{
        
        try{
            const res=await axios.get(`http://localhost:1234/iv/data/${id}`);
            // alert(JSON.stringify(res.data))
            const data=res.data;
            
            for(let key in data){
                if(data.hasOwnProperty(key)&&(data[key]==null || data[key] == undefined || data[key]==='')){
                    data[key]=0;
                }
            }
            const picture1 = `/Images/${data.event_photo_1}.jpeg`;
      const picture2 = `/Images/${data.event_photo_2}.jpeg`;



      // const HoD_Sign = `/Signature/${data.lvl_1_proposal_sign}.jpeg`;
      // const Principal_sign = `/Signature/${data.lvl_2_proposal_sign}.jpeg`;

      const POs = `${data.POs}`;
      let arr=POs.split(",");
      arr=arr.sort();
      let pdfDocument;
      try{
      const fileReader = new FileReader();
      const imageData = await new Promise((resolve) => {
        fileReader.onload = (event) => resolve(new Uint8Array(event.target.result));
        fileReader.readAsArrayBuffer(selectedFile);
      });

      pdfDocument = await getDocument({ data: imageData }).promise;
    }
    catch(e){
      console.log(e)
    }
      const newPdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
      });



      // Add content from jsPDF
      


////////////////////////////////////////Budget Utilized//////////////////////////////////


newPdf.addImage(Image, 'PNG', 10, 3, 20, 20);
      newPdf.addImage(Image2, 'PNG', 173,9, 27, 17);
      newPdf.addImage(Image3, 'PNG', 12,25, 17, 10);
      newPdf.addImage(Image4, 'PNG', 175,24, 20, 14);
newPdf.setFontSize(18);
newPdf.setFont("times", "bold");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
newPdf.setFontSize(10);
newPdf.setFont("times", "");
newPdf.text('(An Autonomous Institution)', 80, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);


newPdf.setFontSize(12);
newPdf.setFont("times", "bold");
newPdf.rect(10, 40, 20, 7);
newPdf.text(`${data.dept}`, 15, 45);

newPdf.rect(80, 40, 50, 7);
newPdf.text('IV PROPOSAL', 92, 45);

newPdf.rect(170, 40, 20, 7);
newPdf.text('2023-24', 173, 45);//academic year

newPdf.setFont("times","")
newPdf.rect(10, 55, 10, 20).stroke();
newPdf.text('1.', 12, 65);
newPdf.rect(20, 55, 70, 20).stroke();
newPdf.text('Details of the industry to\n be visited with address',22, 66);
// newPdf.rect(90, 55, 110, 20).stroke();
// newPdf.text(`${data.details_of_the_industry_1}`, 94, 63);
const x=90;
const y=55;
const address = `${data.details_of_the_industry_1}`;
const contentWidth = newPdf.getStringUnitWidth(address) * 12; // Initial font size: 12
const contentHeight = newPdf.getTextDimensions(address, { fontSize: 10}).h;

// Determine font size to fit within specified dimensions
const maxWidth = 110; // Adjust based on your requirements
const maxHeight = 110; // Adjust based on your requirements
const fontSize = Math.min(10, (maxWidth / contentWidth) * 35, (maxHeight / contentHeight) * 35);
// Adjust the width as needed
// Set font size and add text to the PDF
newPdf.setFontSize(fontSize);

console.log(contentHeight);

const textLines = newPdf.splitTextToSize(address, 60);
newPdf.rect(x , y , maxWidth-0 , maxHeight - 80);
newPdf.text(x+2, y+5, textLines);

newPdf.rect(10, 75, 10, 10).stroke();
newPdf.text('2.', 12, 81);
newPdf.rect(20, 75, 70, 10).stroke();
newPdf.text('Date of the industrial visit planned',22, 81);
newPdf.rect(90, 75, 110, 10).stroke();
newPdf.text(`${dateFormat(data.date_of_visit_from,'dd-mm-yyyy')}`, 99, 81);
newPdf.text('&', 120, 81);
newPdf.text(`${dateFormat(data.date_of_visit_to,'dd-mm-yyyy')}`, 124, 81);




newPdf.rect(10, 85, 10, 35).stroke();
newPdf.text('3.', 12, 102);
newPdf.rect(20, 85,70, 35).stroke();
newPdf.text('Contact Person of the industry',22,102);
// newPdf.rect(90, 85,110, 35).stroke();
// newPdf.text('HERE', 129, 93);


newPdf.rect(90, 85, 36, 15).stroke();
newPdf.text('Name/Designation',92,95);
newPdf.rect(126, 85,74, 15).stroke();
newPdf.text(`${data.name_of_the_contact_person_1}`, 127, 90);
newPdf.text(`${data.designation_of_the_contact_person_1}`, 127, 94);

newPdf.rect(90, 100, 36, 10).stroke();
newPdf.text('Mobile No', 92, 107);
newPdf.rect(126, 100,74, 10).stroke();
newPdf.text(`${data.phone_no_of_the_contact_person_1}`, 127, 108);

newPdf.rect(90, 110, 36, 10).stroke();
newPdf.text('Mail id', 92, 117);
newPdf.rect(126, 110,74, 10).stroke();
newPdf.text(`${data.email_of_the_contact_person_1}`, 127, 118);






newPdf.rect(10, 120, 10, 28).stroke();
newPdf.text('4.', 12, 135);
newPdf.rect(20, 120, 70, 28).stroke();
newPdf.text('Detail of Lodging Planned',22, 135);
// newPdf.rect(90, 120, 110, 28).stroke();
// newPdf.text('NOT YET', 113, 121);


newPdf.rect(90, 120, 36, 9).stroke();
newPdf.text('Name of the Inn', 92,126);
newPdf.rect(126, 120,74, 9).stroke();
newPdf.text(`${data.name_of_the_inn}`, 127, 127);

newPdf.rect(90, 129, 36, 9).stroke();
newPdf.text('Address', 92, 136);
newPdf.rect(126, 129,74, 9).stroke();
newPdf.text(`${data.address_of_the_inn}`, 127, 136);

newPdf.rect(90, 138, 36, 10).stroke();
newPdf.text('Phone No', 92, 146);
newPdf.rect(126, 138,74, 10).stroke();
newPdf.text(`${data.phone_no_of_the_inn}`, 127, 146);




newPdf.rect(10, 148, 10, 20).stroke();
newPdf.text('5.', 12, 160);
newPdf.rect(20, 148, 70, 20).stroke();
newPdf.text('Number of the person visiting',22, 160);

newPdf.rect(90, 148, 36, 10).stroke();
newPdf.text('Students', 92, 155);
newPdf.rect(126, 148,74, 10).stroke();
newPdf.text(`${data.students_count}`, 127, 155);

newPdf.rect(90, 158, 36, 10).stroke();
newPdf.text('Faculty', 92, 165);
newPdf.rect(126, 158,74, 10).stroke();
newPdf.text(`${data.faculty_count}`, 127, 165);






newPdf.rect(10, 168, 10, 34).stroke();
newPdf.text('6.', 12, 185);
newPdf.rect(20, 168, 70, 34).stroke();
newPdf.text('Travels Details',22, 185);

newPdf.rect(90, 168, 36, 17).stroke();
newPdf.text('Name of the travels\nwith registration\nNo.', 92, 174);
newPdf.rect(126, 168,74, 17).stroke();
newPdf.text(`${data.name_of_the_travel_1}`, 127, 173);
newPdf.text(`Bus1 No :`, 127, 178);
newPdf.text(`${data.bus_no_of_the_travel_1}`, 145, 177);
newPdf.text(`Bus2 No :`, 127, 183);
newPdf.text(`${data.bus_no_of_the_travel_2}`, 145, 183);


newPdf.rect(90, 185, 36, 17).stroke();
newPdf.text('Name of the travels\nOperator with\nContact No.', 92, 190);
newPdf.rect(126, 185,74, 17).stroke();
newPdf.text(`${data.operator_of_the_travel_1,data.operator_contact_of_the_travel_1}`, 127, 191);
// newPdf.text(`,`, 176, 191);
// newPdf.text(`${data.operator_contact_of_the_travel_1}`, 177, 191);
newPdf.text(`${data.operator_of_the_travel_2,data.operator_contact_of_the_travel_2}`, 127, 195);
// newPdf.text(`,`, 176, 195);
// newPdf.text(`${data.operator_contact_of_the_travel_2}`, 177, 195);
newPdf.text(`${data.operator_of_the_travel_3}`, 127, 199);
newPdf.text(`,`, 176, 199);
newPdf.text(`${data.operator_contact_of_the_travel_3}`, 177, 199);

newPdf.rect(10, 202, 10, 36).stroke();
newPdf.text('7.', 12, 213);
newPdf.rect(20, 202, 70, 36).stroke();
newPdf.text('Detail of the accompanying\nFaculty members with Mobile\nNumber',22, 213);

newPdf.rect(90, 202, 50, 9).stroke();
newPdf.text('Name with Designation', 95, 208);
newPdf.rect(90, 211,50, 9).stroke();
newPdf.text(`${data.faculty_accompanied}`,91, 219);
newPdf.rect(90, 220,50, 9).stroke();
newPdf.text('', 91, 228);
newPdf.rect(90, 229,50, 9).stroke();
newPdf.text('hlooo',91,237)


newPdf.rect(140, 202, 32, 9).stroke();
newPdf.text('Mobile Number', 143, 209);
newPdf.rect(140, 211,32, 9).stroke();
newPdf.text('9342635', 141, 217);
newPdf.rect(140, 220,32, 9).stroke();
newPdf.text('4567890', 141, 226);
newPdf.rect(140, 229,32, 9).stroke();
newPdf.text('23456789', 141, 235);

newPdf.rect(172, 202, 28, 9).stroke();
newPdf.text('Signature', 179, 209);
newPdf.rect(172, 211,28,9).stroke();
newPdf.text('j', 173, 217);
newPdf.rect(172, 220,28,9).stroke();
newPdf.text('jk', 173, 226);
newPdf.rect(172, 229,28,9).stroke();
newPdf.text('uytu', 173, 236);




newPdf.rect(10, 238, 10, 10).stroke();
newPdf.text('8.', 12, 242);
newPdf.rect(20, 238, 70, 10).stroke();
newPdf.text('Undertaking from parents collected\nfor all students',22, 242);
newPdf.rect(90, 238, 110, 10).stroke();
newPdf.text(`${data.undertaking_from_parents}`, 91, 242);




newPdf.setFont("times","bold");

newPdf.text('Dean-TL', 15, 290);
newPdf.text('Recommended by HoD', 155, 275);
//doc.text('Approved Not Approved', 16, 280);
newPdf.text('Principal', 155, 290);
////// Attach the existing PDF content
      
      // Save or display the final PDF
      const pdfDataUri = newPdf.output('datauristring');
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<iframe width="100%" height="100%" src="${pdfDataUri}" frameborder="0" allowfullscreen></iframe>`);
      }
    } 
    catch (err) {
      console.error(err);
    }
  

        }
    
  
    
  
    return(
        <>
            <div class="overallcontent">
            <div class="report-header">
            <h1 class="recent-Articles">Your Reports</h1>
            <a href="/ivproposal">
            <button class="menu-buttons" data-category="iv_proposal">+ADD</button>
            </a>

            </div>
            <table className='table table-striped '>
            <thead>
            <tr>
                <th>ID</th>
                <th>Date of visit</th>
                <th>Industry</th>
                <th>Year/Sem</th>
                <th>Co-ordinator</th>
                <th></th>
                <th>Proposal</th>
                <th></th>
                <th></th>
                <th>Completion</th>
                <th></th>
                <th>Details</th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Submitted on</th>
                <th>HoD</th>
                <th>Principal</th>
                <th>Submitted on</th>
                <th>HoD</th>
                <th>Principal</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {
                    (ivRecords?.length||0!=0)?
                    ivRecords.map((data)=>(
                        <tr>
                            <td>{data.report_id}</td>
                            <td>{dateFormat(data.date_of_visit_from, "dd-mm-yyyy")}</td>
                            <td>{data.details_of_the_industry_1}</td>
                            <td>{`${data.year_of_students_visited}/${data.sem_of_students_visited}`}</td>
                            <td>{data.event_coordinator}</td>
                            <td>{data.proposal_date}</td>
                            {(data.report_proposal_status===0) ?
                                <>
               
                                        <td>🕒Pending</td>
                                        <td>🕒Pending</td>
                                        {/* <td></td> */}
                                        <td></td>
                                        <td>🕒Pending</td>
                                        <td>🕒Pending</td>
                                        <td><button
  style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{
                                                        // alert(data.workshop_id+" "+data.dept_id)
                                                        
                                                      
                                                        handleGenerateAndDownload(data.report_id);
                                                       
                                                    }} >View Proposal</button></td>
                                        </>
                                        :
                                        (data.report_proposal_status===1 && data.report_completion_status===0 ) ? 
                                        <>
                                        
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>🕒Pending</td>
                                        <td></td>

                                        <td>🕒Pending</td>
                                        <td>🕒Pending</td>
                                        <td><button
  style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{ 
                                                        // alert(data.workshop_id+" "+data.dept_id)
                                                        pdfAccept(data.report_id);
                                                       
                                                    }} >View Proposal</button></td>
                                        </>
                                        :
                                        (data.report_proposal_status===2 && data.report_completion_status===0 ) ?
                                        <>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>{data.completion_date}</td>
                                   
                                        <td>🕒Pending</td>
                                        <td>🕒Pending</td>
                                        <td><a className="topic-heading" href="/ivinput"><button
  style={{
    backgroundColor: ' #00997a', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{       
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                        accept(data.report_id,data.event_name);
                                                    }} >Create IVR</button></a></td>
                                        </>
                                        :
                                        (data.report_proposal_status===-1) ?
                                        <>
                                           <td><h3 style={{color:'red'}}>Rejected</h3></td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>

                                        </>
                                        :
                                        (data.report_completion_status===1)?

                                        <>
                                          <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>{data.completion_date}</td>
                                   
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>🕒Pending</td>
                                        <td><a></a><button
  style={{
    backgroundColor: ' #f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ecr(data.report_id);
                                                    }} >View Report</button></td>
                                           </>
                                        :
                                        (data.report_completion_status===2)?

                                        <>
                                          <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td>{data.completion_date}</td>
                                   
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><h3 style={{color:'green'}}>Accepted</h3></td>
                                        <td><button
  style={{
    backgroundColor: '#f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ecr(data.report_id,data.event_name);
                                                    }} >View IV</button></td>
                                        </>
                                        :
                                        <></>
                                                }
                        </tr>
                    )):
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>No records</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                }
            </tbody>
            </table>
        </div>

        </>
    )
}



export default Iv

