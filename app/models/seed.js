const mongoose = require("mongoose");
const Developer = require("./developer");
const db = require("../../config/db");
const axios = require("axios");
const cheerio = require("cheerio");

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

let devsWithAvatar = cohortDevelopers;
const getAvatar = (array) => {
  array.forEach((dev, i) => {
    axios
      .get(dev.github)
      .then((res) => {
        const $ = cheerio.load(res.data);
        const profileImgLoad = $(".avatar.avatar-user.width-full");
        cohortDevelopers[i].avatar = profileImgLoad[0].attribs.src;
        console.log("new array field", cohortDevelopers[i]);

        // first, we need to connect to the database
        mongoose
          .connect(db, {
            useNewUrlParser: true,
          })
          .then(() => {
            // first we remove all of the services
            // here we can add something to make sure that we only delete services without an owner

            Developer.deleteMany()
              .then((deletedDevelopers) => {
                console.log(
                  "Here are the deleted services: \n",
                  deletedDevelopers
                );
                // the next step is to use our startServices array to create our seeded services

                Developer.create(cohortDevelopers)
                  .then((newDevelopers) => {
                    console.log("Here are the new services: \n", newDevelopers);
                    mongoose.connection.close();
                  })
                  .catch((error) => {
                    console.log(error);
                    mongoose.connection.close();
                  });
              })
              .catch((error) => {
                console.log(error);
                mongoose.connection.close();
              });
          })
          .catch((error) => {
            console.log(error);
            mongoose.connection.close();
          });
      })
      .catch((err) => console.log(err));
  });
};

getAvatar(devsWithAvatar);
