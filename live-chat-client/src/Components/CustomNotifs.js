export const showNotification = (notificationText) => {
    if ("Notification" in window) {
      new Notification(notificationText);
    } else {
      alert("Browser does not support notifications");
    }
  };
  
  export const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        return true;
      } else if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission === "granted";
      }
    }
    return false;
  };
  