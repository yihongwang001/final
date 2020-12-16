import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";
import Navigation from "../components/Navigation.js";
import { Link } from "react-router-dom";

function Posts(props) {
  const renderPosts = () => {
    return props.posts.map((p) => (
      <div class="container">
        <div class="card-columns">
          <Card
            style={{ height: "620px", width: "20rem", margin: "1rem" }}
            key={p._id}
          >
            <Card.Img
              variant="top"
              style={{ height: "200px" }}
              src={p.images[1]}
              alt="housing image"
            />
            <Card.Body style={{ height: "350px" }}>
              <Card.Title>
                <strong>{p.titletextonly}</strong>
              </Card.Title>
              <Card.Subtitle>
                <span className="btn btn-outline-dark">
                  Housing: ${p.housing}
                </span>
              </Card.Subtitle>
              <br />
              <Card.Text>
                <span className="btn btn-outline-dark">Cost ${p.price}</span>
                <br />
                <br />

                <span className="btn btn-outline-dark">
                  Address: {p.mapaddress}
                </span>
                <br />
              </Card.Text>
              <Button className="btn btn-dark" href={`/posts/${p._id}`}>
                Find more details about me!
              </Button>{" "}
            </Card.Body>
          </Card>{" "}
        </div>
      </div>
    ));
  };

  return <CardColumns>{renderPosts()}</CardColumns>;
}

Posts.propTypes = {
  posts: PropTypes.func.isRequired,
};

export default Posts;
