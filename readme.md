# D&D Helper
This is an open-source D&D helper application, designed for dungeon master use for in person games in a room with a screen. This should easily allow DMs to import sounds, character images, backgrounds and videos to show to the players at the click of a button.

It also includes a simple initiative tracker, encounter builders, with more coming soon.

## :closed_book: File Formats
When creating files to import, the filename is used to automatically categories the files. This means you can set up a folder of relevant images and audios, and then by draging them both onto the website, instantly be prepared for your session. Here are the filename properties being used:

#### :file_folder: General Naming
Names from files are displayed as they exist, with any suffix or prefixes (listed below) removed, and remaining _ will be replaced with spaces. For charater profiles, Figereoth_Faeth.png would be displayed as "Figereoth Faeth".

- ##### :musical_note: Sound Files:
  - "_loop" suffix will mean the sound is loopable. Use this for music or ongoing background sounds.

- ##### :national_park: Image Files:
  - using "_" as a prefix to avoid showing the character name on the screen. Instead, ??? will be shown.
  - "_location" suffix will use the image as a background instead of as a character portrait.

- ##### :vhs: Video Files:
  - "_location" suffix will play the video on loop as a background.
  - Otherwise, videos will be event videos, played over everything, and afterwards cut to black before fading the underlying scene back in.

## Running locally
`npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.