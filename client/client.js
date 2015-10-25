Meteor.subscribe("sessions");

Template.body.helpers({
  sessions: function () {
    return Sessions.find({});
  }
});

Tracker.autorun(function(){
  if(Meteor.userId()){
    console.log("logged in" + Meteor.userId());
  }
});

var clock;

Session.setDefault('isClockRunning', false);

Template.clock.helpers({
  isClockRunning: function () {
    return Session.get('isClockRunning');
  },
});

Template.sessionInfo.helpers({
  session: function () {
    return Sessions.findOne({});
  }
});

Template.clockSelectModal.events({
    'click #start' : function(event, template) {
      var minutes = template.find('#min').value;
      $('#clockSelectModal').modal('hide');
      $('#clock')[0].value = minutes + ":00"; //TODO: unuglify me
      Session.set('isClockRunning', true);
      setClockWithCountdown(true);
      clock.start($('#clock').val());
  },
});

Template.clock.events({
  'click #mandala' : function() {
    $('#clockSelectModal').modal('show');
  },

  'click #startClock': function () {
    console.log('started clock');
    $('#clock').val(0);
    Session.set('isClockRunning', true);
    setClockWithCountdown(false);
    clock.start($('#clock').val());
  },

  'click #stop': function() {
    Session.set('isClockRunning', false);
    clock.stop();
  },

  'click #pause': function() {
    clock.pause();
  }
});


function setClockWithCountdown(isCountdown) {
  clock = Tock({
    countdown: isCountdown,
    interval: 250,
    callback: function () {
        console.log(clock.lap() / 1000);
        $('#clock').val(clock.msToTime(Math.round(clock.lap() / 1000) * 1000));
    },
    complete: function () {
        console.log('end');
        Session.set('isClockRunning', false);
        var audio = new Audio('/sounds/zen-gong.mp3');
        audio.addEventListener('canplaythrough', function() {
          audio.play();
        });
    }
  });
}