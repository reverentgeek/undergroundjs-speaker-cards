const fs = require( "fs-extra" );
const handlebars = require( "handlebars" );
const log = require( "./logger" );
const speakerJson = "./src/speaker_data.json";
const open = require( "open" );

const getTwitterHandle = twitterLink => {
  return "@" + twitterLink.replace( "https://twitter.com/", "" );
};

const normalizeSpeakerData = async speakers => {
  let updated = false;
  speakers.forEach( speaker => {
    if ( !speaker.slug ) {
      updated = true;
      speaker.slug = slugify( speaker.name );
    }
    if ( !speaker.twitterLink ) {
      updated = true;
      speaker.twitterLink = speaker.twitter;
      speaker.twitter = getTwitterHandle( speaker.twitter );
    }
  } );
  if ( updated ) {
    log.info( "updating speaker file" );
    await fs.writeJSON( speakerJson, speakers, { spaces: 2 } );
  }
  return speakers;
};

const slugify = name => {
  return name.toLowerCase().replace( /[ .]/g, "_" );
};

const generateTweets = async speakers => {
  fs.ensureDir( "./tweets" );
  speakers.forEach( async speaker => {
    const slug = slugify( speaker.name );
    log.info( `generating tweets for ${ slug }` );
    const tweet = `Come hear ${ speaker.twitter } at @undergroundjs present "${ speaker.bio }"
  
Excited to have ${ speaker.twitter } at @undergroundjs present "${ speaker.bio }"`;
    await fs.writeFile( `./tweets/${ slug }.txt`, tweet );
  } );	  
};

const renderSpeakerCards = async speakers => {
  speakers.forEach( async speaker => {
    const url = `http://localhost:8080/${ speaker.slug }.html`;
    log.info( `rendering ${ url }` );
    open( url );
  } );
};

const buildSpeakerHtmlCards = async speakers => {
  fs.ensureDir( "./speaker-cards" );
  const templateFile = await fs.readFile( "./src/template.hbs", "utf8" );
  const template = handlebars.compile( templateFile );
  speakers.forEach( async speaker => {
    const html = template( speaker );
    const fileName = `./speaker-cards/${ speaker.slug }.html`;
    log.info( `creating ${ fileName }` );
    await fs.writeFile( fileName, html );
  } );
};

const main = async () => {
  const rawSpeakers = await fs.readJSON( speakerJson );
  const speakers = await normalizeSpeakerData( rawSpeakers );
  await generateTweets( speakers );
  await buildSpeakerHtmlCards( speakers );
  await renderSpeakerCards( speakers );
};

main();
