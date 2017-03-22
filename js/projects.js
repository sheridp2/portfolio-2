'use strict';

var projects = [];

function Project (rawProject) {
  for(var key in rawProject) {
    this[key] = rawProject[key];
  };
};

Project.prototype.toHTML = function() {
  var template = Handlebars.compile($('#template-output').text());
  return template(this);
};

//accordion preview
Project.prototype.preview = function() {
  $('.project-view').on('click', function() {
    $('.project-view *').not('h1').hide();
    $(this).find('*').not('h1').show();
  });
  $('.project-view:first').click();
};

Project.getData = function() {
  $.getJSON('data/projectList.json')
  .then(function(data) {
    data.forEach(function(singleP) {
      projects.push(new Project(singleP));
      console.log('a project was pushed');
    });
  }).fail(function() {
    console.error('Data was not obtained');
  });
};

Project.getData();

projects.forEach(function(a) {
  $('#project-display').append(a.toHTML());
  a.preview();
});
