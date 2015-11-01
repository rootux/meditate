/*
Streak can happen more then 24 hours.
For example - Meditate 1PM. and then 3PM on the next day is still streak
Returns:
-1 if no streak. 0 if same day. 1 if streak.
*/
isStreak = function(lastDay) {
  var nextDay = new Date(lastDay.getTime() + (24*3600*1000));
  nextDay.setHours(23);
  nextDay.setMinutes(59);
  var today = new Date();
  
  //if day is same. no streak but second meditation for the day
  if(lastDay.getDate() == today.getDate()) {
      return 0;
  }
  
  return (nextDay >= today ? 1 : -1);
}