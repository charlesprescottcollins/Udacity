## Website Performance Optimization portfolio project

### Directory Structure

* src - source directory before build processing
* dist - production distributable directory after build

### Build and run project 4 portfolio
From the command line

1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely
2. git clone https://github.com/charlesprescottcollins/Udacity.git
2. cd frontend-nanodegree/frontend-nanodegree-mobile-portfolio
2. npm install # note: you may need to use sudo
2. gulp #run the build / minification process
1. python -m SimpleHTTPServer 8080 #start python server on port 8080
2. open a new terminal at the same location
1. ngrok 8080 # note: on my mac I needed to run '/Applications/ngrok http 8080')
10. Copy the public URL ngrok gives you and try running it through PageSpeed Insights at the 'dist' directory i.e. http://652ca130.ngrok.io/dist
