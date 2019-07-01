# undergroundjs Speaker Cards

If you really want to use this for your own purposes, here's what you'll need to do.

* Clone / download repository
* Run `npm install`
* Replace `/speaker-cards/assets/SpeakerCardBackground.png` with your background image. Recommend 2048x1024.
* Add speakers to `/src/speaker_data.json`. See the sample file for expected format.
* Tweak `/speaker-cards/assets/styles.css` and `/src/template.hbs` to meet your needs.

> Note: You need to install any fonts you need locally. Web fonts do not seem to render properly to image.

Run `node .` to render cards.

A local web server will created to serve the images, each the speaker will be opened in your default browser, and a .png file will be automatically generated and downloaded.

Hope you find it useful!
