from django.http import HttpResponse
from django.shortcuts import render
import json, urllib

def index(request):

    # Construct a dictionary to pass to the template engine as its context.
    # Note the key boldmessage is the same as {{ boldmessage }} in the template!
    context_dict = {'boldmessage': "I am bold font from the context"}

    # Return a rendered response to send to the client.
    # We make use of the shortcut function to make our lives easier.
    # Note that the first parameter is the template we wish to use.

    return render(request, 'po/index.html', context_dict)


def get_address(request):
    print "reached get_address"
    response = {'status': 0}
    try:
        print request
        latlong = request.GET.get("latitude") + "," + request.GET.get("longitude")

        print latlong
        
        query = latlong.encode('utf-8')
        print query
        params = {
            'latlng': query,
            'sensor': "false"
        }
        googleGeocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?'
        url = googleGeocodeUrl + urllib.urlencode(params)
        json_response = urllib.urlopen(url)
        response = json.loads(json_response.read())
        print response
        if response['results']:
            formatted_address = response['results'][0]['formatted_address']
            response['status'] = 1
            response['address']=formatted_address
        else:
            print query, "<no results>"

        latlng=12.9175337,77.6504572
    except:
        print( "Error in getting address " )
    return HttpResponse(json.dumps(response), content_type='application/json')


def get_coordinates(request):
    print "reached get_coordinates"
    response = {'status': 0}
    try:
        print request
        ad = request.GET.get("address")
        print ad
        query = ad.encode('utf-8')
        print query
        params = {
            'address': query,
            'sensor': "false"
        }
        googleGeocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?'
        url = googleGeocodeUrl + urllib.urlencode(params)
        json_response = urllib.urlopen(url)
        response = json.loads(json_response.read())
        print response
        if response['results']:
            location = response['results'][0]['geometry']['location']
            formatted_address = response['results'][0]['formatted_address']
            latitude, longitude = location['lat'], location['lng']
            print query, latitude, longitude
            response['status'] = 1
            response['latitude']=latitude
            response['longitude']=longitude
            response['address']=formatted_address
        else:
            print query, "<no results>"
    except:
        print( "Error in getting address " )
    return HttpResponse(json.dumps(response), content_type='application/json')


