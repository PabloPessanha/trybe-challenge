module.exports = (obj) => {
  const { languages, ...userInfo } = obj;

  const finalUser = { ...userInfo, skills: languages.map(({ language }) => language) };

  return finalUser;
};
