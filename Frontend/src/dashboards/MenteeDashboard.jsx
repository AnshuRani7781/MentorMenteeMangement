// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import axios from "axios";
// import { UserAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const MenteeDashboard = () => {
//   const { user, googleSignIn, logout } = UserAuth();
//   const [mentorSlots, setMentorSlots] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [availableSlots, setAvailableSlots] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMentorSlots();
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     if (!user) {
//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     }
//   }, [user, navigate]);

//   const handleLogout = async () => {
//     await logout();
//   };

//   const fetchMentorSlots = async (selectedDate) => {
//     try {
//       // Convert selected date to weekday (e.g., "Monday", "Tuesday")
//       const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });

//       // Fetch available slots for this weekday
//       const response = await axios.get(`https://localhost:5000///api/mentors/available-slots?date=${dayOfWeek}`);

//       console.log("Mentor Slots:", response.data);
//       setMentorSlots(response.data);
//     } catch (error) {
//       console.error("Error fetching mentor slots:", error);
//     }
//   };

//   // Fetch booking history
//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get("https://localhost:5000///api/bookings");
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);

//     // Convert selected date to weekday (e.g., "Monday")
//     const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

//     // Filter slots based on the selected weekday
//     const filteredSlots = mentorSlots.filter((slot) => slot.date === dayOfWeek);

//     setAvailableSlots(filteredSlots);
//   };

//   // Book a mentor session
//   const bookSession = async (mentorId, slotTime) => {
//     try {
//       await axios.post("https://localhost:5000///book-slot", {
//         mentorId,
//         slot: slotTime,
//       });
//       alert("Session booked successfully!");
//       fetchBookings(); // Refresh booking history
//     } catch (error) {
//       console.error("Error booking session:", error);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center py-10">
//         {/* Navbar */}
//         <div className="navbar bg-white bg-opacity-20 backdrop-blur-md shadow-lg w-full max-w-5xl h-16 flex items-center px-8 text-white justify-between rounded-lg">
//           <h1 className="text-2xl font-bold">Mentor Mentee Portal</h1>
//           {user ? (
//             <div className="flex items-center space-x-4">
//               <img
//                 src={user.profilePic}
//                 alt="User Profile"
//                 className="w-10 h-10 rounded-full border-2 border-white"
//               />
//               <span className="text-lg">{user.name}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={googleSignIn}
//               className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
//             >
//               Sign In
//             </button>
//           )}
//         </div>

//         {/* Dashboard Sections */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-5xl">
//           {/* Calendar Section */}
//           <div className="p-6 bg-gray-100 bg-opacity-20 backdrop-blur-md shadow-md rounded-xl flex items-center flex-col ">
//             <h3 className="text-2xl font-bold  text-gray-700 p-2 mb-3">
//               Select a Date
//             </h3>
//             <Calendar
//               onChange={handleDateChange}
//               value={selectedDate}
//               className="bg-gray-100 bg-opacity-30  rounded-lg p-4 shadow-md mb-4"
//             />
//           </div>

//           {/* Available Slots */}
//           <div className="p-6 bg-gray-100 flex flex-col items-center bg-opacity-20 backdrop-blur-md shadow-md rounded-xl ">
//             <h3 className="text-2xl font-bold text-gray-700 mb-3">
//               Available Slots on : <span className="text-blue-500 font-semibold text-xl font-mono">
//               {selectedDate.toDateString()}
//               </span>
//             </h3>
//             {mentorSlots.length > 0 ? (
//               <ul className="space-y-3">
//                 {mentorSlots.map((slot) => (
//                   <li
//                     key={slot._id}
//                     className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
//                   >
//                     <span className="font-medium">
//                       {slot.mentorName} - {slot.time}
//                     </span>
//                     <button
//                       onClick={() => bookSession(slot.mentorId, slot.time)}
//                       className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
//                     >
//                       Book
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-200">No slots available for this date.</p>
//             )}
//           </div>
//         </div>

//         {/* Booking History */}
//         <div className="p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-md rounded-xl mt-10 w-full max-w-5xl">
//           <h3 className="text-lg font-semibold text-white mb-3">
//             Booking History
//           </h3>
//           <ul className="space-y-2">
//             {bookings.map((booking) => (
//               <li
//                 key={booking.id}
//                 className="bg-white p-3 rounded-lg shadow-md"
//               >
//                 {booking.mentorName} - {booking.slot}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MenteeDashboard;

