heroku login
heroku container:login
heroku container:push web -a denzel-apis
heroku container:release web -a denzel-apis
heroku open -a denzel-apis