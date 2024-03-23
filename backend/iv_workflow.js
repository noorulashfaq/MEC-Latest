const express = require("express")
const route = express.Router()
const base = require("./db")
const { resolve } = require("path")
const { rejects } = require("assert")
const { resolveSrv } = require("dns/promises")
// const cors=require('cors')



//get mapping
//async - multiple interactions
route.get('/fetchIv',async(req,res)=>{
    const sql = "select * from data_iv"
    base.query(sql,(err,records)=>{
        if(err){
            res.status(500).json({"error":err.message})
            return
        }
        else if(records.length==0){
            res.status(201).json({"error":"No records found"})  
            return
        }
        res.status(200).json({records})
    })
})
route.post('/proposeIV',async(req,res)=>{
    const {
        date_of_visit_from  ,
        date_of_visit_to ,
        details_of_the_industry_1 ,
        details_of_the_industry_2,
        details_of_the_industry_3,
        name_of_the_contact_person_1,
        designation_of_the_contact_person_1 ,
        phone_no_of_the_contact_person_1 ,
        email_of_the_contact_person_1,
        name_of_the_contact_person_2,
        designation_of_the_contact_person_2 ,
         phone_no_of_the_contact_person_2 ,
        email_of_the_contact_person_2,
        name_of_the_contact_person_3 ,
        designation_of_the_contact_person_3,
        phone_no_of_the_contact_person_3,
        email_of_the_contact_person_3 ,
        name_of_the_inn ,
        address_of_the_inn ,
        phone_no_of_the_inn ,
        students_count,
        faculty_count,
        event_coordinator ,
name_of_the_travel_1 ,
address_of_the_travel_1,
bus_no_of_the_travel_1 ,
operator_of_the_travel_1,
operator_contact_of_the_travel_1,
name_of_the_travel_2 ,
address_of_the_travel_2,
bus_no_of_the_travel_2 ,
operator_of_the_travel_2,
operator_contact_of_the_travel_2 ,
name_of_the_travel_3 ,
address_of_the_travel_3 ,
bus_no_of_the_travel_3 ,
operator_of_the_travel_3 ,
operator_contact_of_the_travel_3,
faculty_accompanied ,
undertaking_from_parents,
acdyr_id,
sem_id,
year_of_students_visited,
sem_of_students_visited,
proposal_date,
dept_id
  } = req.body
    const sql = "insert into data_iv (date_of_visit_from,date_of_visit_to,details_of_the_industry_1 ,details_of_the_industry_2,details_of_the_industry_3,name_of_the_contact_person_1,designation_of_the_contact_person_1 ,phone_no_of_the_contact_person_1,email_of_the_contact_person_1,name_of_the_contact_person_2, designation_of_the_contact_person_2,phone_no_of_the_contact_person_2 ,email_of_the_contact_person_2,name_of_the_contact_person_3 ,designation_of_the_contact_person_3,phone_no_of_the_contact_person_3,email_of_the_contact_person_3 , name_of_the_inn , address_of_the_inn , phone_no_of_the_inn ,students_count,faculty_count,event_coordinator ,name_of_the_travel_1 , address_of_the_travel_1,bus_no_of_the_travel_1 ,operator_of_the_travel_1,operator_contact_of_the_travel_1,name_of_the_travel_2 ,address_of_the_travel_2,bus_no_of_the_travel_2 ,operator_of_the_travel_2,operator_contact_of_the_travel_2,name_of_the_travel_3 , address_of_the_travel_3 ,bus_no_of_the_travel_3 , operator_of_the_travel_3 ,operator_contact_of_the_travel_3,faculty_accompanied,undertaking_from_parents, acdyr_id, sem_id,sem_of_students_visited,year_of_students_visited,proposal_date,dept_id,report_proposal_status,final_proposal_status,report_completion_status,final_completion_status,final_report_status)values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,0,0,0,0)"
    //update mec_students set DOB=?, Age=? where id=?
    base.query(sql,[
        date_of_visit_from,date_of_visit_to,details_of_the_industry_1 ,details_of_the_industry_2,details_of_the_industry_3,name_of_the_contact_person_1,designation_of_the_contact_person_1 ,phone_no_of_the_contact_person_1,email_of_the_contact_person_1,name_of_the_contact_person_2, designation_of_the_contact_person_2,phone_no_of_the_contact_person_2 ,email_of_the_contact_person_2,name_of_the_contact_person_3 ,designation_of_the_contact_person_3,phone_no_of_the_contact_person_3,email_of_the_contact_person_3 , name_of_the_inn , address_of_the_inn , phone_no_of_the_inn ,students_count,faculty_count,event_coordinator ,name_of_the_travel_1 , address_of_the_travel_1,bus_no_of_the_travel_1 ,operator_of_the_travel_1,operator_contact_of_the_travel_1,name_of_the_travel_2 ,address_of_the_travel_2,bus_no_of_the_travel_2 ,operator_of_the_travel_2,operator_contact_of_the_travel_2,name_of_the_travel_3 , address_of_the_travel_3 ,bus_no_of_the_travel_3 , operator_of_the_travel_3 ,operator_contact_of_the_travel_3,faculty_accompanied,undertaking_from_parents, acdyr_id, sem_id,sem_of_students_visited,year_of_students_visited,proposal_date,dept_id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).json({"error":err.message})
            return
        }
        res.status(200).json({"message":"Iv Proposal Sent Successfully"})
    })
})



