if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });


  Template.hello.events({
    'click #start': function () {
      countdown.start($('#clock').val());
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },

    'click #stop': function() {
      countdown.stop();
    },

    'click #pause': function() {
      countdown.pause();
    }
  });

  var timer = new Tock({
    callback: function () {
        var current_time = timer.msToTime(timer.lap());
        $('#clock').val(current_time);
    }
  });

  var countdown = Tock({
    countdown: true,
    interval: 250,
    callback: function () {
        console.log(countdown.lap() / 1000);
        $('#clock').val(countdown.msToTime(Math.round(countdown.lap() / 1000) * 1000));
    },
    complete: function () {
        console.log('end');
        alert("Time's up!");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
