#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const fs = require("fs")
const axios = require('axios')

exports.main = function() {
  var packages = argv.install;
  packages = packages.replace("/", "-");
  if (packages.split('.').pop() == "js") {
    axios.get('https://raw.githubusercontent.com/mellow-js/repository/main/javascript/' + argv.install).then(resp => {
      var data = resp.data;
      fs.writeFile("public/js/" + packages, data, (err) => {
        if (err) console.log(err);
        console.log("[+] Downloading " + argv.install);
        fs.readFile("index.html", function(err, buf) {
          var data = buf.toString();
          data = data.replace('<!-- Add Packages here -->', `<script src="public/js/` + packages + `"></script>
  <!-- Add Packages here -->`);
          fs.writeFile("index.html", data, (err) => {
            if (err) console.log(err);
            console.log("[+] Successfully Add " + argv.install + " to your project.");
          });
        });
      });
    }).catch((error) => {
      if(error.response.status == 404) {
        console.log("[-] ERROR: Package " + argv.install + " not found.")
      }
    });
  }
  if (packages.split('.').pop() == "css") {
    axios.get('https://raw.githubusercontent.com/mellow-js/repository/main/css/' + argv.install).then(resp => {
      var data = resp.data;
      fs.writeFile("public/css/" + packages, data, (err) => {
        if (err) console.log(err);
        console.log("[+] Downloading " + argv.install);
        fs.readFile("index.html", function(err, buf) {
          var data = buf.toString();
          data = data.replace('<!-- Add Packages here -->', `<link rel="stylesheet"href="public/css/` + packages + `"/>
  <!-- Add Packages here -->`);
          fs.writeFile("index.html", data, (err) => {
            if (err) console.log(err);
            console.log("[+] Successfully Add " + argv.install + " to your project.");
          });
        });
      });
    }).catch((error) => {
      if(error.response.status == 404) {
        console.log("[-] ERROR: Package " + argv.install + " not found.")
      }
    });
  }
}