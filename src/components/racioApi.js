import superagent from 'superagent';

// because of the heavy use of the Browser window
// this fuctiuons need to be refactor if we use SSR

export async function getID(setPersonId, setIsError) {
  const apiKeys = window.RESOURCES;
  const { rachio } = apiKeys;

  // if local storage is available try to retrived the ID to avoind a round trip
  if (typeof Storage !== 'undefined') {
    const personId = window.localStorage.getItem('personId');
    if (personId) {
      setPersonId(personId);
      // we should not return here in order to get update data
      // returning just for speed during development
      return personId;
    }
  }

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
        if (typeof Storage !== 'undefined') {
          // Code for localStorage/sessionStorage.
          window.localStorage.setItem('personId', id);
        }
      })
      .catch(err => {
        console.error(err);
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

  // if local storage is available try to retrived the info
  // while we are fething a fresh version of the data

  if (typeof Storage !== 'undefined') {
    // retrive the data from store if available
    const storedPoint = window.localStorage.getItem(point);
    if (storedPoint) {
      // set the data so the UI will have something to show
      // will update when the API fisnish suceffuly
      set(JSON.parse(storedPoint));
    }
  }

  if (rachio) {
    return superagent
      .get(`https://api.rach.io/1/public/${point}/${personId}`)
      .set('Authorization', 'Bearer ' + rachio)
      .accept('application/json')
      .then(response => {
        const { body } = response;
        console.log({ body });
        set(body);
        // if local storage is available try to retrived the info
        // while we are fething a fresh version of the data
        if (typeof Storage !== 'undefined') {
          // save the data on local storage
          window.localStorage.setItem(point, JSON.stringify(body));
        }
      })
      .catch(err => {
        console.error(err);
        setIsError(err);
      });
  } else {
    setIsError(false);
  }
}