//get mapping
//async - multiple interactions
route.get('/ivtour',async(req,res)=>{
    const sql = "select * from iv_report"
    base.query(sql,(err,records)=>{
        if(err){
            res.status(500).json({"error":err.message})
            return
        }
        else if(records.length==0){
            res.status(201).json({"error":"No records found"})
            return
        }
        res.status(200).json({records})
    })
})

//put mapping
route.put('/update/:report_id',async(req,res)=>{
    // const sno = req.params.s_no
    const {
        mode_of_transport,
        total_class_strength ,
        no_of_students_visited ,
        students_visited_list,
        places_of_visit,
        date_of_leaving,
leaving_time,
reaching_place,
day_1_reaching_time,
day_1_FN_time ,
day_1_FN_place,
day_1_AN_time ,
day_1_AN_place ,
day_1_night_time,
day_1_night_place,
day_2_FN_time,
day_2_FN_place,
day_2_AN_time,
day_2_AN_place,
day_2_night_time ,
day_2_night_place ,
day_3_FN_time ,
day_3_FN_place ,
day_3_AN_time ,
day_3_AN_place ,
day_3_night_time ,
day_3_night_place ,
date_of_arriving,
time_of_arriving,
completion_date} = req.body
    const sql = "update data_iv set mode_of_transport=?, total_class_strength=?, no_of_students_visited=?, students_visited_list=?, places_of_visit=?,date_of_leaving=?,leaving_time=?,reaching_place=?,day_1_reaching_time=?, day_1_FN_time=?, day_1_FN_place=?, day_1_AN_time=?, day_1_AN_place=?, day_1_night_time=?, day_1_night_place=?, day_2_FN_time=?, day_2_FN_place=?, day_2_AN_time=?, day_2_AN_place=?, day_2_night_time=?, day_2_night_place=?, day_3_FN_time=?, day_3_FN_place=?, day_3_AN_time=?, day_3_AN_place=?, day_3_night_time=?, day_3_night_place=?, date_of_arriving=?, time_of_arriving=?, completion_date=? where report_id=?"
    base.query(sql,[
        mode_of_transport,
        total_class_strength,
        no_of_students_visited,
        students_visited_list,
        places_of_visit,
        date_of_leaving,
        leaving_time,
        reaching_place,
        day_1_reaching_time,
        day_1_FN_time,
        day_1_FN_place,
        day_1_AN_time,
        day_1_AN_place,
        day_1_night_time,
        day_1_night_place,
        day_2_FN_time,
        day_2_FN_place,
        day_2_AN_time,
        day_2_AN_place,
        day_2_night_time,
        day_2_night_place,
        day_3_FN_time,
        day_3_FN_place,
        day_3_AN_time,
        day_3_AN_place,
        day_3_night_time,
        day_3_night_place,
        date_of_arriving,
        time_of_arriving,
        completion_date,
    req.params.report_id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({"error":err.message})
            return
        }
        res.status(200).json({"message":result.affectedRows})
    })
})

