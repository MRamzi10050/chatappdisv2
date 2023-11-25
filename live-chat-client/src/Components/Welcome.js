import React, { useEffect } from "react";
import logo from "../Images/SecLog.png";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { showNotification, requestNotificationPermission } from "./CustomNotifs";

function Welcome() {
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const nav = useNavigate();

  useEffect(() => {
    async function checkNotificationPermission() {
      const permissionGranted = await requestNotificationPermission();
      if (!permissionGranted) {
        // Handle if notification permission is not granted
      }
    }
    checkNotificationPermission();
  }, []);

  if (!userData) {
    nav("/");
    return null;
  }

  return (
    <div className={"welcome-container" + (lightTheme ? "" : " dark")}>
      <motion.img
        drag
        whileTap={{ scale: 1.05, rotate: 360 }}
        src={logo}
        alt="Logo"
        className="welcome-logo"
      />
      <b>Hi, {userData?.data.name} 👋</b>
      <p>View and text directly to people present in the chat Rooms.</p>

      {/* Notification button */}
      {Notification.permission === "granted" && (
        <button
          className="notification-button"
          onClick={() => showNotification("Thanks for using this API!")}
        >
          Show Notification
        </button>
      )}
    </div>
  );
}

export default Welcome;
