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
import logging
from google.appengine.ext import ndb
from google.appengine.api import users

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

class UserModel(ndb.Model):
    currentUser = ndb.StringProperty(required = True)
    favorite_places = ndb.TextProperty(repeated = True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        request = self.request.get('logout_button')
        if request:
            self.redirect(users.create_logout_url('/'))
        if user:
            self.response.write(user)
            user = UserModel(currentUser = user.user_id())
            # user.put()
        else:
            self.redirect(users.create_login_url(self.request.uri))
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

class FavoriteHandler(webapp2.RequestHandler):
    def get(self):
        user_id = users.get_current_user().user_id()
        found_users = UserModel.query().filter(UserModel.currentUser == str(user_id)).fetch()
        favorite_places = found_users[0].favorite_places
        template = jinja_environment.get_template('templates/favorites.html')
        template_vars = {
            'favorites': favorite_places
            }
        self.response.out.write(template.render(template_vars))
    def post(self):
        user_id = users.get_current_user().user_id()
        favorite = self.request.get('selected_place')
        found_users = UserModel.query().filter(UserModel.currentUser == str(user_id)).fetch()
        if len(found_users) == 0:
            user = UserModel(currentUser = user_id, favorite_places = [favorite])
        else:
            user = found_users[0]
            if favorite not in user.favorite_places:
                user.favorite_places.append(favorite)
        user.put()
        logging.info(self.request.get("selected_place"))



app = webapp2.WSGIApplication([
    ('/selections', SelectionHandler),
    ('/about', AboutHandler),
    ('/favorites', FavoriteHandler),
    ('/.*', MainHandler),
], debug=True)
