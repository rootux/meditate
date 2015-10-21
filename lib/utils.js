//Streak can happen more then 24 hours.
//For example - Meditate 1PM. and then 3PM on the next day is still streak
function isStreak(lastDay) {
  var nextDay = new Date(lastDay.getTime() + (24*3600*1000));
  nextDay.setHours(23);
  nextDay.setMinutes(59);
  var today = new Date();
  return nextDay >= today;
}