//Streak can happen more then 24 hours.
//For example - Meditate 1PM. and then 3PM on the next day is still streak
isStreak = function(lastDay) {
	console.log(lastDay);
  var nextDay = new Date(lastDay.getTime() + (24*3600*1000));
  nextDay.setHours(23);
  nextDay.setMinutes(59);
  var today = new Date();
  //TODO: add a test that we are doing meditation on the same day - should not be count as a streak
  return nextDay >= today;
}