import React from "react";
import axios from "axios";
import styles from "@/page/Battle/battle.less";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      player1: {
        loading: true,
      },
      player2: {
        loading: true,
      },
    };
  }

  async componentDidMount() {
    const { player1, player2 } = this.props;
    console.log("这里的值", player1, player2);
    await axios
      .get(`https://api.github.com/users/${player1}`)
      .then((res) => {
        this.setState({
          player1: { ...res.data, loading: false },
        });
      })
      .catch((err) => {
        console.log("这里的错误", err);
        this.setState({ error: err.response.statusText });
      });
    await axios
      .get(`https://api.github.com/users/${player2}`)
      .then((res) => {
        this.setState({
          player2: { ...res.data, loading: false },
        });
      })
      .catch((err) => {
        console.log("这里的错误", err);
        this.setState({ error: err.response.statusText });
      });
  }

  render() {
    const { reset } = this.props;
    const { player1, player2, error } = this.state;
    if (player1.loading || player2.loading) {
      return <div className={styles.tac}>{error || "loading..."}</div>;
    }
    // console.log("render时候",player1,player2)
    if (player1.public_repos > player2.public_repos) {
      player1.role = "winner";
      player2.role = "loser";
    } else if (player1.public_repos < player2.public_repos) {
      player1.role = "loser";
      player2.role = "winner";
    } else if (player1.public_repos === player2.public_repos) {
      player1.role = "drew";
      player2.role = "drew";
    }
    return (
      <div>
        <div className={styles.result}>
          <div className={styles.card}>
            <h2 className={styles.tac}>{player1.role}</h2>
            <div className={styles.imgDiv}>
              <img
                src={`https://github.com/${player1.name}.png?size=200`}
                alt={player1.name}
              />
            </div>
            <div>
              <h3 className={styles.tac}>Scores: {player1.public_repos}</h3>
              <h2 className={styles.proname}>{this.props.player1}</h2>
              <div className={styles.tal}>
                <i className="fa fa-map-marker" /> {player1.location}
              </div>
              <div className={styles.tal}>
                <i className="fa fa-suitcase" /> {player1.public_gists}
              </div>
              <div className={styles.tal}>
                <i className="fa fa-heart" /> {player1.flowers}
              </div>
              <div className={styles.tal}>
                <i className="fa fa-trophy" /> {player1.public_repos}
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <h2 className={styles.tac}>{player2.role}</h2>
            <div className={styles.imgDiv}>
              <img
                src={`https://github.com/${player2.name}.png?size=200`}
                alt={player2.name}
              />
            </div>
            <div>
              <h3 className={styles.tac}>scores: {player2.public_repos}</h3>
              <h2 className={styles.proname}>{this.props.player2}</h2>
              <div className={styles.tal}>
                <i className="fa fa-map-marker" /> {player2.location}
              </div>
              <div className={styles.tal}>
                <i className="fa fa-suitcase" /> {player2.public_gists}
              </div>
              <div className={styles.tal}>
                <i className="fa fa-heart" /> {player2.flowers}
              </div>
              <div className={styles.tal}>
                <i className="fa fa-trophy" /> {player2.public_repos}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.resetBtn}>
          <button type="button" onClick={reset}>
            reset
          </button>
        </div>
      </div>
    );
  }
}
export default Result;