route.get('/ivloadforlevel1/:deptId/:empId',async(req, res)=>{
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0|| dId=="0"){
        let sql = `select report_lvl1,data_table_name from data_approval where report_lvl1 like ? and data_table_name="data_iv"`;

        try{
            const rows = await new Promise((resolve, reject)=>{
                base.query(sql,['%'+eId+'%'],(err,row)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(row);
                });
            });
            if(rows.length === 0) {
                console.log("No approvals");
                return;
            }
            let resultArr =[];

                sql = `select * from data_iv where report_proposal_status =0 and final_proposal_status=0 and lvl_1_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;
                const resultRows = await new Promise((resolve,reject)=>{
                    base.query(sql,(err,rows)=>{
                        if(err){
                            console.log(err);
                        reject(err);
                        return;
                        }
                        resolve(rows);
               
                    });
                   
                });

                if(resultRows.length>0){
                    resultArr.push({resultRows});
                }
           
            res.status(200).json({resultArr});
        }catch(error){
            console.error("Error:",error);
            res.status(500).json({error:"Internal Server Error"});
        }
    }else{
        let sql=`select report_lvl1, data_table_name from data_approval where dept_id=? and report_lvl1 like ? and data_table_name="data_iv"`;

        try{
            const rows = await new Promise((resolve,reject)=>{
                base.query(sql,[dId,'%' + eId + '%'],(err,row)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(row);
                });
            });
            if(rows.length===0){
                console.log("No approvals");
                return;
            }
            let resultArr=[];
           
                sql= `select * from data_iv where report_proposal_status=0 and final_proposal_status=0 and lvl_1_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;
                const resultRows = await new Promise((resolve,reject)=>{
                    base.query(sql,(err,rows)=>{
                        if(err){
                            console.log(err);
                            reject(err);
                            return;
                        }
                        resolve(rows);
                    });
                });
                if(resultRows.length >0){
                    resultArr.push({resultRows});
                }
                       res.status(200).json({resultArr});
        }catch(error){
            console.error("Error:",error);
            res.status(500).json({error:"Internal Server Error"});
        }
    }

});

 route.put('/ivacknowledgelevel1/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId = req.params.empId
    const rId=req.params.report_id
    if(dId==0 || dId=="0"){
        alert("DId")
        let sql = `select * from data_approval where data_table_name ="data_iv"`
        base.query(sql,(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            else if(rows.length==0){
                res.status(201).json({error:"No matches found"})
                return
            }
            console.log("Hello"+rows[0].report_lvl2)
            if(rows[0].report_lvl2==""){
                console.log("Hey")
                let sql = `select report_id from data_iv where report_proposal_status=0 and final_proposal_status=0 and report_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[rId],(err,row)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if((row.length==0)){
                        res.status(404).json({error:"No records to acknowledge"})
                        return
                    }
                    console.log(row)
                    sql=`update data_iv set lvl_1_proposal_sign=?,report_proposal_status=report_proposal_status+1,final_proposal_status=final_proposal_status+1 where report_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                    base.query(sql,[eId,rId],(err,result)=>{
                        if(err){
                            console.log("111")
                            res.status(500).json({error:err.message})
                            return
                        }
                        if(result.affectedRows==0){
                            console.log("222")
                            res.status(404).json({error:"Event hasn't completed yet"})
                            return
                        }
                        console.log("333")
                        res.status(200).json({message:"acknowledged by level"})

                    })
                })
            }else{
                console.log("hiiiiiiiiii")
                let sql=`select report_id from data_iv where report_proposal_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[rId],(err,row)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(row.length==0){
                        res.status(404).json({error:"No records to acknowledge"})
                        return
                    }
                    sql=`update data_iv set lvl_1_proposal_sign=?,report_proposal_status=report_proposal_status+1 where report_proposal_status=0  and report_completion_status=0 and final_completion_status=0 and final_report_status=0  and final_proposal_status=0 and report_id=?`
                    base.query(sql,[eId,rId],(err,result)=>{
                        if(err){
                            res.status(500).json({error:err.message})
                            return
                        }
                        if(result.affectedRows==0){
                            res.status(404).json({error:"Event hasn't completed yet"})
                            return
                        }
                        res.status(200).json({message:"acknowledged by level1"})

                    })
                })
            }

        })
    }else{
        let sql=`select * from data_approval where dept_id=? and data_table_name="data_iv"`
        base.query(sql,[dId],(err,rows)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            else if(rows.length==0){
                res.status(201).json({error:"No matches found"})
                return
            }
            console.log("ajdbuq")
            console.log(rows)
            if(rows[0].report_lvl2==""){
                console.log("Hey")
                let sql=`select report_id from data_iv where dept_id=? and report_proposal_status=0 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[dId,rId],(err,row)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(row.length==0){
                        res.status(404).json({error:"No records to acknowledge"})
                        return
                    }
                    console.log(row)
                    sql=`update data_iv set lvl_1_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                    base.query(sql,[eId,dId,rId],(err,result)=>{
                        if(err){
                            console.log("111")
                            res.status(500).json({error:err.message})
                            return
                        }
                        if(result.affectedRows==0){
                            console.log("222")
                            res.status(404).json({error:"Event hasn't completed yet"})
                            return
                        }
                        console.log("333")
                        res.status(200).json({message:"acknowledged by level"})
                    })
            })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where dept_id=? and report_proposal_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        sql=`update data_iv set lvl_1_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and final_proposal_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })

        })
    }
 })
}
 })

 route.get('/ivloadforlevel2/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let resultArr = [];
    if(dId==0||dId=="0"){
        let sql = `select report_lvl2, data_table_name from data_approval where report_lvl2 like ? and data_table_name="data_iv"`;

        try {
            const rows = await new Promise((resolve, reject) => {
                base.query(sql, [ '%' + eId + '%'], (err, row) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(row);
                });
            });
            if (rows.length === 0) {
                console.log("No approvals");
                // res.status(200).json([]);
                return;
            }
           
                sql = `select * from data_iv where report_proposal_status=1 and lvl_2_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;
   
                const resultRows = await new Promise((resolve, reject) => {
                    base.query(sql, (err, rows) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }
                        resolve(rows);
                    });
                });
   
                if (resultRows.length > 0) {
                    resultArr.push({resultRows});
                }

                res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl2, data_table_name from data_approval where dept_id=? and report_lvl2 like ? and data_table_name="data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

       
            sql = `select * from data_iv  where report_proposal_status=1 and lvl_2_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
            res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/ivacknowledgelevel2/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="data_iv"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        console.log(rows)
        console.log("Hello"+rows[0].report_lvl3)
        if(rows[0].report_lvl3==""){
            console.log("HEY")
            let sql=`select report_id from data_iv where report_proposal_status=1 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }

            console.log("In")
            sql=`update data_iv set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[eId,rId],(err,result)=>{
                if(err){
                    console.log("111")
                    res.status(500).json({error:err.message})
                    return
                }
                if(result.affectedRows==0){
                    console.log("222")
                    res.status(404).json({error:"Event hasn't completed yet"})
                    return
                }
                console.log("333")
                res.status(200).json({message:"acknowledged by level"})
            })
        })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where report_proposal_status=1 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        sql=`update data_iv set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1 where report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and final_proposal_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            })
        }
    })
}else{
    let sql = `select * from data_approval where dept_id=? and data_table_name="data_iv"`
base.query(sql,[dId],(err,rows)=>{
    if(err){
        res.status(500).json({error:err.message})
        return
    }
    else if(rows.length==0){
        res.status(201).json({error:"No matches found"})
        return
    }
    console.log("Hello"+rows[0].report_lvl3)
    if(rows[0].report_lvl3==""){
        // console.log("HEY")
        let sql=`select report_id from data_iv where dept_id=? and report_proposal_status=1 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
        base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }

        console.log("In")
        sql=`update data_iv set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
        base.query(sql,[eId,dId,rId],(err,result)=>{
            if(err){
                console.log("111")
                res.status(500).json({error:err.message})
                return
            }
            if(result.affectedRows==0){
                console.log("222")
                res.status(404).json({error:"Event hasn't completed yet"})
                return
            }
            console.log("333")
            res.status(200).json({message:"acknowledged by level"})
        })
    })
}else{
    console.log("hiiiiiiiiii")
    let sql=`select report_id from data_iv where dept_id=? and report_proposal_status=1 and final_report_status=0 and report_id=?`
base.query(sql,[dId,rId],(err,row)=>{
if(err){
    res.status(500).json({error:err.message})
    return
}
if(row.length==0){
    res.status(404).json({error:"No records to acknowledge"})
    return
}

sql=`update data_iv set lvl_2_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and final_proposal_status=0 and report_id=?`
base.query(sql,[eId,dId,rId],(err,result)=>{
    if(err){
        res.status(500).json({error:err.message})
        return
    }
    if(result.affectedRows==0){
        res.status(404).json({error:"Event hasn't completed yet"})
        return
    }
    res.status(200).json({message:"acknowledged by level"})
})
})
}
})
}
})


route.get('/ivloadforlevel3/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let resultArr = [];
    if(dId==0||dId=="0"){
        let sql = `select report_lvl3, data_table_name from data_approval where report_lvl3 like ? and data_table_name="data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No records");
            // res.status(200).json([]);
            return;
        }

       
            sql = `select * from data_iv  where report_proposal_status=2 and lvl_3_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }

            res.status(200).json({resultArr});
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
        }else{
            let sql = `select report_lvl3, data_table_name from data_approval where dept_id=? and report_lvl3 like ? and data_table_name="data_iv"`;
   
        try {
            const rows = await new Promise((resolve, reject) => {
                base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(row);
                });
            });

            if (rows.length === 0) {
                console.log("No records");
                // res.status(200).json([]);
                return;
            }

   
                sql = `select * from data_iv  where report_proposal_status=2 and lvl_3_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;
   
                const resultRows = await new Promise((resolve, reject) => {
                    base.query(sql, (err, rows) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }
                        resolve(rows);
                    });
                });
   
                if (resultRows.length > 0) {
                    resultArr.push({resultRows});
                }
                res.status(200).json({resultArr});
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
            }
        });

        route.put('/ivacknowledgelevel3/:deptId/:empId/:report_id',async(req,res)=>{
            const dId=req.params.deptId
            const eId=req.params.empId
            const rId=req.params.report_id
            if(dId==0||dId=="0"){
                let sql = `select * from data_approval where data_table_name="data_iv"`
            base.query(sql,(err,rows)=>{
                if(err){
                    res.status(500).json({error:err.message})
                    return
                }
                else if(rows.length==0){
                    res.status(201).json({error:"No matches found"})
                    return
                }
           
         // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl4==""){
            console.log("HEY")
            let sql=`select report_id from data_iv where report_proposal_status=2 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }


            console.log("In")
                sql=`update data_iv set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where report_proposal_status=2 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
            })
               }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where report_proposal_status=2 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }

        sql=`update data_iv set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1 where report_proposal_status=2 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="data_iv"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }

        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl4==""){
            console.log("HEY")
            let sql=`select report_id from data_iv where dept_id=? and report_proposal_status=2 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }

            console.log("In")
            sql=`update data_iv set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=2 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[eId,dId,rId],(err,result)=>{
                if(err){
                    console.log("111")
                    res.status(500).json({error:err.message})
                    return
                }
                if(result.affectedRows==0){
                    console.log("222")
                    res.status(404).json({error:"Event hasn't completed yet"})
                    return
                }
                console.log("333")
                res.status(200).json({message:"acknowledged by level"})
            })

        })
    }else{
        console.log("hiiiiiiiiii")
        let sql=`select report_id from data_iv where dept_id=? and report_proposal_status=2 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
