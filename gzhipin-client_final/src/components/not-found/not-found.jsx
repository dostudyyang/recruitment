/*
The UI routing component of the page could not be found
 */

import React from "react"
import {Button} from "antd-mobile"

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>Sorry,Cannot find the page!</h2>
          <Button
            type="primary"
            onClick={() => this.props.history.replace("/")}
          >
            Back to the home page
          </Button>
        </div>
      </div>
    )
  }
}

export default NotFound