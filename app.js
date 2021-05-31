const client_id = "1a4fd56c2f5247efb99f411614c20d4b";
const client_secret = "8b73949f22714ea68bb275ca732f039f";

const getToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
    body: "grant_type=client_credentials",
  };

  const request = await fetch(url, options);
  const responseJSON = await request.json();

  return responseJSON.access_token;
};

const getTopTracks = async () => {
  const token = await getToken();
  const url =
    "https://api.spotify.com/v1/artists/60d24wfXkVzDSfLS6hyCjZ/top-tracks?market=ES";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const result = await fetch(url, options);
  const data = await result.json();
  const tracks = await data.tracks;
  // console.log(tracks);

  const divReleases = document.querySelector(".top-releases-row");
  tracks.forEach((music) => {
    const divRelease = createRelease(music);
    divReleases.appendChild(divRelease);
  });

  return data;
};

function createRelease(music) {
  const imagensHigh = music.album.images[0];
  const imagensMedium = music.album.images[1];
  const imagensSmall = music.album.images[2];

  const div = document.createElement("div");
  div.classList.add("release");
  div.innerHTML = `<img src="${imagensHigh.url}" alt="" />`;
  div.innerHTML += `<div class="controls">
                      <div class="release-info">
                        <h4>${music.name}</h4>
                      </div>
                    </div>`;

  return div;
}

getTopTracks();
