import datetime
from flask import Flask, render_template, request, flash, redirect, session
from flask_session import Session

# Configure application and access JavaScript files
app = Flask(__name__, static_url_path='/static')

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

app.config["TEMPLATES_AUTO_RELOAD"] = True

@app.route("/temp_unit", methods=["POST", "GET"])
def temp_scale():
    if request.method == "POST":
        #Get current degree scale from JS
        unit = request.json.get("unit")
        #Stores scale in session
        session["unit"] = unit
        return "Temperature unit updated: {}".format(unit)
    
    unit = session.get("unit")
    return unit

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")
    
    elif request.method == "POST":
        usercity = request.form.get("usercity")
        if not usercity or usercity.isnumeric():
            flash("Enter a valid city")
            return redirect("/")
        session["usercity"] = usercity
        return redirect("/current?thecity=" + usercity)
 
@app.route("/current", methods=["GET"])
def current():
    #Checks if user already has weather data from previous session
    try:
        usercity = session.get("usercity")
    except (KeyError, ValueError):
        return render_template("current.html")
    return render_template("current.html", thecity = usercity)

@app.route("/3dayforecast", methods=["GET"])
def threeday():
    #Calculate dates for three-day forecast
    today = datetime.date.today()
    threedays = [today + datetime.timedelta(days=i) for i in range(3)]

    #Checks if user already has weather data from previous session
    try:
        usercity = session.get("usercity")
    except (KeyError, ValueError):
        return render_template("3dayforecast.html", thedays = threedays)
    return render_template("3dayforecast.html", thecity = usercity, thedays = threedays)

@app.route("/hourly", methods=["GET"])
def gethourly():
    try:
        usercity = session.get("usercity")
    except (KeyError, ValueError):
        return render_template("hourly.html")
    return render_template("hourly.html", thecity = usercity)

if __name__ == "__main__":
    app.run()
    