base.query(sql,[dId,rId],(err,row)=>{
    if(err){
        res.status(500).json({error:err.message})
        return
    }
    if(row.length==0){
        res.status(404).json({error:"No records to acknowledge"})
        return
    }

    sql=`update data_iv set lvl_3_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=2 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            })
        }
    })
}
        })

            route.get('/ivloadforlevel4/:deptId/:empId', async (req, res) => {
                const dId = req.params.deptId;
                const eId = req.params.empId;
                let resultArr = [];
                if(dId==0||dId=="0"){
                    let sql = `select report_lvl4, data_table_name from data_approval where report_lvl4 like ? and data_table_name="data_iv"`;
           
                try {
                    const rows = await new Promise((resolve, reject) => {
                        base.query(sql, [ '%' + eId + '%'], (err, row) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                                return;
                            }
                            resolve(row);
                        });
                    });
           
                    if (rows.length === 0) {
                        console.log("No records");
                        // res.status(200).json([]);
                        return;
                    }

                   
                        sql = `select * from data_iv where report_proposal_status=3 and lvl_4_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;
           
                        const resultRows = await new Promise((resolve, reject) => {
                            base.query(sql, (err, rows) => {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                    return;
                                }
                                resolve(rows);
                            });
                        });
           
                        if (resultRows.length > 0) {
                            resultArr.push({resultRows});
                        }

                        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl4, data_table_name from data_approval where dept_id=? and report_lvl4 like ? and data_table_name="data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No records");
            // res.status(200).json([]);
            return;
        }

            sql = `select * from data_iv where report_proposal_status=3 and lvl_4_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });
            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }

            res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


});
route.put('/ivacknowledgelevel4/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="data_iv"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl5==""){
            console.log("HEY")
            let sql=`select report_id from data_iv where report_proposal_status=3 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
            console.log("In")
            sql=`update data_iv set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where report_proposal_status=3 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[eId,rId],(err,result)=>{
                if(err){
                    console.log("111")
                    res.status(500).json({error:err.message})
                    return
                }
                if(result.affectedRows==0){
                    console.log("222")
                    res.status(404).json({error:"Event hasn't completed yet"})
                    return
                }
                console.log("333")
                res.status(200).json({message:"acknowledged by level"})
            })
        })
    }else{
        console.log("hiiiiiiiiii")
        let sql=`select report_id from data_iv where report_proposal_status=3 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
