import { useEffect, useState } from "react";

import { ivapproveComLevel1, ivapproveComLevel2, ivapproveComLevel3, ivapproveComLevel4, ivapproveComLevel5, ivapproveLevel1, ivapproveLevel2, ivapproveLevel3, ivapproveLevel4, ivapproveLevel5, ivloadComForLevel1, ivloadComForLevel2, ivloadComForLevel3, ivloadComForLevel4, ivloadComForLevel5, ivloadForLevel1, ivloadforlevel2, ivloadforlevel3, ivloadforlevel4, ivloadforlevel5 } from "./ivconnect";
import dateFormat from "dateformat";
import Image from './Image.jpg';
import Image2 from './logo.jpg';
import Image3 from './logo3.jpg';
import Image4 from './logo4.jpg';
import './Iv.css'
import { onTable } from "../connect";
import axios from 'axios';
import jsPDF from 'jspdf';
import { getDocument } from 'pdfjs-dist/webpack';


export const HoDIVPage=()=>{

  const[iv,setiv]=useState([]);
  const[iv1,setiv1]=useState([]);
  const [info, setInfo] = useState("")
  const [ivcurrentRecords, setIvCurrentRecords] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

 



  const[id,setId] = useState('');
  const viewPdf=async(report_id)=>{
    // const report=JSON.parse(sessionStorage.getItem("report_id"))
    // setId(report.report_id)
    // alert("view Working")
    handleDownload(report_id);
   
}
  const[id1,setId1] = useState('');
  const viewPdf1=async(report_id)=>{
    const report=JSON.parse(sessionStorage.getItem("report_id"))
    setId1(report.report_id)
    // alert("view Working")
    handleDownload1(report.event_name);
   
  }

  useEffect(()=>{
    load()
    loadSeminars()
  },[])

  const logged=sessionStorage.getItem("person")
  const loggedUser = JSON.parse(logged)

 
  const load = async()=>{
    const logged = JSON.parse(sessionStorage.getItem("person"))
    let temp;
    try{
      temp=await ivloadComForLevel1(logged.dept_id.faculty_id)
      setiv1(temp)
    }
    catch(e){
      console.log("error in loadcomforlevel1")
    }
    try{
      temp=await ivloadComForLevel2(logged.dept_id,logged.faculty_id)
      setiv1(temp)
    }
    catch(e){
      console.log("error in loadcomforlevel2")
    }
    try{
      temp=await ivloadComForLevel3(logged.dept_id,logged.faculty_id)
      setiv1(temp)
    }
    catch(e){
      console.log("error in loadcomforlevel3")
    }
    try{
      temp=await ivloadComForLevel4(logged.dept_id,logged.faculty_id)
      setiv1(temp)
    }
    catch(e){
      console.log("error in loadcomforlevel4")
    }
    try{
      temp=await ivloadComForLevel5(logged.dept_id,logged.faculty_id)
    }
    catch(e){
      console.log("error in loadcomforlevel5")
    }
  }



  const ivf=async(report_id,table)=>{
    const temp=await onTable(report_id,table)
    if(temp.report_id){
      sessionStorage.setItem("report_id",JSON.stringify(temp))

      setId1(temp.report_id)
    }
    viewPdf1(temp.report_id);
  }

  const accept = async(dept_id,report_id,com,report_proposal_status,report_completion_status) => {
    if(report_proposal_status === 1){
      const log = JSON.parse(sessionStorage.getItem("person"))
      let data;
      if(report_completion_status===0){
        data = await ivapproveComLevel1(dept_id,log.faculty_id,report_id)
      }
      else if (report_completion_status === 1) {
        data = await ivapproveComLevel2(dept_id, log.faculty_id, report_id)
    }
    else if (report_completion_status === 2) {
        data = await ivapproveComLevel3(dept_id, log.faculty_id, report_id)
    }
    else if (report_completion_status === 3) {
        data = await ivapproveComLevel4(dept_id, log.faculty_id, report_id)
    }
    else if (report_completion_status === 4) {
        data = await ivapproveComLevel5(dept_id, log.faculty_id, report_id)
    }
    setInfo(data)
    window.location.assign("/")
    }

    else {
      const log = JSON.parse(sessionStorage.getItem("person"))
      let data;
      // alert(report_proposal_status);
      if (report_proposal_status === 0) {


          data = await ivapproveLevel1(dept_id, log.faculty_id, report_id)
      }
      else if (report_proposal_status === 1) {
          data = await ivapproveLevel2(dept_id, log.faculty_id, report_id)
      }
      else if (report_proposal_status === 2) {
          data = await ivapproveLevel3(dept_id, log.faculty_id, report_id)
      }
      else if (report_proposal_status === 3) {
          data = await ivapproveLevel4(dept_id, log.faculty_id, report_id)
      }
      else if (report_proposal_status === 4) {
          data = await ivapproveLevel5(dept_id, log.faculty_id, report_id)
      }
      setInfo(data)
      window.location.assign("/")
  }

  }




const loadSeminars = async () =>{
  const logged =JSON.parse(sessionStorage.getItem("person"))
  let temp;
  try{
    temp=await ivloadForLevel1(logged.dept_id,logged.faculty_id)
    // alert(temp)
    setiv(temp)
  }
  catch(e){
    console.log("error in loadforlevel1")
  }
  try{
    temp=await ivloadforlevel2(logged.dept_id,logged.faculty_id)
    setiv(temp)
  }
  catch{
    console.log("error in loadforlevel2")
  }
  try{
    temp=await ivloadforlevel3(logged.dept_id,logged.faculty_id)
    setiv(temp)
  }
  catch{
    console.log("error in loadforlevel3")
  }
  try{
    temp=await ivloadforlevel4(logged.dept_id,logged.faculty_id)
    setiv(temp)
  }
  catch{
    console.log("error in loadforlevel4")
  }
  try{
    temp=await ivloadforlevel5(logged.dept_id,logged.faculty_id)
    setiv(temp)
  }
  catch{
    console.log("error in loadforlevel5")
  }
  // alert(JSON.stringify(iv))

}

const pdfAccept=async(report_id)=>{
//   const temp=await onTable(report_id,table)
// if(temp.report_id){
//   sessionStorage.setItem("report_id",JSON.stringify(temp))
 
// }
viewPdf(report_id);

}  


const handleDownload = async (id) => {
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


const handleDownload1= async (table) => {

  try {
    // Convert PDF to images
    const res = await axios.get(`http://localhost:3100/data/${id}`);
    const data = res.data;
    for (let key in data) {
      if (data.hasOwnProperty(key) && (data[key] === null || data[key] === undefined || data[key] === '' )) {
        // Set the value to 0 if it's null, empty, or NaN
        data[key] = 0;
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
newPdf.text(`${data.name_of_the_travel_1}`, 127, 172);
newPdf.text(`Bus1 No :`, 127, 176);
newPdf.text(`${data.bus_no_of_the_travel_1}`, 145, 176);
newPdf.text(`Bus2 No :`, 127, 180);
newPdf.text(`${data.bus_no_of_the_travel_2}`, 145, 180);
newPdf.text(`Bus3 No :`, 127, 184);
newPdf.text(`${data.bus_no_of_the_travel_3}`, 145, 184);


newPdf.rect(90, 185, 36, 17).stroke();
newPdf.text('Name of the travels\nOperator with\nContact No.', 92, 190);
newPdf.rect(126, 185,74, 17).stroke();
newPdf.rect(126,185,48,7);
newPdf.rect(174,185,26,7);
newPdf.text(`${data.operator_of_the_travel_1}`, 127, 191);
newPdf.text(`${data.operator_contact_of_the_travel_1}`, 177, 191);
newPdf.rect(126,192,48,5);
newPdf.rect(174,192,26,5);
newPdf.text(`${data.operator_of_the_travel_2}`, 127, 196);
newPdf.text(`${data.operator_contact_of_the_travel_2}`, 177, 196);
newPdf.rect(126,197,48,5);
newPdf.rect(174,197,26,5);
newPdf.text(`${data.operator_of_the_travel_3}`, 127, 201);
newPdf.text(`${data.operator_contact_of_the_travel_3}`, 177, 201);

newPdf.rect(10, 202, 10, 36).stroke();
newPdf.text('7.', 12, 213);
newPdf.rect(20, 202, 70, 36).stroke();
newPdf.text('Detail of the accompanying\nFaculty members with Mobile\nNumber',22, 213);

newPdf.rect(90, 202, 50, 9).stroke();
newPdf.text('Name with Designation', 95, 208);
newPdf.rect(90, 211,50, 9).stroke();
newPdf.text(`${data.faculty_accompanied.split(",")[1]}`,91, 219);
newPdf.rect(90, 220,50, 9).stroke();
newPdf.text(`${data.faculty_accompanied.split(",")[2]}`, 91, 228);
newPdf.rect(90, 229,50, 9).stroke();
newPdf.text(`${data.faculty_accompanied.split(",")[3]}`,91,237)


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
newPdf.text(`${data.undertaking_from_parents}`, 130, 244);




newPdf.setFont("times","bold");

newPdf.text('Dean-TL', 15, 290);
newPdf.text('Recommended by HoD', 155, 275);
//doc.text('Approved Not Approved', 16, 280);
newPdf.text('Principal', 155, 290);




////////////////////////////////////////Budget Utilized//////////////////////////////////


newPdf.addPage();
newPdf.addImage(Image, 'PNG', 10, 3, 20, 20);
newPdf.addImage(Image2, 'PNG', 173,9, 27, 17);
newPdf.addImage(Image3, 'PNG', 12,25, 17, 10);
newPdf.addImage(Image4, 'PNG', 175,24, 20, 14);




newPdf.setFontSize(18);
newPdf.setFont("Calibri", "bold");
newPdf.text('MUTHAYAMMAL ENGINEERING COLLEGE',35, 15);
newPdf.setFontSize(10);
newPdf.setFont("Calibri", "");
newPdf.text('(An Autonomous Institution)', 80, 20);
newPdf.text('(Approved by AICTE, New Delhi, Accredited by NAAC & Affiliated to Anna University)', 35, 25);
newPdf.text('Rasipuram - 637 408, Namakkal Dist., Tamil Nadu', 65, 30);


newPdf.setFontSize(12);
newPdf.setFont("Calibri", "bold");
newPdf.rect(10, 40, 20, 7);
newPdf.text(`${data.dept}`, 15, 45);//Department
newPdf.rect(70, 40, 74, 10);
newPdf.text('Whereabouts', 90  , 46);

newPdf.rect(170, 40, 30, 7);
newPdf.text(`  `, 174.5, 45);//Academic year


newPdf.text("Year/Semester:", 10, 71);
newPdf.setFont('times', '');
newPdf.text(`${data.year_of_students_visited}`, 50, 71);
newPdf.text(`/`, 54, 71);
newPdf.text(`${data.sem_of_students_visited}`, 56, 71);
newPdf.setFont('times', 'bold');
newPdf.text("Name of the Faculty Coordinator:", 10, 78);
newPdf.text(`${data.faculty_accompanied}`, 85, 78);
newPdf.setFont('times', 'bold');
newPdf.text("Date of Visit:", 10, 85);
newPdf.text(`${dateFormat(data.date_of_visit_from,'dd-mm-yyyy')}`, 45, 85);

newPdf.setFont('times', 'bold');
newPdf.text("Place of Visit:", 10, 92);
newPdf.text(`${data.place_of_visit}`, 45, 92);
newPdf.setFont('times', 'bold');
newPdf.text("No.of Students on visit:", 10, 99);
newPdf.text(`${data.students_count}`, 60, 99);
newPdf.setFont('times', 'bold');
newPdf.text("No.of accompanying Faculty:", 10, 106);
newPdf.text(`${data.faculty_count}`, 69, 106);

newPdf.setFont('times', 'bold');
newPdf.rect(10,117,30,20).stroke();
newPdf.text("DAY/", 20, 125);
newPdf.text("Date", 20, 129);

newPdf.setFont('times', 'bold');
newPdf.rect(40,117,50,20).stroke();
newPdf.text("Time of Contact", 45, 127);

newPdf.setFont('times', 'bold');
newPdf.rect(90,117,70,20).stroke();
newPdf.text("Whereabouts", 105, 127);

newPdf.setFont('times', 'bold');
newPdf.rect(160,117,30,20).stroke();
newPdf.text("Signature", 165, 127);

newPdf.setFont('times', 'bold');
newPdf.rect(10,137,30,20).stroke();
newPdf.text("Date of", 18, 144);
newPdf.text("Leaving", 17, 147);
newPdf.text(`${data.date_of_leaving}`,12,153);

newPdf.setFont('times', 'bold');
newPdf.rect(40,137,25,20).stroke();
newPdf.text("Leaving", 45, 144);
newPdf.text("Time", 45, 149);
newPdf.setFont('12.', 'bold');
newPdf.rect(65,137,25,20).stroke();
newPdf.text(`${data.leaving_time}`, 67, 146);

newPdf.setFont('times', 'bold');
newPdf.rect(90,137,70,20).stroke();
newPdf.text("College", 108, 146);

newPdf.setFont('12.', 'bold');
newPdf.rect(160,137,30,20).stroke();
newPdf.text("", 165, 146);

newPdf.setFont('12.', 'bold');
newPdf.rect(160,157,30,70).stroke();
newPdf.text("", 168, 197);

newPdf.setFont('12.', 'bold');
newPdf.rect(10,157,30,40).stroke();
newPdf.text("1.", 20, 175);

newPdf.setFont('times', 'bold');
newPdf.rect(40,157,25,10).stroke();
newPdf.text("Reaching", 43, 162);
newPdf.text("Time",47,166);
newPdf.setFont('12.', 'bold');
newPdf.rect(65,157,25,10).stroke();
newPdf.text(`${data.reaching_time}`, 67, 163);
newPdf.setFont('times', 'bold');
newPdf.rect(90,157,70,10).stroke();
newPdf.text(`${data.reaching_place}`, 93, 163);


newPdf.setFont('times', 'bold');
newPdf.rect(40,167,25,10).stroke();
newPdf.text("FN", 48, 173);
newPdf.setFont('12.', 'bold');
newPdf.rect(65,167,25,10).stroke();
newPdf.text(`${data.day_1_FN_time}`, 67, 173);
newPdf.setFont('times', 'bold');
newPdf.rect(90,167,70,10).stroke();
newPdf.text(`${data.day_1_FN_place}`, 93, 173);


newPdf.setFont('times', 'bold');
newPdf.rect(40,177,25,10).stroke();
newPdf.text("AN", 48, 183);
newPdf.setFont('12.', 'bold');
newPdf.rect(65,177,25,10).stroke();
newPdf.text(`${data.day_1_AN_time}`, 67, 183);
newPdf.setFont('times', 'bold');
newPdf.rect(90,177,70,10).stroke();
newPdf.text(`${data.day_1_AN_place}`, 93, 183);

newPdf.setFont('times', 'bold');
newPdf.rect(40,187,25,10).stroke();
newPdf.text("Night", 48, 193);
newPdf.setFont('12.', 'bold');
newPdf.rect(65,187,25,10).stroke();
newPdf.text(`${data.day_1_night_time}`, 67, 193);
newPdf.setFont('times', 'bold');
newPdf.rect(90,187,70,10).stroke();
newPdf.text(`${data.day_1_night_place}`, 93, 193);

newPdf.setFont('12.', 'bold');
newPdf.rect(10,197,30,30).stroke();
newPdf.text("2.", 20, 211);
newPdf.setFont('times', 'bold');
newPdf.rect(90,197,70,10).stroke();
newPdf.text(`${data.day_2_AN_place}`, 93, 213);

newPdf.setFont('times', 'bold');
newPdf.rect(40,207,25,10).stroke();
newPdf.text("FN", 48, 203);
newPdf.setFont('12.', 'bold');
newPdf.rect(65,197,25,10).stroke();
newPdf.text(`${data.day_2_FN_time}`, 67, 203);




newPdf.setFont('times', 'bold');
newPdf.rect(40,207,25,10).stroke();
newPdf.text("AN", 48, 213);
newPdf.setFont('12.', 'bold');
newPdf.rect(65,207,25,10).stroke();
newPdf.text(`${data.day_2_AN_time}`, 67, 213);
newPdf.setFont('times', 'bold');
newPdf.rect(90,207,70,10).stroke();
newPdf.text(`${data.day_2_FN_place}`, 93, 202);

newPdf.setFont('times', 'bold');
newPdf.rect(40,217,25,10).stroke();
newPdf.text("Night", 48, 223);
newPdf.setFont('12.', 'bold');
newPdf.rect(65,217,25,10).stroke();
newPdf.text(`${data.time_of_arriving}`, 67, 234);
newPdf.setFont('times', 'bold');
newPdf.rect(90,217,70,10).stroke();
newPdf.text(`${data.day_2_night_place}`, 93, 223);

newPdf.setFont('12.', 'bold');
newPdf.rect(10,227,30,20).stroke();
newPdf.text("Date of", 18, 233);
newPdf.text("Arriving", 17, 237);
newPdf.text(`${data.date_of_arriving}`, 12, 242);

newPdf.setFont('times', 'bold');
newPdf.rect(40,227,25,20).stroke();
newPdf.text("Time of ", 46, 234);
newPdf.text("Arriving ", 45, 238);
newPdf.setFont('12.', 'bold');
newPdf.rect(65,227,25,20).stroke();
newPdf.text(`${data.day_2_night_time}`, 67, 223);
newPdf.setFont('times', 'bold');
newPdf.rect(90,227,70,20).stroke();
newPdf.text("Return to College", 108, 236);

newPdf.setFont('12.', 'bold');
newPdf.rect(160,227,30,20).stroke();
newPdf.text("", 168, 235);

newPdf.setFont('times', 'bold');
newPdf.text('Co-Coordinator', 24, 267);
newPdf.text('(Dr.L.Manimaran)', 20, 272);

newPdf.text('Coordinator', 160, 267);
newPdf.text('(Dr.S.Sundaram)', 157, 272);



   


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








      // conts[getname(variable),setname(FUNCTION)]=useState(initialized)
     

        // const onClicked=async(report)=>{
           
        //     const temp=await onTable(report)
        //     sessionStorage.setItem("report_id",JSON.stringify(temp))
        //     // window.location.assign("/ecr")
        // }
        const accept1=async(report_id,table)=>{
            const temp=await onTable(report_id,table)

        if(temp.report_id){
            // alert(temp.report_id)
            sessionStorage.setItem("report_id",JSON.stringify(temp))
           
        }

        }
       
        const ecrf=async(report_id,table)=>{
          const temp=await onTable(report_id,table)
      if(temp.report_id){
          sessionStorage.setItem("report_id",JSON.stringify(temp))
         
          setId1(temp.report_id)
        //   alert(temp.report_id)
         
      }
      viewPdf1(temp.report_id);

      }
     
     




return(
<>
<div className="iv-report">
<div class="ivreport-container">
    <div class="report-header">
      <h1 class="recent-Articles">Your Report</h1>
    </div>
    <div className="table-responsive text-nowrap"  style={{margin:"2%"}}>
      <table className='table table-striped'>
        {/* <thread> */}
          <tr>
            <th>ID</th>
            <th>Date of visit</th>
                <th>Industry</th>
                <th>Year/Sem</th>
                <th>Co-ordinator</th>
               

                <th>Proposal</th>
             

                <th>Completion</th><th>Status</th><th>Details</th><th></th>
               
          </tr>
         
        {/* </thread> */}
        <tbody>
         
          {

            iv?.length ||0 > 0 ?(
              iv.map((data,key)=>(
                <tr>
                  <td><br></br>{data.report_id}</td>
                  <td><br></br>{dateFormat(data.date_of_visit_from, "dd-mm-yyyy")}</td>
                  <td><br></br>{data.details_of_the_industry_1}</td>
                  <td><br></br>{`${data.year_of_students_visited}/${data.sem_of_students_visited}`}</td>
                  <td><br></br>{data.event_coordinator}</td>
                  <td style={{justifyContent:'center',justifyItems:'center'}}><br></br>{(data.sub_report)}</td>                                    {/* <td><a className="topic-heading" href="/ecrInput"><button type="button" className="btn btn-outline-info col-3" onClick={onClicked(data.report_id)}>{data.report_id}</button></a></td> */}
                                   
                               
                                 
                                    {
                                (data.report_proposal_status===0) ?
                                <>
                                <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',}}> HOD : 🕒Pending</h6>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                </td>
                                <td >
                                <button type="button"style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>

                                    <td><button
  style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                        pdfAccept(data.report_id);
                                                       
                                                    }} >View Proposal</button></td>
                                        </>
                                        :
                                        (data.report_proposal_status===1 && data.report_completion_status===0 ) ?
                                        <>
                                       
                                        <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                </td>
                                <td >
                                <button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'130px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                                    <td><button
  style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                        pdfAccept(data.report_id);
                                                       
                                                    }} >View Proposal</button></td>
                                        </>
                                        :
                                        (data.report_proposal_status===2 && data.report_completion_status===0 ) ?
                                        <>
                                        <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                                </td>
                                <td >
                                <button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                                 
<td><button
   style={{
    backgroundColor: '#0000ff', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }} type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                        pdfAccept(data.report_id);
                                                       
                                                    }} >View Proposal</button></td>
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
                                        (data.report_completion_status===0 && data.lvl_1_completion_sign==null)?

                                        <>
                                       <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                                </td>
                                <td >
                                <button type="button"style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>

     
                                        <td><button
   style={{
    backgroundColor: '#f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ivf(data.report_id,data.event_name);
                                                    }} >View ECR</button></td>
                                        </>
                                       
                                        :
                                        (data.report_completion_status===1)?

                                        <>
                                       <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                                </td>
                                <td >
                                <button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

     
                                        <td><button
   style={{
    backgroundColor: '#f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ivf(data.report_id,data.event_name);
                                                    }} >View ECR</button></td>
                                                    </>
                                        :
                                        (data.report_completion_status===2)?

                                        <>
                                     <td>
                                <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                        {/* <td></td> */}
                                        </td>
                                        <td>    
                                        <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                                Submitted On : {data.proposal_date}
                                </tr>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                                <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                </td>
                                <td >
                                <button type="button" style={{justifyContent:'center',
    justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                   
                                        <td><button
   style={{
    backgroundColor: '#f29b44', // Background color
    color: 'white', // Text color
    width: '90%', // Button width
    justifyContent:'center',
    justifyItems:'center',
    marginTop:'8px',
    padding: '10px', // Padding
    borderRadius: '5px', // Border radius
    cursor: 'pointer', // Cursor style
    border: 'none', // Remove the border
  }}
  type="button" onClick={async()=>{
                                                        // alert(val.workshop_id+" "+val.dept_id)
                                                       ivf(data.report_id,data.event_name);
                                                    }} >View ECR</button></td>
                                        </>
                                        :
                                        <></>
}
                                   
                                </tr>
                            ))
                        ):( <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>
                         No Proposal requests Found
                         </td>
                                </tr>)
                                        }

{
                            iv1?.length ||0 > 0 ? (

                                iv1.map((data, key) => (
                                  <tr>
                                   
                                  <td><br></br>{data.report_id}</td>
                                  <td><br></br>{data.event_title}</td>
                                  <td><br></br>{data.event_date.split('-').reverse().join('-')}</td>
                                  <td><br></br>{data.major_report}</td>
                                 
                                  <td style={{justifyContent:'center',justifyItems:'center'}}><br></br>{(data.sub_report)}</td>                                    {/* <td><a className="topic-heading" href="/ecrInput"><button type="button" className="btn btn-outline-info col-3" onClick={onClicked(data.report_id)}>{data.report_id}</button></a></td> */}
                                 
                             
                               
                                  {
                              (data.report_proposal_status===0) ?
                              <>
                              <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',}}> HOD : 🕒Pending</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                              </td>
                              <td >
                              <button type="button"style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>

                                  <td><button
style={{
  backgroundColor: '#0000ff', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                      pdfAccept(data.report_id);
                                                     
                                                  }} >View Proposal</button></td>
                                      </>
                                      :
                                      (data.report_proposal_status===1 && data.report_completion_status===0 ) ?
                                      <>
                                     
                                      <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                              </td>
                              <td >
                              <button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'130px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                                  <td><button
style={{
  backgroundColor: '#0000ff', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                      pdfAccept(data.report_id);
                                                     
                                                  }} >View Proposal</button></td>
                                      </>
                                      :
                                      (data.report_proposal_status===2 && data.report_completion_status==0 &&data.event_organizer==null ) ?
                                      <>
                                      <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                              </td>
                              <td >
                              <button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                               
<td><button
 style={{
  backgroundColor: '#0000ff', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                      pdfAccept(data.report_id);
                                                     
                                                  }} >View Proposal</button></td>
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
                                      (data.report_completion_status==0 || data.lvl_2_completion_sign!=null)?

                                      <>
                                     <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                              </td>
                              <td >
                              <button type="button"style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>

   
                                      <td><button
 style={{
  backgroundColor: '#f29b44', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                     ivf(data.report_id,data.event_name);
                                                  }} >View ECR</button></td>
                                      </>
                                     
                                      :
                                      (data.report_completion_status===1)?

                                      <>
                                     <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                              </td>
                              <td >
                              <button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

   
                                      <td><button
 style={{
  backgroundColor: '#f29b44', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                     ivf(data.report_id,data.event_name);
                                                  }} >View ECR</button></td>
                                                  </>
                                      :
                                      (data.report_completion_status===2)?

                                      <>
                                   <td>
                              <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                      {/* <td></td> */}
                                      </td>
                                      <td>    
                                      <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                              Submitted On : {data.proposal_date}
                              </tr>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                              <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                              </td>
                              <td >
                              <button type="button" style={{justifyContent:'center',
  justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                 
                                      <td><button
 style={{
  backgroundColor: '#f29b44', // Background color
  color: 'white', // Text color
  width: '90%', // Button width
  justifyContent:'center',
  justifyItems:'center',
  marginTop:'8px',
  padding: '10px', // Padding
  borderRadius: '5px', // Border radius
  cursor: 'pointer', // Cursor style
  border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                      // alert(val.workshop_id+" "+val.dept_id)
                                                    ivf(data.report_id,data.event_name);
                                                  }} >View ECR</button></td>
                                      </>
                                      :
                                      <></>
}
                                 
                              </tr>
                          ))
                      ):( <tr>
                                  <td colSpan="7" style={{ textAlign: 'center' }}>
                       No Completion requests Found
                       </td>
                              </tr>)
                                      }
                 
                        {
                          ivcurrentRecords?.length||0>0?(
                            ivcurrentRecords.map((data)=>
                            (
                         
                              <tr>
                                   
                              <td><br></br>{data.report_id}</td>
                              <td><br></br>{data.event_title}</td>
                              <td><br></br>{data.event_date.split('-').reverse().join('-')}</td>
                              <td><br></br>{data.major_report}</td>
                             
                              <td style={{justifyContent:'center',justifyItems:'center'}}><br></br>{(data.sub_report)}</td>                                    {/* <td><a className="topic-heading" href="/ecrInput"><button type="button" className="btn btn-outline-info col-3" onClick={onClicked(data.report_id)}>{data.report_id}</button></a></td> */}
                             
                         
                           
                              {
                          (data.report_proposal_status===0) ?
                          <>
                          <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',}}> HOD : 🕒Pending</h6>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                          </td>
                          <td >
                          <button type="button"style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.event_name, data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>

                              <td><button
style={{
backgroundColor: '#0000ff', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                  pdfAccept(data.report_id);
                                                 
                                              }} >View Proposal</button></td>
                                  </>
                                  :
                                  (data.report_proposal_status===1 && data.report_completion_status===0 ) ?
                                  <>
                                 
                                  <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</h6>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</h6>
                          </td>
                          <td >
                          <button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'130px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                              <td><button
style={{
backgroundColor: '#0000ff', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                  pdfAccept(data.report_id);
                                                 
                                              }} >View Proposal</button></td>
                                  </>
                                  :
                                  (data.report_proposal_status===2 && data.report_completion_status===0 ) ?
                                  <>
                                  <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</tr>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                          </td>
                          <td >
                          <button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

                           
<td><button
style={{
backgroundColor: '#0000ff', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}} type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                  pdfAccept(data.report_id);
                                                 
                                              }} >View Proposal</button></td>
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
                                  (data.report_completion_status===0 && data.lvl_1_completion_sign==null)?

                                  <>
                                 <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</tr>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}> HOD : 🕒Pending</tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                          </td>
                          <td >
                          <button type="button"style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'80px'}} onClick={async () => {

accept(data.dept_id, data.report_id, data.final_proposal_status, data.report_proposal_status, data.report_completion_status);
}} className="btn btn-success col-4"  >Accept</button>
<button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'80px',marginLeft:'20px'}} className="btn btn-dark col-4">Reject</button></td>


                                  <td><button
style={{
backgroundColor: '#f29b44', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',

padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                 ivf(data.report_id,data.event_name);
                                              }} >View ECR</button></td>
                                  </>
                                 
                                  :
                                  (data.report_completion_status===1)?

                                  <>
                                 <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</tr>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</tr>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>Principal : 🕒Pending</tr>
                          </td>
                          <td >
                          <button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>


                                  <td><button
style={{
backgroundColor: '#f29b44', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                 ivf(data.report_id,data.event_name);
                                              }} >View ECR</button></td>
                                              </>
                                  :
                                  (data.report_completion_status===2)?

                                  <>
                               <td>
                          <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                                  {/* <td></td> */}
                                  </td>
                                  <td>    
                                  <tr className='hodECR' style={{border:'none',fontSize:'small'}}>
                          Submitted On : {data.proposal_date}
                          </tr>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}> HOD : Accepted</h6>
                          <h6 className='hodECR' style={{border:'none',fontSize:'small',color:'green'}}>Principal : Accepted</h6>
                          </td>
                          <td >
                          <button type="button" style={{justifyContent:'center',
justifyItems:'center',marginTop:'10px', width:'150px'}} onClick={async () => {

}} className="btn btn-success col-4">Accepted</button></td>

             
                                  <td><button
style={{
backgroundColor: '#f29b44', // Background color
color: 'white', // Text color
width: '90%', // Button width
justifyContent:'center',
justifyItems:'center',
marginTop:'8px',
padding: '10px', // Padding
borderRadius: '5px', // Border radius
cursor: 'pointer', // Cursor style
border: 'none', // Remove the border
}}
type="button" onClick={async()=>{
                                                  // alert(val.workshop_id+" "+val.dept_id)
                                                 ivf(data.report_id,data.event_name);
                                              }} >View ECR</button></td>
                                  </>
                                  :
                                  <></>
}
                 
                </tr>
              ))
 
            ):
            <tr></tr>
           
              }
             
         
        </tbody>

       </table>
    </div>
</div>
</div>
  </>
)

}

