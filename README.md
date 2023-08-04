Poweroutage_Prediction_Web
This Porject is build throught basd on Nodejs server and a MySQL database, To have the web work as expect you should have the following instructions.
# unzip the shapefile/state_json/state_json.zip to local file derectory
# install a MySQL database form any platform
# activate database and create MySQL database name it power_outage
# import file data/us_state_fips.csv into power_outage database just created
# modify variable db in file backend/datasetup.py to match database host 
# modify variable db in file frontend/src/method.js to match database host 
# modify variable full  Filename in file frontend/src/method.js in line 17 to {POWEROUTAGE_PREDICTION_WEB}/shapefile/state_json/'+filename+'.json' to match current directory of POWEROUTAGE_PREDICTION_WEB file.
# run datasetup.py to load city data in to database 
# to run dataset.py you should have os, pymysql, json, csv python module installed
# install Nodejs from windows command line
# move to frontend directory (cd {POWEROUTAGE_PREDICTION_WEB}/frontend)
# run command npm run dev