base.query(sql,[rId],(err,row)=>{
    if(err){
        res.status(500).json({error:err.message})
        return
    }
    if(row.length==0){
        res.status(404).json({error:"No records to acknowledge"})
        return
    }

    sql=`update data_iv  set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1 where report_proposal_status=3 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[eId,rId],(err,result)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({error:"Event hasn't completed yet"})
            return
        }
        res.status(200).json({message:"acknowledged by level"})
    })

})
}
})
}else{
let sql = `select * from data_approval where dept_id=? and data_table_name="data_iv" `
base.query(sql,[dId],(err,rows)=>{
if(err){
    res.status(500).json({error:err.message})
    return
}
else if(rows.length==0){
    res.status(201).json({error:"No matches found"})
    return
}
// res.status(200).json({rows})
console.log("Hello"+rows[0].report_lvl4)
if(rows[0].report_lvl5==""){
    console.log("HEY")
    let sql=`select report_id from data_iv where dept_id=? and report_proposal_status=3 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
    if(err){
        res.status(500).json({error:err.message})
        return
    }
    if(row.length==0){
        res.status(404).json({error:"No records to acknowledge"})
        return
    }
    console.log("In")
                sql=`update data_iv set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=3 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
            })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where dept_id=? and report_proposal_status=3 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }

        sql=`update data_iv set lvl_4_proposal_sign=?, report_proposal_status=report_proposal_status+1 where dept_id=? and report_proposal_status=3 and final_proposal_status=0 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
        base.query(sql,[eId,dId,rId],(err,result)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(result.affectedRows==0){
                res.status(404).json({error:"Event hasn't completed yet"})
                return
            }
            res.status(200).json({message:"acknowledged by level"})
        })

    })
}
})
}
})

