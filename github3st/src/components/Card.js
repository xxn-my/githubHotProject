import React from "react";

class Card extends React.Component {
  render() {
    const { item, index } = this.props;
    return (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.08)",
          padding: "20px",
          minHeight: "610px",
          borderRadius: "20px",
          boxSizing: "border-box",
          margin: "10px 5px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "10px",
            }}
          >
            #{index + 1}
          </p>
          <div
            style={{
              minHeight: "250px",
              // backgroundColor: "#ccc",
              // display: "block",
              // margin: "0 auto",
              // display:'teble-cell',
              verticalAlign: "middle",
            }}
          >
            <img
              src={item.owner.avatar_url}
              style={{ width: "100%", minHeight: "250px" }}
              alt=""
            />
          </div>
          <p
            style={{
              marginTop: "20px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <a
              href={item.html_url}
              style={{ fontWeight: "bold", textDecoration: "none" }}
            >
              {item.name}/{item.owner.login}
            </a>
          </p>
        </div>
        <ul style={{ listStyle: "none", marginTop: "30px" }}>
          <li key={index}>
            <p>
              <i
                style={{ color: "rgb(255, 191, 116)" }}
                className="fa fa-user fa-fw fa-lg"
              />
              <a href={item.owner.html_url} style={{ textDecoration: "none" }}>
                {item.owner.login}
              </a>
            </p>
            <p>
              <i
                style={{ color: "rgb(255, 215, 0)" }}
                className="fa fa-star fa-fw fa-lg"
              />
              {item.watchers} stars
            </p>
            <p>
              <i
                style={{ color: "rgb(129, 195, 245)" }}
                className="fa fa-link fa-fw fa-lg"
              />
              {item.forks_count} forks
            </p>
            <p>
              <i
                style={{ color: "rgb(241, 138, 147)" }}
                className="fa fa-exclamation-triangle fa-fw fa-lg"
              />
              {item.open_issues} Open issues
            </p>
          </li>
        </ul>
      </div>
    );
  }
}
export default Card;
