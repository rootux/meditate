Sessions = new Mongo.Collection("sessions");

Meteor.methods({
  insertSession: function () {
    if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
    }
    
    if (Sessions.find({userId: Meteor.userId()})) {
        throw new Meteor.Error("session-already-exist"); 
    }
    return Sessions.insert({
      userId: Meteor.userId(),
      lastSession: new Date(),
      daysStreak: 0,
      meditationTimeInMin: 0,
      numOfSessions: 0
    });
  },

  updateSession: function (meditationTimeInMin) {
    var session = Sessions.findOne({userId: Meteor.userId()});
    var daysStreaks;
    var streak = isStreak(session.lastSession);
    if (streak == 1) {
      daysStreak = session.daysStreak + 1;
    }else if(streak == -1){
      daysStreak = 0;
    }else { //Same day 2nd meditation
      daysStreak = session.daysStreak;
    }
    
    return Sessions.update(session._id, { $set: {
      lastSession: new Date(),
      daysStreak:daysStreak,
      meditationTimeInMin: session.meditationTimeInMin + Number(meditationTimeInMin),
      numOfSessions: session.numOfSessions + 1 
    }}
    );
  }
});