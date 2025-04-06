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

// // src/components/GoogleCalendarAuth.js

// import React, { useEffect, useState } from "react";
// import { gapi } from "gapi-script";

// const CLIENT_ID = "619361945309-o0gmmbdh9rh0dvebejkiu7b3q6lnpo8j.apps.googleusercontent.com";
// const API_KEY = "AIzaSyCpo6YUsvF5iiTiVg_BDRChzWQRlmukpPk";
// const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
// const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

// const GoogleCalendarAuth = () => {
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const loadGapi = () => {
//       const script = document.createElement("script");
//       script.src = "https://apis.google.com/js/api.js";
//       script.async = true;
//       script.defer = true;
  
//       script.onload = () => {
//         gapi.load("client:auth2", () => {
//           gapi.client
//             .init({
//               apiKey: API_KEY,
//               clientId: CLIENT_ID,
//               discoveryDocs: [DISCOVERY_DOC],
//               scope: SCOPES,
//             })
//             .then(() => {
//               const auth = gapi.auth2.getAuthInstance();
//               if (auth.isSignedIn.get()) {
//                 const profile = auth.currentUser.get().getBasicProfile();
//                 setUserName(profile.getName());
//                 setIsSignedIn(true);
//               }
//             })
//             .catch((err) => console.error("GAPI Init error", err));
//         });
//       };
  
//       document.body.appendChild(script);
//     };
  
//     loadGapi();
//   }, []);
  
//   useEffect(() => {
//     const start = () => {
//       gapi.client
//         .init({
//           apiKey: API_KEY,
//           clientId: CLIENT_ID,
//           discoveryDocs: [DISCOVERY_DOC],
//           scope: SCOPES,
//         })
//         .then(() => {
//           const auth = gapi.auth2.getAuthInstance();
//           if (auth.isSignedIn.get()) {
//             const user = auth.currentUser.get().getBasicProfile();
//             setIsSignedIn(true);
//             setUserName(user.getName());
//           }
//         })
//         .catch((err) => {
//           console.error("GAPI Init error", err);
//         });
//     };

//     gapi.load("client:auth2", start);
//   }, []);

//   const handleLogin = () => {
//     const auth = gapi.auth2.getAuthInstance();
//     if (auth) {
//       auth.signIn().then((user) => {
//         const profile = user.getBasicProfile();
//         setUserName(profile.getName());
//         setIsSignedIn(true);
//         console.log("Logged in as:", profile.getName());
//       });
//     } else {
//       console.error("Auth instance not initialized");
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLogin}>Connect to Google Calendar</button>
//       {isSignedIn && <p>Welcome, {userName}</p>}
//     </div>
//   );
// };

// export default GoogleCalendarAuth;

// import React, { useEffect, useState } from "react";
// import { gapi } from "gapi-script";

// const CLIENT_ID = "619361945309-22fcuobqpnt8du17hk2jfcgjr9ibde8q.apps.googleusercontent.com";
// const API_KEY = "AIzaSyBaNltMTtnX-hZZZF8KPdHqfYku17mgtmY";
// const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
// const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

// const GoogleCalendarAuth = () => {
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const loadGapi = () => {
//       const script = document.createElement("script");
//       script.src = "https://apis.google.com/js/api.js";
//       script.async = true;
//       script.defer = true;

//       script.onload = () => {
//         gapi.load("client:auth2", () => {
//           gapi.client
//             .init({
//               apiKey: API_KEY,
//               clientId: CLIENT_ID,
//               discoveryDocs: [DISCOVERY_DOC],
//               scope: SCOPES,
//             })
//             .then(() => {
//               const auth = gapi.auth2.getAuthInstance();
//               if (auth.isSignedIn.get()) {
//                 const profile = auth.currentUser.get().getBasicProfile();
//                 setUserName(profile.getName());
//                 setIsSignedIn(true);
//                 fetchEvents(); // Fetch events on load if already signed in
//               }
//             })
//             .catch((err) => console.error("GAPI Init error", err));
//         });
//       };

//       document.body.appendChild(script);
//     };

//     loadGapi();
//   }, []);

//   const handleLogin = () => {
//     const auth = gapi.auth2.getAuthInstance();
//     if (auth) {
//       auth.signIn().then((user) => {
//         const profile = user.getBasicProfile();
//         setUserName(profile.getName());
//         setIsSignedIn(true);
//         fetchEvents(); // Fetch events after login
//       });
//     } else {
//       console.error("Auth instance not initialized");
//     }
//   };

//   const fetchEvents = () => {
//     gapi.client.calendar.events
//       .list({
//         calendarId: "primary",
//         timeMin: new Date().toISOString(),
//         showDeleted: false,
//         singleEvents: true,
//         maxResults: 5,
//         orderBy: "startTime",
//       })
//       .then((response) => {
//         setEvents(response.result.items);
//       })
//       .catch((error) => {
//         console.error("Error fetching events", error);
//       });
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <button onClick={handleLogin}>Connect to Google Calendar</button>
//       {isSignedIn && (
//         <>
//           <p>Welcome, {userName}</p>
//           <h4>Upcoming Events Scheduled:</h4>
//           {events.length > 0 ? (
//             <ul>
//               {events.map((event) => (
//                 <li key={event.id}>
//                   <strong>{event.summary}</strong><br />
//                   {event.start.dateTime || event.start.date}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No upcoming events found.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default GoogleCalendarAuth;

import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "619361945309-22fcuobqpnt8du17hk2jfcgjr9ibde8q.apps.googleusercontent.com";
const API_KEY = "AIzaSyBaNltMTtnX-hZZZF8KPdHqfYku17mgtmY";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const Calendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          updateSigninStatus(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(updateSigninStatus);
        })
        .catch((error) => {
          console.error("Error initializing GAPI client", error);
        });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const updateSigninStatus = (isSignedIn) => {
    setIsSignedIn(isSignedIn);

    if (isSignedIn) {
      const authInstance = gapi.auth2.getAuthInstance();
      const user = authInstance.currentUser.get();
      const profile = user.getBasicProfile();

      if (profile) {
        const name = profile.getName();
        console.log("User signed in as:", name);
        setUserName(name);
        fetchEvents();
      } else {
        console.warn("User profile not available");
      }
    } else {
      setUserName("");
      setEvents([]);
    }
  };

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const fetchEvents = () => {
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
        const events = response.result.items;
        console.log("Fetched events:", events);
        setEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching events", error);
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Google Calendar Integration</h2>

      {!isSignedIn ? (
        <button onClick={handleAuthClick}>Connect to Google Calendar</button>
      ) : (
        <>
          <p>Welcome, {userName}!</p>
          <button onClick={handleSignOutClick}>Sign Out</button>

          <h3>Upcoming Events:</h3>
          {events.length === 0 ? (
            <p>No upcoming events found.</p>
          ) : (
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  <strong>{event.summary}</strong>
                  <br />
                  {event.start.dateTime || event.start.date}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Calendar;
