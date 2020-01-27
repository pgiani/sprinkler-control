import superagent from 'superagent';

export async function getID(setPersonId, setIsError) {
  const apiKeys = window.RESOURCES;
  const { rachio } = apiKeys;

  if (rachio) {
    return superagent
      .get('https://api.rach.io/1/public/person/info')
      .set('Authorization', 'Bearer ' + rachio)
      .accept('application/json')
      .then(response => {
        const { body } = response;
        const { id } = body;
        console.log({ id });
        setPersonId(id);
      })
      .catch(err => {
        console.log(err);
        setIsError(err);
      });
  } else {
    setIsError(false);
  }
}

export async function get(e) {
  const apiKeys = window.RESOURCES;
  const { rachio } = apiKeys;
  const { point, personId, set, setIsError } = e;
  if (rachio) {
    return superagent
      .get(`https://api.rach.io/1/public/${point}/${personId}`)
      .set('Authorization', 'Bearer ' + rachio)
      .accept('application/json')
      .then(response => {
        const { body } = response;
        console.log({ body });
        set(body);
      })
      .catch(err => {
        console.log(err);
        setIsError(err);
      });
  } else {
    setIsError(false);
  }
}
