// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { Card } from "react-bootstrap";
// import "./cc.css";

// const CalendarComponent = () => {
//   const [date, setDate] = useState(new Date());

//   return (
//     <Card className="p-3 calendar-container">
//       <h5 className="text-center">Calendar</h5>
//       <Calendar onChange={setDate} value={date} />
//       <p className="text-center mt-2">
//         Selected Date: <strong>{date.toDateString()}</strong>
//       </p>
//     </Card>
//   );
// };

// export default CalendarComponent;

// import React, { useEffect } from "react";
// import { gapi } from "gapi-script";

// const CLIENT_ID = "619361945309-o0gmmbdh9rh0dvebejkiu7b3q6lnpo8j.apps.googleusercontent.com";
// const API_KEY = "AIzaSyCpo6YUsvF5iiTiVg_BDRChzWQRlmukpPk";
// const SCOPES = "https://www.googleapis.com/auth/calendar.events.readonly";

// const GoogleCalendarAuth = () => {
//   useEffect(() => {
//     const initClient = () => {
//       gapi.client
//         .init({
//           apiKey: API_KEY,
//           clientId: CLIENT_ID,
//           discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
//           scope: SCOPES,
//         })
//         .then(() => {
//           console.log("GAPI initialized");
//         })
//         .catch((e) => console.error("Error loading GAPI client", e));
//     };

//     gapi.load("client:auth2", initClient);
//   }, []);

//   const handleLogin = () => {
//     const authInstance = gapi.auth2?.getAuthInstance();
//     if (authInstance) {
//       authInstance.signIn().then((user) => {
//         console.log("Logged in as:", user.getBasicProfile().getName());
//       });
//     } else {
//       console.error("GAPI Auth instance not ready");
//     }
//   };

//   return <button onClick={handleLogin}>Connect to Google Calendar</button>;
// };

// export default GoogleCalendarAuth;

// src/components/GoogleCalendarAuth.js

import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "619361945309-o0gmmbdh9rh0dvebejkiu7b3q6lnpo8j.apps.googleusercontent.com";
const API_KEY = "AIzaSyCpo6YUsvF5iiTiVg_BDRChzWQRlmukpPk";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const GoogleCalendarAuth = () => {
  const [events, setEvents] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: SCOPES,
        })
        .then(() => {
          console.log("GAPI initialized");
        })
        .catch((e) => console.error("GAPI Init error", e));
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const handleLogin = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance.signIn().then((user) => {
        const profile = user.getBasicProfile();
        setUserName(profile.getName());

        // Fetch events after login
        gapi.client.calendar.events
          .list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
          })
          .then((response) => {
            const items = response.result.items;
            setEvents(items);
          });
      });
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={handleLogin}>Connect to Google Calendar</button>

      {userName && <h3>Welcome, {userName}</h3>}

      {events.length > 0 ? (
        <div>
          <h4>Upcoming Events:</h4>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.summary}</strong><br />
                {event.start.dateTime || event.start.date}
              </li>
            ))}
          </ul>
        </div>
      ) : userName ? (
        <p>No upcoming events found.</p>
      ) : null}
    </div>
  );
};

export default GoogleCalendarAuth;