route.get('/ivloadforlevel5/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let resultArr = [];
    if(dId==0||dId=="0"){
        let sql = `select report_lvl5, data_table_name from data_approval where report_lvl5 like ? and data_table_name="data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql,["%"+eId+"%"],(err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No records");
            // res.status(200).json([]);
            return;
        }

       
            sql = `select * from data_iv  where report_proposal_status=4 and lvl_5_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }

            res.status(200).json({resultArr});
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
        }else{
            let sql = `select report_lvl5, data_table_name from data_approval where dept_id=? and report_lvl5 like ? and data_table_name="data_iv"`;
   
        try {
            const rows = await new Promise((resolve, reject) => {
                base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(row);
                });
            });
   
            if (rows.length == 0) {
                console.log("No records");
                // res.status(200).json([]);
                return;
            }

       
                sql = `select * from data_iv where report_proposal_status=4 and lvl_5_proposal_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=${dId}`;
   
                const resultRows = await new Promise((resolve, reject) => {
                    base.query(sql, (err, rows) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }
                        resolve(rows);
                    });
                });
   
                if (resultRows.length > 0) {
                    resultArr.push({resultRows});
                }

                res.status(200).json({resultArr});
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
            }
        });

        route.put('/ivacknowledgelevel5/:deptId/:empId/:report_id',async(req,res)=>{
            const dId=req.params.deptId
            const eId=req.params.empId
            const rId=req.params.report_id
            if(dId==0||dId=="0"){
                let sql=`select report_id from data_iv where report_proposal_status=4 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
                if(err){
                    res.st
        atus(500).json({error:err.message})
                    return
                }
                if(row.length==0){
                    res.status(404).json({error:"No records to acknowledge"})
                    return
                }

                sql=`update data_iv set lvl_5_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where report_proposal_status=4 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })

            })
        }else{
            let sql=`select report_id from data_iv where dept_id=? and report_proposal_status=4 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
        base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }

            sql=`update data_iv set lvl_5_proposal_sign=?, report_proposal_status=report_proposal_status+1, final_proposal_status=final_proposal_status+1 where dept_id=? and report_proposal_status=4 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[eId,dId,rId],(err,result)=>{
                if(err){
                    res.status(500).json({error:err.message})
                    return
                }
                if(result.affectedRows==0){
                    res.status(404).json({error:"Event hasn't completed yet"})
                    return
                }
                res.status(200).json({message:"acknowledged by level"})
            })
        })
    }
})

//completion................//

route.get('/loadivCompletion/:deptId/:tableName',async(req,res)=>{
    const dId=req.params.deptId
    let sql=`select * from data_iv where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and dept_id=?`
    base.query(sql,[dId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No workshop to be approved"})
            return
        }
        res.status(200).json({row})
    })
})

//------------------//

route.get('/ivcompletionloadforlevel1/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0||dId=="0"){
        let sql = `select report_lvl1,data_table_name from data_approval where report_lvl1 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }


            sql = `select * from data_iv  AS seminar INNER JOIN data_sub_report_type AS sub_report_type ON seminar.event_name = sub_report_type.table_name INNER JOIN data_major_report_type AS major_report_type ON sub_report_type.major_report_id = major_report_type.major_report_id   where final_proposal_status=1 and lvl_1_completion_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
       

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl1,data_table_name from data_approval where dept_id=? and report_lvl1 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

            sql = `select * from data_iv where final_proposal_status=1 and lvl_1_completion_sign is null and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and completion_date is not null and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
       

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});




route.put('/ivcompletionacknowledgelevel1/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="data_iv"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){    
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl2)
        if(rows[0].report_lvl2==null){
            console.log("HEY")
            let sql=`select report_id from data_iv where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            console.log("In")
                sql=`update data_iv set lvl_1_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1,final_report_status=final_report_status+1 where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        sql=`update data_iv  set lvl_1_completion_sign=?, report_completion_status=report_completion_status+1 where final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="data_iv"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl2)
        if(rows[0].report_lvl2==null){
            console.log("HEY")
            let sql=`select report_id from data_iv where dept_id=? and final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            console.log("In")
            sql=`update data_iv set lvl_1_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1,final_report_status=final_report_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[eId,dId,rId],(err,result)=>{
                if(err){
                    console.log("111")
                    res.status(500).json({error:err.message})
                    return
                }
                if(result.affectedRows==0){
                    console.log("222")
                    res.status(404).json({error:"Event hasn't completed yet"})
                    return
                }
                console.log("333")
                res.status(200).json({message:"acknowledged by level"})
            })
    //     }
    //     else{
    //         res.status(404).json({error:"Forbidden access"})
    //     }
    // })
})
    }else{
        console.log("hiiiiiiiiii")
        let sql=`select report_id from data_iv where dept_id=? and final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
base.query(sql,[dId,rId],(err,row)=>{
    if(err){
        res.status(500).json({error:err.message})
        return
    }
    if(row.length==0){
        res.status(404).json({error:"No records to acknowledge"})
        return
    }

    sql=`update data_iv set lvl_1_completion_sign=?, report_completion_status=report_completion_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=0 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[eId,dId,rId],(err,result)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(result.affectedRows==0){
            res.status(404).json({error:"Event hasn't completed yet"})
            return
        }
        res.status(200).json({message:"acknowledged by level"})
    })
//     }
//     else{
//         res.status(404).json({error:"Forbidden access"})
//     }
// })
})
}
})
}
})

