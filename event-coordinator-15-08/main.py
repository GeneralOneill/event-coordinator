#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import jinja2
import os
from google.appengine.ext import ndb

jinja_environment = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

# class Place(ndb.Model):
#     name = ndb.StringProperty(required = True)
#     location = ndb.StringProperty(required = True)
#     value = ndb.StringProperty(required = True)
#     category = ndb.StringProperty(repeated = True)
#
# portillos = Place(name = "Portillos", location = "100 W Ontario St, Chicago, IL 60654", value = "4", category = ["Food"])
# giordanos = Place(name = "Giordanos", location = "700 E Grand Ave, Chicago, IL 60611", value = "2", category = ["Food"])
#
# Sports_1 = Place(name = "Football", location = "1", value = "1", category = ["Sports"])
# Sports_2 = Place(name = "Soccer", location = "1", value = "3", category = ["Sports"])
#
# Entertainment_1 = Place(name = "Movies", location = "1", value = "1", category = ["Entertainment"])
# Entertainment_2 = Place(name = "Shows", location = "1", value = "2", category = ["Entertainment"])
#
# Recreation_1 = Place(name = "Happy Times", location = "1", value = "4", category = ["Recreation"])
# Recreation_2 = Place(name = "Fun Times", location = "1", value = "2", category = ["Recreation"])
#
# portillos.put()
# giordanos.put()
# Sports_1.put()
# Sports_2.put()
# Entertainment_1.put()
# Entertainment_2.put()
# Recreation_1.put()
# Recreation_2.put()

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('templates/main.html')
        self.response.out.write(template.render())

class SelectionHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('templates/selections.html')

        # interest = self.request.get('interest').lower()
        # number_of_people = self.request.get('number_of_people')
        # results = Place.query(Place.category == interest, Place.value == number_of_people).fetch()
        # template_vars = {"results": results}

        self.response.out.write(template.render())

class AboutHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('templates/about.html')
        self.response.out.write(template.render())
        self.response.out.write('About')

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/selections', SelectionHandler),
    ('/about', AboutHandler)
], debug=True)
