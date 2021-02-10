import { classnames } from './../utils/Variables';

const { hide } = classnames;

export const loading = (button, loading) => {
  //* Hide the Button
  if (button) button.classList.add(hide);

  //* Show the loading
  if (loading) loading.classList.remove(hide);
};

const hideElement = (element) =>
  element ? element.classList.add(hide) : undefined;

const getMarkup = (element, type, message) => {
  if (element) {
    const classname = `alert-${type}`;
    //5 Put the Class
    element.classList.add(classname);
    element.classList.remove(hide);

    //5 Replace the template with the message
    element.innerText = message;
  }
};

export const renderAlert = (alert) => {
  //) Get the Type and message
  const { type, message, box } = alert;

  //) Show the box with the appropriate properties
  getMarkup(box, type, message);

  //) Hide the Box after  seconds
  window.setTimeout(function () {
    hideElement(box);
  }, 3000);
};

export const renderSuccess = (
  loading,
  button,
  alert,
  reload,
  showButton = true
) => {
  //* Hide the loading
  if (loading) loading.classList.add(hide);

  //* Show the Button
  if (button && showButton) button.classList.remove(hide);

  //* Render Alert-success box
  renderAlert(alert);

  if (reload) {
    //* Reload After 3 Seconds
    window.setTimeout(function () {
      location.reload();
    }, 3000);
  }
};

export const redirectTo = (link) => (window.location.href = link);
