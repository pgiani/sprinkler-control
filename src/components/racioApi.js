import superagent from 'superagent';
import Swal from 'sweetalert2';

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
  const { point, set, setIsError } = e;
  let { personId } = e;

  if (rachio && personId) {
    return superagent
      .get(`https://api.rach.io/1/public/${point}/${personId}`)
      .set('Authorization', 'Bearer ' + rachio)
      .accept('application/json')
      .then(response => {
        const { body } = response;

        console.log(' -----get response----');
        set(body);

        // if local storage is available try to retrived the info
        // while we are fething a fresh version of the data
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        setIsError(err);
      });
  } else {
    setIsError(false);
  }
}

export async function getZone(id) {
  const apiKeys = window.RESOURCES;
  const { rachio } = apiKeys;

  if (!id) return;

  const res = await superagent
    .get(`https://api.rach.io/1/public/zone/${id}/`)
    .set('Authorization', 'Bearer ' + rachio)
    .accept('application/json')
    .then(response => {
      const { body } = response;

      // if local storage is available try to retrived the info
      // while we are fething a fresh version of the data
      return body;
    })
    .catch(err => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      setIsError(err);
    });
  return res;
}

export function runMultitpleZones(zones) {
  const apiKeys = window.RESOURCES;
  const { rachio } = apiKeys;

  if (!zones) return;
  return new Promise((resolve, reject) => {
    superagent
      .put(`https://api.rach.io/1/public/zone/start_multiple/`)
      .set('Authorization', 'Bearer ' + rachio)
      .send({ zones: zones })
      .then(response => {
        //  console.log({ response }, 'response runMultitpleZones');

        resolve(response);
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        reject(err);
      });
  });
}

export function runOneZone(zone) {
  const apiKeys = window.RESOURCES;
  const { rachio } = apiKeys;

  if (!zone) return;
  return new Promise((resolve, reject) => {
    superagent
      .put(`https://api.rach.io/1/public/zone/start/`)
      .set('Authorization', 'Bearer ' + rachio)
      .send(zone)
      .then(response => {
        // console.log({ response }, 'response runOneZone');

        resolve(response);
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        reject(err);
      });
  });
}
