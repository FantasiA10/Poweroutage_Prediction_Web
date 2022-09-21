#coding=utf-8
#from osgeo import ogr
#import shapefile
#import pandas as pd
import os
import pymysql
import json
from json import dumps
import csv


#database setup for local host
db = pymysql.connect(
         host='localhost',
         port=3306,
         user='root',
         passwd='',
         db ='power_outage',
         charset='utf8'
         )
cur = db.cursor()

#read shapefile out put result to cvs file
def json_to_csv(file):
    with open(file, 'r') as f:
        try:
            f != None
        except ValueError:
            print("file not found!")
        dict1 = json.load(f)
        city_info_lst = [[] for i in range (19)]
        header = []
        for sub_header in dict1['features'][0]['properties']:
            header.append(sub_header)
        for element in dict1['features']:
            city_info = element['properties']
            counter = 0
            for info in city_info:
                city_info_lst[counter].append(city_info[info])
                counter += 1
            city_info_lst[counter].append(0)
    f.close()
    return city_info_lst, header

#shape file imformation to geojson formatting
def shp_to_GeoJson(shpfile, geojsonfile):
    # read the shapefile
    reader = shapefile.Reader(shpfile)
    fields = reader.fields[1:]
    field_names = [field[0] for field in fields]
    buffer = []
    for sr in reader.shapeRecords():
        atr = dict(zip(field_names, sr.record))
        geom = sr.shape.__geo_interface__
        buffer.append(dict(type="Feature", \
        geometry=geom, properties=atr)) 
    geojson = open(geojsonfile, "w")
    geojson.write(dumps({"type": "FeatureCollection", "features": buffer}, indent=2) + "\n")
    geojson.close()
    print("successfully convert shapefile to geojson")

#transfer all shapefiles to jsons in folder
def main_shpfile_to_json():
    path = "shapefile/state_default_shp"
    files = os.listdir(path)
    #shp_to_GeoJson("shapefile/state_default_shp/US_States.zip", "shapefile/state_json/US.json")
    for filename in files:
        shp_path = "shapefile/state_default_shp/" + filename
        json_path = "shapefile/state_json/" + filename[8:10] + ".js"
        print(shp_path, json_path)
        shp_to_GeoJson(shp_path, json_path)

#transfer all json file to cvs in folder
def folder_json_to_csv():
    path = "C:/Users/15801/Desktop/Poweroutage_Prediction_Web/shapefile/state_json"
    files = os.listdir(path)
    size = 19
    city_info_lst = [[] for i in range (size)]
    for filename in files:
        if filename != 'US.json':
            json_path = path + '/' + filename
            sub_city_info_lst, header = json_to_csv(json_path)
            for i in range(size):
                city_info_lst[i].extend(sub_city_info_lst[i])
    city_data = {}
    for i in range (size-1):
        city_data[header[i]] = city_info_lst[i]
    city_data['outage'] = city_info_lst[size-1]
    print(city_data)
    dataframe = pd.DataFrame(city_data)
    dataframe.to_csv("city_info.csv",index=False,sep=',')
    return city_info_lst, header

#create database table from given cvs file
def load_csv(csv_file_path,table_name,database='power_outage'):
    file = open(csv_file_path, 'r',encoding='utf-8')
    reader = file.readline()
    b = reader.split(',')
    colum = ''
    for a in b:
        colum = colum + a + ' varchar(255),'
    colum = colum[:-1]
    #insert headers into databse
    create_sql = 'create table if not exists ' + table_name + ' ' + '(' + colum + ')' + ' DEFAULT CHARSET=utf8'
    cur.execute('use %s' % database)
    cur.execute('SET NAMES utf8;')
    cur.execute('SET character_set_connection=utf8;')
    cur.execute(create_sql)
    res = csv.reader(file)
    counter = 0
    for line_data in res:
        counter+=1
        print(line_data)
        #insert data into database table by line
        data_sql = 'insert into '+ table_name + ' value(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'
        cur.execute(data_sql, line_data)
    print(counter)
    cur.fetchone()
    cur.close()
    file.close()

#update database table from given model out put cvs file with format cousubfp|outage ratio
def update_database(csv_file_path = 'C:/Users/15801/Desktop/Poweroutage_Prediction_Web/data/outage_predictions.csv', table_name = 'city_info'):
    file = open(csv_file_path, 'r',encoding='utf-8')
    reader = file.readline()
    res = csv.reader(file)
    for line_data in res:
        line_data = [float(line_data[1]), line_data[0]]
        data_sql = 'update ' +  table_name + ' set outage = %s where cousubfp = %s'
        cur.execute(data_sql, line_data)
    cur.fetchone()
    cur.close()
    file.close()
    
#reset database table's outage to 0
def reset_datebase(table_name = 'city_info'):
    data_sql = 'update ' +  table_name + ' set outage = 0'
    cur.execute(data_sql)
    cur.fetchone()
    cur.close()


def main():
    City_Info_Dir = os.path.abspath(os.path.join(os.getcwd(), ".."))+'\data\city_info.csv'
    load_csv(City_Info_Dir, "city_info")
    #shp_to_GeoJson("shapefile//tl_2021_36_cousub.zip", "backend/tl_2021_36_cousub.json")

main()

