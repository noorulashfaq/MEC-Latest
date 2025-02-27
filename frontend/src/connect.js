import axios from 'axios'

const url="http://localhost:1234"
export const onLogin=async(obj)=>{
try{
    const returned = await axios.post(`${url}/login`,obj)
    console.log(returned)
    return returned.data
}
catch(error){
    alert("Invalid Credentials")
}
}

export const onProposalsLoad=async()=>{

    // alert(dept_id)
    const returned=await axios.get(`${url}/seminar/find`)
    let ids=[]
        returned.data.rows.map((v)=>{
            ids.push(v)
        })
        
        return ids
}

export const onPropose=async(obj)=>{
    try{
    const returned = await axios.post(`${url}/seminar/ecrProposal/${obj.event_name}`,obj)
    return returned.data

    }
    catch(error){
        console.log(error)
    }
    // }
    // catch(error){
    //     alert(error)
    // }
}
export const onComplete=async(obj,report_id,table)=>{
   
    try{
        alert(JSON.stringify(obj));
        
      
    const returned = await axios.put(`${url}/seminar/ecrCompletion/${table}/${report_id}`,obj)
    return returned.data
    }
    catch(error){
        alert("On Complete "+error)
        // alert("Please fill all fields")
    }
} 
export const onComplete1=async(obj,report_id,table)=>{
   
    try{
        // alert(JSON.stringify(obj));
        // alert(table+','+report_id)
    const returned = await axios.put(`${url}/seminar/ecrCompletion1/${table}/${report_id}`,obj)
    return returned.data
    }
    catch(error){
        alert("On Complete1 "+error)
        // alert("Please fill all fields")
    }
} 


export const loadForLevel1=async(dept,emp)=>{
    // alert(dept)
    try{
    const receive = await axios.get(`${url}/seminar/loadForLevel1/${dept}/${emp}`)
    console.log(receive.data)
    // alert(JSON.stringify(receive.data.resultArr[0]))
    return receive.data.resultArr[0]
    }
    catch(e){
        console.log("No request on level 1");
    }

}
export const loadForLevel2=async(dept,emp)=>{
    try{
    // alert(dept)
    const receive = await axios.get(`${url}/seminar/loadForLevel2/${dept}/${emp}`)
    
    return receive.data.resultArr[0].resultRows
    }
    catch(err){
        console.log("No request on level 2");
    }

}
export const loadForLevel3=async(dept,emp)=>{
    // alert(dept)
    try{
    const receive = await axios.get(`${url}/seminar/loadForLevel3/${dept}/${emp}`)
    return receive.data.resultArr[0].resultRows
}
catch(err){
    console.log("No request on level 3");
}
}
export const loadForLevel4=async(dept,emp)=>{
    // alert(dept)
    try{
    const receive = await axios.get(`${url}/seminar/loadForLevel4/${dept}/${emp}`)
    return receive.data.resultArr[0].resultRows
}
catch(err){
    console.log("No request on level 4");
}
}
export const loadForLevel5=async(dept,emp)=>{
    // alert(dept)
    try{
    const receive = await axios.get(`${url}/seminar/loadForLevel5/${dept}/${emp}`)
    return receive.data.resultArr[0].resultRows
}
catch(err){
    console.log("No request on level 5");
}
}
export const loadComForLevel1=async(dept,emp)=>{
    try{
    // alert(dept)
    // alert(dept+','+emp)
    const receive = await axios.get(`${url}/seminar/completionloadforlevel1/${dept}/${emp}`)
    // alert(JSON.stringify())
    return receive.data.resultArr[0].resultRows
    }
    catch(e){
        console.log("Not found");
    }

}
export const loadComForLevel2=async(dept,emp)=>{
    try{
    // alert(dept)
    const receive = await axios.get(`${url}/seminar/completionloadforlevel2/${dept}/${emp}`)
    return receive.data.resultArr[0].resultRows
    }
    catch(e){
        console.log("Not found in loadComLevel2");
    }

}
export const loadComForLevel3=async(dept,emp)=>{
    try{
    // alert(dept)
    const receive = await axios.get(`${url}/seminar/completionloadforlevel3/${dept}/${emp}`)
    return receive.data.resultArr[0].resultRows
    }
    catch(e){
        console.log("Not found in loadComLevel3");
    }

}
export const loadComForLevel4=async(dept,emp)=>{
    try{
    // alert(dept)
    const receive = await axios.get(`${url}/seminar/completionloadforlevel4/${dept}/${emp}`)
    return receive.data.resultArr[0].resultRows
    }
    catch(e){
        console.log("Not found in loadComLevel4");
    }

}
export const loadComForLevel5=async(dept,emp)=>{
    try{
    // alert(dept)
    const receive = await axios.get(`${url}/seminar/completionloadforlevel5/${dept}/${emp}`)
    return receive.data.resultArr[0].resultRows
    }
    catch(e){
        console.log("Not found in loadComLevel5");
    }

}

