# SEIR Project 4 - Project-Share - API
 
This is the backend app, designed to work with the client app.
Repo to the client app is here:
https://github.com/tylly/project-4-react
 
## About Project-Share
 
## Technology
We will be using a Node server, with Mongoose and Express for our back end app, that will support full CRUD actions.
The app will utilize AWS to store the uploaded images and MongoDB Atlas as the cloud database.
Dependencies are all managed by NPM with emphasis on AWS-SDK package and Multer package to handle the upload to AWS.
Links to all technologies will be provided at the end of this document.
We used webscraping technology (Cheerio) to gather the developers profile pictures from git hub.
 
### Installation instructions
To use this app you will need to install all dependencies needed, and you can do that by running these commands in your command line:
 
```
$ npm install
```
```
$ npm start
```
 
This app will require an AWS account and an AWS bucket to be set up (see link to AWS below).
You will also need to set up an environment file (.env) with the following items:
TBD
- AWS key ID
- AWS secret key ID
- AWS bucket name
 
AWS_ACCESS_KEY_ID=" "
AWS_SECRET_ACCESS_KEY=" "
BUCKET=" "
 

### Stretch Goals
- likes
- comments
- project rating system
&nbsp;
&nbsp;
## Route Table
- ### User Authentication
   | Verb   | URI Pattern         | Controller#Action |
   | ------ | ------------------- | ----------------- |
   | POST   | `/sign-up`          | `users # signup`    |
   | POST   | `/sign-in`          | `users # signin`    |
   | PATCH  | `/change-password/` | `users # changepw`  |
   | DELETE | `/sign-out/`        | `users # signout `  |

- ### Projects
   | Verb   | URI Pattern | Controller#Action    |
   | ------ | ----------- | -------------------- |
   | GET    | `/projects` | `projects # index` |
   | GET    | `/projects/:projectId` | `projects # show` |
   | GET    | `/myProjects`| `projects # personal show` |
   | POST   | `/projects` | `project # add` |
   | PATCH  | `/projects/:projectId`  | `projects # update`|
   | DELETE | `/projects/:projectId`  | `projects # destroy`|

- ### Developer routes
   | Verb   | URI Pattern         | Controller#Action |
   | ------ | ------------------- | ----------------- |
   | GET   | `/developers` | `developers # index`    |
    | GET   | `/developers/:devId`| `developers # show`    |
   | POST   | `/developers` | `add # add`    |
   | PATCH  | `/developers/:devId` | `developers # update`  |
   | DELETE | `/developers/:devId` | `developers # destroy `  |

&nbsp;
&nbsp;    
### ERD
![](app/images/ERD%203.48.59%20PM.png)
&nbsp;
&nbsp;
## Schema
- ### User
   - email: string
       - required
       - unique
   - username: string
       - required
       - unique
   - hashedPassword: string
       - required
   - token: string
   - timestamps
  
- ### Project
   - title: String
   - description: String
   - tags: [ ]
   - image: url(?) w aws
   - deployment: String
   - frontEndRepo: String
   - backEndRepo: String
   - developers: [ ]
   - owner: User ref Object Id
       - required

