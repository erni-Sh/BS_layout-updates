window.onload = () => {
  const settingUpAlert = document.getElementById('app__setting_up_alert');
  const toogleSettingUpSpoiler = document.getElementsByClassName("js_toogle_open_setting_up_alert");

  settingUpAlert && toogleSettingUpSpoiler && [...toogleSettingUpSpoiler].map((e) => {
    e.addEventListener('click', () => {
      settingUpAlert.classList.toggle('app__setting_up_alert_isOpen');
    })
  })
};