route.get('/ivcompletionloadforlevel2/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    let resultArr = [];  // Declare resultArr before the loop
    if(dId==0||dId=="0"){
        let sql = `select report_lvl2, data_table_name from data_approval where report_lvl2 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

        for (let i = 0; i < rows.length; i++) {
            sql = `select * from data_iv where report_completion_status=1 and lvl_2_completion_sign is null and final_proposal_status=1 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl2, data_table_name from data_approval where dept_id=? and report_lvl2 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            // res.status(200).json([]);
            return;
        }

       
            sql = `select * from data_iv where report_completion_status=1 and lvl_2_completion_sign is null and final_proposal_status=1 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
       

        res.status(200).json({resultArr});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.post('/ivcompletionacknowledgelevel2/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="data_iv"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl3)
        if(rows[0].report_lvl3==null){
            console.log("HEY")
            let sql=`select report_id from data_iv where final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)

            console.log("In")
                sql=`update data_iv set lvl_2_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        sql=`update data_iv set lvl_2_completion_sign=?, report_completion_status=report_completion_status+1 where final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
        base.query(sql,[eId,rId],(err,result)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(result.affectedRows==0){
                res.status(404).json({error:"Event hasn't completed yet"})
                return
            }
            res.status(200).json({message:"acknowledged by level"})
        })

    })
}
})
}else{
let sql = `select * from data_approval where dept_id=? and data_table_name="data_iv"`
base.query(sql,[dId],(err,rows)=>{
if(err){
    res.status(500).json({error:err.message})
    return
}
else if(rows.length==0){
    res.status(201).json({error:"No matches found"})
    return
}
// res.status(200).json({rows})
console.log("Hello"+rows[0].report_lvl3)
if(rows[0].report_lvl3==null){
    console.log("HEY")
    let sql=`select report_id from data_iv where dept_id=? and final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
    if(err){
        res.status(500).json({error:err.message})
        return
    }
    if(row.length==0){
        res.status(404).json({error:"No records to acknowledge"})
        return
    }
//no need
    console.log(row)

    console.log("In")
                sql=`update data_iv set lvl_2_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where dept_id=? and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        sql=`update data_iv set lvl_2_completion_sign=?, report_completion_status=report_completion_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })

            })
        }
    })
    }
})

route.get('/ivcompletionloadforlevel3/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0||dId=="0"){
        let sql = `select report_lvl3, data_table_name from data_approval where report_lvl3 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

     
            sql = `select * from data_iv where final_proposal_status=1 and lvl_3_completion_sign is null and final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
       

        if (resultArr.length > 0) {
            res.status(200).json({resultArr});
        } else {
            console.log("No records");
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl3, data_table_name from data_approval where dept_id=? and report_lvl3 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

        const resultArr = [];
        for (let i = 0; i < rows.length; i++) {
            sql = `select * from data_iv where final_proposal_status=1 and lvl_3_completion_sign is null and final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({resultRows});
            }
        }

        if (resultArr.length > 0) {
            res.status(200).json({resultArr});
        } else {
            console.log("No records");
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/ivcompletionacknowledgelevel3/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="data_iv"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl4==null){
            console.log("HEY")
            let sql=`select report_id from data_iv where final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
            console.log("In")
                sql=`update data_iv set lvl_3_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1 where report_completion_status=2 and final_proposal_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        sql=`update data_iv set lvl_3_completion_sign=?, report_completion_status=report_completion_status+1 where final_proposal_status=1 and final_completion_status=0 and report_completion_status=2 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="data_iv"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl4==null){
            console.log("HEY")
            let sql=`select report_id from data_iv where dept_id=? and final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
            console.log("In")
                sql=`update data_iv set lvl_3_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1 where dept_id=? and report_completion_status=2 and final_proposal_status=1 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where dept_id=? and final_proposal_status=1 and report_completion_status=2 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        sql=`update data_iv set lvl_3_completion_sign=?, report_completion_status=report_completion_status+1 where dept_id=? and final_proposal_status=1 and final_completion_status=0 and report_completion_status=2 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            })
        }
    })
    }
})

