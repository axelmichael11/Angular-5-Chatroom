# ChatApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

##Project instructions.

1. Clone repo. run `npm i` in the root directory of the folder, where the package.json is...

2. open two terminal/bash windows.... If you can see, the front end of this project is running on `http://localhost:4200/`, while the node server file is running on `http://localhost:8888/`. Turn on the server first, by running `node server.js`.... THEN proceed to run `ng serve`

##MASSIVE NOTE AND BUG
3. I regret to inform you, that this project has a typescript error... It happened to me for several days, and after heavily researching the problem, it comes back with something like this...

ERROR in src/app/chatroom/chatroom.component.ts(20,30): error TS1005: '(' expected.
src/app/current-users/current-users.component.ts(7,1): error TS1005: '{' expected.
src/app/messages/messages.component.ts(19,24): error TS1005: '(' expected.
src/app/messages/messages.component.ts(21,20): error TS1005: '(' expected.
src/app/services/currentusers.service.ts(22,35): error TS1005: '(' expected.
src/app/services/currentusers.service.ts(22,66): error TS1005: '=' expected.

##However

To temporarily get around this error, specifically a TS1005 error,  and successfully build the project, please go to one of these files and simply change something and save the file. I should have left console logs for you to comment out/in... after completing so the project will recompile and run!


Thanks so much for a great project and learning experience. I now feel that I have a solid introduction to Angular 5, rxjs, and material angular.

Sincerely,
Michael Axelson


#Notes
I wanted to note that I did spend quite some time researching this error, and as of right now the angular community doesn't have a solid answer... I have posted some links to the topic below.


https://github.com/DefinitelyTyped/DefinitelyTyped/issues/4004


https://github.com/Microsoft/TypeScript/issues/14640

https://community.c9.io/t/c9-throws-expected-errors-with-angular2-typescript/4831/4

https://github.com/DefinitelyTyped/DefinitelyTyped/issues/17459
