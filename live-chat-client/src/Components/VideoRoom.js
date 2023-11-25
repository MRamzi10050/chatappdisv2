import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "./VideoPlayer";

const APP_ID = "4a995bb5734d4985863e32fd7931a918";
const TOKEN ="007eJxTYOj3D+k9JLRo0s+pOUEpxYI5/QeaLLim2Xv1Ja++FX764GUFBpNES0vTpCRTc2OTFBNLC1MLM+NUY6O0FHNLY8NES0OL6oDo1IZARoZ3lfxMjAwQCOKzMOQmZuYxMAAAI3sedw==";
const CHANNEL = "main";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

export const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      // user.audioTrack.play()
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
    .join(APP_ID, CHANNEL, TOKEN, null)
    .then((uid) =>
      Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
    )
    .then(([tracksData, uid]) => { // Rename tracks to tracksData to avoid conflict
      const [audioTrack, videoTrack] = tracksData;
      setLocalTracks(tracksData);
      setTracks(tracksData); // Set tracks state here
      setUsers((previousUsers) => [
        ...previousUsers,
        {
          uid,
          videoTrack,
          audioTrack,
        },
      ]);
      client.publish(tracksData);
    });

  return () => {
    for (let localTrack of localTracks) {
      localTrack.stop();
      localTrack.close();
    }
    client.off("user-published", handleUserJoined);
    client.off("user-left", handleUserLeft);
    client.unpublish(tracks).then(() => client.leave()); // Use tracks state here
  };
}, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 200px)",
        }}
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};
