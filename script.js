//creates the time element to hold days, hours etc
const createTimeElement = (title, content) => {
  //creating the container
  const element = document.createElement("div");
  element.classList.add("time-container");

  //creating the title element
  const titleElement = document.createElement("h1");
  titleElement.classList.add("time-title");
  titleElement.textContent = title;

  //creating the content element
  const contentElement = document.createElement("h2");
  contentElement.classList.add("time-content");
  contentElement.textContent = content;

  element.replaceChildren(titleElement, contentElement);

  return element;
};

//formats a string of a given time (e.g days or minutes)
const getString = (time) => String(Math.floor(time)).padStart(2, "0");

const timeElementvisible = false;

//getting the eclipse date
const eclipseTime = new Date("2023-10-14T15:03").getTime() / 1000; //in seconds

//getting the time and stopwatch container
const timerContainer = document.querySelector(".time");
const stopwatchContainer = document.querySelector(".stopwatch");

//updates the ui each second
setInterval(() => {
  //getting the current time
  const currentTime = new Date().getTime() / 1000; //in seconds

  //calculating the difference between currentTime and eclipseTime in seconds
  const diffTime = eclipseTime - currentTime;
  //calculating the days remaining
  const daysToEclipse = diffTime / (60 * 60 * 24);
  //calculating the remaining hours
  const hoursToEclipse = (daysToEclipse * 24) % 24;
  //calculating the remaining days
  const minutesToEclipse = (daysToEclipse * 24 * 60) % 60;

  //calculating the total of seconds adding days, hours and minutes remaining
  const totalSeconds =
    Math.floor(daysToEclipse) * 24 * 60 * 60 +
    Math.floor(hoursToEclipse) * 60 * 60 +
    Math.floor(minutesToEclipse) * 60;

  //calculating the seconds to the eclipse subtracting the time calculated in days, hours and minutes
  const secondsToEclipse = eclipseTime - (currentTime + totalSeconds);

  //setting up the strings to hold the data
  const daysString = getString(daysToEclipse);
  const hoursString = getString(hoursToEclipse);
  const minutesString = getString(minutesToEclipse);
  const secondsString = getString(secondsToEclipse);

  //inserting the strings in the elements
  const daysElement = createTimeElement("Dias", daysString);
  const hoursElement = createTimeElement("Horas", hoursString);
  const minutesElement = createTimeElement("Minutos", minutesString);
  const secondsElement = createTimeElement("Segundos", secondsString);

  //inserting the HTML
  timerContainer.replaceChildren(
    daysElement,
    hoursElement,
    minutesElement,
    secondsElement
  );

  //showing the remaining time when page loads
  if (!timeElementvisible) {
    stopwatchContainer.style.height = "120px";
    timeVisible = true;
  }
}, 1000);
