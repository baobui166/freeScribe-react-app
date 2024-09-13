import PropTypes from "prop-types";

function Transcription({ textElement }) {
  return <div>{textElement}</div>;
}

Transcription.propTypes = {
  textElement: PropTypes.string,
};
export default Transcription;
