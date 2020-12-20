import React from "react";
import PropTypes from "prop-types";
import { Card, Button, CardColumns } from "react-bootstrap/";

function Posts(props) {
  const renderPosts = () => {
    return props.posts.map((p) => (
      <div class="card-columns">
        <Card
          style={{ height: "560px", width: "21rem", margin: "1rem" }}
          key={p._id}
        >
          <Card.Img
            variant="top"
            style={{ height: "210px" }}
            src={p.images[2]}
            alt="housing image"
          />

          <Card.Body class="card text-center" style={{ height: "350px" }}>
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
        </Card>
      </div>
    ));
  };

  return <CardColumns role="main">{renderPosts()}</CardColumns>;
}

Posts.propTypes = {
  posts: PropTypes.func.isRequired,
};

export default Posts;
