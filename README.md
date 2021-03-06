
# TOML Resume

> use Toml file and command line tools to build your resume

Topics: [resume](https://github.com/topics/resume),  [document-tools](https://github.com/topics/document-tools),  [toml](https://github.com/topics/toml),  [templating](https://github.com/topics/templating),  

Take the good parts of json-resume, the json file with your resume, and then  make it really easy to work on. No theme registry, no scheme validation, and no errors is you forget to add a comma. Supports multi-line text, commenting, and all template files are included so adding new sections and changing the order of things is easy.

Demo: [charrismatic.github.io/toml-resume](https://charrismatic.github.io/toml-resume)

## Features

- Export to PDF from command line
- Multiple sized pages and orientation
- Develop your theme in live print-preview-like mode
- Print styles and paper.css make render correct
- SCSS theme and Handlebars template blocks
- Multiple output options (HTML, Markdown, Text, \*JSON, \*TOML)

\*Not directly available yet



## Getting started



## Dependencies

-  toml: "^3.0.0"
-  browser-sync: "^2.26.7"
-  handlebars: "^4.0.11"
-  nodemon: "^1.19.1"
 - node-sass

## Peer Dependencies

 - stylelint (.stylelintrc is included if you wish to contribute please follow provided style)
 - js-beautify (used in this projects deploy command)
 - google-chrome (used to export the pdf, will not be packaged with this project)

## Optional Dependencies

 - hunspell (enables spellcheck on your resume at the commandline)


### Create a new resume data 

Create a new resume.toml file from the example in the data folder 

```
cp data/resume.example.toml data/resume.toml
```

### Install the command line

Install [resume-cli](https://github.com/jsonresume/resume-cli) to render your resume.

```
npm i
```

### Options

  - `debug`          - true
  - `verbose`        - false
  - `log_file`       - resume_build.log
  - `console_output` - false
  - `resume_dir`     - data
  - `resume_format`  - toml
  - `resume_file`    - resume.toml
  - `export_dir`     - .public
  - `export_file`    - index.html
  - `format`         - html

Options are currently set using env variables, or added to the resume file itself. 

All the files needed to build and run parts of the project are under the 'run' folder. The npm-scripts are easier to manage when they're files files instead of trying to fit them all into a single line of JSON code. They work exactly the same way but its allow for greater control over the environment flags and variables.


## Usage

 -  start:        npm run sync && npm run templates:dev & npm run styles:dev & npm run serve
 -  build:        ./run/build  
 -  clean:        ./run/clean  
 -  deploy:       ./run/deploy   
 -  sync:         ./run/sync-assets  
 -  serve:        ./run/serve  
 -  styles:       ./run/styles   
 -  styles:dev:   ./run/styles-dev   
 -  styles:lint:  ./run/styles-lint  
 -  templates:    ./run/templates  
 -  templates:dev ./run/templates-dev  
 -  meta:bump:    npm version patch -m "Increasing npm package version v%s"  
 -  meta:release: npm version patch -m "Release: %s"  
 -  env:          env | sort | grep npm"  



## The NPM way

```
npm run templates:dev
npm run styles:dev
npm run serve:dev
```

## The CLI way

```
./run/templates-dev
./run/styles-dev
./run/serve-dev
```


If you want to make changes please follow the convention used here.

__"/run/"__ - the location of the scripts for the npm run command


__"scriptname"__

  - make the name of the script and the entry in `package.json` the same.
  - It is not required but stricter naming rules keeps thigs simple
  - script/command names should try to be short and one word. If needed use underscores to `seperate_longer_word` and `doNotDoThis` camelCase should not be used for shell command line file names.

__"script-variations"__

  - for script variations use a `dash` in the filename and a color in the `package.json` file.


### Start live server, generate theme, and stylesheet

```
npm start
```

Open the browser to the address shown. (it should do this for you)

```
Preview: http://localhost:5002
Press ctrl-c to stop
```

## Editing templates

Template files are handlebars type, located in `templates/`


### Editing theme

Theme style files located in `assets/scss` and `styles.scss` is the main entry point.

There is currently only one master template and theme, but the template is designed to be as modular as possible and the theme is organized in a way to allow for theme creation. Future versions of this package will allow for more options in choosing your layouts and theme colors.

__Build stylesheet__

```
npm run styles
```

### Dev, Build, Deploy

```
npm run [start|build|deploy]
```

These are differnent stages all using the same command set.

`Start` enables browser-sync, and turns on the watch flag for all parts then serves the files. Files are output to '.public'

`Build` does the same thing except does not serve the files and the files are output to '.build/<TIMESTAMP>'. Build also outputs a copy of your resume in Markdown format and a plain txt file. **Do not store things** that you like in the build folder, it is cleaned up very frequently and does not check if youve made changes and want to save.

`Deploy` executes the build command then passes generated files through optizers and formatters. This command also renders a pdf output a standard size "Letter" sheet.  Files are output to '.dist/<VERSION>'


These three are the simplest command options to get started. You can also directily run any of the scripts in the run folder or the npm script using `node index.js`

The condfiguration style and project structure is build to be similar to Hugo projects

Check out hugo-resume for an example of a similar project.


Development notes:

- The templates are rendered with handlebars
- The resume source data accepts json but looks for a .toml file first (toml is much better for working with text)
- Styles are built with node-sass. If this is already installed globally you do not need to require again.
- You can use the npm `serve` package to serve the resume found in the public export folder (default .public)
- Nodemon is used to watch the template directory and re-render the html files on change.
- You can run any of the npm command line commands without installing anything if you add `npx` to the front of it.
- You can change the paths or defaults for any of the build commands without breaking the project, each command looks for a `.env` file to reference before running, simply change the value in the `.env` and everything will continue to work. You have end up not having a good time if you start doing this.



### Issues

-  url: "https://github.com/charrismatic/toml-resume/issues"


## License

Template design is available under [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/) attributed to [xriley](https://github.com/xriley)

Source code for generating resume is available under [the MIT license](http://mths.be/mit).


### Author

Matt Harris