//----------------------------------------------------------------//

// import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import axios from "axios";
// import { UserAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const MenteeDashboard = () => {
//   const { user, googleSignIn, logout } = UserAuth();
//   const [mentorSlots, setMentorSlots] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [availableSlots, setAvailableSlots] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     if (!user) {
//       setTimeout(() => {
//         navigate("/login");
//       }, 1000);
//     }
//   }, [user, navigate]);

//   const handleLogout = async () => {
//     await logout();
//   };

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get("https://localhost:5000///api/bookings");
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };

//   const fetchMentorSlots = async (selectedDate) => {
//     try {
//       // Convert selected date to weekday (e.g., "Monday", "Tuesday")
//       const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });

//       console.log(`Fetching available slots for: ${dayOfWeek}`);
//       // Fetch available slots for this weekday
//       const response = await axios.get(`https://localhost:5000///api/mentor/available-slots?date=${dayOfWeek}`);
//       console.log("Mentor Slots:", response.data);
//       setMentorSlots(response.data);
//     } catch (error) {
//       console.error("Error fetching mentor slots:", error);
//     }
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     fetchMentorSlots(date);
//   };

//   // Book a mentor session
//   const bookSession = async (mentorId, slotTime) => {
//     try {
//       await axios.post("https://localhost:5000///book-slot", {
//         mentorId,
//         slot: slotTime,
//       });
//       alert("Session booked successfully!");
//       fetchBookings(); // Refresh booking history
//     } catch (error) {
//       console.error("Error booking session:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex flex-col items-center py-10">
//       {/* Navbar */}
//       <div className="navbar bg-white bg-opacity-20 backdrop-blur-md shadow-lg w-full max-w-5xl h-16 flex items-center px-8 text-white justify-between rounded-lg">
//         <h1 className="text-2xl font-bold">Mentor Mentee Portal</h1>
//         {user ? (
//           <div className="flex items-center space-x-4">
//             <img
//               src={user.profilePic}
//               alt="User Profile"
//               className="w-10 h-10 rounded-full border-2 border-white"
//             />
//             <span className="text-lg">{user.name}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={googleSignIn}
//             className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
//           >
//             Sign In
//           </button>
//         )}
//       </div>

//       {/* Dashboard Sections */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-5xl">
//         {/* Calendar Section */}
//         <div className="p-6 bg-gray-100 bg-opacity-20 backdrop-blur-md shadow-md rounded-xl flex items-center flex-col ">
//           <h3 className="text-2xl font-bold text-gray-700 p-2 mb-3">
//             Select a Date
//           </h3>
//           <Calendar
//             onChange={handleDateChange}
//             value={selectedDate}
//             className="bg-gray-100 bg-opacity-30  rounded-lg p-4 shadow-md mb-4"
//           />
//         </div>

//         {/* Available Slots */}
//         <div className="p-6 bg-gray-100 flex flex-col items-center bg-opacity-20 backdrop-blur-md shadow-md rounded-xl ">
//           <h3 className="text-2xl font-bold text-gray-700 mb-3">
//             Available Slots on : <span className="text-blue-500 font-semibold text-xl font-mono">
//             {selectedDate.toDateString()}
//             </span>
//           </h3>
//           {mentorSlots.length > 0 ? (
//             <ul className="space-y-3">
//               {mentorSlots.map((slot) => (
//                 <li
//                   key={slot._id}
//                   className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
//                 >
//                   <span className="font-medium">
//                     {/* Check if mentorId exists and has name */}
//                     {slot.mentorId && slot.mentorId.name
//                       ? slot.mentorId.name
//                       : "Mentor information unavailable"}
//                     - {slot.startTime} to {slot.endTime}
//                   </span>
//                   <button
//                     onClick={() => bookSession(slot.mentorId._id, `${slot.startTime} - ${slot.endTime}`)}
//                     className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
//                   >
//                     Book
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-200">No slots available for this date.</p>
//           )}
//         </div>
//       </div>