route.get('/ivcompletionloadforlevel4/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0||dId=="0"){
        let sql = `select report_lvl4, data_table_name from data_approval where report_lvl4 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

            sql = `select * from data_iv where final_proposal_status=1 and lvl_4_completion_sign is null and report_completion_status=3 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({ resultRows });
            }
       

        if (resultArr.length > 0) {
            res.status(200).json({ resultArr });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl4, data_table_name from data_approval where dept_id=? and report_lvl4 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

     
            sql = `select * from data_iv where final_proposal_status=1 and lvl_4_completion_sign is null and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({ resultRows });
            }
       

        if (resultArr.length > 0) {
            res.status(200).json({ resultArr });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/ivcompletionacknowledgelevel4/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql = `select * from data_approval where data_table_name="data_iv"`
    base.query(sql,(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl5==null){
            console.log("HEY")
            let sql=`select report_id from data_iv where final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            console.log("In")
            sql=`update data_iv set lvl_4_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[eId,rId],(err,result)=>{
                if(err){
                    console.log("111")
                    res.status(500).json({error:err.message})
                    return
                }
                if(result.affectedRows==0){
                    console.log("222")
                    res.status(404).json({error:"Event hasn't completed yet"})
                    return
                }
                console.log("333")
                res.status(200).json({message:"acknowledged by level"})
            })
        })
    }else{
        console.log("hiiiiiiiiii")
        let sql=`select report_id from data_iv where final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
base.query(sql,[rId],(err,row)=>{
    if(err){
        res.status(500).json({error:err.message})
        return
    }
    if(row.length==0){
        res.status(404).json({error:"No records to acknowledge"})
        return
    }
    sql=`update data_iv set lvl_4_completion_sign=?, report_completion_status=report_completion_status+1 where final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }else{
        let sql = `select * from data_approval where dept_id=? and data_table_name="data_iv"`
    base.query(sql,[dId],(err,rows)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        else if(rows.length==0){
            res.status(201).json({error:"No matches found"})
            return
        }
        // res.status(200).json({rows})
        console.log("Hello"+rows[0].report_lvl4)
        if(rows[0].report_lvl5==null){
            console.log("HEY")
            let sql=`select report_id from data_iv where dept_id=? and final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
            base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
        //no need
            console.log(row)
            console.log("In")
                sql=`update data_iv set lvl_4_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        console.log("111")
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        console.log("222")
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    console.log("333")
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }else{
            console.log("hiiiiiiiiii")
            let sql=`select report_id from data_iv where dept_id=? and final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[dId,rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        sql=`update data_iv set lvl_4_completion_sign=?, report_completion_status=report_completion_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=3 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
        //     }
        //     else{
        //         res.status(404).json({error:"Forbidden access"})
        //     }
        // })
    })
        }
    })
    }
})

route.get('/ivcompletionloadforlevel5/:deptId/:empId', async (req, res) => {
    const dId = req.params.deptId;
    const eId = req.params.empId;
    if(dId==0||dId=="0"){
        let sql = `select report_lvl5, data_table_name from data_approval where report_lvl5 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [ '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

       
            sql = `select * from data_iv  where final_proposal_status=1 and lvl_5_completion_sign is null and report_completion_status=4 and final_completion_status=0 and final_report_status=0`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({ resultRows });
            }
       

        if (resultArr.length > 0) {
            res.status(200).json({ resultArr });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }else{
        let sql = `select report_lvl5, data_table_name from data_approval where dept_id=? and report_lvl5 like ? and data_table_name != "data_iv"`;

    try {
        const rows = await new Promise((resolve, reject) => {
            base.query(sql, [dId, '%' + eId + '%'], (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });

        if (rows.length === 0) {
            console.log("No approvals");
            return;
        }

       
            sql = `select * from data_iv where final_proposal_status=1 and lvl_5_completion_sign is null and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and dept_id=?`;

            const resultRows = await new Promise((resolve, reject) => {
                base.query(sql, [dId], (err, rows) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            });

            if (resultRows.length > 0) {
                resultArr.push({ resultRows });
            }
       

        if (resultArr.length > 0) {
            res.status(200).json({ resultArr });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
    }
});

route.put('/ivcompletionacknowledgelevel5/:tableName/:deptId/:empId/:report_id',async(req,res)=>{
    const dId=req.params.deptId
    const eId=req.params.empId
    const rId=req.params.report_id
    if(dId==0||dId=="0"){
        let sql=`select report_id from data_iv where final_proposal_status=1 and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and report_id=?`
    base.query(sql,[rId],(err,row)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(row.length==0){
            res.status(404).json({error:"No records to acknowledge"})
            return
        }
        sql=`update data_iv set lvl_5_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where final_proposal_status=1 and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            })
        }else{
            let sql=`select report_id from data_iv where dept_id=? and final_proposal_status=1 and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and report_id=?`
        base.query(sql,[dId,rId],(err,row)=>{
            if(err){
                res.status(500).json({error:err.message})
                return
            }
            if(row.length==0){
                res.status(404).json({error:"No records to acknowledge"})
                return
            }
            sql=`update data_iv set lvl_5_completion_sign=?, report_completion_status=report_completion_status+1, final_completion_status=final_completion_status+1, final_report_status=final_report_status+1 where dept_id=? and final_proposal_status=1 and report_completion_status=4 and final_completion_status=0 and final_report_status=0 and report_id=?`
                base.query(sql,[eId,dId,rId],(err,result)=>{
                    if(err){
                        res.status(500).json({error:err.message})
                        return
                    }
                    if(result.affectedRows==0){
                        res.status(404).json({error:"Event hasn't completed yet"})
                        return
                    }
                    res.status(200).json({message:"acknowledged by level"})
                })
            })
        }
    })










route.get('/data/:report_id', (req, res) => {
    const report_id = req.params.report_id;
    const sql =  `SELECT * FROM data_iv where report_id=?`;
   
 
    base.query(sql,[report_id], (err, results) => {
      if (err) {
        res.status(500).json(err.message)
        return
      }else if(results.length==0){
        res.status(404).json("No records")
        return
      }
 
      res.status(200).json(results[0]);
    });
  });
module.exports=route