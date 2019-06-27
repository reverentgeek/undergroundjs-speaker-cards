# undergroundjs Speaker Cards

If you really want to use this for your own purposes, here's what you'll need to do.

* Clone / download repository
* Run `npm install`
* Replace `/speaker-cards/assets/SpeakerCardBackground.png` with your background image. Recommend 2048x1024.
* Add speakers to `/src/speaker_data.json`. See the sample file for expected format.
* In one terminal, run `npm start` to start the web server
* In another terminal, run `node .` to run the code. This will generate HTML files (and starter tweets), and open the default browser with each of the HTML files. The HTML files are set up to automatically download a `png` of the generated speaker card.
* Tweak `/speaker-cards/assets/styles.css` and `/src/template.hbs` to meet your needs.

Hope you find it useful!
