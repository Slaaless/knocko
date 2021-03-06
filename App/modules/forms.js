define('modules/forms', ['knockout', 'proto/history', 'proto/objects', 'proto/settings'], function(ko, historyService, objects, settings) {

  var FormsViewModel = function() {
    var self = this;

    // Общие данные.
    // ФИО.
    self.user = ko.validatedObservable({
      name: ko.observable().extend({required: true}),
      surname: ko.observable().extend({required: true}),
      patronymic: ko.observable().extend({required: true})
    });
    // Собираем из 3 полей 1.
    self.user().fullName = ko.computed(function() {
      var name = self.user().name() ? self.user().name() + " " : "",
          surname = self.user().surname() ? self.user().surname() + " " : "",
          patronymic = self.user().patronymic() ? self.user().patronymic() + " " : "";
      return name + surname + patronymic;
    });
    // Макс кол-во объектов.
    self.maxLengthTable = settings.maxLengthItems;
    // Начало с очистки.
    self.clear();
  }
  // Очиста полей и объявление нового объекта.
  FormsViewModel.prototype.clear = function() {
    var self = this;
    self.user().name("");
    self.user().surname("");
    self.user().patronymic("");
    if ( !ko.isObservable(self.item) ) {
      self.item = ko.observable(new objects.User(historyService.get('users').length + 1, "", ""));
    } else {
      self.item(new objects.User(historyService.get('users').length + 1, "", ""));
    }
    self.item = ko.validatedObservable(self.item());
  }
  // Добавление объекта в общий массив объектов.
  FormsViewModel.prototype.add = function() {
    var self = this;
    // Переносим ФИО в объект.
    self.item().name(self.user().fullName());
    // Если не валидно, то фигушки.
    if ( !self.item.isValid() ) return;
    // Проверка на вместимость массива
    if ( self.maxLengthTable() === historyService.get('users').length ) {
      return false;
    }
    // Добавление в массив объектов, в зависимости есть он или нет.
    if ( historyService.search('users') ) {
      historyService.push('users', self.item());
    } else {
      historyService.add('users', [self.item()]);
    }
    self.clear();
  }

  return FormsViewModel;
});
