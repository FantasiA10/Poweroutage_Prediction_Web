For export to work, your web server needs to be configured to work with PHP.

As of 21 May 2014, ASP is no longer supported out-of-the box due to a Flash Player vulnerability fix, as a result of which the existing ASP code no longer runs.
The legacy ASP code is included in the previous version of StatPlanet Plus (in the 'export' folder):

http://www.statsilk.com/files/software/StatPlanet_Plus_3.11.zip

It would need to be modified to correspond to the PHP code in this folder, specifically the code: base64_decode($_POST['imagedata']);

By default StatPlanet will use the PHP version. If your web server is configured to use ASP files,
you would also need to change the following setting in the StatPlanet Data Editor, sheet 'settings':

- Setting: "EXPLANG", in the section 'Export options'
- Value: change from 'php' to 'asp'