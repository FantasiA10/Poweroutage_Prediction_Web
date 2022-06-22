#coding=utf-8
from osgeo import ogr
import os,sys
def readshp(file, outtxtloc):
    ds = ogr.Open(file,0)
    try:
        ds != None
    except ValueError:
        print("file not found!")
    layer = ds.GetLayer()
    featuredefn = layer.GetLayerDefn()
    fieldcount = featuredefn.GetFieldCount()
    for attr in range(fieldcount):
        fielddefn = featuredefn.GetFieldDefn(attr)
        print("%s:  %s"%(\
            fielddefn.GetNameRef(),\
            fielddefn.GetFieldTypeName(fielddefn.GetType())))
    outtxtfile = open(outtxtloc,'w')
    print(outtxtfile)
    feature = layer.GetNextFeature() 
    while feature:
        name = feature.GetFieldAsString('NAME')
        #outage = feature.GetFieldAsString('OUTAGE')
        #outtxtfile.write("%s/%s", name, outage)
        outtxtfile.write("%s/\n" %name)
        feature.Destroy()
        feature = layer.GetNextFeature()
    ds.Destroy()
    outtxtfile.close()

#readshp('C:\\Users\\15801\\Desktop\\power outrange prediction\\curr\\US_State\\US_States.shp', 'C:\\Users\\15801\\Desktop\\power outrange prediction\\temp\\dataout.txt')