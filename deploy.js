ghPages =  require('gh-pages');

ghPages.publish('dist', function(err) {
  console.log(err);
});