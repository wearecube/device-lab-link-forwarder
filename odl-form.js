Urls = new Meteor.Collection('urls');


if (Meteor.isClient) {

  Router.route('/', function(){
    this.render('home');
  });

  Router.route('/forward', {
    before: function(){
      var url = Urls.findOne().url;
      window.location.replace(url);
    }
  });



  Template.url.helpers({
    url: function () {
      return Urls.findOne().url;
    }
  });

  Template.home.events({
    'keyup input': function (event,template) {
      var url = template.find("input").value
      var  _id = Urls.findOne()._id;
      Urls.update(_id, {$set: {url: url}});
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Urls.remove({});
    Urls.insert({});
  });
}
