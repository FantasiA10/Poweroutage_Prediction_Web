#coding=utf-8
import gdal
from osgeo import ogr
import os,sys
import pymysql
import shapefile
from json import dumps


#read shapefile out put result to database
def shp_to_db(file):
    ds = ogr.Open(file,0)
    try:
        ds != None
    except ValueError:
        print("file not found!")
    #modify hosts
    db = pymysql.connect(
         host='localhost',
         port=3306,
         user='root',
         passwd='',
         db ='power_outage',
         charset='utf8'
         )

    cursor = db.cursor()
    layer = ds.GetLayer()
    featuredefn = layer.GetLayerDefn()
    fieldcount = featuredefn.GetFieldCount()
    for attr in range(fieldcount):
        fielddefn = featuredefn.GetFieldDefn(attr)
        print("%s:  %s"%(\
            fielddefn.GetNameRef(),\
            fielddefn.GetFieldTypeName(fielddefn.GetType())))
    feature = layer.GetNextFeature() 
    while feature:
        name = feature.GetFieldAsString('NAME')
        outage = feature.GetFieldAsString('OUTAGE')
        #insert data into db
        sql = "insert"
        try:
            cursor.execute(sql)
            db.commit()
        except:
            db.rollback()
        cursor.fetchone()
        feature.Destroy()
        feature = layer.GetNextFeature()
    db.close()
    ds.Destroy()

#todo
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
   
    # write the GeoJSON file
   
    geojson = open(geojsonfile, "w")
    geojson.write(dumps({"type": "FeatureCollection", "features": buffer}, indent=2) + "\n")
    geojson.close()
    print("successfully convert shapefile to geojson")

shp_to_GeoJson("backend/tl_2021_36_cousub.zip", "tl_2021_36_cousub.json")

