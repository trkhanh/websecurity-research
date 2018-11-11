import httplib2
h = httplib2.Http(".cache")
resp, content = h.request("http://www.flickr.com/photos/nypl/", "GET")