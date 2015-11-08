Meteor.subscribe("sessions");

Template.body.helpers({
  sessions: function () {
    return Sessions.find({});
  }
});

var clock;

Session.setDefault('isClockRunning', false);
Session.setDefault('lastClockMin', 0);

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
      Session.set('lastClockMin', minutes);
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

  'click .stop': function() {
    Session.set('isClockRunning', false);
    clock.stop();
    $('#clock').val('');
  },

  'click .playpause': function(event) {
    clock.pause();
    var e = $(event.target);
    if(e.hasClass('pause')) {
      e.removeClass('pause');
      e.addClass('play');
    }else {
      e.removeClass('play');
      e.addClass('pause');
    }
  }
});


function setClockWithCountdown(isCountdown) {
  clock = Tock({
    countdown: isCountdown,
    interval: 250,
    callback: function () {
        console.log(clock.lap() / 1000);
        var time = clock.msToTime(Math.round(clock.lap() / 1000) * 1000);
        $('#clock').val(time.substring(0, time.indexOf("."))); //remove milliseconds
    },
    complete: function () {
        Session.set('isClockRunning', false);
        if(Meteor.userId()) {
          var lastClockMin = Session.get('lastClockMin');
          Meteor.call('updateSession', lastClockMin);
        }
        var audio = new Audio('/sounds/zen-gong.mp3');
        audio.addEventListener('canplaythrough', function() {
          audio.play();
        });
    }
  });
}