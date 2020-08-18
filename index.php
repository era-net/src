<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">

  <!-- Bootstrap -->
  <link rel="stylesheet" href="./lib/bootstrap/css/bootstrap.main.css">

  <!-- Shoelace -->
  <link rel="stylesheet" href="./node_modules/@shoelace-style/shoelace/dist/shoelace/shoelace.css">

  <!-- Prism -->
  <link rel="stylesheet" href="./lib/prism/prism.css">

  <!-- Custom Styles -->
  <link rel="stylesheet" href="./assets/css/default/default.styles.css">

  <title>main_temp &bull; landing page</title>

  </style>
</head>
<body>
  
  <div class="container mt-3">
    <div>
      <h2 class="text-center">main_temp</h2>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4 p-3 mb-4">
        <p>Welcome to a world, where http requests are simple and database managing with PHP is just a few lines of code away !</p>
      </div>
    </div>
    <div class="row justify-content-between">
      <div class="col-md-5 bg-light p-3 mb-4">
        <h5>How it all started</h5>
        <hr>
        <p>The start of this "project" began in September 2019. My intension was to simplify some stuff in web development wich is used all the time. I was bored, to write multiple lines of code, when it could be done in just one simple function. So i started to follow my interests and was able to create something that could actually save time.</p>
      </div>
      <div class="col-md-5 bg-light p-3 mb-4">
        <h5>What it is capable of</h5>
        <hr>
        <p>
          <ul class="list-group">
            <li class="list-group-item">
              <h6>
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bootstrap-fill" fill="#7952b3" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-8zm1.06 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z"/>
                </svg>
              </h6>
              Customizable bootstrap theme colors
            </li>
            <li class="list-group-item">
              <h6><i class="text-warning">JS</i></h6>
              Simplified xmlhttprequests including file uploads
            </li>
            <li class="list-group-item">
              <h6><i class="text-info">php</i></h6>
              All kinds of database manipulations with prepared statements
            </li>
          </ul>
        </p>
      </div>
    </div>

    <div class="row justify-content-between">
      <div class="col-md-5 bg-light p-3 mb-4">
        <h5>xhr <sup class="text-warning"><i>JS</i></sup></h5>
        <hr>
        <p>The xhr class i created is used to simplify xmlhttp requests with javascript.</p>

        <table class="table table-striped">
          <tr>
            <td>location</td>
            <td>"./assets/js/xhr"</td>
          </tr>
          <tr>
            <td>file size <sup>(original)</sup></td>
            <td>3 KB</td>
          </tr>
          <tr>
            <td>file size <sup>(minified)</sup></td>
            <td>2.1 KB</td>
          </tr>
        </table>

        <p class="mb-1"><strong><u>usage</u></strong></p>
        <pre><code class="language-js">window.addEventListener("load", init, false);
function init() {
  let x = new xhr();
  x.get("GET", "example.php", callback => {
    console.log("xhr require success");
    console.log("response: ");
    console.log(callback);
  });
}</code></pre>
        
        <p class="mb-1"><strong><u>methods</u></strong></p>
        <div class="mb-5">
          <pre><code class="language-js">x.run(method, url);</code></pre>
          <div>
            <p>runs a server sided script.</p>
            <div><u>method</u>:</div>
            <div>type: string</div>
            <div>value: "GET" or "POST"</div>
            <div class="mt-2"><u>url</u>:</div>
            <div>type: string</div>
            <div>value: path to the server sided script</div>
          </div>
        </div>

        <div class="mb-5">
          <pre><code class="language-js">x.get(method, url, callback);</code></pre>
          <div>
            <p>requests data from a server sided script.</p>
            <div><u>method</u>:</div>
            <div>type: string</div>
            <div>value: "GET" or "POST"</div>
            <div class="mt-2"><u>url</u>:</div>
            <div>type: string</div>
            <div>value: path to the server sided script</div>
            <div class="mt-2"><u>callback</u>:</div>
            <div>type: function</div>
          </div>
        </div>

        <div class="mb-5">
          <pre><code class="language-js">x.getJson(method, url, callback);</code></pre>
          <div>
            <p>requests data from a server sided script that returns a json response.</p>
            <div><u>method</u>:</div>
            <div>type: string</div>
            <div>value: "GET" or "POST"</div>
            <div class="mt-2"><u>url</u>:</div>
            <div>type: string</div>
            <div>value: path to the server sided script</div>
            <div class="mt-2"><u>callback</u>:</div>
            <div>type: function</div>
          </div>
        </div>

        <div class="mb-5">
          <pre><code class="language-js">x.post(method, url, callback, data);</code></pre>
          <div>
            <p>sends data to a server sided script.</p>
            <div><u>method</u>:</div>
            <div>type: string</div>
            <div>value: "GET" or "POST"</div>
            <div class="mt-2"><u>url</u>:</div>
            <div>type: string</div>
            <div>value: path to the server sided script</div>
            <div class="mt-2"><u>callback</u>:</div>
            <div>type: function</div>
            <div class="mt-2"><u>data</u>:</div>
            <div>type: JavaScript object</div>
            <div class="mt-2">example:</div>
            <pre><code class="language-js">let obj = {
  firstname: "John",
  lastname: "Doe",
  age: 33
}
x.post("GET", "myScript.php", rsp => {
  console.log(rsp);
}, obj);</code></pre>
          </div>
        </div>

        <div class="mb-5">
          <pre><code class="language-js">x.sendFiles(obj);</code></pre>
          <div>
            <p>sends uploaded files to a server sided script.</p>
            <p>please refer to <a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects">https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects</a> for FormData Object information.</p>
            <div><u>obj</u>:</div>
            <pre><code class="language-js">x.sendFiles({
  url: "path/to/script.php",
  progress: function(rspObj) {
    console.log("event: " + obj.e);
    console.log("loaded: " + obj.total);
    console.log("total: " + obj.total);
    console.log("percentage: " + obj.percent.toFixed(2) + "%");
  },
  callback: function(response) {
    console.log(response);
  },
  data: FormData
});</code></pre>
          </div>
        </div>

        <div class="mb-5">
          <pre><code class="language-js">x.abort();</code></pre>
          <div>
            <p>aborts a request.</p>
          </div>
        </div>

        <div class="mb-5">
          <pre><code class="language-js">x.info();</code></pre>
          <div>
            <p>returns the full functionality in the console.</p>
          </div>
        </div>
      </div>


      <div class="col-md-5 bg-light p-3 mb-4">
        <h5>DataController <sup class="text-info"><i>php</i></sup></h5>
        <hr>
        <p>The DataController is responsible for managing mysql databases and is written in php.</p>

        <table class="table table-striped">
          <tr>
            <td>location</td>
            <td>"./assets/php/DataController"</td>
          </tr>
          <tr>
            <td>file size <sup>(original)</sup></td>
            <td>9.7 KB</td>
          </tr>
        </table>
      </div>
  </div>

  <!-- JQuery -->
  <script type="module" src="./node_modules/jquery/dist/jquery.min.js"></script>

  <!-- Bootstrap -->
  <script type="module" src="./node_modules/bootstrap/dist/js/bootstrap.min.js"></script>

  <!-- Shoelace -->
  <script type="module" src="./node_modules/@shoelace-style/shoelace/dist/shoelace/shoelace.esm.js"></script>

  <!-- Prism -->
  <script type="text/javascript" src="./lib/prism/prism.js"></script>

  <!-- Custom JS -->
  <!--<script type="text/javascript" src="#"></script>-->
</body>
</html>