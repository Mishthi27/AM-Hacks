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
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

const GoogleCalendarAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadGapi = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.defer = true;
  
      script.onload = () => {
        gapi.load("client:auth2", () => {
          gapi.client
            .init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: [DISCOVERY_DOC],
              scope: SCOPES,
            })
            .then(() => {
              const auth = gapi.auth2.getAuthInstance();
              if (auth.isSignedIn.get()) {
                const profile = auth.currentUser.get().getBasicProfile();
                setUserName(profile.getName());
                setIsSignedIn(true);
              }
            })
            .catch((err) => console.error("GAPI Init error", err));
        });
      };
  
      document.body.appendChild(script);
    };
  
    loadGapi();
  }, []);
  
  useEffect(() => {
    const start = () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISCOVERY_DOC],
          scope: SCOPES,
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          if (auth.isSignedIn.get()) {
            const user = auth.currentUser.get().getBasicProfile();
            setIsSignedIn(true);
            setUserName(user.getName());
          }
        })
        .catch((err) => {
          console.error("GAPI Init error", err);
        });
    };

    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = () => {
    const auth = gapi.auth2.getAuthInstance();
    if (auth) {
      auth.signIn().then((user) => {
        const profile = user.getBasicProfile();
        setUserName(profile.getName());
        setIsSignedIn(true);
        console.log("Logged in as:", profile.getName());
      });
    } else {
      console.error("Auth instance not initialized");
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Connect to Google Calendar</button>
      {isSignedIn && <p>Welcome, {userName}</p>}
    </div>
  );
};

export default GoogleCalendarAuth;
