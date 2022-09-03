const { urlencoded } = require('express')
const express=require('express')
const nodemailer=require('nodemailer')
const cors=require('cors')

// Port
const port=process.env.PORT || 2000 

// App
const app=express()

// Use
app.use(urlencoded({extended:false}))
app.use(cors())

// Current Year
let dt=new Date()
let currentYear=dt.getFullYear()

app.get('/',(req,res)=>{
    res.send('hi')
})
// Enquiry Post Request
app.post('/enquiry',(req,res)=>{
    try {
        const {username, usercontact, userenquiry}=req.query

        // Transporter
        var transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'newmailer715@gmail.com',
                pass:'xvivyybvtxcnsvkr'
            }
        })
        // Mail Options
        var mailOptions={
            from:'newmailer715@gmail.com',
            // to:'kartikenminocha@gmail.com',
            to:'annibhalla2001@gmail.com',
            subject:'New Quick Enquiry',
            text:`A new quick enquiry has been posted. \nDetails:\nPerson's Name : ${username}\nPerson's Contact Number : ${usercontact}\nPerson's Problem/Enquiry : ${userenquiry} `
        }
        // Send Mail
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
            }
            else{
                console.log('Email Sent : '+info.response)
            }
        })
        res.send({sent: true})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

// Book Appointment Post Request
app.post('/book-appointment',(req,res)=>{
    try {
        person_name=req.query.name
        person_email=req.query.email
        person_contact=req.query.contact
        person_date_slot=req.query.dateSlot
        person_time_slot=req.query.timeSlot
        person_location=req.query.location
        // Transporter1
        var transporter1=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'newmailer715@gmail.com',
                pass:'xvivyybvtxcnsvkr'
            }
        })
        // Mail Options1
        var mailOption1={
            from:'newmailer715@gmail.com',
            // to:'kartikenminocha@gmail.com',
            to:'annibhalla2001@gmail.com',
            subject:'New Appointment',
            text:`A new appointment has been booked.\nDetails:\nPerson's Name : ${person_name}\nPerson's Email : ${person_email}\nPerson's Contact Number : ${person_contact}\nAppointment Date : ${person_date_slot}\nAppointment Time :  ${person_time_slot}\nLocation :  ${person_location}`
        }
        // Send Mail
        transporter1.sendMail(mailOption1,(error,info)=>{
            if(error){
                console.log(error)
            }
            else{
                console.log('Email Sent '+info.response)
            }
        })
        // Transporter2
        var transporter2=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'doctorgauravphysio@gmail.com',
                pass:'kijvvfzwfalryfdo'
            }
        })
        // Mail Options2
        var mailOption2={
            from:'doctorgauravphysio@gmail.com',
            to:person_email,
            subject:'Appointment Booked',
            text:`Your appointment has been booked successfully with us. Please check out the details below.\nName : ${person_name}\nContact Number : ${person_contact}\nAppointment Date : ${person_date_slot}\nAppointment Time :  ${person_time_slot}`
        }
        // Send Mail to User
        transporter2.sendMail(mailOption2,(error,info)=>{
            if(error){
                console.log(error)
            }
            else{
                console.log('Email Sent To User '+info.response)
            }
        })
        res.send({booked: true})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

// App Run
app.listen(port,()=>{
    console.log(`Listening at ${port}`)
})