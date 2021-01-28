import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./components/Sidebar";

import "./index.css";

const goeasy = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const dreams = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";

const chillout =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3";

const twistter =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3";

const freebird =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3";
function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}
class App extends React.Component {
  state = {
    currentSong: null,
    music: "stopped",
    currentTime: null,
    duration: null
  };

  render() {
    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);
    const playlist = [
      {
        id: 1,
        title: "Go Easy",
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Mabel-42377.jpg/1200px-Mabel-42377.jpg"
      },
      {
        id: 2,
        title: "Dreams",
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Mabel-42617.jpg/1200px-Mabel-42617.jpg"
      },
      {
        id: 3,
        title: "Chill Out",
        url:
          "https://images.pexels.com/photos/894156/pexels-photo-894156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      },
      {
        id: 4,
        title: "Twistter",
        url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/KK_AIIC_Bangalore_2016.jpg/1200px-KK_AIIC_Bangalore_2016.jpg"
      },
      {
        id: 5,
        title: "Free Bird",
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Pink_2019-07-27_Munich_%28cropped%29.jpg/1200px-Pink_2019-07-27_Munich_%28cropped%29.jpg"
      },
      {
        id: 6,
        title: "Free Bird",
        url:
          "https://www.thehindu.com/entertainment/movies/8s57x5/article33066251.ece/BINARY/Viruss-1-2"
      }
    ].map((item) => {
      return (
        <div className="uilist">
          <div className="item">
            <img className="uiavatarimage" src={item.url} alt="music images" />
            <div className="content">
              <li
                className="title"
                key={item.id}
                onClick={() => this.setState({ currentSong: item.title })}
              >
                {item.title}
              </li>
            </div>
          </div>
        </div>
      );
    });
    return (
      <>
        <h1 className="header" >MusicZest</h1>
        <div className="App">
          <Sidebar/>
          <div className="ui card main-container">
            <div className="info-container">
              {this.state.music === "playing" ? (
                <div className="current-song">
                  Now Playing {this.state.currentSong}
                </div>
              ) : null}
              {this.state.music === "paused" ? (
                <div className="current-song">
                  {this.state.currentSong} is paused{" "}
                </div>
              ) : null}
              {this.state.music === "playing" ||
              this.state.music === "paused" ? (
                <div>
                  {currentTime} / {duration}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="button-container">
              {this.state.music === "paused" && (
                <button
                  class="ui labeled icon red button"
                  onClick={() => this.setState({ music: "playing" })}
                >
                  <i class=" large play circle outline icon" />
                  Play
                </button>
              )}
              {this.state.music === "playing" && (
                <button
                  class="ui labeled icon red button"
                  onClick={() => this.setState({ music: "paused" })}
                >
                  <i class="large pause circle outline icon" />
                  Pause
                </button>
              )}
              {this.state.music === "playing" ||
              this.state.music === "paused" ? (
                <button
                  class="ui labeled icon button"
                  onClick={() => this.setState({ music: "stop" })}
                >
                  <i class="large stop circle outline icon" />
                  Stop
                </button>
              ) : null}
            </div>

            <div className="playlist">{playlist}</div>

            <audio ref={(ref) => (this.music = ref)} />
          </div>
        </div>
      </>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentSong !== prevState.currentSong) {
      let track;
      switch (this.state.currentSong) {
        case "Go Easy":
          track = goeasy;
          break;
        case "Dreams":
          track = dreams;
          break;
        case "Chill Out":
          track = chillout;
          break;
        case "Twistter":
          track = twistter;
          break;
        case "Free Bird":
          track = freebird;
          break;
        default:
          break;
      }

      if (track) {
        this.music.src = track;
        this.music.play();
        this.setState({
          music: "playing"
        });
      }
    }

    if (this.state.music !== prevState.music) {
      if (this.state.music === "paused") {
        this.music.pause();
      }
      if (this.state.music === "playing" && prevState.music === "paused") {
        this.music.play();
      }
      if (this.state.music === "stop") {
        this.music.pause();
        this.currentTime = 0;
        this.setState({
          currentSong: null
        });
      }
    }
  }

  componentDidMount() {
    this.music.addEventListener("timeupdate", (e) => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.music.removeEventListener("timeupdate", () => {});
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