export const approveLevel1=async(tab,dept,emp,report_id)=>{
    const receive = await axios.put(`${url}/seminar/acknowledgelevel1/${tab}/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const approveLevel2=async(tab,dept,emp,report_id)=>{
    const receive = await axios.post(`${url}/seminar/acknowledgelevel2/${tab}/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const approveLevel3=async(tab,dept,emp,report_id)=>{
    const receive = await axios.put(`${url}/seminar/acknowledgelevel3/${tab}/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const approveLevel4=async(tab,dept,emp,report_id)=>{
    const receive = await axios.put(`${url}/seminar/acknowledgelevel4/${tab}/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const approveLevel5=async(tab,dept,emp,report_id)=>{
    const receive = await axios.put(`${url}/seminar/acknowledgelevel5/${tab}/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const approveComLevel1=async(tab,dept,emp,report_id)=>{
    const receive = await axios.put(`${url}/seminar/completionacknowledgelevel1/${tab}/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const approveComLevel2=async(tab,dept,emp,report_id)=>{
    // alert("Work")
    const receive = await axios.post(`${url}/seminar/completionacknowledgelevel2/${tab}/${dept}/${emp}/${report_id}`)
    // alert(receive.data);
    return receive.data
}
export const approveComLevel3=async(tab,dept,emp,report_id)=>{
    const receive = await axios.put(`${url}/seminar/completionacknowledgelevel3/${tab}/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const approveComLevel4=async(tab,dept,emp,report_id)=>{
    const receive = await axios.put(`${url}/seminar/completionacknowledgelevel4/${tab}/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const approveComLevel5=async(tab,dept,emp,report_id)=>{
    const receive = await axios.put(`${url}/seminar/completionacknowledgelevel5/${tab}/${dept}/${emp}/${report_id}`)
    return receive.data
}
export const Table=async(empId)=>
{
     // alert("axios called")
    // const url=`${url}/seminar/dept/1`;  
    const temp=await axios.get(`${url}/seminar/dept/${empId}`);
    // alert(JSON.stringify(temp.data.recordsArr))
    return temp;
}
export const onTable=async(report_id,table)=>
{
    const temp=await axios.post(`${url}/seminar/report/${report_id}/${table}`);
    // alert(temp.rows)
    return temp.data;
   
}

export const callLoadForLevel2=async(empid)=>{
    // alert(empid)
    const deptid = 1;


try {
    const response = await axios.get(`${url}/seminar/loadforlevel2/data_management_seminar/${deptid}/${empid}`);
    return response.data;
  } catch (error) {
//  console.log("No request found")
  }
}
export const callLoadComForLevel2=async(empid)=>{
    const deptid = 1;

try {
    const response = await axios.get(`${url}/seminar/completionloadforlevel2/data_management_seminar/${deptid}/${empid}`);
    return response.data;
  } catch (error) {
//  console.log("No request found")
  }
}


export const callAcceptLevel2=async(dept,empid,report_id)=>{
    
    try{
    const response=await axios.put(`${url}/seminar/acknowledgelevel2/data_management_seminar/${dept}/${empid}/${report_id}`)
    return response.data
    }
    catch (error){
        alert("Accept Error")
    }
}

export const callAcceptComLevel2=async(dept,empid,report_id)=>{
    // alert(dept+','+report_id+','+empid)
    try{
    const response=await axios.put(`${url}/seminar/completionacknowledgelevel2/data_management_seminar/${dept}/${empid}/${report_id}`)
    return response.data
    }
    catch (error){
        alert("Accept Error")
    }
}
export const Venue=async()=>{
    const res=await axios.get(`${url}/seminar/dropdownVenue`)
    let ids=[]
    res.data.rows.map((v)=>{
        ids.push(v)
    })
    return ids
    
}

export const Major=async()=>{
    const re=await axios.get(`${url}/seminar/dropdownMajorType`)
    let ids=[]
    re.data.rows.map((v)=>{
        ids.push(v)
    })
    return ids
    
}
export const SubReport=async(mid)=>{
    
        const re=await axios.get(`${url}/seminar/dropdownSubTypeWithMajor/${mid}`)
    let ids=[]
    // alert(JSON.stringify(re.data.rows))
    re.data.rows.map((v)=>{
        ids.push(v)
    })
    // alert(JSON.stringify(ids))
    return ids
    
}
export const Academic=async(sid)=>{
    // const si=3003;
    const re=await axios.get(`${url}/seminar/getAcdYrWithSubType/${sid}`)
    let ids=[]
    re.data.map((v)=>{
        ids.push(v)
    })
    return ids
    
}