//       {/* Booking History */}
//       <div className="p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-md rounded-xl mt-10 w-full max-w-5xl">
//         <h3 className="text-lg font-semibold text-white mb-3">
//           Booking History
//         </h3>
//         <ul className="space-y-2">
//           {bookings.map((booking) => (
//             <li
//               key={booking._id}
//               className="bg-white p-3 rounded-lg shadow-md"
//             >
//               {booking.mentorName} - {booking.slot}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MenteeDashboard;

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserCircle, CalendarDays, CalendarClock, User, Clock, LogOut } from "lucide-react";

const MenteeDashboard = () => {
  const { user, googleSignIn, logout } = UserAuth(); 
  
  const [mentorSlots, setMentorSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isBooked, setIsBooked] = useState(false); // Track booking status
  const [bookingDetails, setBookingDetails] = useState(null); // Store booking details
  const [bookedSlotIds, setBookedSlotIds] = useState([]); // Track booked slot IDs

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings(); 
     fetchAllMentorSlots();
  }, []);

  

  const handleLogout = async () => {
    await logout();
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure token is used
      if (!token) {
        alert("You need to log in first!");
        return;
      }

      const response = await axios.get(
        "https://mentormenteemangement.onrender.com/api/mentee/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token for authentication
          },
        }
      );

      setBookings(response.data);
      console.log("Bookings:", response.data);

      // Track booked slot IDs
      const bookedSlots = response.data.map((booking) => booking._id); // Use _id instead of slotId
      setBookedSlotIds(bookedSlots);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // 
  
  
  // new
  
    const fetchAllMentorSlots = async () => {
      try {
        console.log("Fetching all available slots for all mentors");
        const response = await axios.get(
          `https://mentormenteemangement.onrender.com/api/mentor/all-available-slots`
        );
        // Assuming the response contains a list of mentors with their available slots
        setMentorSlots(response.data);
      } catch (error) {
        console.error("Error fetching mentor slots:", error);
      }
    };
   



  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchMentorSlots(date);
  };

  // Book a mentor session
  const bookSession = async (mentorId, slotTime, selectedDate, slotId) => {
    // const date = selectedDate.toISOString().split("T")[0]; // Format: "YYYY-MM-DD"

    try {
      const token = localStorage.getItem("token"); // Get token from local storage

      console.log("Booking Session:", { mentorId, slotTime });
      //console.log("token:", token);
      if (!token) {
        alert("You need to log in first!");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "https://mentormenteemangement.onrender.com/api/mentee/book-slot",
        {
          mentorId,
          slot: slotTime, // Example format: "4:00 PM - 5:00 PM"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking Response:", response.data);

      setBookingDetails({
        startTime: response.data.startTime, // Assuming the response has startTime
        endTime: response.data.endTime, // Assuming the response has endTime
        menteeName: response.data.menteeName, // Assuming the response has menteeName
      });
      setIsBooked(true);
      setBookedSlotIds((prevIds) => [...prevIds, slotId]); // Add booked slot ID
      await fetchBookings();
      alert("Session booked successfully!");
    } catch (error) {
      console.error("Error booking session:", error);
      alert("Failed to book session. Please login again. ", error);
    }
  };

  console.log("booking details", bookingDetails);
  const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Navbar */}
        <motion.div
        className="flex items-center justify-between bg-white shadow-lg p-4 rounded-2xl"
        whileHover={{ scale: 1.01 }}
      >
        <h1 className="text-2xl font-bold text-gray-500">
          Welcome{user ? `, ${user.name}` : ""}!
        </h1>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-lg">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={googleSignIn}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
          >
            Sign In
          </button>
        )}
      </motion.div>

      {/* Dashboard Sections */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-5xl">
        {/* Calendar Section */}
        {/* <div className="p-6 bg-gray-100 bg-opacity-20 backdrop-blur-md shadow-md rounded-xl flex items-center flex-col ">
          <h3 className="text-2xl font-bold text-gray-700 p-2 mb-3">
            Select a Date
          </h3>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="bg-gray-100 bg-opacity-30  rounded-lg p-4 shadow-md mb-4"
          />
        </div> */}

        {/* Available Slots */}
        {/* <div className="p-6 bg-gray-100 flex flex-col items-center bg-opacity-20 backdrop-blur-md shadow-md rounded-xl ">
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            Available Slots on :{" "}
            <span className="text-blue-500 font-semibold text-xl font-mono">
              {selectedDate.toDateString()}
            </span>
          </h3>
          {mentorSlots.length > 0 ? (
            <ul className="space-y-3">
              {mentorSlots.map((slot) => (
                <li
                  key={slot._id}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
                >
                  <span className="font-medium">
                    {slot.mentorId?.name || "Mentor information unavailable"} -{" "}
                    {slot.startTime} to {slot.endTime}
                  </span>
                  <button
                    onClick={() =>
                      bookSession(
                        slot.mentorId._id,
                        `${slot.startTime} - ${slot.endTime}`,
                        selectedDate,
                        slot._id // Pass slotId to track which one was booked
                      )
                    }
                    className={`${
                      bookedSlotIds.includes(slot._id)
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    } hover:${
                      bookedSlotIds.includes(slot._id)
                        ? "bg-yellow-600"
                        : "bg-green-600"
                    } text-white px-3 py-1 rounded-lg cursor-pointer`}
                  >
                    {bookedSlotIds.includes(slot._id) ? "Booked" : "Book"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-200">No slots available for this date.</p>
          )}
        </div>
      </div> */} 

      {/* new  */}
    <div className="p-6 bg-white rounded-xl shadow-md">
  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
    <CalendarDays className="mr-2 text-blue-500" /> Available Mentors
  </h3>

  {/* Check if mentorSlots is empty */}
  {!mentorSlots || mentorSlots.length === 0 ? (
    <p className="text-gray-500">No available mentors at the moment.</p>
  ) : (
    daysOfWeek.map((day) => (
      <div key={day} className="mb-4">
        <h4 className="text-lg font-bold mb-2 text-gray-700">{day}</h4>
        {mentorSlots.some((mentor) => mentor.slots.some((slot) => slot.day === day)) ? (
          mentorSlots
            .filter((mentor) => mentor.slots.some((slot) => slot.day === day))
            .map((mentor) => (
              <div key={mentor.id} className="p-4 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-all">
                <p className="font-medium text-gray-800">{mentor.name}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {mentor.slots
                    .filter((slot) => slot.day === day)
                    .map((slot) => (
                      <button
                        key={`${mentor.id}-${slot.time}`}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all ${
                          bookedSlotIds.includes(slot.time) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() =>
                          bookedSlotIds.includes(slot.time) ? null : bookSession(mentor.id, slot.time)
                        }
                        disabled={bookedSlotIds.includes(slot.time)}
                      >
                        {slot.time}
                      </button>
                    ))}
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-400">No available mentors for {day}.</p>
        )}
      </div>
    ))
  )}
</div>
  


      {/* My Booking Section */}
      {/* {isBooked && bookingDetails && (
        <div className="p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-md rounded-xl mt-10 w-full max-w-5xl">
          <h3 className="text-lg font-semibold text-gray-500 mb-3">
            My Bookings
          </h3>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>
              <strong>Start Time:</strong>
              <span> {bookingDetails.startTime}</span>
            </p>
            <p>
              <strong>End Time:</strong> {bookingDetails.endTime}
            </p>
            <p>
              <strong>Mentee:</strong> {bookingDetails.menteeName}
            </p>
          </div>
        </div>
      )} */}

      {/* Booking History */}
      <div className="p-6 bg-white bg-opacity-20 backdrop-blur-md shadow-md rounded-xl mt-10 w-full max-w-5xl">
        <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-black-500 mb-3 flex items-center">
            <CalendarClock className="mr-2 text-blue-500" />My  Bookings.
        </h3>
        <button
          onClick={fetchBookings}
          className="bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 rounded-lg cursor-pointer shadow-md transition-all"
        >
          Refresh Bookings
          </button>
          </div>
        <ul className="space-y-2 mt-2">
          {bookings.length > 0 ? (
           
            bookings.map((booking) => (
              <li  
                key={booking._id}
                className="bg-white p-3 rounded-lg shadow-md border"
              > 
                 <h4 className="text-lg font-semibold flex items-center">
      <User className="mr-2 text-blue-500" /> {booking.mentorId?.prefix} {booking.mentorId?.name || "Unknown Mentor"}
    </h4>
    <p className="flex items-center mt-2 text-gray-600">
                  <Clock className="mr-2 text-blue-500" /> {booking.day}, {booking.startTime} 
                  </p>
              </li> 
            ))
          ) : (
            <p className="text-gray-400">No bookings yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MenteeDashboard;
