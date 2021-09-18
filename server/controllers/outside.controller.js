const axios = require('axios')

exports.outsideSearch = (req, res) => {
  const word = req.body.word;
  if (!word) {
    res.status(400).send({ message: "Cannot search an empty word!" });
    return;
  }
  axios.post(`${process.env.MZ_URI}/search`, {
    "dict": "javi",
    "limit": 20,
    "page": 1,
    "query": word,
    "type": "word"
  }).then(axiosRes => {
    const datas = axiosRes.data.data;
    const result = {
      word: word,
      phonetic: "",
      meaning: "",
      example: "",
      mobileId: -1
    };
    if (Array.isArray(datas)) {
      const matchedData = datas.filter(data => data.word === word);
      if (matchedData && matchedData.length > 0) {
        result.phonetic = matchedData[0].phonetic;
        result.mobileId = matchedData[0].mobileId;
        const means = matchedData[0].means;
        for(let i = 0; i < means.length; i++) {
          const mean = means[i];
          const examples = mean.examples;
          if (examples !== "" && mean.kind !== "") {
            if (Array.isArray(examples)) {
              result.meaning += mean.mean + '\n';
              for(let j = 0; j < examples.length; j++) {
                const exmp = examples[j];
                result.example += `${exmp.content}\n${exmp.mean}\n${exmp.transcription}\n\n`
              }
            } else {
              result.meaning += mean.mean + '\n';
            }
          } else {
            result.meaning += mean.mean + '\n';
          }
        }
      }
    } else {
    }
    const trimmedResult = {
      word: result.word,
      phonetic: result.phonetic.trim(),
      meaning: result.meaning.trim(),
      example: result.example.trim(),
      mobileId: result.mobileId
    }
    res.send(trimmedResult);
  })
  .catch(error => {
    console.error(error)
  })
};

exports.outsideSuggest = (req, res) => {
  const word = req.body.word;
  console.log(`Suggest for ${word}`);
  axios.post(`${process.env.MZ_URI}/suggest`, {
      "keyword": word,
      "dict": "javi"
    }
  ).then(axiosRes => {
    const datas = axiosRes.data.data;
    const parseDatas = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      const splited = data.split("#");
      if (splited.length > 1) {
        parseDatas.push({
          word: splited[0],
          phonetic: splited[1],
          meaning: splited[2].length > 50 ? splited[2].substring(0, 47) + "..." : splited[2]
        })
      } else {
        parseDatas.push({
          word: splited[0],
          phonetic: splited[0]
        })
      }
    }
    res.send(parseDatas);
  })
  .catch(error => {
    console.error(error)
  })
};
