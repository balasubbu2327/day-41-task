console.log("hello");
console.log("vinitha");
import express from "express";

import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();


// const rooms=[{
//     "customer_name":"",
//     "room_name":"A1",
//     "no_of_seats":4,
//     "booked_status":"NO",
//     "date":"",
//     "start_time":"",
//     "end_time" :"",
//     "room_id":1
//  },
//  {
//      "customer_name":"",
//      "room_name":"A2",
//      "no_of_seats":4,
//      "booked_status":"NO",
//      "date":"",
//      "start_time":"",
//      "end_time" :"",
//      "room_id":2
//   },
//   {
//      "customer_name":"",
//      "room_name":"A3",
//      "no_of_seats":4,
//      "booked_status":"NO",
//      "date":"",
//      "start_time":"",
//      "end_time" :"",
//      "room_id":3
//   },
//   {
//      "customer_name":"",
//      "room_name":"A4",
//      "no_of_seats":4,
//      "booked_status":"NO",
//      "date":"",
//      "start_time":"",
//      "end_time" :"",
//      "room_id":4
//   }
//  ];

// console.log(rooms.length);

const PORT=process.env.PORT;
const rooms = [];

app.post("/createroom", function (req, res) {

    req.body.id = rooms.length + 1;
    req.body.booking_status = false;
    let data = req.body;
    rooms.push(data);
    console.log(data);
    res.send(data);

})
app.post("/bookingroom/:id", function (req, res) {
    let data = req.body;
    let { id } = req.params;
    id = id - 1;

    if (rooms[id].booking_status === false) {
        let { customer_name, Date, Start_Time, End_Time } = data;
        rooms[id].customer_name = customer_name;
        rooms[id].Date = Date;
        rooms[id].Start_Time = Start_Time;
        rooms[id].End_Time = End_Time;
        rooms[id].booking_status = true;
        console.log(rooms);
        res.send("your room is booked");
    } else {
        res.send("This room is already booked")
    }


});


app.get("/allrooms", function (req, res) {
    res.send(rooms.map(room => room));
})

app.get("/allcustomers", function (req, res) {
    const customers = rooms.filter(room => room.booking_status == true);
    console.log(customers);
    const filteredcustomers = customers.map((customer) => {
        return {
            name: customer.customer_name,
            room_name: customer.room_name,
            date: customer.date,
            start_time: customer.Start_Time,
            end_time: customer.End_Time
        }
    }
    )
    res.send(filteredcustomers)
})


app.listen(PORT, () => console.log("Server started"));