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

#class Food(self, location):
#    self.location = location
class Food(ndb.Model):
    name = ndb.StringProperty(required = True)
    location = ndb.StringProperty(required = True)

class Sports(ndb.Model):
    name = ndb.StringProperty(required = True)
    location = ndb.StringProperty(required = True)

class Recreation(ndb.Model):
    name = ndb.StringProperty(required = True)
    location = ndb.StringProperty(required = True)

class Entertainment(ndb.Model):
    name = ndb.StringProperty(required = True)
    location = ndb.StringProperty(required = True)
#If this code doesn't work, delete it

portillos =Food(name = "Portillos", location = "100 W Ontario St, Chicago, IL 60654")
giordanos =Food(name = "Giordanos", location = "700 E Grand Ave, Chicago, IL 60611")
# portillos.put()
# giordanos.put()
class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('templates/main.html')
        self.response.out.write(template.render())
        self.response.out.write('Click here to get your results!')


class SelectionHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('templates/selections.html')
        template_vars = {}
        response = self.request.get('interest')
        self.response.write(response)
        if response == 'Food':
            food_results = Food.query().fetch()
            template_vars = {"results": food_results}
        if response == 'Sports':
            sports_results = Sports.query().fetch()
            template_vars = {"results": sports_results}
        if response == 'Recreation':
            recreation_results = Recreation.query().fetch()
            template_vars = {"results": recreation_results}
        if response == 'Entertainment':
            entertainment_results = Entertainment.query().fetch()
            template_vars = {"results": entertainment_results}
        self.response.out.write(template.render(template_vars))
        # self.response.out.write('Here are your results!')



app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/selections', SelectionHandler)
], debug=True)
