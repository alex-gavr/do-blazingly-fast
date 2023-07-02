const pushRequestPermissions = () => {
  if ('Notification' in window) {
    const permissionOnLoad = Notification.permission;

    try {
      Notification.requestPermission();
    } catch (error) {
      console.error('promises in safari not work');
    }

    return permissionOnLoad;
  }

  return void 0;
};

export default pushRequestPermissions;
