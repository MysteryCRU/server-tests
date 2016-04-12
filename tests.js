
var querystring = require('querystring');
var http = require('http');

function PostCode() {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET'
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'ec2-52-91-208-65.compute-1.amazonaws.com',
      port: '3011',
      path: '/api/resource/list',
      method: 'GET',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  var request = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  request.write(post_data);
  request.end();

}


process.on('uncaughtException', function (err) {
    console.log('exception thrown, you probably killed the server. ' + err);
    console.log(err);
});

PostCode();
