Meteor.publish("sessions", function () {
	return Sessions.find({userId: this.userId});
});

Accounts.onCreateUser(function (options, user) {
  insertSession(user._id);
  return user;
});

insertSession = function (userId) {    
    return Sessions.insert({
      userId: userId,
      lastSession: new Date(),
      daysStreak: 0,
      meditationTimeInMin: 0,
      numOfSessions: 0
    });
  };