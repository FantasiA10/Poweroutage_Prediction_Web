#coding=utf-8
import gdal
from osgeo import ogr
import os,sys
import pymysql

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
        cursor.execute("SELECT VERSION()")
        cursor.fetchone()
        feature.Destroy()
        feature = layer.GetNextFeature()
    ds.Destroy()

#todo
def shp_to_GeoJson(shpfile, geojsonfile):
    gdal.SetConfigOption("GDAL_FILENAME_IS_UTF8", "YES")
    gdal.SetConfigOption("SHAPE_ENCODING", "GBK")
    src_ds = ogr.Open(shpfile)
    src_layer = src_ds.GetLayer(0)
 
    # establish Geojson output file
    baseName = os.path.basename(geojsonfile)
    dst_driver = ogr.GetDriverByName('GeoJSON')
    dst_ds = dst_driver.CreateDataSource(geojsonfile)
    if dst_ds.GetLayer(baseName):
        dst_ds.DeleteLayer(baseName)
    dst_layer = dst_ds.CreateLayer(baseName, src_layer.GetSpatialRef())
    dst_layer.CreateFields(src_layer.schema)
    dst_feat = ogr.Feature(dst_layer.GetLayerDefn())
 
    # setup output
    for feature in src_layer:
        dst_feat.SetGeometry(feature.geometry())
        for j in range(feature.GetFieldCount()):
            dst_feat.SetField(j, feature.GetField(j))
        dst_layer.CreateFeature(dst_feat)
 
    del dst_ds
    del src_ds
    print("successfully convert shapefile to geojson")

