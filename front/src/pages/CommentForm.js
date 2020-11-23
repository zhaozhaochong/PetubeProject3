import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Col, Button, Row } from "react-bootstrap";
import "./style/commentForm.css";

class CommentForm extends React.Component {
  handleOnSubmit(event) {
    event.preventDefault();
    axios
      .post("/videos/addComments", {
        data: {
          videoId: this.props.videoId,
          userToken: this.props.userToken,
          comment: this.props.comment,
        },
      })
      .then((response) => {
        console.log(response.data);
        if(response.data.code === 200) {
          this.props.refreshComments();
        }
        this.props.commentOnChange("");
      });
  }

  render() {
    if (this.props.enableComment) {
      return (
        <Form className="comment-form" onSubmit={(e) => this.handleOnSubmit(e)}>
          <Form.Row>
            <Col lg={"12"}>
              <Form.Group controlId={"formComment"}>
                <Form.Label>Comments: </Form.Label>
                <Form.Control
                  as={"textarea"}
                  name={"comment"}
                  value={this.props.comment}
                  onChange={(e) => this.props.commentOnChange(e.target.value)}
                  row={"5"}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row className="mb-3">
            <Col className={"text-right"} lg={"12"}>
              <Button variant="primary" type={"submit"}>
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>
      );
    } else {
      return (
        <Row className={"my-4 comment-form"}>
          <Col className={"text-center"} lg={"12"}>
            <h3>
              If you want to leave and vote comments, please{" "}
              <a href="/login">login</a> first.{" "}
            </h3>
          </Col>
        </Row>
      );
    }
  }
}

CommentForm.propTypes = {
  videoId: PropTypes.string.isRequired,
  userToken: PropTypes.string.isRequired,
  enableComment: PropTypes.bool.isRequired,
  comment: PropTypes.string.isRequired,
  commentOnChange: PropTypes.func.isRequired,
  refreshComments: PropTypes.func.isRequired
};

export default CommentForm;