### Optional Seed file - 
```JavaScript
const cohortDevelopers = [
  {
    name: "Alys Cooper",
    linkedin: "https://www.linkedin.com/in/alyscooper/",
    github: "https://github.com/alysvolatile",
    portfolio: "https://github.com/alysvolatile",
  },
  {
    name: "Amanda Corral",
    linkedin: "https://www.linkedin.com/in/amandacorral07/",
    github: "https://github.com/Amandacorral07/",
    portfolio: "https://github.com/Amandacorral07/",
  },
  {
    name: "Ariana Briceno",
    linkedin: "https://www.linkedin.com/in/ariana-briceno/",
    github: "https://github.com/arianamichele/",
    portfolio: "https://github.com/arianamichele/",
  },
  {
    name: "Casey Jones",
    linkedin: "https://www.linkedin.com/in/casey-jones-11113b83/",
    github: "https://github.com/cjones1047",
    portfolio: "https://github.com/cjones1047",
  },
  {
    name: "Christian Brewer",
    linkedin: "https://www.linkedin.com/in/christianbrewer/",
    github: "https://github.com/christian-the-brewer/",
    portfolio: "https://github.com/christian-the-brewer/",
  },
  {
    name: "Dan Stacy",
    linkedin: "https://www.linkedin.com/in/daniel-stacy/",
    github: "https://github.com/danstacy1/",
    portfolio: "https://github.com/danstacy1/",
  },
  {
    name: "Dang Do",
    linkedin: "https://www.linkedin.com/in/dangdo-se/",
    github: "https://github.com/dangdo85/",
    portfolio: "https://github.com/dangdo85/",
  },
  {
    name: "Efrain Davila",
    linkedin: "https://www.linkedin.com/in/efraindavila/",
    github: "https://github.com/EfrainAD/",
    portfolio: "https://github.com/EfrainAD/",
  },
  {
    name: "Erisha Roach",
    linkedin: "https://www.linkedin.com/in/erisharoach/",
    github: "https://github.com/erisha/",
    portfolio: "https://github.com/erisha/",
  },
  {
    name: "Eshal Ali",
    linkedin: "https://www.linkedin.com/in/eshalali/",
    github: "https://github.com/eshalali/",
    portfolio: "https://github.com/eshalali/",
  },
  {
    name: "Fei Yu",
    linkedin: "https://www.linkedin.com/in/fei-yu-swe/",
    github: "https://github.com/f-eiyu",
    portfolio: "https://github.com/f-eiyu",
  },
  {
    name: "Gonzalo Quiroqa",
    linkedin: "https://www.linkedin.com/in/gonzalo-quiroga-222604216/",
    github: "https://github.com/Gq0w/",
    portfolio: "https://github.com/Gq0w/",
  },
  {
    name: "Hayden Moyes",
    linkedin: "https://www.linkedin.com/in/haydenmoyes/",
    github: "https://github.com/hrmoyes/",
    portfolio: "https://github.com/hrmoyes/",
  },
  {
    name: "Jacob Clapper",
    linkedin: "https://www.linkedin.com/in/jacob-clapper/",
    github: "https://github.com/bostonbachexchange/",
    portfolio: "https://github.com/bostonbachexchange/",
  },
  {
    name: "Jaden Ruplal",
    linkedin: "https://www.linkedin.com/in/jaden-ruplal-76b811243/",
    github: "https://github.com/jadenRuplal/",
    portfolio: "https://github.com/jadenRuplal/",
  },
  {
    name: "James Adams",
    linkedin: "https://www.linkedin.com/in/jamestylladams/",
    github: "https://github.com/tylly/",
    portfolio: "https://github.com/tylly/",
  },
  {
    name: "James Lee",
    linkedin: "https://www.linkedin.com/in/jlx012/",
    github: "https://github.com/jlx012/",
    portfolio: "https://github.com/jlx012/",
  },
  {
    name: "Kyle Moreno",
    linkedin: "https://www.linkedin.com/in/kylepm/",
    github: "https://github.com/DRG104/",
    portfolio: "https://github.com/DRG104/",
  },
  {
    name: "Lance Nguyen",
    linkedin: "https://www.linkedin.com/in/lancenguyen100/",
    github: "https://github.com/tinhi3/",
    portfolio: "https://github.com/tinhi3/",
  },
  {
    name: "Larry Mays",
    linkedin: "https://www.linkedin.com/in/larry-mays-80b531105/",
    github: "https://github.com/LarryMays92",
    portfolio: "https://github.com/LarryMays92",
  },
  {
    name: "Lyndonna Munro",
    linkedin: "https://www.linkedin.com/in/lyndonnamunro/",
    github: "https://github.com/Lyndonna18/",
    portfolio: "https://github.com/Lyndonna18/",
  },
  {
    name: "Mahider Mengiste",
    linkedin: "https://www.linkedin.com/in/mahider-mengiste-882092213/",
    github: "https://github.com/mmengi18/",
    portfolio: "https://github.com/mmengi18/",
  },
  {
    name: "Neil Rissman",
    linkedin: "https://www.linkedin.com/in/neil-rissman/",
    github: "https://github.com/nrissman/",
    portfolio: "https://github.com/nrissman/",
  },
  {
    name: "Nick Esparza",
    linkedin: "https://www.linkedin.com/in/nickesparza/",
    github: "https://github.com/nickesparza/",
    portfolio: "https://github.com/nickesparza/",
  },
  // { name: 'Pedro Abreu', linkedin: 'https://www.linkedin.com/in/henrique-abreu-hoff-3890b4204/', github: '', portfolio: ''},
  {
    name: "Randy D`Abbraccio",
    linkedin: "https://www.linkedin.com/in/randy-dabbraccio/",
    github: "https://github.com/Rando-cal/",
    portfolio: "https://github.com/Rando-cal/",
  },
  {
    name: "Ryan May",
    linkedin: "https://www.linkedin.com/in/ryanwmay/",
    github: "https://github.com/mayday91/",
    portfolio: "https://github.com/mayday91/",
  },
  {
    name: "Shai Aloni",
    linkedin: "https://www.linkedin.com/in/shaialoni/",
    github: "https://github.com/shaialoni/",
    portfolio: "https://github.com/shaialoni/",
  },
  {
    name: "Sophia Navarro",
    linkedin: "https://www.linkedin.com/in/sophia-navarro/",
    github: "https://github.com/Valkarie01/",
    portfolio: "https://github.com/Valkarie01/",
  },
  {
    name: "Terrance Wells",
    linkedin: "https://www.linkedin.com/in/terrance-wells-jr-b57a32241/",
    github: "https://github.com/SunGod7/",
    portfolio: "https://github.com/SunGod7/",
  },
  {
    name: "Trevor Zou",
    linkedin: "https://www.linkedin.com/in/trevor-zou/",
    github: "https://github.com/tzou2024/",
    portfolio: "https://github.com/tzou2024/",
  },
  {
    name: "Tyson McGuire",
    linkedin: "https://www.linkedin.com/in/tyson-mcguire/",
    github: "https://github.com/mcguirto/",
    portfolio: "https://github.com/mcguirto/",
  },
  {
    name: "Yuntian Zheng",
    linkedin: "https://www.linkedin.com/in/yuntian-zheng/",
    github: "https://github.com/Yuntian-Zheng/",
    portfolio: "https://github.com/Yuntian-Zheng/",
  },
  {
    name: "Zene Orr",
    linkedin: "https://www.linkedin.com/in/zene09/",
    github: "https://github.com/Zene09/",
    portfolio: "https://github.com/Zene09/",
  },
];
```
 
- ### Developers
   - name: String
   - github: String (url)
   - linkedIn: String (url)
&nbsp;
 
## Development Roles
- Project Overlord: James Adams
- Front-End SME: Amanda Corral
- Back-End SME: Hayden Moyes
- General Dev: Shai Aloni
 
### Technology Links:

###### AWS - https://aws.amazon.com/
###### Mongoose JS - https://mongoosejs.com/
###### MongoDB - https://www.mongodb.com/
###### NPM JS - https://www.npmjs.com/


