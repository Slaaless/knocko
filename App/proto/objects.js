define('proto/objects', ['knockout'], function(ko) {

  var descObject = {
    User: function(id, name, number, email, adress, city, card) {
      this.id = ko.observable(id);
      this.name = ko.observable(name !== undefined ? name : 'No Name');

      this.phone = ko.observable(number !== undefined ? number : 'x xxx xxx xx xx');
      this.email = email || '';
      this.adress = adress || '';
      this.city = city || '';
      this.card = card || '';

      this.active = ko.observable(false);
    },
    menuItem: function(name, url) {
      this.name = name;
      this.url = '#/' + url;
    }
  }

  return descObject;
});